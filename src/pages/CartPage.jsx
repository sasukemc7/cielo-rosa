import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiPlus, HiMinus, HiTrash, HiShoppingBag, HiCheckCircle } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Controlar cuándo el carrito está completamente cargado
  useEffect(() => {
    // Inicialmente false, luego true para forzar re-render con animaciones
    setIsCartLoaded(false);
    
    const timer = setTimeout(() => {
      setIsCartLoaded(true);
    }, 200); // Aumenté el delay

    return () => clearTimeout(timer);
  }, [items.length]); // Trigger cuando cambie el número de items

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size);
    } else {
      updateQuantity(productId, size, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsProcessing(true);
    
    // Simular proceso de pago (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generar número de pedido
    const orderNum = 'CR' + Date.now().toString().slice(-6);
    setOrderNumber(orderNum);
    
    // Mostrar éxito
    setOrderSuccess(true);
    setIsProcessing(false);
    
    // Limpiar carrito después de 3 segundos
    setTimeout(() => {
      clearCart();
      setOrderSuccess(false);
    }, 4000);
  };

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: isCartLoaded ? 0.1 : 0
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.8
    },
    visible: (index) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }),
    exit: { 
      opacity: 0, 
      x: -50,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const summaryVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  const emptyCartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  // Si la compra fue exitosa
  if (orderSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-purple-50 flex items-center justify-center relative overflow-hidden"
      >
        {/* Particles de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-pink-400 rounded-full opacity-30"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 50,
                scale: 0 
              }}
              animate={{ 
                y: -50, 
                scale: [0, 1, 0],
                x: Math.random() * window.innerWidth
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.3, opacity: 0, rotateY: 180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ 
            duration: 0.8, 
            type: "spring", 
            stiffness: 100,
            damping: 10
          }}
          className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-lg mx-4 text-center border border-white/20"
        >
          {/* Efecto de brillo */}
          <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-pink-400 via-purple-400 to-green-400 rounded-3xl opacity-20 blur-sm"></div>
          
          <div className="relative">
            {/* Icono principal con efectos épicos */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative w-28 h-28 mx-auto mb-8"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg relative"
              >
                <HiCheckCircle className="h-16 w-16 text-white" />
                
                {/* Círculos animados alrededor */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-green-300 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [0, 1, 0],
                      rotate: 360 * (i + 1)
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: `0 ${50 + i * 8}px`
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
            
            {/* Título épico */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl font-display font-black bg-gradient-to-r from-green-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6"
            >
              ¡Compra Exitosa! 
              <motion.span
                animate={{ 
                  rotate: [0, 20, -20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                  delay: 1
                }}
                className="inline-block ml-2"
              >
                🎉
              </motion.span>
            </motion.h2>
            
            {/* Contenido informativo mejorado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-6 mb-8"
            >
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-lg text-gray-700 font-medium"
              >
                Tu pedido ha sido procesado correctamente ✨
              </motion.p>
              
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 150 }}
                className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 relative overflow-hidden"
              >
                {/* Efecto de brillo en el fondo */}
                <motion.div
                  animate={{ x: [-100, 300] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                />
                
                <div className="relative">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      📦
                    </motion.div>
                    <h3 className="font-bold text-green-800 text-lg">Detalles del Pedido</h3>
                  </div>
                  
                  <div className="space-y-2 text-center">
                    <p className="text-green-700 font-bold text-xl">
                      #{orderNumber}
                    </p>
                    <motion.p 
                      animate={{ color: ["#059669", "#ec4899", "#8b5cf6", "#059669"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-sm font-medium"
                    >
                      🚛 Tu pedido llegará en 3-5 días hábiles
                    </motion.p>
                    <p className="text-xs text-green-600">
                      📧 Recibirás un email de confirmación en breve
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Botones mejorados */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="space-y-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/productos"
                  className="block w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <motion.span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 20, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    >
                      🛍️
                    </motion.div>
                    Seguir comprando
                  </motion.span>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/"
                  className="block w-full text-gray-600 py-3 text-base hover:text-gray-800 transition-colors font-medium border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  🏠 Volver al inicio
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/20"
    >
      <div className="w-4/5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4 mb-8"
        >
          <Link
            to="/productos"
            className="group flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-all duration-300 transform hover:-translate-x-1"
          >
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <HiArrowLeft className="h-5 w-5" />
            </motion.div>
            <span className="font-medium">Seguir comprando</span>
          </Link>
        </motion.div>

        <motion.div 
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent mb-4">
            Mi Carrito de Compras
          </h1>
          {totalItems > 0 && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-lg text-gray-600"
            >
              <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                <HiShoppingBag className="h-4 w-4" />
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu carrito
              </span>
            </motion.p>
          )}
        </motion.div>

        {items.length === 0 ? (
          // Carrito vacío - Centrado en la pantalla
          <motion.div 
            variants={emptyCartVariants}
            initial="hidden"
            animate="visible"
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50/50 via-pink-50/30 to-purple-50/20"
          >
            <div className="text-center max-w-md mx-4 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
              <motion.div 
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="text-8xl mb-6"
              >
                🛍️
              </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-gray-700 to-pink-600 bg-clip-text text-transparent mb-4"
            >
              Tu carrito está vacío
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 mb-8 leading-relaxed"
            >
              Parece que aún no has agregado ningún producto a tu carrito. 
              <br />
              <span className="text-pink-600 font-medium">¡Explora nuestra hermosa colección!</span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                to="/productos"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-pink-700 hover:to-pink-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <HiShoppingBag className="h-5 w-5" />
                </motion.div>
                <span>Explorar productos</span>
              </Link>
            </motion.div>
            </div>
          </motion.div>
        ) : (
          // Carrito con productos
          <motion.div 
            variants={containerVariants}
            initial={isCartLoaded ? "hidden" : false}
            animate="visible"
            className="grid lg:grid-cols-3 gap-8"
          >
            
            {/* Lista de productos */}
            <motion.div 
              className="lg:col-span-2 space-y-4"
            >
              {!isCartLoaded && items.length > 0 && (
                <div className="space-y-4">
                  {items.map((_, index) => (
                    <div 
                      key={`skeleton-${index}`}
                      className="bg-white/60 rounded-xl p-6 animate-pulse"
                    >
                      <div className="flex gap-6">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-6 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <AnimatePresence mode="popLayout">
                {isCartLoaded && items.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.selectedSize}-${isCartLoaded}`}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    transition={{ 
                      layout: { duration: 0.3 },
                      hover: { duration: 0.2 }
                    }}
                    className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/50 p-6 hover:border-pink-200/50"
                  >
                    <div className="flex gap-6">
                      {/* Imagen del producto */}
                      <motion.div 
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-24 h-24 bg-gradient-to-br from-pink-100 via-pink-200 to-purple-200 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300"
                      >
                        <motion.span 
                          animate={{ 
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                          className="text-3xl"
                        >
                          {item.category === 'Vestidos' && '👗'}
                          {item.category === 'Blusas' && '👚'}
                          {item.category === 'Faldas' && '🩱'}
                          {item.category === 'Kimonos' && '🥻'}
                          {item.category === 'Conjuntos' && '👔'}
                        </motion.span>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        {/* Información del producto */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              {item.category} • Talla: {item.selectedSize}
                            </p>
                            <p className="text-xl font-bold text-pink-600">
                              ${item.price.toLocaleString()} COP
                            </p>
                          </div>

                          <motion.button
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 hover:shadow-md"
                            title="Eliminar producto"
                          >
                            <motion.div
                              whileHover={{ rotate: [0, -10, 10, 0] }}
                              transition={{ duration: 0.3 }}
                            >
                              <HiTrash className="h-5 w-5" />
                            </motion.div>
                          </motion.button>
                        </div>

                        {/* Controles de cantidad */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                            <div className="flex items-center gap-2 bg-gray-50/80 backdrop-blur-sm rounded-lg p-1 border border-gray-200/50">
                              <motion.button
                                onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity - 1)}
                                whileHover={{ scale: 1.1, backgroundColor: "#ffffff" }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 text-gray-500 hover:text-pink-600 rounded-md transition-colors"
                              >
                                <HiMinus className="h-4 w-4" />
                              </motion.button>
                              
                              <motion.span 
                                key={item.quantity}
                                initial={{ scale: 1.2, color: "#ec4899" }}
                                animate={{ scale: 1, color: "#374151" }}
                                transition={{ duration: 0.2 }}
                                className="w-12 text-center font-semibold"
                              >
                                {item.quantity}
                              </motion.span>
                              
                              <motion.button
                                onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                                whileHover={{ scale: item.quantity < item.stock ? 1.1 : 1, backgroundColor: item.quantity < item.stock ? "#ffffff" : undefined }}
                                whileTap={{ scale: item.quantity < item.stock ? 0.95 : 1 }}
                                className="p-2 text-gray-500 hover:text-pink-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <HiPlus className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-500">Subtotal</p>
                            <motion.p 
                              key={item.price * item.quantity}
                              initial={{ scale: 1.1, color: "#ec4899" }}
                              animate={{ scale: 1, color: "#1f2937" }}
                              transition={{ duration: 0.3 }}
                              className="text-lg font-bold"
                            >
                              ${(item.price * item.quantity).toLocaleString()} COP
                            </motion.p>
                          </div>
                        </div>

                        {/* Indicador de stock */}
                        {item.quantity >= item.stock && (
                          <p className="text-xs text-orange-600 mt-2">
                            ⚠️ Cantidad máxima disponible alcanzada
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Resumen del pedido */}
            <motion.div 
              variants={summaryVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1"
            >
              <motion.div 
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/50 p-6 sticky top-24 hover:shadow-xl transition-shadow duration-300"
              >
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mx-auto text-2xl font-semibold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent mb-6"
                >
                  Resumen del Pedido
                </motion.h3>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, staggerChildren: 0.1 }}
                  className="flex flex-col gap-2 space-y-4 mb-6"
                >
                  {/* Subtotal */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-pink-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                      >
                        <HiShoppingBag className="h-4 w-4 text-pink-500" />
                      </motion.div>
                      <span className="text-gray-700 font-medium">Subtotal ({totalItems} productos)</span>
                    </div>
                    <span className="font-bold text-gray-800">${totalPrice.toLocaleString()} COP</span>
                  </motion.div>
                  
                  {/* Envío */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`flex justify-between items-center p-3 rounded-lg border-2 ${
                      totalPrice >= 100000 
                        ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' 
                        : 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                      >
                        {totalPrice >= 100000 ? (
                          <HiCheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <div className="h-5 w-5 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">$</span>
                          </div>
                        )}
                      </motion.div>
                      <div>
                        <span className="text-gray-700 font-medium">Envío</span>
                        {totalPrice < 100000 && (
                          <p className="text-xs text-orange-600">
                            Faltan ${(100000 - totalPrice).toLocaleString()} para envío gratis
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {totalPrice >= 100000 ? (
                        <motion.span 
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="font-bold text-green-600 flex items-center gap-1"
                        >
                          ¡Gratis! 
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            🎉
                          </motion.span>
                        </motion.span>
                      ) : (
                        <span className="font-bold text-orange-600">$15.000 COP</span>
                      )}
                    </div>
                  </motion.div>
                  
                  {/* Ahorro mostrado si hay envío gratis */}
                  {totalPrice >= 100000 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                      className="flex items-center justify-center gap-2 p-2 bg-gradient-to-r from-green-100 to-green-200 rounded-lg border border-green-300"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                      >
                        ✨
                      </motion.div>
                      <span className="text-green-700 font-semibold text-sm">
                        ¡Ahorraste $15.000 en envío!
                      </span>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 0.5 }}
                      >
                        ✨
                      </motion.div>
                    </motion.div>
                  )}
                  
                  {/* Total */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="border-t-2 border-pink-200 pt-4 bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          💎
                        </motion.div>
                        <span className="text-xl font-bold text-gray-800">Total Final</span>
                      </div>
                      <motion.span 
                        key={totalPrice >= 100000 ? totalPrice : totalPrice + 15000}
                        initial={{ scale: 1.3, y: -10 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
                        className="text-3xl font-black bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent"
                      >
                        ${(totalPrice >= 100000 ? totalPrice : totalPrice + 15000).toLocaleString()} COP
                      </motion.span>
                    </div>
                    
                    {/* Detalle del total */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-xs text-gray-500 mt-2 text-center"
                    >
                      {totalPrice >= 100000 
                        ? `Productos: $${totalPrice.toLocaleString()} + Envío: Gratis`
                        : `Productos: $${totalPrice.toLocaleString()} + Envío: $15.000`
                      }
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.button
                  onClick={handleCheckout}
                  disabled={isProcessing || items.length === 0}
                  whileHover={{ 
                    scale: isProcessing || items.length === 0 ? 1 : 1.03,
                    y: isProcessing || items.length === 0 ? 0 : -2
                  }}
                  whileTap={{ scale: isProcessing || items.length === 0 ? 1 : 0.98 }}
                  className={`flex justify-center w-full py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl ${
                    isProcessing
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-600 to-pink-700 text-white hover:from-pink-700 hover:to-pink-800'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Procesando pago...</span>
                    </div>
                  ) : (
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="inline-block"
                    >
                      Finalizar Compra ✨
                    </motion.span>
                  )}
                </motion.button>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-6 space-y-3 text-sm text-gray-500"
                >
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 cursor-default"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <HiShoppingBag className="h-4 w-4 text-green-600" />
                    </motion.div>
                    <span>Envío gratis en compras superiores a $100.000</span>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 cursor-default"
                  >
                    <motion.div
                      animate={{ x: [-2, 2, -2] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                    >
                      <HiArrowLeft className="h-4 w-4 text-blue-600" />
                    </motion.div>
                    <span>Devoluciones gratis hasta 30 días</span>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 cursor-default"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                    >
                      <HiCheckCircle className="h-4 w-4 text-green-600" />
                    </motion.div>
                    <span>Compra 100% segura y protegida</span>
                  </motion.div>
                </motion.div>

                <motion.button
                  onClick={clearCart}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex justify-center w-full mt-4 text-gray-600 py-2 text-lg hover:text-red-600 transition-colors border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 font-medium"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                  >
                    Vaciar carrito
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;