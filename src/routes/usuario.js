const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { nombres, apellidos, correo, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ correo });
    if (user) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    user = new User({
      nombres,
      apellidos,
      correo,
      password,
    });

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guardar el usuario en la base de datos
    await user.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta para hacer login
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el usuario existe
    let user = await User.findOne({ correo });
    if (!user) {
      return res.status(404).json({ error: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ error: 'Credenciales inválidas' });
    }

   

    res.status(200).json({ message: 'Login exitoso' });
  
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
