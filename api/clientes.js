// api/clientes.js

import {
cadastrarCliente,
listarClientes
} from '../lib/storage.js';

export default async function handler(req, res) {
// Configurar CORS
res.setHeader("Access-Control-Allow-Origin", "\*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
return res.status(200).end();
}

if (req.method === "GET") {
try {
const clientes = listarClientes();
return res.status(200).json({
sucesso: true,
total: clientes.length,
clientes
});
} catch (err) {
return res.status(500).json({
erro: "Erro ao listar clientes.",
detalhes: err.message
});
}
}

if (req.method === "POST") {
const { nome, email } = req.body;

```
if (!nome || !email) {
  return res.status(400).json({ erro: "Nome e email são obrigatórios." });
}

try {
  const novoCliente = cadastrarCliente({ nome, email });

  return res.status(201).json({
    sucesso: true,
    mensagem: "Cliente criado com sucesso!",
    cliente: novoCliente
  });
} catch (err) {
  return res.status(500).json({
    erro: "Erro ao cadastrar cliente.",
    detalhes: err.message
  });
}
```

}

return res.status(405).json({ erro: "Método não suportado." });
}