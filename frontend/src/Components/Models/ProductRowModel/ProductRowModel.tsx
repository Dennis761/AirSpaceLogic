import React, { useState } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { removeProductFromCategory } from "../../../Redux/Actions/categoryActions.ts";
import { deleteProductFromSubcatalog } from "../../../Redux/Actions/subcatalogProductsActions.ts";
import ProductRatingModel from "../StarModel/ProductRatingModel.tsx";
import AddToCartForm from "../../Forms/AddToCartForm/AddToCartForm.tsx";
import ReviewCount from "../ReviewCountModel/ReviewCountModel.tsx";
import { Product } from "../../../Redux/Reducers/categoryReducer.ts";
import { AppDispatch, RootState } from "../../../Redux/store.ts";
import "./ProductRowModel.css";

interface ProductRowModelProps {
  product: Product;
  isAdmin: boolean;
  categoryTitle: string;
}

const ProductRowModel: React.FC<ProductRowModelProps> = ({
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
    ratingCount = 0,
    parametrs = [],
  } = product;

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showCartForm, setShowCartForm] = useState(false);

  const { activeCurrency, currencyRate } = useSelector((state: RootState) => state.currency);

  const discountPercentage =
    discount && price ? Math.round(((price - discount) / price) * 100) : null;

  const convertedPrice = price / (currencyRate || 1);
  const convertedDiscount = discount / (currencyRate || 1);

  const formatPrice = (price: number): string => {
    return Math.round(price).toLocaleString("ru-RU");
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCartForm(true);
  };

  const handleCloseCartForm = () => {
    setShowCartForm(false);
  };

  const handleDeleteProduct = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!_id) {
      console.error("ID продукта отсутствует");
      return;
    }

    const pathSegments = location.pathname.split("/");
    if (pathSegments.length >= 4 && pathSegments[1] === "catalog") {
      const catalog = pathSegments[2];
      const subcatalog = pathSegments[3];

      if (catalog && subcatalog) {
        dispatch(deleteProductFromSubcatalog(catalog, subcatalog, _id));
      } else {
        console.error("Не удалось определить каталог или подкаталог из URL");
      }
    } else {
      if (categoryTitle) {
        dispatch(removeProductFromCategory(categoryTitle, _id));
      } else {
        console.error("Название категории отсутствует");
      }
    }
  };

  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/product/${_id}`);
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
    <div className="product-row" style={{ cursor: "pointer" }}>
      <div className="product-row-image" onClick={handleProductClick}>
        <img src={titleImage} alt={name} />
        {hoverImage && <img src={hoverImage} alt={name} className="hover-image" />}
        <div className="labels">
          {updatedParametrs &&
            updatedParametrs.map((param) => (
              <span
                key={param}
                className="label"
                style={{ backgroundColor: getLabelColor(param) }}
              >
                {param}
              </span>
            ))}
        </div>
      </div>

      <div className="product-row-info" onClick={handleProductClick}>
        <h3 className="product-row-name">{name}</h3>
        <div className="product-row-rating">
          <ProductRatingModel rating={rating} />
          <ReviewCount count={ratingCount} />
        </div>
        <div className="product-row-price">
          {discount ? (
            <>
              <span className="product-row-old-price">
                {formatPrice(convertedPrice)}{" "}
                {activeCurrency === "UAH"
                  ? "₴"
                  : activeCurrency === "USD"
                  ? "$"
                  : "€"}
              </span>
              <span className="product-row-new-price">
                {formatPrice(convertedDiscount)}{" "}
                {activeCurrency === "UAH"
                  ? "₴"
                  : activeCurrency === "USD"
                  ? "$"
                  : "€"}
              </span>
            </>
          ) : (
            <span className="product-row-new-price">
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
          className="add-to-cart-button-row"
          onClick={isAdmin ? handleDeleteProduct : handleAddToCartClick}
        >
          {isAdmin ? <FaTimes /> : <FaShoppingCart />}
        </div>
      </div>

      {showCartForm && !isAdmin && (
        <AddToCartForm
          product={product}
          show={showCartForm}
          handleClose={handleCloseCartForm}
        />
      )}
    </div>
  );
};

export default ProductRowModel;

