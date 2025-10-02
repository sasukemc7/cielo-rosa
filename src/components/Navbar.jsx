// Imports
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { HiMenu, HiX, HiHome, HiSparkles } from 'react-icons/hi'
import { MdStorefront, MdShoppingCart } from 'react-icons/md';
import { IoPersonSharp } from "react-icons/io5";

// Cart
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { getCartItemCount } = useCart();
  
  const cartItemCount = getCartItemCount();

  // Array de opciones del menú
  const menuItems = [
    {
      id: 'home',
      path: '/',
      label: 'Inicio',
      icon: HiHome
    },
    {
      id: 'products',
      path: '/productos',
      label: 'Productos',
      icon: MdStorefront
    },
    {
      id: 'about',
      path: '/nosotros',
      label: 'Sobre Nosotros',
      icon: IoPersonSharp
    }
  ];

  // Control del scroll para ocultar/mostrar navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up o cerca del top - mostrar navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down y lejos del top - ocultar navbar
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-pink-200/30"
      >
        <div className="w-4/5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            
            {/* Logo - Izquierda */}
            <Link 
              to="/" 
              className="flex items-center transition-all duration-300 hover:scale-105 group"
            >
              <img 
                src="/logo.png" 
                alt="Cielo Rosa Logo" 
                className="h-16 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </Link>

            {/* Menú Desktop - Centro */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center gap-6 bg-white/80 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg border border-pink-100/50">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActiveRoute(item.path);
                  
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`relative rounded-xl transition-all duration-300 transform hover:scale-105 group ${
                        isActive 
                          ? 'bg-gradient-to-r from-pink-100 to-pink-200 shadow-lg shadow-pink-200/40' 
                          : 'hover:bg-pink-50/50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3 px-6 py-3 relative">
                        <Icon className={`text-lg transition-all duration-300 ${
                          isActive ? 'text-pink-600' : 'text-pink-500 group-hover:scale-110'
                        }`} />
                        <span className={`font-semibold text-sm relative ${
                          isActive ? 'text-pink-700' : 'text-gray-700 group-hover:text-pink-700'
                        }`}>
                          {item.label}
                          {!isActive && (
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
                          )}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Carrito - Derecha */}
            <div className="flex items-center space-x-4">
              
              {/* Botón del Carrito */}
              <Link
                to="/carrito"
                className={`relative group px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border border-pink-100/50 overflow-visible ${
                  location.pathname === '/carrito'
                    ? 'bg-gradient-to-r from-pink-100 to-pink-200 shadow-lg shadow-pink-200/40 text-pink-600 border-pink-200'
                    : 'text-gray-700 bg-white/80 backdrop-blur-md hover:bg-pink-50/50 hover:shadow-md hover:text-pink-700 hover:border-pink-200'
                }`}
                aria-label="Ver carrito"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <MdShoppingCart className={`h-5 w-5 transition-all duration-300 ${
                    location.pathname === '/carrito' ? 'text-pink-600' : 'text-pink-500 group-hover:scale-110'
                  }`} />
                </motion.div>
                
                {/* Línea animada en hover (como los otros elementos) */}
                {location.pathname !== '/carrito' && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-pink-500 rounded-full transition-all duration-300 group-hover:w-3/4"></span>
                )}
                
                {/* Badge del carrito */}
                <AnimatePresence>
                  {cartItemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-red-400 via-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-xl border-2 border-white z-[100]"
                    >
                      <motion.span
                        animate={{ scale: [1, 0.8, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>

              {/* Botón Menú Hamburguesa (Móvil) */}
              <button
                onClick={toggleMenu}
                className="md:hidden px-3 py-3 text-gray-700 hover:text-white bg-white/80 backdrop-blur-md hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 rounded-xl transition-all duration-500 transform hover:scale-125 shadow-lg hover:shadow-2xl hover:shadow-pink-300/50 border border-pink-100/50 hover:border-pink-300"
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={{ 
                    rotate: isMenuOpen ? 180 : 0,
                    scale: isMenuOpen ? 1.1 : 1
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  whileHover={{ scale: 1.2 }}
                >
                  {isMenuOpen ? (
                    <HiX className="h-5 w-5 drop-shadow-sm" />
                  ) : (
                    <HiMenu className="h-5 w-5 drop-shadow-sm" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Overlay para menú móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Menú Móvil (Sidebar) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              
              {/* Header del menú */}
              <div className="flex items-center justify-between p-4 border-b border-pink-100">
                <span className="text-lg font-display font-semibold text-pink-600">
                  Menú
                </span>
                <button
                  onClick={closeMenu}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-md"
                >
                  <HiX className="h-5 w-5" />
                </button>
              </div>

              {/* Enlaces del menú */}
              <div className="flex flex-col p-6 space-y-3">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActiveRoute(item.path);
                  
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={closeMenu}
                      className={`flex items-center space-x-4 px-5 py-4 rounded-xl text-left font-semibold transition-all duration-300 transform hover:scale-105 ${
                        isActive 
                          ? 'text-white bg-gradient-to-r from-pink-500 to-pink-600 shadow-lg' 
                          : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50 hover:shadow-md'
                      }`}
                    >
                      <Icon className={`text-xl ${isActive ? 'text-white' : 'text-pink-500'}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                <Link
                  to="/carrito"
                  onClick={closeMenu}
                  className="flex items-center space-x-4 px-5 py-4 rounded-xl text-left font-semibold transition-all duration-300 transform hover:scale-105 text-gray-700 hover:text-pink-600 hover:bg-pink-50 hover:shadow-md border-t border-gray-100 mt-4 pt-6"
                >
                  <MdShoppingCart className="text-xl text-pink-500" />
                  <span>Mi Carrito</span>
                  {cartItemCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Footer del menú */}
              <div className="mt-auto p-6 border-t border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50">
                <div className="text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HiSparkles className="text-white text-lg" />
                  </div>
                  <p className="font-display text-sm text-gray-600 font-semibold">Moda asiática</p>
                  <p className="font-display text-sm text-pink-600 italic">con un toque romántico</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer para el navbar fijo */}
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;