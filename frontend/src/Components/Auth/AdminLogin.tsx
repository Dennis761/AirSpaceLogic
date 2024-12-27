import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../Redux/Actions/authActions.ts';
import { AppDispatch } from '../../Redux/store';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Добавлено: состояние для отслеживания отправки
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state: any) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true); 

    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length > 0;

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      dispatch(login(email, password));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Successfully logged in!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isAuthenticated]);

  return (
    <Container className="admin-login-container">
      <Row className="justify-content-center">
        <Col md={6} className="admin-login-column">
          <h2 className="admin-login-title text-center">Admin Login</h2>

          {error && <Alert variant="danger" className="admin-alert">{error}</Alert>}

          <Form noValidate onSubmit={handleSubmit} className="admin-login-form">
            <Form.Group controlId="formEmail" className="position-relative admin-form-group">
              <Form.Label className="admin-label">Email</Form.Label>
              <div className="admin-input-icon">
                <FaUserAlt className="admin-input-icon-left" />
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={submitted && emailError} // Ошибка только после отправки
                  className="admin-input"
                />
              </div>
              {submitted && emailError && (
                <Form.Control.Feedback type="invalid" className="admin-feedback">
                  Please provide a valid email.
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3 position-relative admin-form-group">
              <Form.Label className="admin-label">Password</Form.Label>
              <div className="admin-input-icon">
                <FaLock className="admin-input-icon-left" />
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={submitted && passwordError} // Ошибка только после отправки
                  className="admin-input"
                />
                <span className="admin-password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {submitted && passwordError && (
                <Form.Control.Feedback type="invalid" className="admin-feedback">
                  Please provide a password.
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="admin-login-button mt-4 w-100"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default AdminLogin;
