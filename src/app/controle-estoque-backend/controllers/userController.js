const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registrar um novo usuário
exports.registrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se o usuário já existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário já registrado.' });
    }

    // Criptografar a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = new User({ nome, email, senha: senhaCriptografada });
    await novoUsuario.save();

    console.log("Usuário registrado com sucesso:", novoUsuario);
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
    res.status(500).json({ message: 'Erro ao registrar usuário.', error: error.message });
  }
};

// Login do usuário
exports.loginUsuario = async (req, res) => {
  try {
    console.log("Tentativa de login com:", req.body);
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // Comparar a senha fornecida com a senha armazenada usando bcrypt
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // Evitar gerar múltiplos tokens para uma única sessão
    console.log("Gerando token JWT...");
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Expiração de 1 hora
    );

    console.log("Token gerado:", token);
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    return res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
  }
};
