import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHeart, HiSparkles, HiStar, HiHome, HiShoppingBag } from 'react-icons/hi';

const AboutUs = () => {
  const founders = [
    {
      name: "Simón Durán",
      role: "Co-Fundador",
      emoji: "👨‍💼",
      color: "from-blue-400 to-purple-600",
      bgColor: "from-blue-50 to-purple-50"
    },
    {
      name: "Maria Fernanda Alfonso",
      role: "Co-Fundadora", 
      emoji: "👩‍🎨",
      color: "from-pink-400 to-rose-600",
      bgColor: "from-pink-50 to-rose-50"
    },
    {
      name: "Salome Zuluaga",
      role: "Co-Fundadora",
      emoji: "👩‍💼",
      color: "from-purple-400 to-pink-600",
      bgColor: "from-purple-50 to-pink-50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, rotateY: 90, scale: 0.8 },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-pink-200/20 to-purple-200/20"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1
            }}
            style={{
              left: `${10 + i * 20}%`,
              top: `${15 + (i % 2) * 40}%`
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2 z-10 w-4/5 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section en Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 text-center mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🌸
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-display font-black bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
              Sobre Nosotros
            </h1>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 1 }}
            >
              ✨
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Bienvenido a <span className="font-bold text-pink-600">Cielo Rosa</span>, 
              donde la moda se encuentra con la pasión y la elegancia.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Somos una empresa fundada con el sueño de ofrecer ropa femenina única, 
              combinando tendencias actuales con la comodidad y calidad que nuestras clientas merecen.
            </p>
          </motion.div>
        </motion.div>

        {/* Founders Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-display font-bold text-center text-gray-800 mb-4 flex items-center justify-center gap-3"
          >
            <HiHeart className="h-8 w-8 text-pink-500" />
            Nuestro Equipo Fundador
            <HiSparkles className="h-8 w-8 text-purple-500" />
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Tres visionarios unidos por la pasión de crear una marca que represente 
            la belleza, elegancia y estilo único de cada mujer.
          </motion.p>

          {/* Cards de los fundadores */}
          <div className="grid md:grid-cols-3 gap-6">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  y: -8, 
                  scale: 1.03
                }}
                className="group"
              >
                <div className={`bg-gradient-to-br ${founder.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 backdrop-blur-sm relative overflow-hidden h-full`}>
                  {/* Efecto de brillo */}
                  <motion.div
                    animate={{ x: [-100, 300] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, delay: index * 0.7 }}
                    className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                  />
                  
                  <div className="relative text-center">
                    {/* Avatar */}
                    <motion.div 
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="text-5xl mb-4 inline-block"
                    >
                      {founder.emoji}
                    </motion.div>
                    
                    {/* Nombre */}
                    <h3 className={`text-xl font-display font-bold bg-gradient-to-r ${founder.color} bg-clip-text text-transparent mb-2`}>
                      {founder.name}
                    </h3>
                    
                    {/* Rol */}
                    <p className="text-gray-600 font-medium mb-3">
                      {founder.role}
                    </p>
                    
                    {/* Decoración */}
                    <div className="flex justify-center gap-1 mb-3">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            delay: i * 0.2 + index * 0.1 
                          }}
                        >
                          <HiStar className="h-3 w-3 text-pink-400" />
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Descripción */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Visionario fundador de Cielo Rosa, aportando creatividad y pasión por la moda femenina.
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section en Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 text-center"
        >
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/productos"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-pink-700 hover:to-pink-800 transition-all shadow-lg hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <HiShoppingBag className="h-5 w-5" />
                </motion.div>
                <span>Explorar Colección</span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="group inline-flex items-center gap-3 bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-pink-50 transition-all shadow-lg hover:shadow-xl border-2 border-pink-200 hover:border-pink-300"
              >
                <motion.div
                  whileHover={{ x: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <HiHome className="h-5 w-5" />
                </motion.div>
                <span>Volver al Inicio</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;