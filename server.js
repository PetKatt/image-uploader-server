const express = require('express');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(formData.parse());

// setup your own config for cloudinary account
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
})
  
// routes
app.get('/initialize', (req, res) => res.send('RUN SERVER FIRST!'));

app.post('/upload', (req, res) => {
  
  const pictures = Object.values(req.files);

  const promises = pictures.map(img => cloudinary.uploader.upload(img.path));
  
  Promise.all(promises)
    .then(results => res.json(results))
    .catch((err) => res.status(400).json(err));
})

app.listen(port, () => console.log('Listening on port: ', port));