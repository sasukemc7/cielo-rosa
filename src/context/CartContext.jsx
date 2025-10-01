import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Tipos para TypeScript-like structure
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Estado inicial del carrito
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// Función para calcular totales
const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalItems, totalPrice };
};

// Reductor del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, size } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id && item.selectedSize === size
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Si el producto ya existe con la misma talla, aumentar cantidad
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      } else {
        // Si es un producto nuevo, agregarlo
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          selectedSize: size,
          quantity: 1,
          stock: product.stock,
          category: product.category
        };
        newItems = [...state.items, newItem];
      }

      const totals = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { productId, size } = action.payload;
      const newItems = state.items.filter(
        item => !(item.id === productId && item.selectedSize === size)
      );
      const totals = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, size, quantity } = action.payload;
      const newItems = state.items.map(item =>
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity: Math.max(0, Math.min(quantity, item.stock)) }
          : item
      ).filter(item => item.quantity > 0);
      
      const totals = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return initialState;
    }

    case CART_ACTIONS.LOAD_CART: {
      const items = action.payload || [];
      const totals = calculateTotals(items);
      return {
        items,
        ...totals
      };
    }

    default:
      return state;
  }
};

// Crear contexto
const CartContext = createContext();

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('cieloRosaCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error al cargar el carrito desde localStorage:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cieloRosaCart', JSON.stringify(state.items));
  }, [state.items]);

  // Funciones del carrito
  const addToCart = (product, size) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, size }
    });
  };

  const removeFromCart = (productId, size) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { productId, size }
    });
  };

  const updateQuantity = (productId, size, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { productId, size, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getCartItemCount = () => {
    return state.totalItems;
  };

  const getCartTotal = () => {
    return state.totalPrice;
  };

  const isInCart = (productId, size) => {
    return state.items.some(item => item.id === productId && item.selectedSize === size);
  };

  const getItemQuantity = (productId, size) => {
    const item = state.items.find(item => item.id === productId && item.selectedSize === size);
    return item ? item.quantity : 0;
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;