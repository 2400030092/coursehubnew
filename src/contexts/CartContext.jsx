import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Save cart to localStorage whenever it changes
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (course) => {
        setCartItems(prevItems => {
            // Check if course already exists in cart
            const existingItem = prevItems.find(item => item.id === course.id);
            if (existingItem) {
                return prevItems; // Don't add duplicates
            }
            return [...prevItems, { ...course, addedAt: new Date().toISOString() }];
        });
    };

    const removeFromCart = (courseId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== courseId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const isInCart = (courseId) => {
        return cartItems.some(item => item.id === courseId);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price || 0), 0);
    };

    const getCartCount = () => {
        return cartItems.length;
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        getCartTotal,
        getCartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

