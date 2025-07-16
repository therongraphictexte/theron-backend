// api/impressao.js

import {
getClientePorToken,
salvarLog
} from '../../lib/storage.js';

export default async function handler(req, res) {
// Cabeçalhos CORS
res.setHeader("Access-Control-Allow-Origin", "\*");
res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

if (req.method === "OPTIONS") {
return res.status(200).end();
}

if (req.method !== "POST") {
return res.status(405).json({ erro: "Método não permitido. Use POST." });
}

// Autenticação via token Bearer
const auth = req.headers.authorization;
if (!auth || !auth.startsWith("Bearer ")) {
return res.status(403).json({ erro: "Token ausente ou inválido." });
}

const token = auth.replace("Bearer ", "").trim();
const cliente = getClientePorToken(token);

if (!cliente) {
return res.status(403).json({ erro: "Token não reconhecido." });
}

const { usuario, documento, paginas, impressora, computador, dataHora, texto } = req.body;

if (!usuario || !documento || !paginas) {
return res.status(400).json({ erro: "Campos obrigatórios ausentes." });
}

const log = {
cliente\_id: cliente.id,
usuario,
documento,
paginas,
impressora,
computador,
dataHora,
texto,
recebidoEm: new Date().toISOString()
};

try {
salvarLog(log);

```
return res.status(200).json({
  status: "sucesso",
  mensagem: "Log de impressão registrado.",
  log
});
```

} catch (err) {
return res.status(500).json({
erro: "Erro interno ao registrar log.",
detalhes: err.message
});
}
}