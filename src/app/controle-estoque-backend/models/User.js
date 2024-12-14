const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
  },
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
