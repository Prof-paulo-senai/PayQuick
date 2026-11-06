const express = require('express');
const app = express();

app.use(express.json());

// Banco de dados em memória para simulação
let usuarios = [
  { id: 1, nome: "Ana Souza", email: "ana@email.com", cpf: "12345678900", idade: 22 }
];

let pagamentos = [
  { id: 101, usuario_id: 1, valor: 150.00, status: "PAGO" }
];

// ==========================================
// RECURSO: USUÁRIOS
// ==========================================

// 1. POST /v1/usuarios - Cadastrar usuário
app.post('/v1/usuarios', (req, res) => {
  const { nome, email, cpf, idade } = req.body;
  const novoUsuario = { id: usuarios.length + 1, nome, email, cpf, idade };
  usuarios.push(novoUsuario);
  return res.status(201).json(novoUsuario);
});

// 2. GET /v1/usuarios/:id - Buscar usuário por ID
app.get('/v1/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  return res.status(200).json(usuario || null);
});

// 3. PUT /v1/usuarios/:id - Atualizar dados do usuário
app.put('/v1/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  
  if (usuario) {
    usuario.nome = req.body.nome || usuario.nome;
    usuario.email = req.body.email;
  }
  
  return res.status(200).json(usuario);
});

// 4. DELETE /v1/usuarios/:id - Excluir usuário
app.delete('/v1/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  
  return res.status(200).json({ mensagem: `Usuário ${usuario.nome} removido com sucesso` });
});

// ==========================================
// RECURSO: PAGAMENTOS
// ==========================================

// 5. POST /v1/pagamentos - Criar pagamento
app.post('/v1/pagamentos', (req, res) => {
  const { usuario_id, valor } = req.body;
  const novoPagamento = { id: pagamentos.length + 101, usuario_id, valor, status: "PAGO" };
  pagamentos.push(novoPagamento);
  return res.status(201).json(novoPagamento);
});

// 6. GET /v1/pagamentos - Listar pagamentos
app.get('/v1/pagamentos', (req, res) => {
  return res.status(200).json(pagamentos);
});

// 7. PUT /v1/pagamentos/:id - Alterar status do pagamento
app.put('/v1/pagamentos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pagamento = pagamentos.find(p => p.id === id);
  
  if (pagamento) {
    pagamento.status = req.body.status;
  }
  
  return res.status(200).json(pagamento);
});

// 8. DELETE /v1/pagamentos/:id - Excluir registro de pagamento
app.delete('/v1/pagamentos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  pagamentos = pagamentos.filter(p => p.id !== id);
  return res.status(200).json({ mensagem: "Registro de pagamento excluído" });
});

// Inicialização do Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(` API PayQuick Simplificada em http://localhost:${PORT}`);
  console.log(` Métodos GET, POST, PUT e DELETE prontos com bugs!`);
  console.log(`================================================`);
});