// api/impressao/logs.js

export default async function handler(req, res) {
// Permitir chamadas CORS (necessário para Lovable.dev e testes locais)
res.setHeader("Access-Control-Allow-Origin", "\*");
res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

// Tratamento para preflight de CORS
if (req.method === "OPTIONS") {
return res.status(200).end();
}

// Aceita apenas método POST
if (req.method !== "POST") {
return res.status(405).json({ erro: "Método não permitido. Use POST." });
}

// Validação básica
if (!req.body || typeof req.body !== "object") {
return res.status(400).json({ erro: "Corpo da requisição inválido ou ausente." });
}

try {
// Exibir log recebido no terminal da Vercel (visível em vercel.com → project → functions → logs)
console.log("📘 \[THERON LOG]", JSON.stringify(req.body, null, 2));

```
return res.status(200).json({
  status: "ok",
  mensagem: "Log recebido com sucesso",
  timestamp: new Date().toISOString(),
});
```

} catch (err) {
return res.status(500).json({
erro: "Erro ao processar log.",
detalhes: err.message,
});
}
}
