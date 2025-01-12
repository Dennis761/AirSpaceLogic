import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../../../Redux/Actions/productActions.ts';
import { fetchComments } from '../../../../Redux/Actions/commentActions.ts';
import { AppDispatch, RootState } from '../../../../Redux/store.ts';
import TimerModel from '../../../Models/TimerModel/TimerModel.tsx';
import ImageZoomModel from '../../../Models/ImageZoomModel/ImageZoomModel.tsx';
import ImageScrollerVerticalModel from '../../../Models/ImageScrollerVerticalModel/ImageScrollerVerticalModel.tsx';
import ImageScrollerHorizontalModel from '../../../Models/ImageScrollerHorizontalModel/ImageScrollerHorizontalModel.tsx';
import ProductCharacteristics from '../ProductCharacteristics/ProductCharacteristics.tsx';
import ProductPurchase from '../ProductPurchase/ProductPurchase.tsx';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo.tsx';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo.tsx';
import ReviewForm from '../../../Forms/ReviewForm/ReviewForm.tsx';
import CommentsList from '../CommentsList/CommentsList.tsx';
import MainDescriptionBottom from '../MainDescriptionBottom/MainDescriptionBottom.tsx';
import MainDescriptionTop from '../MainDescriptionTop/MainDescriptionTop.tsx';
import errorImage from '../../../../Images/errorImage.png'
import './FullProduct.css';

export default function FullProduct() {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { loading, product, error } = useSelector((state: RootState) => state.product);
  const { comments } = useSelector((state: RootState) => state.comments)

  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
      dispatch(fetchComments(id)); // Загружаем комментарии
    }
  }, [dispatch, id]);
 
  useEffect(() => {
    if (product?.imagesCollection?.length) {
      setSelectedImageUrl(product.imagesCollection[0]);
    }
  }, [product]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 1200);
      setIsTablet(width > 1200 && width <= 1800);
      setIsDesktop(width > 1800);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
  };

  
  if (error) {
    return (
      <div className='error-message-container'>
        <img src={errorImage} className='error-image'/>
      </div>
    );
  }

  return (
    <div className="full-product-container">
      {loading || !product ? (
        <div className="loading-product-container">
          <div className="custom-spinner"></div>
        </div>
      ) : error ? (
        <div className="error-container">Помилка: {error}</div>
      ) : (
        <>
          <div className="title-tabs-container">
            <p className="full-product-title">{product.name || 'Без назви'}</p>

            <div className="full-tabs-container">
              {['Все про товар', 'Характеристики', `Коментарі (${comments?.length || 0})`].map((tab, index) => (
                <div
                  key={index}
                  className={`full-tab ${activeTab === index ? 'full-active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                </div>
              ))}
              <div
                className="full-tabs-underline"
                style={{
                  width: `${activeTab === 0 ? '110px' : activeTab === 1 ? '130px' : '110px'}`,
                  left: `${activeTab === 0 ? '0' : activeTab === 1 ? '120px' : '260px'}`,
                }}
              ></div>
            </div>
          </div>

          {activeTab === 0 && (
            <div className="full-product-main">
              <div className="full-product-body">
                {isDesktop && (
                  <div className="image-and-info-container">
                    {product.imagesCollection && (
                      <ImageScrollerVerticalModel
                        images={product.imagesCollection}
                        onImageClick={handleImageClick}
                      />
                    )}
                    {selectedImageUrl && <ImageZoomModel imageUrl={selectedImageUrl} parametrs={product.parametrs}/>}
                    <div className="full-timer-and-zoom-container">
                    {product.discountTime && (
                        <TimerModel initialDays={product.discountTime} />
                      )}

                      <AdditionalInfo
                        rating={product.rating || 0}
                        manufacturer={product.manufacturer || 'Не вказаний'}
                        isAvailable={product.available || false}
                      />
                      <ProductPurchase
                        price={product.price || 0}
                        discount={typeof product.discount === 'string' ? product.discount : String(product.discount)}
                        isAvailable={product.available || false}
                        product={product}
                      />
                      <ProductCharacteristics
                        specifications={product.specifications || {}}
                      />
                    </div>
                  </div>
                )}
                {isTablet && (
                  <div className="tablet-container">
                    <div className="left-container">
                      {selectedImageUrl && <ImageZoomModel imageUrl={selectedImageUrl} parametrs={product.parametrs}/>}
                      {product.imagesCollection && (
                        <ImageScrollerHorizontalModel
                          images={product.imagesCollection}
                          onImageClick={handleImageClick}
                        />
                      )}
                    </div>
                    <div className="right-container">
                      <div className="full-timer-and-zoom-container">
                      {product.discountTime && (
                          <TimerModel initialDays={product.discountTime} />
                        )}

                        <AdditionalInfo
                          rating={product.rating || 0}
                          manufacturer={product.manufacturer || 'Не вказаний'}
                          isAvailable={product.available || false}
                        />
                        <ProductPurchase
                          price={product.price || 0}
                          discount={typeof product.discount === 'string' ? product.discount : String(product.discount)}
                          isAvailable={product.available || false}
                          product={product}
                        />
                        <ProductCharacteristics
                          specifications={product.specifications || {}}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {isMobile && (
                  <>
                    {selectedImageUrl && <ImageZoomModel imageUrl={selectedImageUrl} parametrs={product.parametrs}/>}
                    {product.imagesCollection && (
                      <ImageScrollerHorizontalModel
                        images={product.imagesCollection}
                        onImageClick={handleImageClick}
                      />
                    )}
                    <div className="full-timer-and-zoom-container">
                    {product.discountTime && (
                        <TimerModel initialDays={product.discountTime} />
                      )}

                      <AdditionalInfo
                        rating={product.rating || 0}
                        manufacturer={product.manufacturer || 'Не вказаний'}
                        isAvailable={product.available || false}
                      />
                      <ProductPurchase
                        price={product.price || 0}
                        discount={typeof product.discount === 'string' ? product.discount : String(product.discount)}
                        isAvailable={product.available || false}
                        product={product}
                      />
                      <ProductCharacteristics
                        specifications={product.specifications || {}}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="main-description-top-content">
                {product.topContent && <MainDescriptionTop content={product.topContent} />}
              </div>
              <div className="video-container">
                {product.videoLink && <YouTubeVideo videoId={product.videoLink} />}
              </div>
              <div className="main-description-bottom-content">
                {product.bottomContent && (
                  <MainDescriptionBottom content={product.bottomContent} />
                )}
              </div>
              <CommentsList comments={comments || []} />
              <ReviewForm productId={product._id}/>
            </div>
          )}

          {activeTab === 1 && (
            <div className="characteristics-section">
              <ProductCharacteristics
                specifications={product.specifications || {}}
              />
            </div>
          )}

          {activeTab === 2 && (
            <div className="comments-section">
              <CommentsList comments={product.comments || []} />
              <ReviewForm productId={product._id}/>
            </div>
          )}
        </>
      )}
    </div>
  );
}
