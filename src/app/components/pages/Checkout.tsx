import { useState } from 'react';
import { useCart } from '../CartContext';
import { toast } from 'sonner';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal: ''
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ AUTO BACKEND URL
  const API_URL =
    window.location.hostname === 'localhost'
      ? 'http://localhost:5000'
      : 'https://screws-shop.onrender.com';

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      toast.error('Izpolnite obvezna polja');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          form,
          cart,
          total: cartTotal
        })
      });

      if (!res.ok) {
        throw new Error('Napaka pri pošiljanju naročila');
      }

      toast.success('Naročilo uspešno oddano!');
      clearCart();

    } catch (error) {
      console.error('FETCH ERROR:', error);
      toast.error('Napaka pri oddaji naročila');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">

      {/* LEFT - FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold">Podatki za dostavo</h2>

        <input name="name" placeholder="Ime in priimek" onChange={handleChange} className="w-full border p-3 rounded" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-3 rounded" />
        <input name="phone" placeholder="Telefon" onChange={handleChange} className="w-full border p-3 rounded" />
        <input name="address" placeholder="Naslov" onChange={handleChange} className="w-full border p-3 rounded" />
        <input name="city" placeholder="Mesto" onChange={handleChange} className="w-full border p-3 rounded" />
        <input name="postal" placeholder="Poštna številka" onChange={handleChange} className="w-full border p-3 rounded" />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600"
        >
          Oddaj naročilo
        </button>
      </form>

      {/* RIGHT - CART */}
      <div className="bg-slate-100 p-4 rounded-lg">
        <h2 className="text-xl mb-4">Povzetek naročila</h2>

        <div className="space-y-3">
          {cart.map(item => {
            const key = item.id + (item.variant || '') + item.price;

            return (
              <div key={key} className="flex justify-between text-sm">
                <span>
                  {item.name} {item.variant && `- ${item.variant}`} x {item.quantity}
                </span>
                <span>€{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            );
          })}
        </div>

        <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
          <span>Skupaj:</span>
          <span>€{cartTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
