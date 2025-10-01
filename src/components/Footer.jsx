import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiSparkles, 
  HiHeart, 
  HiMail, 
  HiPhone, 
  HiLocationMarker,
  HiShoppingBag
} from 'react-icons/hi';
import { 
  MdEmail,
  MdSend
} from 'react-icons/md';
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
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

  return (
    <footer className="relative bg-gradient-to-br from-pink-300  to-pink-500 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-300 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 bg-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-20 w-20 h-20 bg-purple-200 rounded-full blur-xl"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10"
      >

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="w-4/5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              
              {/* Brand Section */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <Link to="/" className="inline-block mb-6">
                  <img 
                    src="/logo.png" 
                    alt="Cielo Rosa Logo" 
                    className="h-16 w-auto object-contain hover:scale-110 transition-transform duration-300"
                  />
                </Link>
                <p className="text-pink-100 text-lg leading-relaxed mb-6">
                  Moda asiática con un toque romántico. Diseñamos prendas únicas para mujeres que buscan elegancia y autenticidad.
                </p>
                <div className="flex space-x-4">
                  {[
                    { icon: FaFacebook, color: 'hover:text-blue-400' },
                    { icon: FaInstagram, color: 'hover:text-pink-400' },
                    { icon: FaWhatsapp, color: 'hover:text-green-400' },
                    { icon: MdEmail, color: 'hover:text-purple-400' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.2, y: -2 }}
                      className={`w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-pink-200 ${social.color} transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      <social.icon className="h-6 w-6" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={itemVariants}>
                <h4 className="text-2xl font-display font-bold mb-8">Enlaces Rápidos</h4>
                <ul className="space-y-4">
                  {[
                    { name: 'Inicio', path: '/' },
                    { name: 'Productos', path: '/productos' },
                    { name: 'Sobre Nosotros', path: '/nosotros' },
                    { name: 'Mi Carrito', path: '/carrito' }
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-pink-100 hover:text-white transition-colors duration-300 flex items-center group"
                      >
                        <HiSparkles className="h-4 w-4 mr-3 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Collections */}
              <motion.div variants={itemVariants}>
                <h4 className="text-2xl font-display font-bold mb-8">Colecciones</h4>
                <ul className="space-y-4">
                  {[
                    'Colección Sakura',
                    'Colección Mariposa', 
                    'Colección Jardín',
                    'Últimos Lanzamientos'
                  ].map((collection, index) => (
                    <li key={index}>
                      <Link
                        to="/productos"
                        className="text-pink-100 hover:text-white transition-colors duration-300 flex items-center group"
                      >
                        <HiHeart className="h-4 w-4 mr-3 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                        {collection}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={itemVariants}>
                <h4 className="text-2xl font-display font-bold mb-8">Contacto</h4>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <HiLocationMarker className="h-5 w-5 text-pink-400 mr-4 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-pink-100">
                        Calle de la Moda 123<br />
                        Ciudad Romántica, CR 45678
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center group">
                    <HiPhone className="h-5 w-5 text-pink-400 mr-4 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-pink-100">+1 (555) 123-4567</p>
                  </div>
                  
                  <div className="flex items-center group">
                    <HiMail className="h-5 w-5 text-pink-400 mr-4 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-pink-100">hola@cielorosa.com</p>
                  </div>
                  
                  <div className="flex items-center group">
                    <HiShoppingBag className="h-5 w-5 text-pink-400 mr-4 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-pink-100">Lun - Vie: 9:00 - 18:00</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-pink-600/30 py-8"
        >
          <div className="w-4/5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <HiHeart className="h-5 w-5 text-pink-400" />
                <p className="text-pink-100">
                  © 2024 Cielo Rosa. Hecho con amor para mujeres extraordinarias.
                </p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-pink-200 hover:text-white transition-colors duration-300">
                  Términos de Servicio
                </a>
                <a href="#" className="text-pink-200 hover:text-white transition-colors duration-300">
                  Política de Privacidad
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;