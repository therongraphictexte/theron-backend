// api/impressao/relatorios.js

import {
getClientePorToken,
getLogsPorClienteId
} from '../../lib/storage.js';

export default async function handler(req, res) {
// Configurações CORS
res.setHeader("Access-Control-Allow-Origin", "\*");
res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

if (req.method === "OPTIONS") {
return res.status(200).end();
}

if (req.method !== "GET") {
return res.status(405).json({ erro: "Método não permitido. Use GET." });
}

// Autenticação por Bearer Token
const auth = req.headers.authorization;
if (!auth || !auth.startsWith("Bearer ")) {
return res.status(403).json({ erro: "Token ausente ou inválido." });
}

const token = auth.replace("Bearer ", "").trim();
const cliente = getClientePorToken(token);

if (!cliente) {
return res.status(403).json({ erro: "Token não reconhecido." });
}

try {
const logs = getLogsPorClienteId(cliente.id);

```
// Estrutura para relatório resumido
const relatorio = logs.map((log, idx) => ({
  id: idx + 1,
  data: log.dataHora,
  usuario: log.usuario,
  impressora: log.impressora,
  documento: log.documento,
  paginas: log.paginas,
  computador: log.computador
}));

return res.status(200).json({
  sucesso: true,
  cliente_id: cliente.id,
  total: relatorio.length,
  relatorios: relatorio
});
```

} catch (err) {
return res.status(500).json({
erro: "Erro ao gerar relatório.",
detalhes: err.message
});
}
}