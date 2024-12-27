import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSortAmountDownAlt, FaThList } from "react-icons/fa";
import { TfiLayoutGrid3Alt, TfiLayoutGrid2Alt } from "react-icons/tfi";
import ProductLongGridListModel from "../../../Models/ProductLongGridListModel/ProductLongGridListModel.tsx";
import ProductShortGridListModel from "../../../Models/ProductShortGridListModel/ProductShortGridListModel.tsx";
import ProductRowListModel from "../../../Models/ProductRowListModel/ProductRowListModel.tsx";
import SearchComponent from "./SearchProduct/SearchProduct.tsx";
import { searchProducts } from "../../../../Redux/Actions/searchProductActions.ts";
import useInfiniteScroll from "../../../../Hooks/useInfiniteScroll.tsx";
import useReloadOnReconnect from "../../../../Hooks/useReloadOnReconnect.tsx";
import errorImage from "../../../../Images/errorImage.png";
import "./FoundProduct.css";
import { AppDispatch } from "../../../../Redux/store.ts";

interface Product {
  name: string;
  rating: number;
  price: number;
  discount: number;
}

export default function FoundProduct() {
  const [sortOption, setSortOption] = useState("default");
  const [viewMode, setViewMode] = useState("grid3");
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error, hasMore, currentPage } = useSelector(
    (state: any) => state.searchProduct
  );
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  const navigate = useNavigate();
  const { prefix } = useParams();
  
  useReloadOnReconnect();
  
  useEffect(() => {
    if (prefix) {
      setQuery(prefix);
      dispatch(searchProducts(prefix, 1));
    }
  }, [prefix, dispatch]);

  const sortFunctions: { [key: string]: (a: Product, b: Product) => number } = {
    priceAsc: (a, b) => (a.discount || a.price) - (b.discount || b.price),
    priceDesc: (a, b) => (b.discount || b.price) - (a.discount || a.price),
    ratingAsc: (a, b) => a.rating - b.rating,
    ratingDesc: (a, b) => b.rating - a.rating,
    alphabetInc: (a, b) => a.name.localeCompare(b.name),
    alphabetDec: (a, b) => b.name.localeCompare(a.name),
  };

  const sortedProducts = useMemo(() => {
    return products && [...products].sort(sortFunctions[sortOption] || (() => 0));
  }, [sortOption, products]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setErrorMessage("");
    if (newQuery.trim().length < 2) {
      setErrorMessage("Назва товару повинна бути не менше двох символів.");
      return;
    }
    dispatch(searchProducts(newQuery, 1)); 
    navigate(`/products/${newQuery}`);
  };

  const fetchMoreProducts = () => {
    if (hasMore && !loading) {
      dispatch(searchProducts(query, currentPage + 1, 5)); 
    }
  };

  const { targetRef } = useInfiniteScroll(fetchMoreProducts, hasMore);

  if (error) {
    return (
      <div className="error-message-container">
        <img src={errorImage} className="error-image" alt="Помилка" />
      </div>
    );
  }


  return (
    <div className={`found-product-${viewMode}-container`}>
      <div className={`search-container ${viewMode}-view`}>
        <SearchComponent onSearch={handleSearch} viewMode={viewMode} />
      </div>

      {query.trim().length > 2 && (
        <div className={`search-result-${viewMode}`}>
          <h2>Результат пошуку за запитом "{query}"</h2>
        </div>
      )}

      {products.length > 0 && (
        <div className={`product-toolbar-container-${viewMode}`}>
          <div className="toolbar-controls">
            <div className="sort-dropdown" data-tooltip="Сортування">
              <FaSortAmountDownAlt />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
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
            <div className="choose-maket-wrapper">
              <button
                onClick={() => setViewMode("list")}
                className={`choose-maket-buttons ${viewMode === "list" ? "active" : ""}`}
                data-tooltip="Список"
              >
                <FaThList />
              </button>
              <button
                onClick={() => setViewMode("grid3")}
                className={`choose-maket-buttons ${viewMode === "grid3" ? "active" : ""}`}
                data-tooltip="Сітка 3"
              >
                <TfiLayoutGrid3Alt />
              </button>
              <button
                onClick={() => setViewMode("grid2")}
                className={`choose-maket-buttons ${viewMode === "grid2" ? "active" : ""}`}
                data-tooltip="Сітка 2"
              >
                <TfiLayoutGrid2Alt />
              </button>
            </div>
          </div>
        </div>
      )}

      {!products || products.length === 0 ? (
        <div className="no-products">
          Товарів за запитом "<strong>{query}</strong>" не знайдено.
        </div>
      ) : viewMode === "grid3" ? (
        <ProductLongGridListModel
          products={sortedProducts}
          isAuthenticated={isAuthenticated}
          isLoading={loading}
        />
      ) : viewMode === "grid2" ? (
        <ProductShortGridListModel
          products={sortedProducts}
          isAuthenticated={isAuthenticated}
        />
      ) : (
        <ProductRowListModel
          products={sortedProducts}
          isAuthenticated={isAuthenticated}
          categoryTitle="Дрони"
        />
      )}

      {loading && (
        <div className="loading-found-product-container">
          <div className="custom-spinner"></div>
        </div>
      )}

      <div ref={targetRef} className="infinite-scroll-trigger" />
    </div>
  );
}
