import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import SlideShow from './Slides/SlideShow.tsx';
import Description from './Description/Description.tsx';
import Suggestion from './Suggestion/Suggestion.tsx';
import ProductList from '../../Models/ProductListModel/ProductListModel.tsx';
import { fetchCategories, addCategory, removeCategory, addProductToCategory } from '../../../Redux/Actions/categoryActions.ts';
import CreateCategoryForm from '../../Forms/CreateCategoryForm/CreateCategoryForm.tsx';
import CreateProductFormModal from '../../Forms/CreateProductForm/CreateProductForm.tsx';
import { AppDispatch, RootState } from '../../../Redux/store.ts';
import { Product } from '../../../Redux/Reducers/categoryReducer.ts';
import errorImage from '../../../Images/errorImage.png'
import './Home.css';
import { setActiveCurrencyAndRate } from '../../../Redux/Actions/currencyActions.ts';

export default function Home() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { categories, loading, error } = useSelector((state: RootState) => state.category);
  const dispatch: AppDispatch = useDispatch();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency") || "UAH";
    dispatch(setActiveCurrencyAndRate(savedCurrency)); 
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = (categoryName: string) => {
    dispatch(addCategory(categoryName));
    setShowCategoryModal(false);
  };

  const handleRemoveCategory = (categoryName: string) => {
    dispatch(removeCategory(categoryName));
  };

  const handleOpenProductModal = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setSelectedCategory(null);
    setShowProductModal(false);
  };

  const handleProductFormSubmit = (formData: Product) => {
    if (selectedCategory) {
      dispatch(addProductToCategory(selectedCategory, formData));
      console.log(`Product added to category "${selectedCategory}":`, formData);
    }
    handleCloseProductModal();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-container">
          <div className="custom-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='error-message-container'>
        <img src={errorImage} className='error-image'/>
      </div>
    );
  }

  return (
    <>
    <div className="homepage-wrapper">
      <SlideShow isAdmin={isAuthenticated} />
      <Suggestion />

      {categories.map((category, index) => (
        <div key={index}>
          <div className="category-container">
            <ProductList
              key={index}
              categoryTitle={category.name}
              products={category.products}
              isAdmin={isAuthenticated}
            />
            {isAuthenticated && (
              <Button
                variant="primary"
                onClick={() => handleOpenProductModal(category.name)}
                className="admin-add-product mt-2"
              >
                +
              </Button>
            )}
          </div>

          {isAuthenticated && (
            <div className="admin-controls">
              <Button
                variant="danger"
                onClick={() => handleRemoveCategory(category.name)}
                className="remove-category-button mt-2"
              >
                Delete Category "{category.name}"
              </Button>
            </div>
          )}
        </div>
      ))}

      <div className="button-category-wrapper">
        {isAuthenticated && (
          <Button
            variant="primary"
            onClick={() => setShowCategoryModal(true)}
            className="add-category-button mt-4"
          >
            Add New Category
          </Button>
        )}
      </div>

      <Description />

      <CreateCategoryForm
        show={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSubmit={handleAddCategory}
      />

      <CreateProductFormModal
        show={showProductModal}
        handleClose={handleCloseProductModal}
        onSubmit={handleProductFormSubmit}
      />
    </div>
    </>
  );
}