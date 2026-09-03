import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENCIES, BEVERAGES } from '../data/beverages';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Currency state
  const [currency, setCurrency] = useState('USD'); // 'USD' | 'INR' | 'EUR'

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('beverage_vault_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter & Search state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-asc' | 'price-desc' | 'caffeine' | 'rating'
  const [onlyZeroSugar, setOnlyZeroSugar] = useState(false);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  // Age verification state
  const [isAgeVerified, setIsAgeVerified] = useState(() => {
    return localStorage.getItem('beverage_vault_age_verified') === 'true';
  });
  const [showAgeModal, setShowAgeModal] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('beverage_vault_cart', JSON.stringify(cart));
  }, [cart]);

  // Add toast notification
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Age Verification helper
  const verifyAge = (granted) => {
    if (granted) {
      setIsAgeVerified(true);
      localStorage.setItem('beverage_vault_age_verified', 'true');
      setShowAgeModal(false);
      setSelectedCategory('beer');
      addToast('Age verified! Welcome to the Beer & Craft section.', 'info');
    } else {
      setShowAgeModal(false);
      addToast('Must be 18+ to view alcoholic beverages.', 'error');
    }
  };

  const handleCategorySelect = (catId) => {
    if (catId === 'beer' && !isAgeVerified) {
      setShowAgeModal(true);
      return;
    }
    setSelectedCategory(catId);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    if (product.isAlcoholic && !isAgeVerified) {
      setShowAgeModal(true);
      return;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });

    addToast(`Added ${quantity}x ${product.name} to cart! 🥤`);
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Price Calculation Helpers
  const getProductPriceNum = (product) => {
    return product.price[currency] || product.price['USD'];
  };

  const formatPrice = (priceObj) => {
    const symbol = CURRENCIES[currency]?.symbol || '$';
    const amount = priceObj[currency] || priceObj['USD'];
    return `${symbol}${amount.toFixed(2)}`;
  };

  const cartSubtotal = cart.reduce((acc, item) => {
    return acc + getProductPriceNum(item.product) * item.quantity;
  }, 0);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Free shipping threshold logic ($25 / ₹500 / €25)
  const freeShippingThresholds = { USD: 25, INR: 500, EUR: 25 };
  const targetFreeShip = freeShippingThresholds[currency];
  const shippingCost = cartSubtotal >= targetFreeShip || cartSubtotal === 0 ? 0 : 3.99 * CURRENCIES[currency].rate;
  const cartTotal = cartSubtotal + shippingCost;

  return (
    <StoreContext.Provider
      value={{
        currency,
        setCurrency,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTotal,
        cartItemCount,
        shippingCost,
        targetFreeShip,
        formatPrice,
        getProductPriceNum,
        selectedCategory,
        setSelectedCategory: handleCategorySelect,
        selectedBrand,
        setSelectedBrand,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        onlyZeroSugar,
        setOnlyZeroSugar,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        showCheckout,
        setShowCheckout,
        showQuiz,
        setShowQuiz,
        isAgeVerified,
        showAgeModal,
        setShowAgeModal,
        verifyAge,
        toasts,
        addToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
