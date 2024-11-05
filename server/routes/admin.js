// server/routes/admin.js
const express = require('express');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin-only route to update content
router.put('/update-content', authenticateToken, authorizeAdmin, (req, res) => {
  // Here, update the content in the database (placeholder for actual update logic)
  res.json({ message: 'Content updated successfully' });
});

module.exports = router;
