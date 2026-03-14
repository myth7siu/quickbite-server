import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// GET /api/menu — returns all available menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({ available: true }).sort({ category: 1, name: 1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// POST /api/menu — create a new menu item
router.post('/', async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(400).json({ error: error.message });
  }
});

// PATCH /api/menu/:id — update a menu item
router.patch('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ error: 'Menu item not found' });
    res.json(item);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/menu/:id — delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Menu item not found' });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
