import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Attach Socket.io instance via middleware
export function attachIO(io) {
  return (req, res, next) => {
    req.io = io;
    next();
  };
}

// GET /api/orders — fetch active (non-completed) orders for Chef reconnection
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : { status: { $ne: 'Completed' } };
    const orders = await Order.find(filter).sort({ timestamp: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/history — fetch completed orders (archive)
router.get('/history', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const orders = await Order.find({
      status: 'Completed',
      timestamp: { $gte: today },
    }).sort({ timestamp: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
});

// POST /api/orders — create order & emit to kitchen
router.post('/', async (req, res) => {
  try {
    const { tableNumber, items } = req.body;

    if (!tableNumber || !items || items.length === 0) {
      return res.status(400).json({ error: 'Table number and items are required' });
    }

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderId = `ORD_${Date.now().toString(36).toUpperCase()}`;

    const order = new Order({
      orderId,
      tableNumber: Number(tableNumber),
      items,
      totalAmount,
      status: 'Pending',
      timestamp: new Date(),
    });

    await order.save();

    // Emit real-time event to Chef Dashboard
    req.io.emit('order:placed', order);

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// PATCH /api/orders/:id/status — update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Preparing', 'Completed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Emit status update in real-time
    req.io.emit('order:status-updated', order);

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
