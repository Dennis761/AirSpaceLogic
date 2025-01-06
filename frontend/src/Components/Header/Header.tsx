import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Form, Button, InputGroup, Offcanvas } from 'react-bootstrap';
import { FaBars, FaSearch, FaShoppingCart, FaAngleUp, FaPhone, FaAngleRight } from 'react-icons/fa';
import { FaInfo } from 'react-icons/fa6';
import { createProduct } from '../../Redux/Actions/productActions.ts'
import { 
  fetchCatalogs,
  addCatalog,
  addSubcatalog,  
  deleteSubcatalog
} from '../../Redux/Actions/catalogActions.ts';
import {  
  addProductToSubcatalog
} from '../../Redux/Actions/subcatalogProductsActions.ts'
import { logout } from '../../Redux/Actions/authActions.ts';
import ContactForm from '../Forms/ContactForm/ContactForm.tsx';
import CreateProductFormModal from '../Forms/CreateProductForm/CreateProductForm.tsx';
import CreateCatalogForm from '../Forms/CreateCatalogForm/CreateCatalogForm.tsx';
import CreateSubcatalogForm from '../Forms/CreateSubcatalogForm/CreateSubcatalogForm.tsx';
import { AppDispatch, RootState } from '../../Redux/store.ts';
import { searchProducts } from "../../Redux/Actions/searchProductActions.ts";
import CurrencySelector from './CurrencySelector/CurrencySelector.tsx';
import logo from '../../Images/image.png';
import './Header.css';
import './HeaderDesktop.css';
import './HeaderMobile.css';
 
