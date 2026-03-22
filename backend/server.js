const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

console.log('SERVER STARTING...');

const app = express();
const server = http.createServer(app);

// ✅ SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// middleware
app.use(cors());
app.use(express.json());

// 🔌 SOCKET CONNECTION
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
});

// ✅ POVEZAVA NA MONGO ATLAS (CLOUD)
mongoose.connect('mongodb+srv://Matija:Matija123@screws.vdgo6qw.mongodb.net/?appName=Screws')
  .then(() => console.log('MongoDB povezan ☁️'))
  .catch(err => console.error('MongoDB error:', err));

// ✅ SCHEMA
const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  postal: String,
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// model
const Order = mongoose.model('Order', orderSchema);

// test route
app.get('/', (req, res) => {
  res.send('Server deluje 🚀');
});

// ✅ POST ORDER
app.post('/order', async (req, res) => {
  try {
    const { form, cart, total } = req.body;

    if (!form || !cart) {
      return res.status(400).json({ message: 'Manjkajo podatki' });
    }

    const simplifiedCart = cart.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    const newOrder = new Order({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      postal: form.postal,
      items: simplifiedCart,
      total
    });

    await newOrder.save();

    console.log(`\n--- NOVO NAROČILO ---`);
    console.log(`Ime: ${form.name}`);
    console.log(`Email: ${form.email}`);
    console.log(`Skupaj: €${total}`);
    console.log(`---------------------\n`);

    // 🚀 LIVE UPDATE
    io.emit('newOrder', newOrder);

    res.json({ message: 'Naročilo shranjeno v bazo' });

  } catch (error) {
    console.error('NAPAKA:', error);
    res.status(500).json({ message: 'Napaka pri shranjevanju' });
  }
});

// 🚀 zagon serverja
server.listen(5000, () => {
  console.log('Server teče na http://localhost:5000');
});
