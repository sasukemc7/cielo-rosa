import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiFilter, HiX, HiShoppingBag, HiEye, HiChevronDown, HiHeart } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import productsData from '../data/products.json';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const { addToCart } = useCart();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Función para manejar favoritos con prevención de eventos
  const handleToggleFavorite = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
  };

  // Obtener categorías únicas (incluyendo Favoritos)
  const categories = ['Todos', 'Favoritos', ...new Set(productsData.map(p => p.category))];
  
  // Obtener colores únicos
  const colors = [...new Set(productsData.map(p => p.color))];
  
  // Obtener tallas únicas
  const sizes = [...new Set(productsData.flatMap(p => p.sizes))];

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      // Filtro por categorías
      let categoryMatch;
      if (selectedCategory === 'Todos') {
        categoryMatch = true;
      } else if (selectedCategory === 'Favoritos') {
        categoryMatch = favorites.includes(product.id);
      } else {
        categoryMatch = product.category === selectedCategory;
      }
      
      const colorMatch = !selectedColor || product.color === selectedColor;
      const sizeMatch = !selectedSize || product.sizes.includes(selectedSize);
      
      return categoryMatch && colorMatch && sizeMatch;
    });
  }, [selectedCategory, selectedColor, selectedSize, favorites]);

  // Función para obtener el color de los círculos de filtro
  const getColorClass = (color) => {
    const colorMap = {
      'Rosado Pastel': 'bg-pink-200 border-pink-300',
      'Blanco': 'bg-white border-gray-300',
      'Negro': 'bg-gray-800 border-gray-600',
      'Verde Pastel': 'bg-green-200 border-green-300',
      'Rosa': 'bg-pink-400 border-pink-500',
      'Azul Pastel': 'bg-blue-200 border-blue-300',
      'Beige': 'bg-amber-100 border-amber-200'
    };
    return colorMap[color] || 'bg-gray-200 border-gray-300';
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Usar la primera talla disponible por defecto
    const defaultSize = product.sizes[0];
    addToCart(product, defaultSize);
    
    // Mostrar feedback visual con animación mejorada
    const button = e.target.closest('button');
    const originalText = button.textContent;
    button.textContent = '¡Agregado al carrito! 🛒';
    button.classList.add('bg-green-500', 'text-white');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('bg-green-500', 'text-white');
    }, 1500);
  };

  const clearFilters = () => {
    setSelectedCategory('Todos');
    setSelectedColor('');
    setSelectedSize('');
  };

  const activeFiltersCount = 
    (selectedCategory !== 'Todos' && selectedCategory !== 'Favoritos' ? 1 : 0) + 
    (selectedColor ? 1 : 0) + 
    (selectedSize ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-4/5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar de Filtros (Desktop) - Nuevo Diseño */}
          <div className="hidden lg:block w-72 bg-gradient-to-br from-white via-pink-50/30 to-purple-50/20 rounded-2xl shadow-lg border border-pink-100/50 backdrop-blur-sm p-8 h-fit sticky top-24">
            
            {/* Header del Sidebar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2 items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center">
                  <HiFilter className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Filtros</h3>
              </div>
              {activeFiltersCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="bg-pink-100 text-pink-700 px-3 py-2 rounded-full text-sm font-medium hover:bg-pink-200 transition-all duration-300 flex items-center space-x-1"
                >
                  <HiX className="h-3 w-3" />
                  <span>Limpiar ({activeFiltersCount})</span>
                </motion.button>
              )}
            </div>

            {/* Categorías con mejor diseño */}
            <div className="mb-8">
              <div className="flex gap-2 items-center space-x-2 mb-4">
                <div className="w-1 h-5 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full"></div>
                <h4 className="font-semibold text-gray-800">Categorías</h4>
              </div>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-pink-100 to-pink-50 text-pink-700 font-semibold shadow-sm border border-pink-200/50'
                        : 'text-gray-600 hover:bg-white/60 hover:shadow-sm'
                    }`}
                  >
                    <span>{category}</span>
                    {selectedCategory === category && (
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Colores con menú desplegable */}
            <div className="mb-8">
              <div className="flex gap-2 items-center space-x-2 mb-4">
                <div className="w-1 h-5 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"></div>
                <h4 className="font-semibold text-gray-800">Colores</h4>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowColorMenu(!showColorMenu)}
                className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 flex items-center justify-between hover:shadow-md transition-all duration-300"
              >
                <div className="flex gap-2 items-center space-x-3">
                  {selectedColor ? (
                    <>
                      <div className={`w-5 h-5 rounded-full border-2 ${getColorClass(selectedColor)}`}></div>
                      <span className="text-gray-700 font-medium">{selectedColor}</span>
                    </>
                  ) : (
                    <>
                      <div className="w-5 h-5 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full border border-gray-300"></div>
                      <span className="text-gray-600">Seleccionar color</span>
                    </>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: showColorMenu ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {showColorMenu && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 shadow-lg"
                  >
                    <div className="grid grid-cols-4 gap-3">
                      {colors.map(color => (
                        <motion.button
                          key={color}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedColor(selectedColor === color ? '' : color);
                            setShowColorMenu(false);
                          }}
                          className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${getColorClass(color)} ${
                            selectedColor === color ? 'ring-2 ring-pink-400 ring-offset-2 shadow-lg' : 'hover:shadow-md'
                          }`}
                          title={color}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tallas con menú desplegable */}
            <div className="mb-8">
              <div className="flex gap-2 items-center space-x-2 mb-4">
                <div className="w-1 h-5 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full"></div>
                <h4 className="font-semibold text-gray-800">Tallas</h4>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSizeMenu(!showSizeMenu)}
                className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 flex items-center justify-between hover:shadow-md transition-all duration-300"
              >
                <div className="flex gap-2 items-center space-x-3">
                  {selectedSize ? (
                    <>
                      <div className="w-5 h-5 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded border border-indigo-300 flex items-center justify-center">
                        <span className="text-xs font-bold text-indigo-700">{selectedSize}</span>
                      </div>
                      <span className="text-gray-700 font-medium">Talla {selectedSize}</span>
                    </>
                  ) : (
                    <>
                      <div className="w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded border border-gray-300 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-500">?</span>
                      </div>
                      <span className="text-gray-600">Seleccionar talla</span>
                    </>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: showSizeMenu ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {showSizeMenu && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 shadow-lg"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {sizes.sort().map(size => (
                        <motion.button
                          key={size}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedSize(selectedSize === size ? '' : size);
                            setShowSizeMenu(false);
                          }}
                          className={`px-3 py-2 text-sm font-semibold border-2 rounded-lg transition-all duration-300 ${
                            selectedSize === size
                              ? 'bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-700 border-indigo-300 shadow-md'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                          }`}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Estadísticas de productos */}
            <div className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 rounded-xl p-4 border border-pink-100/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {filteredProducts.length}
                </div>
                <div className="text-sm text-gray-600">
                  producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

          </div>

          {/* Contenido Principal */}
          <div className="flex-1">
            
            {/* Filtros Móviles */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100 w-full justify-center"
              >
                <HiFilter className="h-5 w-5" />
                <span className="font-medium">Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Grid de Productos */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-gradient-to-br from-white via-pink-50/20 to-purple-50/10 rounded-2xl shadow-lg border border-pink-100/50 overflow-hidden group backdrop-blur-sm"
                  >
                    <div className="relative">
                      
                      {/* Botón de favoritos - Posición fija */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleToggleFavorite(product.id, e)}
                        className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full border-2 backdrop-blur-sm transition-all duration-300 flex items-center justify-center ${
                          isFavorite(product.id)
                            ? 'bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/25'
                            : 'bg-white/80 border-white/60 text-gray-400 hover:text-pink-500 hover:border-pink-300'
                        }`}
                      >
                        <motion.div
                          animate={isFavorite(product.id) ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <HiHeart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                        </motion.div>
                      </motion.button>

                      <Link to={`/producto/${product.id}`}>
                        {/* Imagen del producto mejorada */}
                        <div className="relative h-72 bg-gradient-to-br from-pink-100/60 to-purple-100/40 overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center relative">
                            
                            {/* Elementos decorativos de fondo */}
                            <div className="absolute top-8 left-8 w-12 h-12 bg-pink-200/30 rounded-full blur-xl"></div>
                            <div className="absolute bottom-8 right-8 w-16 h-16 bg-purple-200/20 rounded-full blur-2xl"></div>
                            
                            <div className="text-center relative z-10">
                              <motion.div
                                whileHover={{ 
                                  scale: 1.1,
                                  rotate: [0, -5, 5, 0] 
                                }}
                                transition={{ duration: 0.6 }}
                                className="text-6xl mb-4 filter drop-shadow-lg"
                              >
                                {product.category === 'Vestidos' && '👗'}
                                {product.category === 'Blusas' && '👚'}
                                {product.category === 'Faldas' && '🩱'}
                                {product.category === 'Kimonos' && '🥻'}
                                {product.category === 'Conjuntos' && '👔'}
                              </motion.div>
                              <p className="text-sm text-pink-700 font-semibold tracking-wide">{product.name}</p>
                            </div>
                          </div>
                          
                          {/* Overlay con acciones mejorado */}
                          <motion.div 
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center"
                          >
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              whileHover={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-gray-700 hover:text-pink-600 transition-colors shadow-lg"
                            >
                              <HiEye className="h-6 w-6" />
                            </motion.div>
                          </motion.div>

                          {/* Badge de stock bajo mejorado */}
                          {product.stock <= 5 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg"
                            >
                              ¡Solo {product.stock}!
                            </motion.div>
                          )}
                        </div>

                        {/* Información del producto mejorada */}
                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-pink-600 transition-colors leading-tight">
                              {product.name}
                            </h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                              <span className="bg-gray-100 px-2 py-1 rounded-full">{product.category}</span>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <div className={`w-3 h-3 rounded-full border ${getColorClass(product.color)}`}></div>
                                <span>{product.color}</span>
                              </div>
                            </div>
                            <div className="flex items-baseline space-x-2 mb-4">
                              <span className="text-2xl font-bold text-pink-600">
                                ${product.price.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500 font-medium">{product.currency}</span>
                            </div>
                          </div>
                          
                          {/* Tallas disponibles mejoradas */}
                          <div className="mb-4">
                            <p className="text-xs font-medium text-gray-600 mb-2">Tallas disponibles:</p>
                            <div className="flex flex-wrap gap-2">
                              {product.sizes.map(size => (
                                <span
                                  key={size}
                                  className="text-xs bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 px-3 py-1 rounded-full font-medium border border-gray-200"
                                >
                                  {size}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Botones de acción mejorados */}
                      <div className="px-6 pb-6">
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => handleAddToCart(product, e)}
                            className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-pink-500/25"
                          >
                            <HiShoppingBag className="h-4 w-4" />
                            Agregar al carrito
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Mensaje cuando no hay productos */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-500 mb-4">
                  Intenta ajustar los filtros para ver más opciones
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Filtros Móviles */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 max-w-full bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6 bg-gradient-to-br from-white via-pink-50/30 to-purple-50/20">
                
                {/* Header del Modal */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center">
                      <HiFilter className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Filtros</h3>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowFilters(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
                  >
                    <HiX className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Categorías */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-1 h-5 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full"></div>
                    <h4 className="font-semibold text-gray-800">Categorías</h4>
                  </div>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <motion.button
                        key={category}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-pink-100 to-pink-50 text-pink-700 font-semibold shadow-sm border border-pink-200/50'
                            : 'text-gray-600 hover:bg-white/60 hover:shadow-sm'
                        }`}
                      >
                        <span>{category}</span>
                        {selectedCategory === category && (
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Colores */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-1 h-5 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"></div>
                    <h4 className="font-semibold text-gray-800">Colores</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {colors.map(color => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${getColorClass(color)} ${
                          selectedColor === color ? 'ring-2 ring-pink-400 ring-offset-2 shadow-lg' : 'hover:shadow-md'
                        }`}
                        title={color}
                      />
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-sm text-gray-600 mt-3 font-medium">Seleccionado: {selectedColor}</p>
                  )}
                </div>

                {/* Tallas */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-1 h-5 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full"></div>
                    <h4 className="font-semibold text-gray-800">Tallas</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.sort().map(size => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                        className={`px-3 py-2 text-sm font-semibold border-2 rounded-lg transition-all duration-300 ${
                          selectedSize === size
                            ? 'bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-700 border-indigo-300 shadow-md'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Estadísticas de productos */}
                <div className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 rounded-xl p-4 border border-pink-100/30 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {filteredProducts.length}
                    </div>
                    <div className="text-sm text-gray-600">
                      producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-3">
                  {activeFiltersCount > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearFilters}
                      className="w-full bg-white border-2 border-pink-200 text-pink-700 px-4 py-3 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <HiX className="h-4 w-4" />
                      <span>Limpiar filtros ({activeFiltersCount})</span>
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowFilters(false)}
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-4 rounded-xl font-bold hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg"
                  >
                    Ver {filteredProducts.length} productos
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;