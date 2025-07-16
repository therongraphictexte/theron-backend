// api/index.js

export default async function handler(req, res) {
// Configurar CORS
res.setHeader("Access-Control-Allow-Origin", "\*");
res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
return res.status(200).end();
}

if (req.method !== "GET") {
return res.status(405).json({ erro: "Método não permitido. Use GET." });
}

return res.status(200).json({
status: "Theron API Online",
descricao: "API para monitoramento e gerenciamento de impressões por cliente.",
endpoints\_disponiveis: {
"/api/clientes": "Cadastro e listagem de gráficas (clientes)",
"/api/impressao": "Recebe dados reais de impressão do agente",
"/api/impressao/logs": "Recebe logs auxiliares do agente (status)",
"/api/impressao/listar": "Lista logs de impressão de um cliente (por token)",
"/api/impressao/relatorios": "Lista todos os logs do sistema (relatórios)"
},
ultimaAtualizacao: new Date().toISOString()
});
}