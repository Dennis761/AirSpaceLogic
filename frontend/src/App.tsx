import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Header/Header.tsx';
import Home from './Components/Home/Home/Home/Home.tsx';
import FullProduct from './Components/Home/FullProduct/FullProduct/FullProduct.tsx'
import Footer from './Components/Footer/Footer.tsx'
import Checkout from './Components/Home/Checkout/Checkout.tsx'
import PhoneIcon from './Components/Icons/PhoneIcon/PhoneIcon.tsx'
import AdminLogin from './Components/Auth/AdminLogin.tsx'
import Catalog from './Components/Home/Catalog/Catalog.tsx'
import Subcatalog from './Components/Home/Subcatalog/Subcatalog.tsx'
import FoundProduct from './Components/Home/FoundProduct/FoundProduct/FoundProduct.tsx'

import AboutUs from './Components/Footer/Info/AbouUs/AbouUs.tsx'
import Delivery from './Components/Footer/Info/Delivery/Delivery.tsx'
import Guarantee from './Components/Footer/Info/Guarantee/Guarantee.tsx'
import ContactUs from './Components/Footer/Info/ContactUs/ContactUs.tsx'
import Manufacturers from './Components/Footer/Info/Manufacturers/Manufacturers.tsx'

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login-admin' element={<AdminLogin/>}/>
            <Route path='/product/:id' element={<FullProduct/>} />
            <Route path='/products/:prefix' element={<FoundProduct/>}/>
            <Route path="/catalog/:catalog/:subcatalog" element={<Subcatalog />} />
            <Route path='/catalog/:catalogGroup' element={<Catalog/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            
            <Route path='/about-us' element={<AboutUs/>}/>
            <Route path='/delivery-and-payment' element={<Delivery/>}/>
            <Route path='/guarantee-and-service' element={<Guarantee/>}/>
            <Route path='/contact-us' element={<ContactUs/>}/>
            <Route path='/manufacturers' element={<Manufacturers/>}/>
          </Routes>
        <PhoneIcon/>
        <Footer/>
      </Router>
      </>
  );
}

export default App;