import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ContactForm from '../Forms/ContactForm/ContactForm.tsx';
import logo from '../../Images/image.png';
import privat from '../../Images/privat.png';
import visa from '../../Images/visa.png';
import mastercard from '../../Images/mastercard.png';
import monobank from '../../Images/monobank.png';
import { RootState } from '../../Redux/store.ts';
import { useSelector } from 'react-redux';
import { IoLogoInstagram, IoLogoTiktok } from 'react-icons/io5';
import { FaFacebookF, FaTelegramPlane } from 'react-icons/fa';
import './Footer.css';

const seededShuffle = (array: any[], seed: number): any[] => {
  const shuffled = [...array];
  let currentIndex = shuffled.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor((Math.abs(Math.sin(seed++)) * 10000) % currentIndex);
    currentIndex--;
    [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
  }

  return shuffled;
};

const Footer = () => {
  const [showForm, setShowForm] = useState(false);
  const [popularSubCatalogs, setPopularSubCatalogs] = useState<any[]>([]);
  const [uniqueCatalogs, setUniqueCatalogs] = useState<any[]>([]);
  const navigate = useNavigate();

  const catalog = useSelector((state: RootState) => state.catalog.catalogs || []);

  const handleClick = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  useEffect(() => {
    if (!catalog || catalog.length === 0) return;

    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    const allSubCatalogs = catalog.flatMap((cat) =>
      (cat.subCatalogs || []).map((sub) => ({
        ...sub,
        catalogName: cat.name,
      }))
    );
    const shuffledSubCatalogs = seededShuffle(allSubCatalogs, seed);
    setPopularSubCatalogs(shuffledSubCatalogs.slice(0, 6));

    const shuffledCategories = seededShuffle(catalog, seed);
    setUniqueCatalogs(shuffledCategories.slice(0, 6));
  }, [catalog]);

  return (
    <>
    <footer className="footer-grid">
      <div className="footer-container-grid">
        <div className="footer-logo-section">
          <img src={logo} alt="logo" className="footer-logo" />
          <ul className="footer-contact-info">
            <li><a href="tel:+380669728665">+38 (097) 032-78-99</a></li>
            <li><a href="tel:+380989086037">+38 (050) 831-74-64</a></li>
            <li>Київ, ТРЦ Мармелад 2 Поверх</li>
          </ul>
          <button className="footer-callback-btn" onClick={handleClick}>Зворотний дзвінок</button>
        </div>

        <div className="footer-info-section">
          <h3>Інформація</h3>
          <ul className="footer-links">
            <li><Link to="/about-us">Про нас</Link></li>
            <li><Link to="/delivery-and-payment">Доставка та оплата</Link></li>
            <li><Link to="/guarantee-and-service">Гарантія та сервіс</Link></li>
            <li><Link to="/contact-us">Зв’язатися з нами</Link></li>
            <li><Link to="/manufacturers">Виробники</Link></li>
            <li><a href="https://www.tiktok.com/@fpv_spacelogic">Відео огляди</a></li>
          </ul>
        </div>

        <div className="footer-category-section">
          <h3>Категорії</h3>
          <ul className="footer-links">
            {uniqueCatalogs.map((cat) => (
              <li key={cat._id}>
                <div
                  onClick={() => navigate(`/catalog/${cat.name}`)}
                  className="footer-link-item"
                  role="button"
                  tabIndex={0}
                  aria-label={`Відкрити категорію ${cat.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigate(`/catalog/${cat.name}`);
                  }}
                >
                  {cat.name}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-popular-section">
          <h3>Популярне</h3>
          <ul className="footer-links">
            {popularSubCatalogs.map((sub) => (
              <li key={sub._id}>
                <div
                  onClick={() => navigate(`/catalog/${sub.catalogName}/${sub.name}`)}
                  className="footer-link-item"
                  role="button"
                  tabIndex={0}
                  aria-label={`Відкрити субкаталог ${sub.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigate(`/catalog/${sub.catalogName}/${sub.name}`);
                  }}
                >
                  {sub.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-social-media-wrapper">
        <h2 className="footer-social-media-title">Ми в соціальних мережах</h2>
        <div className="footer-social-media">
          <Link to="https://www.instagram.com/military_tactic_shop/" aria-label="Instagram"><IoLogoInstagram size={40} /></Link>
          <Link to="https://www.tiktok.com/@fpv_spacelogic" aria-label="TikTok"><IoLogoTiktok size={40} /></Link>
          <Link to="https://www.facebook.com/profile.php?id=61568076247567" aria-label="Facebook"><FaFacebookF size={40} /></Link>
          <Link to="https://t.me/LIGAfpv" aria-label="Telegram"><FaTelegramPlane size={40} /></Link>
        </div>
      </div>

      <div className="footer-bottom-grid">
        <p>© 2024 AirSpaceLogic - магазин професійних FPV дронів номер один в Україні</p>
      </div>
      <div className="footer-company-logos">
        <img src={mastercard} className="mastercard-image" alt="mastercard" />
        <img src={visa} className="visa-image" alt="visa" />
        <img src={monobank} className="monobank-image" alt="monobank" />
        <img src={privat} className="privat-image" alt="privat" />
      </div>
    </footer>

    {showForm && <ContactForm show={showForm} handleClose={handleClose} />}
  </>
  );
};

export default Footer;
