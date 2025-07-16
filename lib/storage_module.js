// lib/storage.js

import crypto from 'crypto';

let clientes = [];
let logs = [];

// Gera um token seguro aleatório (32 caracteres hex)
export function gerarToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Cadastra novo cliente com nome, email e token único
export function cadastrarCliente({ nome, email }) {
  const cliente = {
    id: clientes.length + 1,
    nome,
    email,
    auth_token: gerarToken()
  };
  clientes.push(cliente);
  return cliente;
}

// Retorna todos os clientes cadastrados
export function listarClientes() {
  return clientes;
}

// Busca cliente pelo token (usado para autenticar o agente)
export function getClientePorToken(token) {
  return clientes.find((c) => c.auth_token === token);
}

// Salva log de impressão vinculado a um cliente
export function salvarLog(log) {
  logs.push(log);
}

// Retorna todos os logs de um cliente específico
export function getLogsPorClienteId(clienteId) {
  return logs.filter((l) => l.cliente_id === clienteId);
}

// Retorna todos os logs de impressão do sistema (para relatórios)
export function listarTodosLogs() {
  return logs;
}
