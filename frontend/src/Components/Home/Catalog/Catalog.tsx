import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalogSubcatalogs } from '../../../Redux/Actions/catalogActions.ts';
import { AppDispatch, RootState } from '../../../Redux/store.ts';
import errorImage from '../../../Images/errorImage.png';
import './Catalog.css'; // Подключение стилей

export default function Catalog() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate(); // Хук для перехода между маршрутами
  const { catalogGroup } = useParams();

  // Получение состояния из Redux
  const { catalogs, loading, error } = useSelector((state: RootState) => state.catalog);

  // Получение субкаталогов текущего каталога
  const subcatalogs =
    catalogs.find((cat) => cat.name === catalogGroup)?.subCatalogs || [];

  // Загрузка субкаталогов при изменении `catalogGroup`
  useEffect(() => {
    if (catalogGroup) {
      dispatch(fetchCatalogSubcatalogs(catalogGroup));
    }
  }, [catalogGroup, dispatch]);

  if (loading) {
    return (
      <div className="loading-product-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message-container">
        <img src={errorImage} alt="Ошибка" className="error-image" />
      </div>
    );
  }

  return (
    <div className="catalog-container">
      <h1 className="catalog-container-h1">Каталог: {catalogGroup}</h1>
      {subcatalogs.length > 0 ? (
        <ul className="subcatalog-list">
          {subcatalogs.map((subcatalog) => (
            <li
              key={subcatalog._id}
              className="subcatalog-item"
              onClick={() => navigate(`/catalog/${catalogGroup}/${subcatalog.name}`)} 
            >
              {subcatalog.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-subcatalogs-message">Немає субкаталогів</p>
      )}
    </div>
  );
}


