import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Completed'],
    default: 'Pending',
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
