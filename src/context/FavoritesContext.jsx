import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos del localStorage al inicializar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('cieloRosaFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Función para agregar/quitar favoritos
  const toggleFavorite = (productId) => {
    const newFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];
    
    setFavorites(newFavorites);
    localStorage.setItem('cieloRosaFavorites', JSON.stringify(newFavorites));
  };

  // Verificar si un producto está en favoritos
  const isFavorite = (productId) => favorites.includes(productId);

  // Obtener todos los favoritos
  const getFavorites = () => favorites;

  // Limpiar todos los favoritos
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('cieloRosaFavorites');
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavorites,
    clearFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};