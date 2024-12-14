const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true },
  descricao: { type: String },
  imagens: { type: [String] },
});

module.exports = mongoose.model('Item', itemSchema);
