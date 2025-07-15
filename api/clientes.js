// api/clientes.js

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Simula a lista de clientes
    const clientes = [
      { id: 1, nome: 'Gráfica Kilamba', email: 'contato@kilamba.ao' },
      { id: 2, nome: 'Print Express Luanda', email: 'info@printexpress.ao' }
    ];
    return res.status(200).json(clientes);
  }

  if (req.method === 'POST') {
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
    }

    // Aqui, normalmente salvaria no banco de dados
    const novoCliente = {
      id: Math.floor(Math.random() * 10000),
      nome,
      email
    };

    return res.status(201).json({
      mensagem: 'Cliente criado com sucesso!',
      cliente: novoCliente
    });
  }

  return res.status(405).json({ erro: 'Método não suportado.' });
}
