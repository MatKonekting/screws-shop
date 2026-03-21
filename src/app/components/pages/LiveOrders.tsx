import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type Order = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
};

// socket naredimo samo enkrat
const socket: Socket = io("http://localhost:5000");

export default function LiveOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const handleNewOrder = (order: Order) => {
      console.log("🔥 Novo naročilo:", order);
      setOrders((prev) => [order, ...prev]);
    };

    socket.on("newOrder", handleNewOrder);

    return () => {
      socket.off("newOrder", handleNewOrder);
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Live naročila 🔥</h1>

      {orders.length === 0 && <p>Ni še naročil...</p>}

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded bg-white shadow">
            <p><b>Ime:</b> {order.name}</p>
            <p><b>Email:</b> {order.email}</p>
            <p><b>Telefon:</b> {order.phone}</p>

            <p className="mt-2"><b>Izdelki:</b></p>
            {order.items.map((item, i) => (
              <p key={i} className="text-sm">
                - {item.name} x{item.quantity} (€{item.price})
              </p>
            ))}

            <p className="mt-2 font-semibold">
              Skupaj: €{order.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}