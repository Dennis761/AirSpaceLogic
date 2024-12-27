import React, { useState } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import ContactForm from '../../Forms/ContactForm/ContactForm.tsx';
import './PhoneIcon.css';

export default function PhoneIcon() {
  const [showContactForm, setShowContactForm] = useState(false);

  const handleOpenContactForm = () => {
    setShowContactForm(true);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
  };

  return (
    <>
      <div className="phone-icon-container" onClick={handleOpenContactForm}>
        <div className="phone-icon-outer-circle">
          <div className="phone-icon-circle">
            <FaPhoneAlt className="phone-icon" />
          </div>
        </div>
      </div>

      {showContactForm && (
        <ContactForm show={showContactForm} handleClose={handleCloseContactForm} />
      )}
    </>
  );
}
