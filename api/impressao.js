// api/impressao.js

export default async function handler(req, res) {
  // Permitir chamadas CORS (necessário para Lovable.dev)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Tratamento para preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Aceita apenas POST
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido. Use POST." });
  }

  const { texto, usuario, documento, paginas, impressora, computador, dataHora } = req.body;

  // Log temporário para diagnosticar dados recebidos
  console.log("📥 Dados recebidos:", req.body);

  if (!texto && (!usuario || !documento || !paginas)) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
  }

  try {
    return res.status(200).json({
      status: "sucesso",
      mensagem: "Dados recebidos.",
      recebido: req.body,
    });
  } catch (err) {
    return res.status(500).json({
      erro: "Erro interno ao processar dados.",
      detalhes: err.message,
    });
  }
}

