# Sistema de Controle de Estoque

Um sistema completo de gerenciamento de estoque desenvolvido com **Angular** no frontend e **Node.js** no backend, integrando funcionalidades avançadas, como autenticação de usuários, upload de imagens e manipulação de dados com **MongoDB**.

---

## 📋 Funcionalidades

### 📂 Gerenciamento de Itens
- **Adicionar Itens:** Criação de novos itens no sistema, com suporte ao upload de até 5 imagens.
- **Editar Itens:** Atualização de dados, como nome, quantidade, descrição e imagens.
- **Excluir Itens:** Remoção permanente de itens cadastrados.
- **Listar Itens:** Visualização de todos os itens com suporte a filtro por nome.
- **Visualizar Detalhes:** Modal com informações detalhadas do item e exibição de imagens, com navegação por setas para alternar entre elas.

### 🔒 Autenticação e Segurança
- **Registro de Usuários:** Permite criar contas de acesso ao sistema.
- **Login Protegido:** Apenas usuários autenticados podem acessar as funcionalidades.
- **JWT:** As rotas de API são protegidas por autenticação via JSON Web Tokens.

### 🌗 Interface Amigável
- **Alternância de Tema:** Troca dinâmica entre modo claro e escuro para maior conforto visual.

---

## 🛠️ Tecnologias Utilizadas

### Frontend:
- **Angular**: Framework para desenvolvimento de SPA.
- **Bootstrap**: Estilo responsivo e componentes visuais.
- **TypeScript**: Tipagem avançada para maior segurança no código.
- **HTML5 e CSS3**: Construção da interface e estilização.

### Backend:
- **Node.js**: Plataforma para execução de código JavaScript no servidor.
- **Express.js**: Framework web rápido e minimalista.
- **MongoDB com Mongoose**: Banco de dados NoSQL para persistência de dados.
- **Multer**: Middleware para upload de arquivos.
- **JWT**: Segurança para autenticação baseada em tokens.

---

## ⚙️ Requisitos

Certifique-se de ter instalado:
- **Node.js** (versão 14 ou superior)
- **MongoDB**
- **Angular CLI**

---

## 🚀 Como Executar o Projeto

### 1️⃣ Clone o Repositório
```bash
git clone https://github.com/seu-usuario/controle-de-estoque.git
cd controle-de-estoque

### 2️⃣ Backend
1. Acesse o diretório do backend
cd src/app/controle-estoque-backend

2 . Instale as dependências:
npm install

3. Crie um arquivo .env com as seguintes variáveis.
MONGO_URI=sua-string-de-conexao-com-mongodb
JWT_SECRET=sua-chave-secreta

4. Inicie o servidor backend:
node server.js

### 3️⃣ Frontend
1. Acesse o diretório do frontend:
cd src

2. Instale as dependências:
npm install

3. Inicie o servidor Angular:
ng serve

4. Acesse no navegador:
http://localhost:4200



