const crypto = require('crypto')

let clientes = []
let logs = []

function gerarToken() {
  return crypto.randomBytes(32).toString('hex')
}

function cadastrarCliente({ nome, email }) {
  const cliente = {
    id: clientes.length + 1,
    nome,
    email,
    auth_token: gerarToken()
  }
  clientes.push(cliente)
  return cliente
}

function listarClientes() {
  return clientes
}

function getClientePorToken(token) {
  return clientes.find(c => c.auth_token === token)
}

function salvarLog(log) {
  logs.push(log)
}

function getLogsPorClienteId(id) {
  return logs.filter(l => l.cliente_id === id)
}

module.exports = {
  cadastrarCliente,
  listarClientes,
  getClientePorToken,
  salvarLog,
  getLogsPorClienteId
}
