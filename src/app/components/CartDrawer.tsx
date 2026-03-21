import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from './CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import { toast } from 'sonner';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  if (!open) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl">Nakupovalna košarica</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-grow overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Vaša košarica je prazna</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => {
                const itemKey = item.id + (item.variant || '') + item.price;

                return (
                  <div key={itemKey} className="flex gap-4 border rounded-lg p-3">
                    
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded" 
                    />

                    <div className="flex-grow">
                      <h3 className="text-sm">
                        {item.name} {item.variant && `- ${item.variant}`}
                      </h3>

                      <p className="text-sm text-slate-500">
                        €{item.price.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-2 mt-2">

                        <button
                          onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                          className="p-1 hover:bg-slate-100 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <span className="w-8 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                          className="p-1 hover:bg-slate-100 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => removeFromCart(itemKey)}
                          className="ml-auto p-1 hover:bg-red-50 text-red-500 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="border-t p-4 space-y-3">
            
            <div className="flex items-center justify-between text-lg">
              <span>Skupaj:</span>
              <span className="font-semibold">
                €{cartTotal.toFixed(2)}
              </span>
            </div>

            <button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded"
              onClick={handleCheckout}
            >
              Zaključi nakup
            </button>

            <button
              onClick={clearCart}
              className="w-full text-sm text-slate-500 hover:text-slate-700"
            >
              Izprazni košarico
            </button>

          </div>
        )}

        <AuthModal 
          open={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />

      </div>
    </>
  );
}