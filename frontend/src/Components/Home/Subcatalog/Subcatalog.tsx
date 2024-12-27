import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaThList, FaSortAmountDownAlt } from "react-icons/fa";
import { TfiLayoutGrid3Alt, TfiLayoutGrid2Alt } from "react-icons/tfi";
import ProductLongGridListModel from "../../Models/ProductLongGridListModel/ProductLongGridListModel.tsx";
import ProductShortGridListModel from "../../Models/ProductShortGridListModel/ProductShortGridListModel.tsx";
import ProductRowListModel from "../../Models/ProductRowListModel/ProductRowListModel.tsx";
import { fetchSubCatalogProducts } from "../../../Redux/Actions/subcatalogProductsActions.ts";
import useInfiniteScroll from "../../../Hooks/useInfiniteScroll.tsx"; 
import { AppDispatch, RootState } from "../../../Redux/store.ts";
import "./Subcatalog.css";

interface Product {
  name: string;
  rating: number;
  price: number;
}

export default function Subcatalog() {
  const { catalog, subcatalog } = useParams<{ catalog: string; subcatalog: string }>();
  const dispatch: AppDispatch = useDispatch();

  const [sortOption, setSortOption] = useState("default");
  const [viewMode, setViewMode] = useState("grid3");

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { products, loading, hasMore, currentPage, error } = useSelector(
    (state: RootState) => state.subCatalogProducts
  );
 
  useEffect(() => {
    if (catalog && subcatalog) {
      dispatch(fetchSubCatalogProducts(catalog, subcatalog, 1));
    }
  }, [dispatch, catalog, subcatalog]);

  const sortFunctions: { [key: string]: (a: Product, b: Product) => number } = {
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    ratingAsc: (a, b) => a.rating - b.rating,
    ratingDesc: (a, b) => b.rating - a.rating,
    alphabetInc: (a, b) => a.name.localeCompare(b.name),
    alphabetDec: (a, b) => b.name.localeCompare(a.name),
  };

  const sortedProducts = useMemo(() => {
    if (Array.isArray(products)) {
      return [...products].sort(sortFunctions[sortOption] || (() => 0));
    }
    return [];
  }, [sortOption, products]);

  const fetchMoreProducts = () => {
    if (hasMore && !loading) {
      dispatch(fetchSubCatalogProducts(catalog, subcatalog, currentPage + 1));
    }
  };

  const { targetRef } = useInfiniteScroll(fetchMoreProducts, hasMore);

  return (
    <div className="subcatalog-found-product-container">
      <div className={`subcatalog-product-${viewMode}-toolbar-container`}>
        <h2 className="subcatalog-toolbar-title">{subcatalog}</h2>
        <div className="subcatalog-toolbar-controls">
          <div className="subcatalog-sort-dropdown" data-tooltip="Сортування">
            <FaSortAmountDownAlt />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="subcatalog-sort-select"
            >
              <option value="default">За замовчуванням</option>
              <option value="priceAsc">За ціною (зростання)</option>
              <option value="priceDesc">За ціною (спадання)</option>
              <option value="ratingAsc">За рейтингом (зростання)</option>
              <option value="ratingDesc">За рейтингом (спадання)</option>
              <option value="alphabetInc">За алфавітом (від А до Я)</option>
              <option value="alphabetDec">За алфавітом (від Я до А)</option>
            </select>
          </div>

          {/* Вибір режиму відображення */}
          <div className="subcatalog-choose-maket-wrapper">
            <button
              onClick={() => setViewMode("list")}
              className={`subcatalog-choose-maket-buttons ${
                viewMode === "list" ? "active" : ""
              }`}
              data-tooltip="Список"
            >
              <FaThList />
            </button>
            <button
              onClick={() => setViewMode("grid3")}
              className={`subcatalog-choose-maket-buttons ${
                viewMode === "grid3" ? "active" : ""
              }`}
              data-tooltip="Сітка 3"
            >
              <TfiLayoutGrid3Alt />
            </button>
            <button
              onClick={() => setViewMode("grid2")}
              className={`subcatalog-choose-maket-buttons ${
                viewMode === "grid2" ? "active" : ""
              }`}
              data-tooltip="Сітка 2"
            >
              <TfiLayoutGrid2Alt />
            </button>
          </div>
        </div>
      </div>

      {/* Відображення продуктів залежно від обраного режиму */}
      {viewMode === "grid3" && (
        <ProductLongGridListModel
          products={sortedProducts}
          isAuthenticated={isAuthenticated}
          isLoading={loading}
        />
      )}
      {viewMode === "grid2" && (
        <ProductShortGridListModel
          products={sortedProducts}
          isAuthenticated={isAuthenticated}
        />
      )}
      {viewMode === "list" && (
        <ProductRowListModel
          products={sortedProducts}
          isAuthenticated={isAuthenticated}
          categoryTitle={catalog}
        />
      )}

      {/* Лоадер при завантаженні */}
      {loading && (
        <div className="loading-found-product-container">
          <div className="custom-spinner"></div>
        </div>
      )}

      {/* Лоадер для підвантаження */}
      <div ref={targetRef} className="infinite-scroll-trigger" />

      {/* Помилка при завантаженні */}
      {error && (
        <div className="error-message">
          Сталася помилка під час завантаження товарів. Спробуйте пізніше.
        </div>
      )}
    </div>
  );
}
