const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

// Middleware para servir arquivos estáticos da pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json({ limit: '10mb' })); // Permitir envio de imagens maiores (10MB)
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log('Erro ao conectar ao MongoDB:', err));

// Middleware de autenticação
const verificarToken = require('./middlewares/authMiddleware');

// Importar rotas
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo ao backend do sistema de controle de estoque');
});

// Rotas
app.use('/auth', userRoutes); // Rotas de autenticação
app.use('/api', verificarToken, itemRoutes); // Proteger rotas de itens com autenticação

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
