import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiFilter, HiX, HiShoppingBag, HiEye } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  // Obtener categorías únicas
  const categories = ['Todos', ...new Set(productsData.map(p => p.category))];
  
  // Obtener colores únicos
  const colors = [...new Set(productsData.map(p => p.color))];
  
  // Obtener tallas únicas
  const sizes = [...new Set(productsData.flatMap(p => p.sizes))];

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const categoryMatch = selectedCategory === 'Todos' || product.category === selectedCategory;
      const colorMatch = !selectedColor || product.color === selectedColor;
      const sizeMatch = !selectedSize || product.sizes.includes(selectedSize);
      
      return categoryMatch && colorMatch && sizeMatch;
    });
  }, [selectedCategory, selectedColor, selectedSize]);

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
    (selectedCategory !== 'Todos' ? 1 : 0) + 
    (selectedColor ? 1 : 0) + 
    (selectedSize ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-4/5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
            Nuestra Colección
          </h1>
          <p className="text-lg text-gray-600">
            Descubre {filteredProducts.length} productos únicos inspirados en la moda asiática
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar de Filtros (Desktop) */}
          <div className="hidden lg:block w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-pink-600 hover:text-pink-700 underline"
                >
                  Limpiar ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Categorías */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Categorías</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-pink-100 text-pink-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Colores */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Colores</h4>
              <div className="grid grid-cols-3 gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${getColorClass(color)} ${
                      selectedColor === color ? 'ring-2 ring-pink-400 ring-offset-2' : ''
                    }`}
                    title={color}
                  />
                ))}
              </div>
              {selectedColor && (
                <p className="text-xs text-gray-500 mt-2">Seleccionado: {selectedColor}</p>
              )}
            </div>

            {/* Tallas */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Tallas</h4>
              <div className="grid grid-cols-3 gap-2">
                {sizes.sort().map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                    className={`px-3 py-2 text-sm font-medium border border-gray-200 rounded-lg transition-colors ${
                      selectedSize === size
                        ? 'bg-pink-100 text-pink-700 border-pink-300'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Ofertas/Nuevos */}
            <div className="border-t pt-6">
              <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all">
                🎉 Ofertas Especiales
              </button>
              <button className="w-full mt-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all">
                ✨ Nuevos Arrivals
              </button>
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
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
                  >
                    <Link to={`/producto/${product.id}`}>
                      {/* Imagen del producto */}
                      <div className="relative h-64 bg-gray-100 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2">
                              {product.category === 'Vestidos' && '👗'}
                              {product.category === 'Blusas' && '👚'}
                              {product.category === 'Faldas' && '🩱'}
                              {product.category === 'Kimonos' && '🥻'}
                              {product.category === 'Conjuntos' && '👔'}
                            </div>
                            <p className="text-sm text-pink-700 font-medium">{product.name}</p>
                          </div>
                        </div>
                        
                        {/* Overlay con acciones */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          <div className="bg-white p-2 rounded-full text-gray-700 hover:text-pink-600 transition-colors">
                            <HiEye className="h-5 w-5" />
                          </div>
                        </div>

                        {/* Badge de stock bajo */}
                        {product.stock <= 5 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            ¡Solo {product.stock}!
                          </div>
                        )}
                      </div>

                      {/* Información del producto */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-pink-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{product.category} • {product.color}</p>
                        <p className="text-xl font-bold text-pink-600 mb-3">
                          ${product.price.toLocaleString()} {product.currency}
                        </p>
                        
                        {/* Tallas disponibles */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.sizes.map(size => (
                            <span
                              key={size}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {size}
                            </span>
                          ))}
                        </div>

                        {/* Botón agregar al carrito */}
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className="w-full bg-pink-50 text-pink-600 py-2 rounded-lg font-medium hover:bg-pink-100 transition-colors flex items-center justify-center gap-2"
                        >
                          <HiShoppingBag className="h-4 w-4" />
                          Agregar al carrito
                        </button>
                      </div>
                    </Link>
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
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <HiX className="h-5 w-5" />
                  </button>
                </div>

                {/* Repetir la misma estructura de filtros del sidebar */}
                {/* Categorías */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Categorías</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-pink-100 text-pink-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colores */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Colores</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${getColorClass(color)} ${
                          selectedColor === color ? 'ring-2 ring-pink-400 ring-offset-2' : ''
                        }`}
                        title={color}
                      />
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-xs text-gray-500 mt-2">Seleccionado: {selectedColor}</p>
                  )}
                </div>

                {/* Tallas */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Tallas</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.sort().map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                        className={`px-3 py-2 text-sm font-medium border border-gray-200 rounded-lg transition-colors ${
                          selectedSize === size
                            ? 'bg-pink-100 text-pink-700 border-pink-300'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="border-t pt-6 space-y-3">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Limpiar filtros ({activeFiltersCount})
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full bg-pink-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                  >
                    Ver {filteredProducts.length} productos
                  </button>
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