const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Root route - serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gallery route - load images from the folder
app.get(['/slike', '/slike/'], (req, res) => {
  const folderPath = path.join(__dirname, 'public', 'images');
  
  // Provjera da folder postoji
  if (!fs.existsSync(folderPath)) {
    return res.send('Folder s slikama ne postoji!');
  }

  const files = fs.readdirSync(folderPath);

  const images = files
    .filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.svg'))
    .map((file, index) => ({
      url: `/images/${file}`,
      id: `slika${index + 1}`,
      title: `Slika ${index + 1}`,
      largeUrl: `/images/${file}` // možeš dodati različite veličine
    }));

  console.log('Images loaded:', images.map(img => img.url)); // debug u terminalu

  res.render('slike', { images });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});