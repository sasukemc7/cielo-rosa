import React, { useState } from 'react';
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
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

  // Si la compra fue exitosa
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <HiCheckCircle className="h-12 w-12 text-green-600" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-display font-bold text-gray-800 mb-4"
          >
            ¡Compra Exitosa! 🎉
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3 mb-6"
          >
            <p className="text-gray-600">
              Tu pedido ha sido procesado correctamente
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700 font-medium">
                Número de pedido: <span className="font-bold">{orderNumber}</span>
              </p>
              <p className="text-sm text-green-600 mt-1">
                Tu pedido llegará en 3-5 días hábiles
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-3"
          >
            <Link
              to="/productos"
              className="block w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
            >
              Seguir comprando
            </Link>
            <Link
              to="/"
              className="block w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
            >
              Volver al inicio
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-4/5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/productos"
            className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
          >
            <HiArrowLeft className="h-5 w-5" />
            <span>Seguir comprando</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
            Mi Carrito de Compras
          </h1>
          {totalItems > 0 && (
            <p className="text-lg text-gray-600">
              {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu carrito
            </p>
          )}
        </div>

        {items.length === 0 ? (
          // Carrito vacío
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🛍️</div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-700 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Parece que aún no has agregado ningún producto a tu carrito. 
              ¡Explora nuestra hermosa colección!
            </p>
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 bg-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-pink-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              <HiShoppingBag className="h-5 w-5" />
              Explorar productos
            </Link>
          </div>
        ) : (
          // Carrito con productos
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.selectedSize}`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="flex gap-6">
                      {/* Imagen del producto */}
                      <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">
                          {item.category === 'Vestidos' && '👗'}
                          {item.category === 'Blusas' && '👚'}
                          {item.category === 'Faldas' && '🩱'}
                          {item.category === 'Kimonos' && '🥻'}
                          {item.category === 'Conjuntos' && '👔'}
                        </span>
                      </div>

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

                          <button
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar producto"
                          >
                            <HiTrash className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Controles de cantidad */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity - 1)}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-md transition-colors"
                              >
                                <HiMinus className="h-4 w-4" />
                              </button>
                              <span className="w-12 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <HiPlus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-500">Subtotal</p>
                            <p className="text-lg font-bold text-gray-800">
                              ${(item.price * item.quantity).toLocaleString()} COP
                            </p>
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
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-xl font-display font-semibold text-gray-800 mb-6">
                  Resumen del Pedido
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalItems} productos)</span>
                    <span className="font-semibold">${totalPrice.toLocaleString()} COP</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-semibold text-green-600">Gratis</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-pink-600">
                        ${totalPrice.toLocaleString()} COP
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || items.length === 0}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
                    isProcessing
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-pink-600 text-white hover:bg-pink-700'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Procesando pago...
                    </div>
                  ) : (
                    'Finalizar Compra'
                  )}
                </button>

                <div className="mt-6 space-y-3 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <HiShoppingBag className="h-4 w-4 text-green-600" />
                    <span>Envío gratis en compras superiores a $100.000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiArrowLeft className="h-4 w-4 text-blue-600" />
                    <span>Devoluciones gratis hasta 30 días</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiCheckCircle className="h-4 w-4 text-green-600" />
                    <span>Compra 100% segura y protegida</span>
                  </div>
                </div>

                <button
                  onClick={clearCart}
                  className="w-full mt-4 text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;