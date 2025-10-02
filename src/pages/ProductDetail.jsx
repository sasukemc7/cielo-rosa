import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { HiArrowLeft, HiShoppingBag, HiHeart, HiShare, HiChevronLeft, HiChevronRight, HiSparkles, HiStar, HiCheck, HiTruck, HiShieldCheck } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import productsData from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const { toggleFavorite, isFavorite: checkIsFavorite } = useFavorites();

  // Animación de entrada de la página
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // Buscar el producto
  const product = useMemo(() => {
    return productsData.find(p => p.id === id);
  }, [id]);

  // Verificar si este producto está en favoritos
  const isProductFavorite = product ? checkIsFavorite(product.id) : false;

  // Productos relacionados (misma categoría, excluyendo el actual)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productsData
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // Si no se encuentra el producto
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😥</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Producto no encontrado</h2>
          <p className="text-gray-500 mb-6">El producto que buscas no existe o ha sido removido.</p>
          <Link
            to="/productos"
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    );
  }

  // Seleccionar automáticamente la primera talla si no hay ninguna seleccionada
  if (!selectedSize && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }

    setIsAddingToCart(true);
    
    // Simular un pequeño delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addToCart(product, selectedSize);
    setIsAddingToCart(false);
    setShowSuccessMessage(true);
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  // Función para manejar favoritos
  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const isInCartWithSize = isInCart(product.id, selectedSize);
  const currentQuantity = getItemQuantity(product.id, selectedSize);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: pageLoaded ? 1 : 0 }}
      transition={{ duration: 0.1 }}
      className="min-h-screen bg-gradient-to-br from-pink-50/30 via-white to-purple-50/20 relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <motion.div
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-yellow-200/10 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Mensaje de éxito flotante */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.3 }}
            >
              <HiCheck className="h-6 w-6" />
            </motion.div>
            <span className="font-semibold">¡Producto agregado al carrito!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-2 w-4/5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Breadcrumb y botón volver con animación */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link
            to="/productos"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-all duration-300 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl"
          >
            <motion.div
              animate={{ x: [-2, 0, -2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HiArrowLeft className="h-5 w-5" />
            </motion.div>
            <span className="font-medium">Volver</span>
          </Link>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <Link to="/" className="hover:text-pink-600 transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/productos" className="hover:text-pink-600 transition-colors">Productos</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium">{product.name}</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: 0.3 }}
          className="grid lg:grid-cols-2 gap-12"
        >
          
          {/* Galería de imágenes con animaciones épicas */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1, delay: 0.5 }}
            className="flex flex-col gap-2 space-y-4"
          >
            {/* Imagen principal ÉPICA */}
            <motion.div
              layoutId="product-image"
              className="relative bg-gradient-to-br from-white via-pink-50/40 to-purple-50/30 rounded-3xl overflow-hidden shadow-2xl border border-pink-100/50 backdrop-blur-sm"
            >
              <motion.div
                key={currentImageIndex}
                initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="aspect-square bg-gradient-to-br from-pink-100/60 via-pink-50/40 to-purple-100/30 flex items-center justify-center relative overflow-hidden"
              >
                {/* Elementos decorativos flotantes */}
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-pink-300/30 to-pink-400/20 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ 
                    y: [10, -10, 10],
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-12 right-12 w-20 h-20 bg-gradient-to-br from-purple-300/25 to-purple-400/15 rounded-full blur-2xl"
                />
                <motion.div
                  animate={{ 
                    x: [-5, 5, -5],
                    y: [5, -5, 5],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute top-1/2 right-8 w-12 h-12 bg-gradient-to-br from-yellow-300/20 to-yellow-400/10 rounded-full blur-xl"
                />

                <div className="text-center relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.3,
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }}
                    whileHover={{ 
                      scale: 1.15,
                      rotate: [0, -8, 8, -4, 4, 0],
                      y: -10
                    }}
                    className="text-9xl mb-6 filter drop-shadow-2xl cursor-pointer"
                  >
                    {product.category === 'Vestidos' && '👗'}
                    {product.category === 'Blusas' && '👚'}
                    {product.category === 'Faldas' && '🩱'}
                    {product.category === 'Kimonos' && '🥻'}
                    {product.category === 'Conjuntos' && '👔'}
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-pink-700 font-display text-3xl font-bold tracking-wide mb-2"
                  >
                    {product.name}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-pink-600 text-lg font-medium"
                  >
                    Imagen {currentImageIndex + 1} de {product.images.length}
                  </motion.p>
                </div>

                {/* Partículas flotantes */}
                <motion.div
                  animate={{ 
                    y: [-20, -60, -20],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-1/4 left-1/4 text-pink-400 text-2xl"
                >
                  ✨
                </motion.div>
                <motion.div
                  animate={{ 
                    y: [-30, -70, -30],
                    opacity: [0.4, 0.9, 0.4]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                  className="absolute top-1/3 right-1/3 text-purple-400 text-xl"
                >
                  💫
                </motion.div>
                <motion.div
                  animate={{ 
                    y: [-25, -65, -25],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-1/4 left-1/3 text-pink-300 text-lg"
                >
                  🌟
                </motion.div>
              </motion.div>

              {/* Controles de navegación ÉPICOS */}
              {product.images.length > 1 && (
                <>
                  <motion.button
                    onClick={prevImage}
                    whileHover={{ scale: 1.1, x: -3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-2xl border border-pink-100/50 transition-all duration-300 group"
                  >
                    <motion.div
                      animate={{ x: [-1, 1, -1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <HiChevronLeft className="h-6 w-6 text-gray-700 group-hover:text-pink-600" />
                    </motion.div>
                  </motion.button>
                  <motion.button
                    onClick={nextImage}
                    whileHover={{ scale: 1.1, x: 3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-2xl border border-pink-100/50 transition-all duration-300 group"
                  >
                    <motion.div
                      animate={{ x: [1, -1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <HiChevronRight className="h-6 w-6 text-gray-700 group-hover:text-pink-600" />
                    </motion.div>
                  </motion.button>
                </>
              )}

              {/* Indicadores de imagen BRILLANTES */}
              {product.images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-pink-100/50"
                >
                  {product.images.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{
                        scale: index === currentImageIndex ? 1.2 : 1
                      }}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-gradient-to-r from-pink-500 to-pink-600 shadow-lg shadow-pink-500/50' 
                          : 'bg-gray-300 hover:bg-pink-300'
                      }`}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Miniaturas ELEGANTES */}
            <AnimatePresence>
              {product.images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 1.6 }}
                  className="grid grid-cols-4 gap-3"
                >
                  {product.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        scale: index === currentImageIndex ? 1.02 : 1,
                        y: index === currentImageIndex ? -2 : 0
                      }}
                      className={`aspect-square bg-gradient-to-br from-white to-pink-50 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-lg ${
                        index === currentImageIndex 
                          ? 'border-pink-400 shadow-pink-200' 
                          : 'border-pink-100 hover:border-pink-300 hover:shadow-pink-100'
                      }`}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-pink-100/60 to-pink-200/40 flex items-center justify-center relative">
                        <motion.span
                          animate={{
                            scale: index === currentImageIndex ? 1.1 : 1
                          }}
                          className="text-3xl filter drop-shadow-sm"
                        >
                          {product.category === 'Vestidos' && '👗'}
                          {product.category === 'Blusas' && '👚'}
                          {product.category === 'Faldas' && '🩱'}
                          {product.category === 'Kimonos' && '🥻'}
                          {product.category === 'Conjuntos' && '👔'}
                        </motion.span>
                        {index === currentImageIndex && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-1 right-1 w-3 h-3 bg-pink-500 rounded-full"
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Información del producto ÉPICA */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6 leading-tight"
              >
                <motion.span
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-gradient-to-r from-pink-300  to-pink-400 bg-clip-text text-transparent bg-300% animate-gradient"
                >
                  {product.name}
                </motion.span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex items-center gap-4 mb-8"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-lg text-gray-700 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full font-medium shadow-sm"
                >
                  {product.category}
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-sm bg-gradient-to-r from-white to-pink-50 text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm border border-pink-100"
                >
                  Color: {product.color}
                </motion.span>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex items-center gap-1"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                    >
                      <HiStar className="h-4 w-4 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(4.9)</span>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7, type: "spring", stiffness: 150 }}
                className="mb-8"
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.02, 1],
                    textShadow: [
                      '0 0 0px rgba(236, 72, 153, 0)',
                      '0 0 20px rgba(236, 72, 153, 0.3)',
                      '0 0 0px rgba(236, 72, 153, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent"
                >
                  ${product.price.toLocaleString()}
                </motion.span>
                <span className="text-lg text-gray-600 ml-2 font-medium">{product.currency}</span>
              </motion.div>
            </motion.div>

            {/* Descripción ANIMADA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="bg-gradient-to-r from-pink-50/50 to-purple-50/30 p-6 rounded-2xl border border-pink-100/50 backdrop-blur-sm shadow-sm"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: 0.9 }}
                className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                >
                  📝
                </motion.span>
                Descripción
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1 }}
                className="text-gray-700 leading-relaxed text-lg"
              >
                {product.description}
              </motion.p>
            </motion.div>

            {/* Selector de talla ÉPICO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-pink-100/50 shadow-lg"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: 1.2 }}
                className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  📏
                </motion.span>
                Selecciona tu talla
                {selectedSize && (
                  <span
                    className="text-pink-600 font-bold bg-pink-100 px-3 py-1 rounded-full text-sm ml-2"
                  >
                    {selectedSize}
                  </span>
                )}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.3 }}
                className="flex flex-wrap gap-3"
              >
                {product.sizes.map((size, index) => (
                  <motion
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 border-2 rounded-xl font-bold transition-all duration-300 relative overflow-hidden ${
                      selectedSize === size
                        ? 'border-pink-500 bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30 transform scale-105'
                        : 'border-pink-200 bg-white hover:border-pink-400 text-gray-700 hover:bg-pink-50 shadow-md'
                    }`}
                  >
                    {selectedSize === size && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"
                      />
                    )}
                    <span className="relative z-10">{size}</span>
                    {selectedSize === size && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-pink-600/20 rounded-xl"
                      />
                    )}
                  </motion>
                ))}
              </motion.div>
            </motion.div>

            {/* Stock disponible ANIMADO */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1, delay: 1.6 }}
              className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-pink-100/50 shadow-sm"
            >
              <motion.div
                animate={{
                  scale: product.stock <= 5 ? [1, 1.2, 1] : [1],
                  boxShadow: product.stock <= 5 
                    ? ['0 0 0px rgba(239, 68, 68, 0)', '0 0 20px rgba(239, 68, 68, 0.6)', '0 0 0px rgba(239, 68, 68, 0)']
                    : ['0 0 0px rgba(34, 197, 94, 0)']
                }}
                transition={{ 
                  duration: product.stock <= 5 ? 1.5 : 0,
                  repeat: product.stock <= 5 ? Infinity : 0
                }}
                className={`w-4 h-4 rounded-full shadow-lg ${
                  product.stock > 10 ? 'bg-gradient-to-r from-green-400 to-green-500' : 
                  product.stock > 5 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                }`}
              />
              <motion
                className={`font-semibold ${
                  product.stock > 10 ? 'text-green-700' : 
                  product.stock > 5 ? 'text-yellow-700' : 'text-red-700'
                }`}
              >
                {product.stock > 10 ? '✅ En stock' : 
                 product.stock > 5 ? `⏰ Solo ${product.stock} disponibles` : 
                 `🔥 ¡Últimas ${product.stock} unidades!`}
              </motion>
              {product.stock <= 5 && (
                <motion
                  className="text-red-500 font-bold text-sm"
                >
                  ¡APÚRATE!
                </motion>
              )}
            </motion.div>

            {/* Botones de acción ÉPICOS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.7 }}
              className="space-y-8"
            >
              {/* Botón agregar al carrito SUAVE Y ELEGANTE */}
              <motion.button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock === 0}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.8, type: "spring", stiffness: 150 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -3,
                  boxShadow: "0 15px 35px rgba(251, 182, 206, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className={`relative w-full py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : isAddingToCart
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg shadow-green-400/30'
                    : isInCartWithSize
                    ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-2 border-green-300 shadow-lg shadow-green-400/20'
                    : 'bg-gradient-to-r from-pink-400 via-pink-300 to-pink-400 text-white shadow-lg shadow-pink-300/40'
                }`}
              >
                {/* Efecto de brillo animado */}
                {!isAddingToCart && product.stock > 0 && (
                  <motion.div
                    animate={{
                      x: [-100, 300],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"
                  />
                )}

                <AnimatePresence mode="wait">
                  {isAddingToCart ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-3"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                      />
                      <span>Agregando al carrito...</span>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        ✨
                      </motion.div>
                    </motion.div>
                  ) : isInCartWithSize ? (
                    <Link
                      to="/carrito"
                      className="flex items-center gap-3 w-full justify-center"
                    >
                      <motion.div
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <HiShoppingBag className="h-6 w-6" />
                      </motion.div>
                      <span>Ver en carrito ({currentQuantity})</span>
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🛒
                      </motion.span>
                    </Link>
                  ) : product.stock === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <span>😢 Agotado</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3"
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0] 
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <HiShoppingBag className="h-6 w-6" />
                      </motion.div>
                      <span>Agregar al carrito</span>
                      <motion.span
                        animate={{ 
                          y: [-2, 2, -2],
                          rotate: [0, 10, -10, 0] 
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      >
                        🛍️
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Botones secundarios ÉPICOS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.9 }}
                className="flex gap-4"
              >
                <button
                  onClick={handleToggleFavorite}
                  className={`flex-1 py-4 px-6 border-2 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                    isProductFavorite
                      ? 'border-pink-300 bg-gradient-to-r from-pink-50 to-rose-50 text-pink-600 shadow-lg shadow-pink-300/20'
                      : 'border-pink-200 bg-white text-gray-700 hover:border-pink-400 hover:bg-pink-50 shadow-md'
                  }`}
                >
                  <motion.div
                    animate={isProductFavorite ? { 
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0]
                    } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HiHeart className={`h-5 w-5 ${isProductFavorite ? 'fill-current text-pink-500' : ''}`} />
                  </motion.div>
                  <span>{isProductFavorite ? '💕 En Favoritos' : '🤍 Favoritos'}</span>
                  {isProductFavorite && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-red-500"
                    >
                      ❤️
                    </motion.span>
                  )}
                </button>
                
                <button
                  className="flex-1 py-4 px-6 border-2 border-purple-200 bg-white text-gray-700 rounded-xl font-bold hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-md"
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 5 }}
                  >
                    <HiShare className="h-5 w-5" />
                  </motion.div>
                  <span>📤 Compartir</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Información adicional BESTIAL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 2.2 }}
              className="flex flex-col gap-2 border-t border-pink-100 pt-8 space-y-8 bg-gradient-to-r from-pink-50/30 to-purple-50/20 p-6 rounded-2xl backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: 2.3 }}
                className="flex items-center gap-4 p-5 bg-green-50 rounded-xl border border-green-200 shadow-sm"
              >
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <HiTruck className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <p className="font-bold text-green-800">🚚 Envío GRATIS</p>
                  <p className="text-sm text-green-600">En compras superiores a $100.000</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: 2.4 }}
                className="flex items-center gap-4 p-5 bg-blue-50 rounded-xl border border-blue-200 shadow-sm"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <HiArrowLeft className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <p className="font-bold text-blue-800">🔄 Devoluciones FÁCILES</p>
                  <p className="text-sm text-blue-600">Hasta 30 días completamente gratis</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: 0.5 }}
                className="flex items-center gap-4 p-5 bg-pink-50 rounded-xl border border-pink-200 shadow-sm"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center"
                >
                  <HiShieldCheck className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <p className="font-bold text-pink-800">✨ 100% AUTÉNTICO</p>
                  <p className="text-sm text-pink-600">Garantía de calidad y originalidad</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-800 mb-8 text-center">
              Productos Relacionados
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  to={`/producto/${relatedProduct.id}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {relatedProduct.category === 'Vestidos' && '👗'}
                        {relatedProduct.category === 'Blusas' && '👚'}
                        {relatedProduct.category === 'Faldas' && '🩱'}
                        {relatedProduct.category === 'Kimonos' && '🥻'}
                        {relatedProduct.category === 'Conjuntos' && '👔'}
                      </div>
                      <p className="text-sm text-pink-700 font-medium">{relatedProduct.name}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-pink-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{relatedProduct.color}</p>
                    <p className="text-lg font-bold text-pink-600">
                      ${relatedProduct.price.toLocaleString()} {relatedProduct.currency}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetail;