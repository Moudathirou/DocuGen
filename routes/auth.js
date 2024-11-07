// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');  // Ajoutez cette ligne
const User = require('../models/User');


// Inscription
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.create(email, password);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(400).json({ error: 'L\'email existe déjà' });
  }
});

// Connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ error: 'Utilisateur non trouvé' });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Mot de passe invalide' });
      }
  
      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        'your_jwt_secret'
      );
      res.json({ token, isAdmin: user.isAdmin });
    } catch (err) {
      console.error('Erreur lors de la connexion :', err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });

module.exports = router;