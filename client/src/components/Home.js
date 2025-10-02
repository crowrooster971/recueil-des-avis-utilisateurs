import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [avis, setAvis] = useState([]);

  useEffect(() => {
    const fetchAvis = async () => {
      const response = await axios.get('http://localhost:5000/avis');
      setAvis(response.data);
    };
    fetchAvis();
  }, []);

  return (
    <div>
      <h1>Avis des Utilisateurs</h1>
      <ul>
        {avis.map((a) => (
          <li key={a._id}>{a.produit}: {a.commentaire} - {a.note} étoiles</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;