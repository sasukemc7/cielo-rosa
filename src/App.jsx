import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';

function App() {
  return (
    <CartProvider>
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
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/carrito" element={<CartPage />} />
              
              {/* Ruta 404 */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌸</div>
                    <h1 className="text-3xl font-display font-bold text-gray-800 mb-4">
                      Página no encontrada
                    </h1>
                    <p className="text-gray-600 mb-6">
                      La página que buscas no existe o ha sido movida.
                    </p>
                    <a
                      href="/"
                      className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                    >
                      Volver al inicio
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </motion.main>
          
          {/* Footer */}
          <Footer />

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
