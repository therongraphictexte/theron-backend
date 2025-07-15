export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ erro: 'Método não permitido. Use GET.' });
  }

  try {
    // Dados simulados de exemplo (substitua por dados reais se necessário)
    const relatoriosExemplo = [
      {
        id: 1,
        data: '2025-07-14T22:10:00Z',
        usuario: 'usuario_teste',
        impressora: 'HP LaserJet Pro',
        documento: 'Relatório de Impressão.pdf',
        paginas: 3,
        computador: 'PC-001'
      },
      {
        id: 2,
        data: '2025-07-13T16:45:00Z',
        usuario: 'maria',
        impressora: 'Brother 2023',
        documento: 'Contrato Assinado.pdf',
        paginas: 8,
        computador: 'PC-002'
      }
    ];

    res.status(200).json({
      sucesso: true,
      total: relatoriosExemplo.length,
      dados: relatoriosExemplo
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar relatórios.', detalhes: err.message });
  }
}
