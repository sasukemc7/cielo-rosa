import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiPlus, HiMinus, HiTrash, HiShoppingBag } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCart();

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size);
    } else {
      updateQuantity(productId, size, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Simular proceso de checkout
    alert(`¡Gracias por tu compra! 🎉\n\nResumen:\n• ${totalItems} productos\n• Total: $${totalPrice.toLocaleString()} COP\n\nEn una tienda real, aquí se procesaría el pago.`);
    clearCart();
    onClose();
  };

  // Variantes para las animaciones
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const drawerVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const modalVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      y: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer para Desktop */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="hidden md:block fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50"
          >
            <div className="flex flex-col h-full">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <HiShoppingBag className="h-6 w-6 text-pink-600" />
                  <h2 className="text-xl font-display font-semibold text-gray-800">
                    Mi Carrito
                  </h2>
                  {totalItems > 0 && (
                    <span className="bg-pink-100 text-pink-700 text-sm px-2 py-1 rounded-full font-medium">
                      {totalItems}
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <HiX className="h-5 w-5" />
                </button>
              </div>

              {/* Contenido del carrito */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="text-6xl mb-4">🛍️</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Agrega algunos productos para comenzar
                    </p>
                    <button
                      onClick={onClose}
                      className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      Explorar productos
                    </button>
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={`${item.id}-${item.selectedSize}`}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                          className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                        >
                          {/* Imagen del producto */}
                          <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">
                              {item.category === 'Vestidos' && '👗'}
                              {item.category === 'Blusas' && '👚'}
                              {item.category === 'Faldas' && '🩱'}
                              {item.category === 'Kimonos' && '🥻'}
                              {item.category === 'Conjuntos' && '👔'}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Información del producto */}
                            <h3 className="font-semibold text-gray-800 truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Talla: {item.selectedSize}
                            </p>
                            <p className="text-lg font-bold text-pink-600">
                              ${item.price.toLocaleString()} COP
                            </p>

                            {/* Controles de cantidad */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity - 1)}
                                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-white rounded transition-colors"
                                >
                                  <HiMinus className="h-4 w-4" />
                                </button>
                                <span className="w-8 text-center font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity + 1)}
                                  disabled={item.quantity >= item.stock}
                                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <HiPlus className="h-4 w-4" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.id, item.selectedSize)}
                                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                              >
                                <HiTrash className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer con total y checkout */}
              {items.length > 0 && (
                <div className="border-t border-gray-100 p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-pink-600">
                      ${totalPrice.toLocaleString()} COP
                    </span>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-700 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
                  >
                    Finalizar Compra
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
                  >
                    Vaciar carrito
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Modal para Móvil */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[90vh] flex flex-col"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <HiShoppingBag className="h-6 w-6 text-pink-600" />
                <h2 className="text-xl font-display font-semibold text-gray-800">
                  Mi Carrito
                </h2>
                {totalItems > 0 && (
                  <span className="bg-pink-100 text-pink-700 text-sm px-2 py-1 rounded-full font-medium">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>

            {/* Contenido del carrito */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="text-6xl mb-4">🛍️</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Agrega algunos productos para comenzar
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Explorar productos
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.selectedSize}`}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        {/* Imagen del producto */}
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">
                            {item.category === 'Vestidos' && '👗'}
                            {item.category === 'Blusas' && '👚'}
                            {item.category === 'Faldas' && '🩱'}
                            {item.category === 'Kimonos' && '🥻'}
                            {item.category === 'Conjuntos' && '👔'}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Información del producto */}
                          <h3 className="font-semibold text-gray-800 text-sm truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            Talla: {item.selectedSize}
                          </p>
                          <p className="text-base font-bold text-pink-600">
                            ${item.price.toLocaleString()}
                          </p>

                          {/* Controles de cantidad */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity - 1)}
                                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-white rounded transition-colors"
                              >
                                <HiMinus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-white rounded transition-colors disabled:opacity-50"
                              >
                                <HiPlus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id, item.selectedSize)}
                              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                            >
                              <HiTrash className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer con total y checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-4 space-y-3 bg-white">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-xl font-bold text-pink-600">
                    ${totalPrice.toLocaleString()} COP
                  </span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-700 transition-colors shadow-lg"
                >
                  Finalizar Compra
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;