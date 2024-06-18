const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Configuración de body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Conexión a MongoDB establecida');
});
mongoose.connection.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});

// Rutas de autenticación
const authRoutes = require('./src/routes/usuario');
app.use('/api/usuario', authRoutes);
//elementos estaticos

app.use(express.static(path.join(__dirname, '/')));

 
app.get(`/`,(reg,res) => {
  res.sendFile(`${__dirname}/src/index.html`)
})
app.get(`/index.html`,(reg,res) => {
  res.sendFile(`${__dirname}/src/index.html`)
})



app.get(`/register1.html`,(reg,res) => {
  res.sendFile(`${__dirname}/src/rregister1.html`)
})
app.get(`/bienvenida.html`,(reg,res) => {
  res.sendFile(`${__dirname}/src/bienvenida.html`)
});



// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
