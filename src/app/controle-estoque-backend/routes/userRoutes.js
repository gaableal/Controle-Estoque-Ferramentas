const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/userController');

// Rotas para autenticação
router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

module.exports = router;
