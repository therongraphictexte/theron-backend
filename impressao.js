// api/impressao.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: 'O campo "texto" é obrigatório.' });
  }

  try {
    console.log('[IMPRESSÃO]', texto);
    res.status(200).json({
      status: 'sucesso',
      mensagem: 'Texto recebido para impressão.',
      textoRecebido: texto
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno ao processar impressão.', detalhes: err.message });
  }
}