const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeCatalog, setActiveCatalog] = useState<string | boolean>(false);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [modalCategory, setModalCategory] = useState<string | null>(null);
  const [modalSubcategory, setModalSubcategory] = useState<string | null>(null);
  const [isDimmed, setIsDimmed] = useState(false);
  const [prefix, setPrefix] = useState('')
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showOffInfoCanvas, setShowOffInfoCanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [showForm, setShowForm] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showSubcatalogModal, setShowSubcatalogModal] = useState(false);
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
 
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const products = useSelector((state: any) => state.cart.products);
  const catalog = useSelector((state: RootState) => state.catalog.catalogs);

  const handleAddCatalog = (catalogName: string) => {
    dispatch(addCatalog(catalogName));
    setShowCatalogModal(false);
  };

  const handleAddSubcatalog = (subcategoryName: string) => {
    if (activeCategory) {
      dispatch(addSubcatalog(activeCategory, subcategoryName));
      setShowSubcatalogModal(false);
    }
  };

  const handleSubcatalogDelete = () => {
    if (activeCategory && activeSubcategory) {
      dispatch(deleteSubcatalog(activeCategory, activeSubcategory));
      setShowSubcatalogModal(false);
    }
  };

  const handleAddProductToSubcatalog = (product: any) => {
    if (modalCategory && modalSubcategory) {
      dispatch(addProductToSubcatalog(modalCategory, modalSubcategory, product));
      setModalCategory(null);
      setModalSubcategory(null)
      setShowCreateProductModal(false);
    }
  };

  const handleCreateProduct = (product: any) => {
    if (!modalCategory && !modalSubcategory) {
      dispatch(createProduct(product));
      setShowCreateProductModal(false);
    }
  };

  const handleOpenProductModal = () => {
    setModalCategory(activeCategory);
    setModalSubcategory(activeSubcategory);
    setShowCreateProductModal(true);
  };

  const handleClick = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  const handleResize = () => {
    const isMobileView = window.innerWidth <= 992;
    setIsMobile(isMobileView);
    if (!isMobileView && showOffcanvas) setShowOffcanvas(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showOffcanvas]);

  useEffect(() => {
    dispatch(fetchCatalogs());
  }, [dispatch]);

  const handleMouseEnter = (categoryKey: string) => {
    if (!isMobile) {
      setActiveCategory(categoryKey);
      setIsDimmed(true);
    }
  };

  const handleMouseSubcategoryEnter = (categoryKey: string, subCategoryKey: string) => {
    if (!isMobile) {
      setActiveCategory(categoryKey);
      setActiveSubcategory(subCategoryKey);
      setIsDimmed(true);
    }
  };

  const handleButtonMouseEnter = () => {
    if (!isMobile) {
      setDropdownVisible(true);
      setIsDimmed(true);
    }
  };

  const handleButtonMouseLeave = () => {
    if (!isMobile) {
      setDropdownVisible(false);
      setIsDimmed(false);
    }
  };

  const handleButtonClick = () => {
    if (isMobile) {
      setShowOffcanvas(true);
    }
  };

  const handleCategoryClick = (categoryKey: string) => {
    setActiveCategory(categoryKey === activeCategory ? null : categoryKey);
  };

  const handleToggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleToggleOffInfoCanvas = () => {
    setShowOffInfoCanvas(!showOffInfoCanvas);
  };

  const handleSearch = () => {
    if(prefix.trim().length <= 2) return
    
    dispatch(searchProducts(prefix))
    setPrefix('')
    navigate(`/products/${prefix}`)
  }

  const handleCartClick = () => navigate('/checkout');
  const handleLogin = () => {
    setShowOffcanvas(false);
    navigate('/login-admin');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowOffcanvas(false);
    navigate('/');
  };

  const sumOfProducts = (products) => {
    if(products && products.length === 0) return 0
    let currentSum = 0;
    // products.map((product) => )
    for(let i = 0; i < products.length; i++) {
      currentSum += products[i].quantity
    }

    return currentSum
  }

  return (
    <>
      <header className="header-container">
        <Navbar bg="dark" variant="dark" expand="lg" className="main-navbar">
          <div className="navbar-grid">
            <Button
              variant="outline-light"
              className="catalog-button d-flex align-items-center"
              onClick={handleButtonClick}
              onMouseLeave={handleButtonMouseLeave}
              onMouseEnter={handleButtonMouseEnter}
            >
              <div className="icon-container-bars">
                <FaBars />
              </div>
              <div className="ml-3">
                <p className="mb-0">Каталог товарів</p>
              </div>
              <div className={`icon-container-angle ${dropdownVisible ? 'rotate' : ''}`}>
                <FaAngleUp />
              </div>
  
              {!isMobile && dropdownVisible && (
                <div className={`catalog-dropdown ${isDimmed ? 'active' : ''}`}>
                  {Array.isArray(catalog) && catalog.length > 0 ? (
                    catalog.map((category) => (
                      <div
                        key={category.name}
                        className="catalog-dropdown-item"
                        onMouseEnter={() => handleMouseEnter(category.name)}
                        // onClick={() => handleMouseEnter(category.name)}
                      >
                        {category.name}
                        <FaAngleRight />
  
                        {activeCategory === category.name && (
                          <div className="catalog-dropdown-submenu">
                            {Array.isArray(category.subCatalogs) &&
                            category.subCatalogs.length > 0 ? (
                              category.subCatalogs.map((subCategory) => (
                                <div
                                  key={subCategory.name}
                                  className="catalog-dropdown-subitem d-flex justify-content-between align-items-center"
                                  onMouseEnter={() =>
                                    handleMouseSubcategoryEnter(
                                      category.name,
                                      subCategory.name
                                    )
                                  }
                                  onClick={() =>
                                    navigate(`/catalog/${category.name}/${subCategory.name}`)
                                  }
                                >
                                  <span>{subCategory.name}</span>
                                  {isAuthenticated && (
                                    <div className="subcatalog-actions-wrapper">
                                      <button 
                                        className="add-product-btn"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleOpenProductModal();
                                        }}
                                      >
                                        +
                                      </button>
                                      <button
                                        className="delete-subcatalog-in-catalog"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSubcatalogDelete();
                                        }}
                                      >
                                        -
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="catalog-dropdown-subitem no-subcategories">
                                Немає підкатегорій
                              </div>
                            )}
                            {isAuthenticated && (
                              <div
                                className="catalog-dropdown-subitem add-product"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowSubcatalogModal(true);
                                }}
                              >
                                + Додати підкатегорію
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="no-categories">Каталог пуст</div>
                  )}
                  {isAuthenticated && (
                    <div
                      className="catalog-dropdown-item add-category"
                      onClick={() => setShowCatalogModal(true)}
                    >
                      + Додати категорію
                    </div>
                  )}
                </div>
              )}
            </Button>
  
            <div className="brand-name">
              <img src={logo} alt="Logo" className="logo" onClick={handleHomeClick} />
            </div>
  
            <Form className="search-bar d-flex">
              <InputGroup className="search-input-group">
                <Form.Control 
                  type="text" 
                  placeholder="Пошук..." 
                  className="search-input"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // Предотвращает перезагрузку страницы
                      handleSearch();
                    }
                  }} 
                />
                <Button variant="danger" className="search-btn" onClick={handleSearch}>
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>

            <div className="right-icons d-flex align-items-center">
              {isAuthenticated ? (
                <>
                  <Button
                    variant="link"
                    className="icon-btn"
                    onClick={() => setShowCreateProductModal(true)}
                  >
                    Створити товар
                  </Button>
                  {showCreateProductModal && (
                    <CreateProductFormModal
                      show={showCreateProductModal}
                      handleClose={() => setShowCreateProductModal(false)}
                      onSubmit={
                        modalCategory && modalSubcategory
                          ? handleAddProductToSubcatalog
                          : handleCreateProduct
                      }
                    />
                  )}
                </>
              ) : (
                <>
                  <Button variant="link" className="icon-btn" onClick={() => setShowOffInfoCanvas(!showOffInfoCanvas)}>
                    <FaInfo className="icon" />
                  </Button>
                  <Button variant="link" className="icon-btn" onClick={handleCartClick}>
                    <FaShoppingCart className="icon" />
                      <div className="cart-count">{sumOfProducts(products)}</div>
                    </Button>
                  <Button variant="link" className="icon-btn" onClick={handleClick}>
                    <FaPhone className="icon" />
                  </Button>
                </>
              )}
            </div>
  
            <CreateCatalogForm
              show={showCatalogModal}
              onClose={() => setShowCatalogModal(false)}
              onSubmit={handleAddCatalog}
            />
            <CreateSubcatalogForm
              show={showSubcatalogModal}
              onClose={() => setShowSubcatalogModal(false)}
              onSubmit={handleAddSubcatalog}
            />
          </div>
  
          {!isMobile && isDimmed && <div className="overlay-dim active"></div>}
        </Navbar>
      </header>
  
      <Offcanvas show={showOffcanvas} onHide={handleToggleOffcanvas} placement="start">
        <div className="modal-header-custom">
          <Offcanvas.Title className="catalog-container-title">Меню</Offcanvas.Title>
          <button className="custom-close-btn" onClick={handleToggleOffcanvas}>
            &times;
          </button>
        </div>
        <Offcanvas.Body>
        <div
            className="catalog-auth-toggle catalog-homepage-dropdown-mobile"
            onClick={() => {handleToggleOffcanvas();navigate('/');}}
          >
            На головну сторінку
          </div>
          <div
            className="catalog-auth-toggle catalog-products-dropdown-mobile"
            onClick={() => setActiveCatalog(!activeCatalog)}
          >
            Каталог товарів
          </div>
          {Array.isArray(catalog) && catalog.length > 0 && (
            activeCatalog && catalog.map((category) => (
              <div key={category.name}>
                <div
                  className="catalog-dropdown-mobile-item"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <p className='catalog-dropdown-mobile-item-title'>
                    {category.name}
                  </p>
                  <FaAngleRight
                    className={`icon ${activeCategory === category.name ? 'rotate' : ''}`}
                  />
                </div>
                {activeCategory === category.name && (
                  <div className="catalog-dropdown-mobile-submenu">
                    {Array.isArray(category.subCatalogs) &&
                      category.subCatalogs.map((subCategory) => (
                        <div
                          key={subCategory.name}
                          className="catalog-dropdown-mobile-subitem"
                          onClick={() => {
                            navigate(`/catalog/${category.name}/${subCategory.name}`);
                            setShowOffcanvas(false);
                          }}
                        >
                          <p className="catalog-dropdown-mobile-subitem-title">
                            {subCategory.name}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))
          )}
          <div
            className="catalog-auth-toggle catalog-dropdown-mobile-item"
            onClick={isAuthenticated ? handleLogout : handleLogin}
          >
            {isAuthenticated ? 'Вийти' : 'Увійти як адміністратор'}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
  

      <Offcanvas show={showOffInfoCanvas} onHide={handleToggleOffInfoCanvas} className='offcanvas-info' placement="start">
        <div className="info-header-custom">
          <Offcanvas.Title className="info-container-title">Інформація</Offcanvas.Title>
            <button className="info-close-btn" onClick={handleToggleOffInfoCanvas}>
              &times;
            </button>
          </div>
          <Offcanvas.Body>
          <div className="menu-content">
            <CurrencySelector/>
            <ul className="menu-list">
              <li onClick={handleToggleOffInfoCanvas}><Link to="/delivery-and-payment">Доставка та оплата</Link></li>
              <li onClick={handleToggleOffInfoCanvas}><Link to="/guarantee-and-service">Гарантія та сервіс</Link></li>
              <li onClick={handleToggleOffInfoCanvas}><Link to="/contact-us">Контакти</Link></li>
              <li onClick={handleToggleOffInfoCanvas}><Link to="/about-us">Про нас</Link></li>
            </ul> 
            <div className="menu-callback">
              <strong>Зворотній дзвінок</strong>
              <p className="phone-number"><a href="tel:+380970327899">+38 (097) 032-78-99</a></p>
              <p className="phone-number"><a href="tel:+380508317464">+38 (050) 831-74-64</a></p>
            </div>
            <div className="menu-footer">
              <p>Працюємо по всій Україні!</p>
              <p>Магазин: Київ, бульвар Лесі Українки 26</p>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {showForm && <ContactForm show={showForm} handleClose={handleClose} />}
    </>
  );  
}  

export default Header;
 