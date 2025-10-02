import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiShoppingBag, HiArrowLeft, HiSparkles } from 'react-icons/hi';

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculos flotantes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-pink-200/30 to-purple-200/30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`
            }}
          />
        ))}
        
        {/* Flores flotantes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`flower-${i}`}
            className="absolute text-4xl opacity-20"
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            style={{
              right: `${5 + i * 15}%`,
              top: `${10 + (i % 4) * 20}%`
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* Contenido principal */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="relative z-10 text-center max-w-2xl mx-4"
      >
        {/* Card principal */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50"
        >
          {/* Número 404 épico */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="relative mb-8"
          >
            <motion.h1 
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="text-8xl md:text-9xl font-black bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-4"
              style={{ 
                backgroundSize: "200% 100%"
              }}
            >
              404
            </motion.h1>
          </motion.div>

          {/* Emoji central animado */}
          <motion.div 
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="text-6xl mb-6"
          >
            🌸
          </motion.div>

          {/* Título principal */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent mb-4"
          >
            ¡Oops! Página no encontrada
          </motion.h2>

          {/* Descripción */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 text-lg leading-relaxed mb-8"
          >
            Parece que te has perdido en nuestro jardín digital. 
            <br />
            La página que buscas no existe o ha sido movida a otro lugar.
          </motion.p>

          {/* Sugerencias con iconos */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-8"
          >
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <HiSparkles className="h-5 w-5 text-pink-500" />
              ¿Qué te gustaría hacer?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>Explora nuestra colección de ropa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Revisa tu carrito de compras</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>Descubre nuestros favoritos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Regresa a la página principal</span>
              </div>
            </div>
          </motion.div>

          {/* Botones de acción */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-pink-700 hover:to-pink-800 transition-all shadow-lg hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ x: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <HiHome className="h-5 w-5" />
                </motion.div>
                <span>Ir al inicio</span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/productos"
                className="group inline-flex items-center gap-3 bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-pink-50 transition-all shadow-lg hover:shadow-xl border-2 border-pink-200 hover:border-pink-300"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <HiShoppingBag className="h-5 w-5" />
                </motion.div>
                <span>Ver productos</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mensaje de navegación */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-sm text-gray-500 mt-6 flex items-center justify-center gap-2"
          >
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HiArrowLeft className="h-4 w-4" />
            </motion.div>
            <span>O usa el botón de retroceso de tu navegador</span>
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Elemento decorativo inferior */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-pink-300 text-2xl"
        >
          ✨
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;