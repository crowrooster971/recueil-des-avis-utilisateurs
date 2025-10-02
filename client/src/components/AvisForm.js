import React, { useState } from 'react';
import axios from 'axios';

function AvisForm() {
  const [produit, setProduit] = useState('');
  const [utilisateur, setUtilisateur] = useState('');
  const [note, setNote] = useState(1);
  const [commentaire, setCommentaire] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const avis = { produit, utilisateur, note, commentaire };
    await axios.post('http://localhost:5000/avis', avis);
    // Réinitialise le formulaire ou effectuez une redirection si nécessaire
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Soumettre un Avis</h2>
      <input type="text" onChange={(e) => setProduit(e.target.value)} placeholder="Produit" required />
      <input type="text" onChange={(e) => setUtilisateur(e.target.value)} placeholder="Votre nom" required />
      <select onChange={(e) => setNote(e.target.value)} value={note} required>
        {[1, 2, 3, 4, 5].map((n) => (<option key={n} value={n}>{n}</option>))}
      </select>
      <textarea onChange={(e) => setCommentaire(e.target.value)} placeholder="Votre commentaire" required></textarea>
      <button type="submit">Soumettre</button>
    </form>
  );
}

export default AvisForm;