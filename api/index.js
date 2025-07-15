// api/index.js

export default async function handler(req, res) {
  res.status(200).json({
    message: 'Backend API do Theron está ativo!',
    endpointsDisponiveis: ['/api/impressao']
  });
}
