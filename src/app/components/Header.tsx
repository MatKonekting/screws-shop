import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import AuthModal from './AuthModal';
import CartDrawer from './CartDrawer';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Domov', href: '/' },
    { name: 'O nas', href: '/about' },
    { name: 'Storitve', href: '/services' },
    { name: 'Produkti', href: '/products' },
    { name: 'Trgovina', href: '/shop' },
    { name: 'Oblikuj svoje', href: '/design-yours' },
    { name: 'Kontakt', href: '/contact' },
  ];

  // ✅ FIX ZA TYPESCRIPT
  const isActiveRoute = (href: string): boolean => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-lg">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* LOGO */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-slate-700 rounded" />
                <span className="text-xl">SCREWS</span>
              </Link>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => {
                  const isActive = isActiveRoute(item.href);

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-orange-500 text-white'
                          : 'text-white hover:bg-slate-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center space-x-4">

              {user ? (
                <div className="hidden md:flex items-center space-x-3">
                  <span className="text-sm text-slate-300">
                    Pozdravljeni, {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="p-2 hover:bg-slate-800 rounded-full"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="hidden md:flex items-center space-x-2 px-4 py-2 bg-orange-500 rounded-md"
                >
                  <User className="w-4 h-4" />
                  <span>Prijava</span>
                </button>
              )}

              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative p-2 hover:bg-slate-800 rounded-full"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
{/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const isActive = isActiveRoute(item.href);

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <div className="border-t border-slate-700 pt-2 mt-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-slate-300">

            </div>
          </div>
        </nav>
      </header>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </>
  );
}
