const multer = require('multer');
const path = require('path');

// Configuração de armazenamento do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configuração do multer
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Exporta diretamente a função de múltiplos arquivos
module.exports = upload;
