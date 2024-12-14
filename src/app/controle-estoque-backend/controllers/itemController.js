const Item = require('../models/Item');

// Criar um novo item
const criarItem = async (req, res) => {
  try {
    const { nome, quantidade, descricao } = req.body;

    // Mapear caminhos das imagens enviadas
    const imagens = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];

    if (!nome || !quantidade) {
      return res.status(400).json({ message: 'Os campos nome e quantidade são obrigatórios.' });
    }

    const novoItem = new Item({
      nome,
      quantidade,
      descricao,
      imagens,
    });

    await novoItem.save();
    res.status(201).json(novoItem);
  } catch (error) {
    console.error('Erro ao criar item:', error.message);
    res.status(500).json({ message: 'Erro ao criar item.', error: error.message });
  }
};



// Buscar todos os itens
const buscarItens = async (req, res) => {
  try {
    const itens = await Item.find();
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar um item pelo ID
const getItemPorId = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar item', error: error.message });
  }
};

// Atualizar um item
const atualizarItem = async (req, res) => {
  try {
    const itemAtualizado = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!itemAtualizado) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    res.status(200).json(itemAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Excluir um item
const excluirItem = async (req, res) => {
  try {
    const itemExcluido = await Item.findByIdAndDelete(req.params.id);
    if (!itemExcluido) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    res.status(200).json({ message: 'Item excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  criarItem,
  buscarItens,
  getItemPorId,
  atualizarItem,
  excluirItem,
};
