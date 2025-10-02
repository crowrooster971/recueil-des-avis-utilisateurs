// Import des modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/recueil-des-avis-utilisateurs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connecté à la base de données');
}).catch((err) => {
  console.error('Erreur de connexion à la base de données:', err);
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
    res.status(400).send(e);
  }
});

app.get('/avis', async (req, res) => {
  try {
    const avis = await Avis.find();
    res.send(avis);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en marche sur le port ${PORT}`);
});