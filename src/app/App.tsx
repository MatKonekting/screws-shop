import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import Shop from './components/pages/Shop';
import ProductDetail from './components/pages/ProductDetail';
import DesignYours from './components/pages/DesignYours';
import Contact from './components/pages/Contact';
import Checkout from './components/pages/Checkout';
import LiveOrders from './components/pages/LiveOrders';

import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';
import { Toaster } from './components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <>
      <ScrollToTop />

      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-slate-50">

            <Header />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/products" element={<Products />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/product/:id" element={<ProductDetail />} />
                <Route path="/design-yours" element={<DesignYours />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/live-orders" element={<LiveOrders />} />
              </Routes>
            </main>

            <Footer />
            <Toaster />
          </div>
        </CartProvider>
      </AuthProvider>
    </>
  );
}