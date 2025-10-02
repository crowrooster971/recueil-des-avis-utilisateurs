// Import des modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || 'https://example.com' })); // Restricting access to a specific origin via CORS configuration.
app.use(express.json());

// Connexion à la base de données MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/recueil-des-avis-utilisateurs';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connecté à la base de données');
}).catch((err) => {
  console.error('Erreur de connexion à la base de données :', err.message);
});

// Modèle Mongoose pour les avis
const AvisSchema = new mongoose.Schema({
  produit: String,
  utilisateur: String,
  note: Number,
  commentaire: String,
  date: { type: Date, default: Date.now },
});

const Avis = mongoose.model('Avis', AvisSchema);

// Routes
app.post('/avis', async (req, res) => {
  const avis = new Avis(req.body);
  try {
    await avis.save();
    res.status(201).send(avis);
  } catch (e) {
    res.status(400).send({ message: 'Erreur lors de l\'enregistrement de l\'avis', error: e.message });
  }
});

app.get('/avis', async (req, res) => {
  try {
    const avis = await Avis.find();
    res.send(avis);
  } catch (e) {
    res.status(500).send({ message: 'Erreur lors de la récupération des avis', error: e.message });
  }
});

// Port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en marche sur le port ${PORT}`);
});