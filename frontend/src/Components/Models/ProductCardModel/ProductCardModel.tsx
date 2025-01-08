import React, { useState } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { removeProductFromCategory } from "../../../Redux/Actions/categoryActions.ts";
import { deleteProductFromSubcatalog } from "../../../Redux/Actions/subcatalogProductsActions.ts";
import { deleteProduct } from "../../../Redux/Actions/searchProductActions.ts";
import ProductRatingModel from "../StarModel/ProductRatingModel.tsx";
import AddToCartForm from "../../Forms/AddToCartForm/AddToCartForm.tsx";
import ReviewCount from "../../Models/ReviewCountModel/ReviewCountModel.tsx";
import { Product } from "../../../Redux/Reducers/categoryReducer.ts";
import "./ProductCardModel.css";
import { AppDispatch, RootState } from "../../../Redux/store.ts";

interface ProductCardModelProps {
  product: Product;
  isAdmin: boolean;
  categoryTitle: string;
}

const ProductCardModel: React.FC<ProductCardModelProps> = ({
  product,
  isAdmin,
  categoryTitle,
}) => {

  const {
    _id,
    name,
    price = 0,
    discount = 0,
    titleImage,
    hoverImage,
    rating = 0,
    comments = 0,
    parametrs = [],
  } = product;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const [showCartForm, setShowCartForm] = useState(false);

  const { activeCurrency, currencyRate } = useSelector((state: RootState) => state.currency);

  const commentCount = Array.isArray(comments) ? comments.length : comments || 0;

  const formatPrice = (price: number): string => {
    return Math.round(price).toLocaleString("ru-RU");
  };

  const discountPercentage =
    discount && price ? Math.round(((price - discount) / price) * 100) : null;

  const convertedPrice = price / (currencyRate || 1);
  const convertedDiscount = discount / (currencyRate || 1);

  const handleDeleteProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!_id) {
      console.error("ID продукта отсутствует");
      return;
    }

    const pathSegments = location.pathname.split("/");

    if (location.pathname === "/") {
      if (categoryTitle) {
        dispatch(removeProductFromCategory(categoryTitle, _id));
      } else {
        console.error("Назва категорії відсутня");
      }
    } else if (pathSegments.length >= 3 && pathSegments[1] === "products") {
      const prefix = pathSegments[2];
      if (prefix) {
        dispatch(deleteProduct(_id));
      } else {
        console.error("Prefix отсутствует в URL");
      }
    } else if (pathSegments.length >= 4 && pathSegments[1] === "catalog") {
      const catalog = pathSegments[2];
      const subcatalog = pathSegments[3];

      if (catalog && subcatalog) {
        dispatch(deleteProductFromSubcatalog(catalog, subcatalog, _id));
      } else {
        console.error("Не удалось определить каталог или подкаталог из URL");
      }
    } else {
      console.error("Удаление продукта невозможно из текущего маршрута");
    }
  };

  const handleCardClick = () => {
    if (_id) navigate(`/product/${_id}`);
  };


  const getLabelColor = (param: string) => {
    if (param.startsWith("Знижка")) {
      return "red";
    }
    switch (param) {
      case "Хіт Продажу":
        return "#28a745";
      case "Рекомендовано":
        return "#6f42c1";
      case "Новий Товар":
        return "#ff6200";
      default:
        return "gray";
    }
  };

  const updatedParametrs =
    discount && parametrs
      ? [...parametrs.filter((param) => !param.startsWith("Знижка")), `Знижка -${discountPercentage}%`]
      : parametrs.filter((param) => !param.startsWith("Знижка"));
  return (
    <div className="product-item" style={{ cursor: "pointer" }}>
      <div className="image-container" onClick={handleCardClick}>
        <img src={titleImage} alt={name} className="product-image" />
        <img src={hoverImage} alt={name} className="hover-image" />
      </div>
      <div className="product-info-wrapper">
        <div className="product-details">
          <div className="labels">
            {updatedParametrs.map((param) => (
              <span
                key={param}
                className="label"
                style={{ backgroundColor: getLabelColor(param) }}
              >
                {param}
              </span>
            ))}
          </div>

          <h3 className="product-name">
            {name && name.length > 19 ? `${name.slice(0, 19)}...` : name}
          </h3>

          <div className="rating-review-container">
            <ProductRatingModel rating={rating} />
            <ReviewCount count={commentCount} />
          </div>
          <div className="price-cart-container">
            <div className="price-container">
              {discount ? (
                <>
                  <p className="old-price">
                    {formatPrice(convertedPrice)}{" "}
                    {activeCurrency === "UAH"
                      ? "₴"
                      : activeCurrency === "USD"
                      ? "$"
                      : "€"}
                  </p>
                  <p className="product-price">
                    {formatPrice(convertedDiscount)}{" "}
                    {activeCurrency === "UAH"
                      ? "₴"
                      : activeCurrency === "USD"
                      ? "$"
                      : "€"}
                  </p>
                </>
              ) : (
                <span className="product-price">
                  {formatPrice(convertedPrice)}{" "}
                  {activeCurrency === "UAH"
                    ? "₴"
                    : activeCurrency === "USD"
                    ? "$"
                    : "€"}
                </span>
              )}
            </div>

            <div
              className="add-to-cart-button"
              onClick={(e) => {
                e.stopPropagation();
                isAdmin ? handleDeleteProduct(e) : setShowCartForm(true);
              }}
            >
              {isAdmin ? (
                <FaTimes style={{ marginRight: "5px" }} />
              ) : (
                <FaShoppingCart style={{ marginRight: "5px" }} />
              )}
            </div>
          </div>
        </div>
        {showCartForm && !isAdmin && (
          <AddToCartForm
            product={product}
            show={showCartForm}
            handleClose={() => setShowCartForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCardModel;

