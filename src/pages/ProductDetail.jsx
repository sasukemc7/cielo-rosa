import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiShoppingBag, HiHeart, HiShare, HiChevronLeft, HiChevronRight, HiSparkles } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Buscar el producto
  const product = useMemo(() => {
    return productsData.find(p => p.id === id);
  }, [id]);

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
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart(product, selectedSize);
    setIsAddingToCart(false);
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
    <div className="min-h-screen bg-gray-50">
      <div className="w-4/5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb y botón volver */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
          >
            <HiArrowLeft className="h-5 w-5" />
            <span>Volver</span>
          </button>
          <div className="text-sm text-gray-500">
            <Link to="/" className="hover:text-pink-600">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/productos" className="hover:text-pink-600">Productos</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{product.name}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Galería de imágenes */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">
                    {product.category === 'Vestidos' && '👗'}
                    {product.category === 'Blusas' && '👚'}
                    {product.category === 'Faldas' && '🩱'}
                    {product.category === 'Kimonos' && '🥻'}
                    {product.category === 'Conjuntos' && '👔'}
                  </div>
                  <p className="text-pink-700 font-display text-2xl font-semibold">{product.name}</p>
                  <p className="text-pink-600 text-lg">Imagen {currentImageIndex + 1} de {product.images.length}</p>
                </div>
              </div>

              {/* Controles de navegación de imágenes */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <HiChevronLeft className="h-6 w-6 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <HiChevronRight className="h-6 w-6 text-gray-700" />
                  </button>
                </>
              )}

              {/* Indicadores de imagen */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-pink-600' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Miniaturas */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-pink-400' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                      <span className="text-2xl">
                        {product.category === 'Vestidos' && '👗'}
                        {product.category === 'Blusas' && '👚'}
                        {product.category === 'Faldas' && '🩱'}
                        {product.category === 'Kimonos' && '🥻'}
                        {product.category === 'Conjuntos' && '👔'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-lg text-gray-600">{product.category}</span>
                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  {product.color}
                </span>
              </div>
              <div className="text-3xl font-bold text-pink-600 mb-4">
                ${product.price.toLocaleString()} {product.currency}
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Selector de talla */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Talla {selectedSize && `(${selectedSize})`}
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'border-pink-400 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock disponible */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                product.stock > 10 ? 'bg-green-400' : 
                product.stock > 5 ? 'bg-yellow-400' : 'bg-red-400'
              }`} />
              <span className="text-sm text-gray-600">
                {product.stock > 10 ? 'En stock' : 
                 product.stock > 5 ? `Solo ${product.stock} disponibles` : 
                 `¡Últimas ${product.stock} unidades!`}
              </span>
            </div>

            {/* Botones de acción */}
            <div className="space-y-4">
              {/* Agregar al carrito */}
              <motion.button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock === 0}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : isAddingToCart
                    ? 'bg-green-500 text-white'
                    : isInCartWithSize
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-pink-600 text-white hover:bg-pink-700 shadow-lg hover:shadow-xl'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isAddingToCart ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Agregando...
                    </motion.div>
                  ) : isInCartWithSize ? (
                    <Link
                      to="/carrito"
                      className="flex items-center gap-2"
                    >
                      <HiShoppingBag className="h-5 w-5" />
                      Ver en carrito ({currentQuantity})
                    </Link>
                  ) : product.stock === 0 ? (
                    'Agotado'
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <HiShoppingBag className="h-5 w-5" />
                      Agregar al carrito
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Botones secundarios */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
                  <HiHeart className="h-5 w-5" />
                  Favoritos
                </button>
                <button className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
                  <HiShare className="h-5 w-5" />
                  Compartir
                </button>
              </div>
            </div>

            {/* Información adicional */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <HiShoppingBag className="h-4 w-4 text-green-600" />
                <span>Envío gratis en compras superiores a $100.000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <HiArrowLeft className="h-4 w-4 text-blue-600" />
                <span>Devoluciones gratis hasta 30 días</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <HiSparkles className="h-4 w-4 text-pink-600" />
                <span>Producto 100% auténtico</span>
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
    </div>
  );
};

export default ProductDetail;