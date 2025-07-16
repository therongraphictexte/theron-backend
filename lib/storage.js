// lib/storage.js

import crypto from 'crypto'

let clientes = \[]
let logs = \[]

// Gera um token seguro aleatório (32 caracteres hex)
export function gerarToken() {
return crypto.randomBytes(32).toString('hex')
}

// Cadastra novo cliente com nome, email e token exclusivo
export function cadastrarCliente({ nome, email }) {
const cliente = {
id: clientes.length + 1,
nome,
email,
auth\_token: gerarToken()
}
clientes.push(cliente)
return cliente
}

// Retorna todos os clientes cadastrados
export function listarClientes() {
return clientes
}

// Busca cliente pelo token de autenticação
export function getClientePorToken(token) {
return clientes.find((c) => c.auth\_token === token)
}

// Salva qualquer tipo de log (de impressão ou auxiliar)
export function salvarLog(log) {
logs.push(log)
}

// Retorna apenas os logs de impressão de um cliente
export function getLogsPorClienteId(clienteId) {
return logs.filter(
(l) => l.cliente\_id === clienteId && l.tipo !== 'auxiliar'
)
}

// Lista todos os logs (útil para relatórios e auditoria)
export function listarTodosLogs() {
return logs
}

// Lista apenas os logs auxiliares
export function listarLogsAuxiliares() {
return logs.filter((l) => l.tipo === 'auxiliar')
}