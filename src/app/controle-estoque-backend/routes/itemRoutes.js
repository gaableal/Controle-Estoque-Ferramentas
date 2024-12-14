const express = require('express');
const router = express.Router();
const {
  criarItem,
  buscarItens,
  atualizarItem,
  excluirItem,
  getItemPorId,
} = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

// Rotas protegidas
router.post('/itens', authMiddleware, uploadMiddleware.array('imagens', 5), criarItem);
router.get('/itens', authMiddleware, buscarItens);
router.get('/itens/:id', authMiddleware, getItemPorId);
router.put('/itens/:id', authMiddleware, uploadMiddleware.array('imagens', 5), atualizarItem);
router.delete('/itens/:id', authMiddleware, excluirItem);

module.exports = router;
