import axios from "axios";
import { Dispatch } from "redux";
import {
  FETCH_SUBCATALOG_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
} from "../Constants/subcatalogProductsConstants.ts";

interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  titleImage: string;
  hoverImage: string;
  rating?: number;
  parametrs?: string[];
  imagesCollection: string[];
  comments?: number;
}

export const fetchSubCatalogProducts =
  (catalogName: string, subcatalogName: string, page: number = 1, limit: number = 10) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/subcatalog/${catalogName}/${subcatalogName}`,
        {
          params: {
            page,
            limit,
          },
        }
      );
      dispatch({
        type: FETCH_SUBCATALOG_PRODUCTS,
        payload: {
          products: data.products,
          currentPage: page,
          hasMore: data.hasMore,
        },
      });
    } catch (error) {
      console.error("Ошибка при загрузке продуктов субкаталога:", error);
      dispatch({
        type: FETCH_SUBCATALOG_PRODUCTS,
        payload: { products: [], currentPage: page, hasMore: false, error },
      });
    }
  };

export const addProductToSubcatalog =
  (catalogKey: string, subcatalogKey: string, productData: Product) =>
  async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("liga-fpv-token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const formData = new FormData();
      formData.append("folder", "ProductImages");
      formData.append("catalogKey", catalogKey);
      formData.append("subcatalogKey", subcatalogKey);

      const convertToBlob = (dataUrl: string) => {
        const [header, base64] = dataUrl.split(",");
        const binary = atob(base64);
        const array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          array[i] = binary.charCodeAt(i);
        }
        const mime = header.match(/:(.*?);/)[1];
        return new Blob([array], { type: mime });
      };

      ["titleImage", "hoverImage"].forEach((key) => {
        if (productData[key]) {
          const value = productData[key];
          const blob = value.startsWith("data:") ? convertToBlob(value) : value;
          formData.append(key, blob, `${key}.png`);
        }
      });

      if (productData.imagesCollection && productData.imagesCollection.length > 0) {
        productData.imagesCollection.forEach((image: string, index: number) => {
          const blob = image.startsWith("data:") ? convertToBlob(image) : image;
          formData.append(`image_${index}`, blob, `image_${index}.png`);
        });
      }

      Object.entries(productData).forEach(([key, value]) => {
        if (key === "parametrs" || key === "specifications") {
          formData.append(key, JSON.stringify(value));
        } else if (!["titleImage", "hoverImage", "imagesCollection"].includes(key)) {
          formData.append(key, value as string | Blob);
        }
      });

      const { data } = await axios.post("/api/subcatalog/add-product", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: ADD_PRODUCT,
        payload: { catalogKey, subcatalogKey, product: data.product },
      });
    } catch (error) {
      console.error("Ошибка при добавлении продукта:", error);
    }
  };

export const deleteProductFromSubcatalog =
  (catalogKey: string, subcatalogKey: string, productId: string) =>
  async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("liga-fpv-token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      await axios.delete(
        `/api/subcatalog/delete-product/${catalogKey}/${subcatalogKey}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: DELETE_PRODUCT,
        payload: { catalogKey, subcatalogKey, productId },
      });
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
    }
  };

  