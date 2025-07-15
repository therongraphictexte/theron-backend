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

  // Validação de campos essenciais
  if (!documento || !paginas || !usuario || !impressora || !computador || !dataHora) {
    return res.status(400).json({
      erro: "Campos obrigatórios ausentes. Certifique-se de enviar todos os dados.",
    });
  }

  try {
    // Você pode adicionar aqui lógica futura de persistência (ex: banco de dados)

    return res.status(200).json({
      status: "sucesso",
      mensagem: "Dados de impressão recebidos com sucesso.",
      recebido: {
        documento,
        paginas,
        usuario,
        impressora,
        computador,
        dataHora,
        texto: texto || null,
      },
    });
  } catch (err) {
    return res.status(500).json({
      erro: "Erro interno ao processar dados.",
      detalhes: err.message,
    });
  }
}


