// api/impressao/listar.js

import {
getClientePorToken,
getLogsPorClienteId
} from '../../lib/storage.js'

export default async function handler(req, res) {
// Configurar CORS
res.setHeader('Access-Control-Allow-Origin', '\*')
res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

if (req.method === 'OPTIONS') return res.status(200).end()

if (req.method !== 'GET') {
return res.status(405).json({ erro: 'Método não permitido. Use GET.' })
}

// Autenticação via token Bearer
const auth = req.headers.authorization
if (!auth || !auth.startsWith('Bearer ')) {
return res.status(403).json({ erro: 'Token ausente ou inválido.' })
}

const token = auth.replace('Bearer ', '').trim()
const cliente = getClientePorToken(token)

if (!cliente) {
return res.status(403).json({ erro: 'Token não reconhecido.' })
}

try {
const logs = getLogsPorClienteId(cliente.id)

```
return res.status(200).json({
  status: 'ok',
  cliente_id: cliente.id,
  total_logs: logs.length,
  dados: logs
})
```

} catch (err) {
return res.status(500).json({
erro: 'Erro ao buscar logs de impressão.',
detalhes: err.message
})
}
}