import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  variant?: string; // različica npr. "18GA x 1.25"
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productKey: string) => void;
  updateQuantity: (productKey: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const cookieCart = Cookies.get('screws_cart');
    if (cookieCart) {
      try { setCart(JSON.parse(cookieCart)); } 
      catch { Cookies.remove('screws_cart'); }
    } else {
      const storedCart = localStorage.getItem('screws_cart');
      if (storedCart) setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const cartData = JSON.stringify(cart);
    localStorage.setItem('screws_cart', cartData);
    Cookies.set('screws_cart', cartData, { expires: 30 });
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      // UNIQUE key po id + variant + price
      const uniqueKey = product.id + (product.variant || '') + product.price;
      const existingItem = currentCart.find(item => 
        (item.id + (item.variant || '') + item.price) === uniqueKey
      );

      if (existingItem) {
        return currentCart.map(item =>
          (item.id + (item.variant || '') + item.price) === uniqueKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productKey: string) => {
    setCart(currentCart => currentCart.filter(item => (item.id + (item.variant || '') + item.price) !== productKey));
  };

  const updateQuantity = (productKey: string, quantity: number) => {
    if (quantity <= 0) { removeFromCart(productKey); return; }
    setCart(currentCart =>
      currentCart.map(item =>
        (item.id + (item.variant || '') + item.price) === productKey ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}