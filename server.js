const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const docsRoutes = require('./routes/docs');
const dashboardRoutes = require('./routes/dashboard');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/docs', docsRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

