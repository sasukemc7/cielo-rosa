import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiSparkles, HiHeart, HiStar, HiShoppingBag } from 'react-icons/hi';
import { MdHighQuality, MdVerified, MdDiamond } from 'react-icons/md';

const Home = () => {

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen">
      
      {/* Hero Principal */}
      <motion.section 
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative min-h-screen bg-gradient-to-br from-pink-50/80 via-pink-50/60 to-purple-50/40 backdrop-blur-3xl pt-32 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="w-4/5 max-w-4xl mx-auto text-center">
          {/* Icono decorativo */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="flex justify-center mb-16"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-gradient-to-r from-pink-400 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center shadow-xl"
            >
              <HiSparkles className="h-10 w-10 text-white" />
            </motion.div>
          </motion.div>

          {/* Título principal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-40 pb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-gray-800 leading-tight mb-6">
              Moda asiática con un{' '}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-pink-600 italic relative inline-block pb-4"
              >
                toque romántico
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"
                />
              </motion.span>
            </h1>
          </motion.div>

          {/* Descripción */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-20"
          >
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubre nuestra colección única inspirada en la elegancia y delicadeza 
              de la moda asiática, diseñada para mujeres que buscan autenticidad y estilo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/productos"
              className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white px-10 py-5 rounded-full font-bold text-xl hover:from-pink-700 hover:to-pink-800 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-300/50 overflow-hidden"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <HiShoppingBag className="h-6 w-6" />
              </motion.div>
              <span>Ver Colección</span>
              
              {/* Efecto de brillo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </Link>

            <Link
              to="/nosotros"
              className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-md text-pink-600 px-10 py-5 rounded-full font-bold text-xl border-2 border-pink-200 hover:bg-pink-50 hover:border-pink-300 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <HiHeart className="h-6 w-6" />
              <span>Nuestra Historia</span>
            </Link>
          </motion.div>

          {/* Elementos decorativos flotantes */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-6 h-6 bg-pink-300 rounded-full opacity-60"
          />
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-32 right-20 w-4 h-4 bg-purple-300 rounded-full opacity-50"
          />
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 8, -8, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-40 left-20 w-8 h-8 bg-pink-200 rounded-full opacity-40"
          />
        </div>
      </motion.section>

      {/* Sección Nuestra Filosofía - Layout Asimétrico */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-50/30 via-white to-purple-50/20 relative overflow-hidden"
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto">
          {/* Layout Split - Texto a la izquierda, Cards a la derecha */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
          
            {/* Lado Izquierdo - Texto Principal */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="flex items-start space-x-4">
                <div>
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-4xl md:text-5xl font-display font-bold text-gray-800 leading-tight"
                  >
                    Nuestra {' '}
                    <span className=" text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">
                      Filosofía
                    </span>
                  </motion.h2>
                </div>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
              >
                Creemos en la belleza de la simplicidad y la elegancia atemporal. 
                Cada pieza está diseñada para <span className="font-semibold text-pink-600">realzar tu esencia única</span> 
                y conectar con la sofisticación asiática moderna.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-pink-200/50"
              >
                <HiHeart className="h-5 w-5 text-pink-500" />
                <span className="text-sm font-medium text-gray-700">Donde tradición y modernidad se encuentran</span>
              </motion.div>
            </motion.div>

            {/* Lado Derecho - Grid de Cards Verticales */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2 space-y-6">
              
              {/* Card Misión */}
              <motion.div 
                whileHover={{ x: 10, scale: 1.02 }}
                className="bg-gradient-to-r from-pink-500/5 to-pink-500/10 backdrop-blur-sm rounded-3xl p-8 border border-pink-200/30 shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-center space-x-4 gap-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                    <MdDiamond className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-bold text-gray-800 mb-2">Misión</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Inspirar confianza a través de prendas que celebran la feminidad moderna.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card Visión */}
              <motion.div 
                whileHover={{ x: 10, scale: 1.02 }}
                className="bg-gradient-to-r from-purple-500/5 to-purple-500/10 backdrop-blur-sm rounded-3xl p-8 border border-purple-200/30 shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-center space-x-4 gap-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                    <HiStar className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-bold text-gray-800 mb-2">Visión</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Ser la marca líder en moda asiática contemporánea, fusionando tradición con innovación.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card Valores */}
              <motion.div 
                whileHover={{ x: 10, scale: 1.02 }}
                className="bg-gradient-to-r from-indigo-500/5 to-indigo-500/10 backdrop-blur-sm rounded-3xl p-8 border border-indigo-200/30 shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-center space-x-4 gap-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                    <HiHeart className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-bold text-gray-800 mb-2">Valores</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Calidad, autenticidad y respeto por las raíces culturales que nos inspiran.
                    </p>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Lookbook Inspiracional - Layout Creativo en Zigzag */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-bl from-purple-50/20 via-pink-50/10 to-white relative overflow-hidden"
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-40 left-20 w-40 h-40 bg-pink-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-200/15 rounded-full blur-2xl"></div>
        
        <div className="flex flex-col gap-5 max-w-7xl mx-auto">
          
          {/* Header Centrado */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-display font-bold mb-6"
            >
              <span className="text-gray-800 ">Nuestras </span>
              <span className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text">
                Colecciones
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl leading-relaxed"
            >
              Cada colección cuenta una historia única de elegancia y autenticidad
            </motion.p>
          </motion.div>

          {/* Layout Zigzag - Sakura (Izquierda) */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-40">
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="bg-gradient-to-br from-pink-400/20 to-pink-500/30 rounded-[3rem] p-12 backdrop-blur-sm border border-pink-200/50 shadow-2xl relative overflow-hidden">
                {/* Elementos flotantes */}
                <div className="absolute top-6 right-6 w-20 h-20 bg-pink-300/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 bg-pink-400/30 rounded-full blur-lg"></div>
                
                <div className="relative z-10 text-center">
                  <motion.div
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -10, 10, 0] 
                    }}
                    transition={{ duration: 0.6 }}
                    className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"
                  >
                    <HiSparkles className="h-12 w-12 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-display font-bold text-gray-800 mb-4">Colección Sakura</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Inspirada en la delicadeza de las flores de cerezo japonesas
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="space-y-12"
            >
              <div className="flex items-center space-x-4 gap-2">
                <div className="w-2 h-24 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full"></div>
                <div>
                  <h4 className="text-2xl font-display font-bold text-gray-800 mb-2">Primavera Elegante</h4>
                  <p className="text-gray-600 leading-relaxed max-w-md">
                    Colores suaves y texturas delicadas que capturan la esencia de la renovación primaveral 
                    con un toque de sofisticación oriental.
                  </p>
                </div>
              </div>
              
              <motion.div 
                whileHover={{ x: 10 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100/50"
              >
                <div className="flex gap-2 items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-pink-400 rounded-lg flex items-center justify-center">
                    <HiStar className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Características</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sedas naturales, bordados florales, cortes fluidos y detalles en tonos rosa sakura
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Layout Zigzag - Mariposa (Derecha) */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-40">
            <motion.div 
              variants={itemVariants}
              className="space-y-12 lg:order-2"
            >
              <div className="flex items-center space-x-4 gap-2">
                <div className="w-2 h-24 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"></div>
                <div>
                  <h4 className="text-2xl font-display font-bold text-gray-800 mb-2">Transformación Natural</h4>
                  <p className="text-gray-600 leading-relaxed max-w-md">
                    Diseños que celebran la metamorfosis y la belleza de la transformación, 
                    inspirados en el vuelo grácil de las mariposas.
                  </p>
                </div>
              </div>
              
              <motion.div 
                whileHover={{ x: -10 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100/50"
              >
                <div className="flex gap-2 items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-purple-400 rounded-lg flex items-center justify-center">
                    <HiHeart className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Esencia</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Estampados únicos, vuelos etéreos, degradados sutiles y movimiento natural
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="relative lg:order-1"
            >
              <div className="bg-gradient-to-br from-purple-400/20 to-purple-500/30 rounded-[3rem] p-12 backdrop-blur-sm border border-purple-200/50 shadow-2xl relative overflow-hidden">
                {/* Elementos flotantes */}
                <div className="absolute top-8 left-6 w-16 h-16 bg-purple-300/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-6 right-8 w-20 h-20 bg-purple-400/30 rounded-full blur-lg"></div>
                
                <div className="relative z-10 text-center">
                  <motion.div
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, 10, -10, 0] 
                    }}
                    transition={{ duration: 0.6 }}
                    className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"
                  >
                    <HiHeart className="h-12 w-12 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-display font-bold text-gray-800 mb-4">Colección Mariposa</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Elegancia natural que refleja transformación y libertad
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Layout Zigzag - Jardín (Izquierda) */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="bg-gradient-to-br from-emerald-400/20 to-teal-500/30 rounded-[3rem] p-12 backdrop-blur-sm border border-emerald-200/50 shadow-2xl relative overflow-hidden">
                {/* Elementos flotantes */}
                <div className="absolute top-10 right-10 w-24 h-24 bg-emerald-300/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 left-6 w-14 h-14 bg-teal-400/30 rounded-full blur-lg"></div>
                
                <div className="relative z-10 text-center">
                  <motion.div
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0] 
                    }}
                    transition={{ duration: 0.6 }}
                    className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"
                  >
                    <MdDiamond className="h-12 w-12 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-display font-bold text-gray-800 mb-4">Colección Jardín</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Frescura y vitalidad de los jardines zen asiáticos
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="space-y-12"
            >
              <div className="flex items-center space-x-4 gap-2">
                <div className="w-2 h-24 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full"></div>
                <div>
                  <h4 className="text-2xl font-display font-bold text-gray-800 mb-2">Armonía Verde</h4>
                  <p className="text-gray-600 leading-relaxed max-w-md">
                    Inspirada en la serenidad de los jardines tradicionales, donde cada elemento 
                    encuentra su lugar perfecto en equilibrio natural.
                  </p>
                </div>
              </div>
              
              <motion.div 
                whileHover={{ x: 10 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100/50"
              >
                <div className="flex gap-2 items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-emerald-400 rounded-lg flex items-center justify-center">
                    <HiSparkles className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Naturaleza</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Fibras orgánicas, verdes naturales, texturas vegetales y patrones zen minimalistas
                </p>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </motion.section>

      {/* Valores Diferenciales - Layout con Tarjetas Flotantes */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-pink-50/20 via-white to-purple-50/30 relative overflow-hidden"
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-32 left-20 w-28 h-28 bg-pink-200/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-20 w-36 h-36 bg-purple-200/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto">
          
          {/* Header con diseño único */}
          <motion.div variants={itemVariants} className="text-center mb-24">
            <div className="flex justify-center items-center space-x-6 mb-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-1 h-5 bg-gradient-to-b from-pink-400 to-purple-600 rounded-full"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <MdDiamond className="h-8 w-8 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-1 h-5 bg-gradient-to-b from-purple-600 to-pink-400 rounded-full"
              />
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-8"
            >
              ¿Por qué <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">elegirnos</span>?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-gray-600 max-w-3xl leading-relaxed"
            >
              Los valores que nos distinguen en el mundo de la moda asiática contemporánea
            </motion.p>
          </motion.div>

          {/* Grid con diseño escalonado */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1 - Calidad */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ 
                y: -12,
                rotate: [0, 1, -1, 0]
              }}
              className="group bg-gradient-to-br from-white to-pink-50/50 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border border-pink-100/50 relative overflow-hidden"
            >
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, 0]
                  }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-pink-300/50"
                >
                  <MdHighQuality className="h-10 w-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-display font-bold text-gray-800 mb-6 text-center group-hover:text-pink-700 transition-colors">
                  Calidad Premium
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-center group-hover:text-gray-700 transition-colors">
                  Utilizamos solo los mejores materiales y técnicas de confección artesanal para 
                  garantizar prendas duraderas que trascienden tendencias.
                </p>
                
                <div className="flex justify-center mt-6">
                  <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Autenticidad (Elevada) */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ 
                y: -12,
                rotate: [0, -1, 1, 0]
              }}
              className="group bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border border-purple-100/50 relative overflow-hidden transform md:-translate-y-8"
            >
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-purple-300/50"
                >
                  <MdVerified className="h-10 w-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-display font-bold text-gray-800 mb-6 text-center group-hover:text-purple-700 transition-colors">
                  Autenticidad
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-center group-hover:text-gray-700 transition-colors">
                  Cada diseño nace del respeto profundo por la cultura asiática, reinterpretada 
                  con elegancia contemporánea y sensibilidad moderna.
                </p>
                
                <div className="flex justify-center mt-6">
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Elegancia */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ 
                y: -12,
                rotate: [0, 1, -1, 0]
              }}
              className="group bg-gradient-to-br from-white to-indigo-50/50 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border border-indigo-100/50 relative overflow-hidden"
            >
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-indigo-300/50"
                >
                  <HiStar className="h-10 w-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-display font-bold text-gray-800 mb-6 text-center group-hover:text-indigo-700 transition-colors">
                  Elegancia Atemporal
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-center group-hover:text-gray-700 transition-colors">
                  Nuestras creaciones están diseñadas para realzar la belleza natural de cada mujer 
                  con sofisticación, gracia y un toque de distinción única.
                </p>
                
                <div className="flex justify-center mt-6">
                  <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

    </div>
  );
};

export default Home;