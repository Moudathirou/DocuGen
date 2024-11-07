// routes/dashboard.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const User = require('../models/User');
const Documentation = require('../models/Documentation');

router.get('/stats', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Accès refusé' });
  }

  try {
    const totalUsers = await User.count();
    const totalGenerations = await Documentation.count();
    const activeToday = await Documentation.countActiveToday();
    const recentUsers = await User.getRecentUsers();

    res.json({
      totalUsers,
      totalGenerations,
      activeToday,
      recentUsers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des données du tableau de bord' });
  }
});

module.exports = router;
