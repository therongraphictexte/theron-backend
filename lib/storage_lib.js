// lib/storage.js

import crypto from 'crypto';

let clientes = [];
let logs = [];

// Gera token aleatório seguro
export function gerarToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Cadastra uma nova gráfica
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

// Retorna todos os clientes
export function listarClientes() {
  return clientes;
}

// Busca cliente pelo token
export function getClientePorToken(token) {
  return clientes.find(c => c.auth_token === token);
}

// Salva um log de impressão associado a um cliente
export function salvarLog(log) {
  logs.push(log);
}

// Retorna os logs de um cliente específico
export function getLogsPorClienteId(clienteId) {
  return logs.filter(log => log.cliente_id === clienteId);
}

// Lista todos os logs (admin)
export function listarTodosLogs() {
  return logs;
}
