const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Obter o cabeçalho Authorization
    const authHeader = req.header('Authorization');
    console.log('Cabeçalho recebido:', authHeader);

    // Verificar se o cabeçalho Authorization está presente
    if (!authHeader) {
      return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    // Extrair o token do cabeçalho Authorization
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Acesso negado. Token inválido ou ausente.' });
    }

    // Verificar o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado com sucesso:', decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erro ao verificar o token:', error.message);

    // Lidar com token inválido ou expirado
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token expirado. Faça login novamente.' });
    }

    return res.status(403).json({ message: 'Token inválido.' });
  }
};
