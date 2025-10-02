import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import AboutUs from './pages/AboutUs';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
        <div className="min-h-screen bg-pink-50 w-full mx-auto">
          {/* Navbar */}
          <Navbar />
          
          {/* Rutas principales */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/nosotros" element={<AboutUs />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/carrito" element={<CartPage />} />
              
              {/* Ruta 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.main>
          
          {/* Footer */}
          <Footer />

        </div>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
