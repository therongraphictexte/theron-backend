// api/impressao/listar.js

let logsArmazenados = \[]; // Armazena os logs em memória (temporário)

export default async function handler(req, res) {
// Permitir chamadas CORS (para uso com Lovable.dev)
res.setHeader("Access-Control-Allow-Origin", "\*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

// Responder a requisições OPTIONS (preflight)
if (req.method === "OPTIONS") {
return res.status(200).end();
}

// Salvar novo log de impressão (via POST do agente)
if (req.method === "POST") {
const { usuario, documento, paginas, impressora, computador, dataHora, texto } = req.body;

```
if (!usuario || !documento || !paginas) {
  return res.status(400).json({ erro: "Campos obrigatórios ausentes." });
}

const log = {
  usuario,
  documento,
  paginas,
  impressora,
  computador,
  dataHora,
  texto,
  recebidoEm: new Date().toISOString()
};

logsArmazenados.push(log);

return res.status(200).json({
  status: "sucesso",
  mensagem: "Log de impressão armazenado.",
  totalLogs: logsArmazenados.length
});
```

}

// Retornar todos os logs salvos (GET para o frontend)
if (req.method === "GET") {
return res.status(200).json({
status: "ok",
total: logsArmazenados.length,
dados: logsArmazenados
});
}

// Método não permitido
return res.status(405).json({ erro: "Método não permitido." });
}
