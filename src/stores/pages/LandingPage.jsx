import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Products from '../components/Products.jsx';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main className="page-container">
        <Products />
      </main>
    </>
  );
};

export default LandingPage;
