const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuário
router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const novoUsuario = new User({ nome, email, senha });
    await novoUsuario.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, nome: usuario.nome });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
