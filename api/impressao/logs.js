// api/impressao/logs.js

import {
getClientePorToken,
salvarLog
} from '../../lib/storage.js'

export default async function handler(req, res) {
// CORS
res.setHeader('Access-Control-Allow-Origin', '\*')
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

if (req.method === 'OPTIONS') return res.status(200).end()

if (req.method !== 'POST') {
return res.status(405).json({ erro: 'Método não permitido. Use POST.' })
}

// Autenticação opcional
const auth = req.headers.authorization
const token = auth && auth.startsWith('Bearer ') ? auth.replace('Bearer ', '').trim() : null
const cliente = token ? getClientePorToken(token) : null

const log = req.body

if (!log || typeof log !== 'object') {
return res.status(400).json({ erro: 'Log inválido ou ausente.' })
}

const logCompleto = {
...log,
tipo: 'auxiliar',
cliente\_id: cliente?.id || null,
recebidoEm: new Date().toISOString()
}

salvarLog(logCompleto)

console.log('📘 \[THERON LOG AUXILIAR]', JSON.stringify(logCompleto, null, 2))

return res.status(200).json({
status: 'ok',
mensagem: 'Log auxiliar recebido.',
timestamp: logCompleto.recebidoEm
})
}
