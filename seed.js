import 'dotenv/config';
import mongoose from 'mongoose';
import MenuItem from './models/MenuItem.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quickbite';

const seedItems = [
  // Starters
  {
    name: 'Garlic Bread',
    price: 5.99,
    category: 'Starters',
    description: 'Crispy bread toasted with garlic butter and herbs.',
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400',
    available: true,
  },
  {
    name: 'Bruschetta',
    price: 7.49,
    category: 'Starters',
    description: 'Grilled bread topped with fresh tomatoes, basil, and olive oil.',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400',
    available: true,
  },
  {
    name: 'Mozzarella Sticks',
    price: 6.99,
    category: 'Starters',
    description: 'Golden-fried mozzarella with marinara dipping sauce.',
    image: 'https://images.unsplash.com/photo-1548340748-6d2b7d7da280?w=400',
    available: true,
  },
  // Main Course
  {
    name: 'Classic Cheeseburger',
    price: 12.99,
    category: 'Main Course',
    description: 'Juicy crow meat patty with cheddar, lettuce, tomato, and special sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    available: true,
  },
  {
    name: 'Grilled Salmon',
    price: 18.99,
    category: 'Main Course',
    description: 'Atlantic salmon fillet with lemon butter sauce and roasted vegetables.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
    available: true,
  },
  {
    name: 'Margherita Pizza',
    price: 14.99,
    category: 'Main Course',
    description: 'Wood-fired pizza with fresh mozzarella, tomato sauce, and basil.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    available: true,
  },
  {
    name: 'Chicken Alfredo Pasta',
    price: 15.49,
    category: 'Main Course',
    description: 'Creamy fettuccine alfredo topped with grilled chicken breast.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400',
    available: true,
  },
  // Drinks
  {
    name: 'Fresh Lemonade',
    price: 3.99,
    category: 'Drinks',
    description: 'Freshly squeezed lemonade with a hint of mint.',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400',
    available: true,
  },
  {
    name: 'Iced Coffee',
    price: 4.49,
    category: 'Drinks',
    description: 'Cold-brewed coffee served over ice with cream.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    available: true,
  },
  {
    name: 'Mango Smoothie',
    price: 5.99,
    category: 'Drinks',
    description: 'Blended mango, yogurt, and a touch of honey.',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400',
    available: true,
  },
  // Desserts
  {
    name: 'Chocolate Lava Cake',
    price: 8.99,
    category: 'Desserts',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400',
    available: true,
  },
  {
    name: 'Tiramisu',
    price: 7.99,
    category: 'Desserts',
    description: 'Classic Italian dessert with layers of espresso-soaked ladyfingers and mascarpone.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    available: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await MenuItem.deleteMany({});
    console.log('🗑️  Cleared existing menu items');

    const inserted = await MenuItem.insertMany(seedItems);
    console.log(`🌱 Seeded ${inserted.length} menu items`);

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
}

seed();
