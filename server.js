const express = require('express');
const app = express();

// VAŽNO za Railway (dinamički port)
const PORT = process.env.PORT || 3000;

// Serviranje statičkih datoteka (index.html, CSS, slike)
app.use(express.static('public'));

// Opcionalno (fallback ako nema HTML-a)
app.get('/', (req, res) => {
  res.send('Pozdrav sa Railway servera!');
});

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server pokrenut na portu ${PORT}`);
});