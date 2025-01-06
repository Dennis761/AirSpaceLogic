import React, { useState, useRef } from 'react';
import { Modal, Form, Button, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import Cropper from "react-cropper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "cropperjs/dist/cropper.css";
import './CreateProductForm.css';
import ContentEditor from '../../Home/ContentEditor/ContentEditor.tsx';
import ShowSpecification from '../SpecificationsForm/SpecificationsForm.tsx';

const CreateProductFormModal = ({ show, handleClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '',
    discountTime: '',
    titleImage: '',
    imagesCollection: [],
    hoverImage: '',
    manufacturer: '',
    videoLink: '',
    topContent: '',
    bottomContent: '',
    specifications: {},
    parametrs: [],
    rating: '',
    ratingCount: '',
    available: false,
  });

  const [errors, setErrors] = useState({
    price: '',
    discount: '',
  });

  const cropperRef = useRef(null);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [currentField, setCurrentField] = useState('');
  const [showCropModal, setShowCropModal] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [topContentFilled, setTopContentFilled] = useState(false);
  const [bottomContentFilled, setBottomContentFilled] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDataSubmit = (formData) => {
    setFormData((prevData) => ({
      ...prevData,
      specifications: formData.specifications,
    }));
  };

  const parametrOptions = [
    { value: 'Рекомендовано', label: 'Рекомендовано' },
    { value: 'Новий Товар', label: 'Новий Товар' },
    { value: 'Хіт Продажу', label: 'Хіт Продажу' },
    { value: 'Знижка', label: 'Знижка' },
  ];
  
  const handleImageUpload = (e, field) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageToCrop(URL.createObjectURL(files[0]))
      setCurrentField(field);
      setShowCropModal(true);
    }
  }

  const handleCropComplete = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedImage = cropper.getCroppedCanvas().toDataURL('image/jpeg');
      if (currentField === 'imagesCollection') {
        setFormData((prevData) => ({
          ...prevData,
          imagesCollection: [...prevData.imagesCollection, croppedImage],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [currentField]: croppedImage,
        }));
      }

      setShowCropModal(false);
    }
  };
  

  const handleDeleteImage = (field, index = null) => {
    if (field === 'imagesCollection' && index !== null) {
      setFormData((prevData) => ({
        ...prevData,
        imagesCollection: prevData.imagesCollection.filter((_, i) => i !== index),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field]: '',
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name === 'price' || name === 'discount') {
      const numericValue = value.replace(/\D/g, '');
      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));

      if (name === 'discount' && Number(numericValue) >= Number(formData.price)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          discount: 'Скидка должна быть меньше, чем цена.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          discount: '',
        }));
      }
    } else if (name === 'rating' || name === 'ratingCount') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: Number(value), 
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  const handleParametrsChange = (selectedOptions) => {
    const values = Array.isArray(selectedOptions)
      ? selectedOptions.map(option => option.value)
      : selectedOptions.split(',');
  
    setFormData((prevData) => ({
      ...prevData,
      parametrs: values,
    }));
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (Number(formData.discount) >= Number(formData.price)) {
      alert("Скидка должна быть меньше цены.");
      return;
    }
  
    if (
      !formData.name ||
      !formData.price ||
      !formData.titleImage ||
      !formData.hoverImage ||
      !formData.topContent ||
      !formData.bottomContent ||
      !formData.specifications
    ) {
      toast.error("Пожалуйста, заполните все обязательные поля.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  
    onSubmit(formData);
  
    toast.success("Продукт успешно создан!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    handleClose();
  };
  

  const openEditor = (field) => {
    setCurrentField(field);
    setShowEditor(true);
  };

  const saveContent = (content) => {
    if (currentField === 'topContent') {
      setFormData((prevData) => ({
        ...prevData,
        topContent: content,
      }));
      setTopContentFilled(true);
    } else if (currentField === 'bottomContent') {
      setFormData((prevData) => ({
        ...prevData,
        bottomContent: content,
      }));
      setBottomContentFilled(true);
    }
    setShowEditor(false);
};


  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="create-modal-content">
        <Modal.Header closeButton className="create-modal-header">
          <Modal.Title className="create-modal-title">Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create-modal-body">
          <div className="form-scrollable-content">
            <Form onSubmit={handleSubmit}>

              <Form.Group as={Row} className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Name</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="create-form-control"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="price" className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Price</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="create-form-control"
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="discount" className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Discount</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="create-form-control"
                    isInvalid={!!errors.discount}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.discount}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="discountTime" className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Discount Time (days)</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    name="discountTime"
                    value={formData.discountTime}
                    onChange={handleInputChange}
                    className="create-form-control"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="rating" className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Rating</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                    className="create-form-control"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="ratingCount" className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Rating Count</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    name="ratingCount"
                    value={formData.ratingCount}
                    onChange={handleInputChange}
                    required
                    className="create-form-control"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="available" className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Available</Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                    className="create-form-control"
                    label="Is Available"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="manufacturer" className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Manufacturer</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    required
                    className="create-form-control"
                  />
                </Col>
              </Form.Group>




              <Form.Label column sm={2} className="create-form-label">Link</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="videoLink"
                    value={formData.videoLink}
                    onChange={handleInputChange}
                    className="create-form-control"
                  />
                </Col>

              <Form.Group as={Row} controlId="topContent" className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Top Content</Form.Label>
                <Col sm={10}>
                  <Button
                    variant="secondary"
                    onClick={() => openEditor('topContent')}
                    className="create-form-control"
                  >
                    {topContentFilled ? 'Изменить' : 'Добавить'}
                  </Button>
                  {topContentFilled && <div className="filled-text">Заполнено</div>}
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="bottomContent" className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Bottom Content</Form.Label>
                <Col sm={10}>
                  <Button
                    variant="secondary"
                    onClick={() => openEditor('bottomContent')}
                    className="create-form-control"
                  >
                    {bottomContentFilled ? 'Изменить' : 'Добавить'}
                  </Button>
                  {bottomContentFilled && <p className="filled-text">Заполнено</p>}
                </Col>
              </Form.Group>

              {showEditor && (
                <ContentEditor
                  onSubmit={saveContent}
                  onCancel={() => setShowEditor(false)}
                />
              )}

              <Form.Group as={Row} controlId="parametrs" className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Parametrs</Form.Label>
                <Col sm={10}>
                  <Select
                    options={parametrOptions}
                    isMulti
                    onChange={handleParametrsChange}
                    className="create-form-control"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="titleImage" className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Title Image</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'titleImage')}
                    required
                    className="create-form-control"
                  />
                  {formData.titleImage && (
                    <div className="image-preview-container">
                      <img src={formData.titleImage} alt="Title Preview" className="image-preview" />
                      <Button variant="danger" size="sm" onClick={() => handleDeleteImage('titleImage')} className="delete-button">
                        Видалити
                      </Button>
                    </div>
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="hoverImage" className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Hover Image</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'hoverImage')}
                    required
                    className="create-form-control"
                  />
                  {formData.hoverImage && (
                    <div className="image-preview-container">
                      <img src={formData.hoverImage} alt="Hover Preview" className="image-preview" />
                      <Button variant="danger" size="sm" onClick={() => handleDeleteImage('hoverImage')} className="delete-button">
                        Видалити
                      </Button>
                    </div>
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="imagesCollection" className="create-form-group">
                <Form.Label column sm={2} className="create-form-label">Additional Images</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, 'imagesCollection')}
                    className="create-form-control"
                  />
                  <div className="image-previews">
                    {formData.imagesCollection.map((image, index) => (
                      <div key={index} className="image-preview-container">
                        <img src={image} alt={`Preview ${index + 1}`} className="image-preview" />
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteImage('imagesCollection', index)}
                          className="delete-button"
                        >
                          Видалити
                        </Button>
                      </div>
                    ))}
                  </div>
                </Col>
              </Form.Group>


              
              <Form.Group>
                <ShowSpecification
                  show={true} 
                  handleClose={handleCloseModal}
                  onSubmit={handleDataSubmit} // handleSubmit получит formData из дочернего компонента
                /> 
              </Form.Group>

              <Button variant="primary" type="submit" className="create-submit-button">
                Create Product
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      {showCropModal && (
        <Modal show={showCropModal} onHide={() => setShowCropModal(false)} centered className='create-react-crop'>
          <Modal.Header closeButton>
            <Modal.Title>Обрезка изображения</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {imageToCrop && (
              <Cropper
                src={imageToCrop}
                initialAspectRatio={1}
                aspectRatio={1}
                guides={false}
                background={false}
                ref={cropperRef}
                viewMode={1}
                dragMode="move"
              />
            )}
            <Button variant="primary" onClick={handleCropComplete} className="crop-complete-button">
              Завершить обрезку
            </Button>
          </Modal.Body>
        </Modal>
      )}
    <ToastContainer />
    </>
  );
};

export default CreateProductFormModal;
