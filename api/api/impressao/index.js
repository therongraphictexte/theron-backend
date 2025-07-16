// api/impressao/index.js

export default async function handler(req, res) {
// Permitir chamadas CORS (inclusive para Lovable.dev)
res.setHeader("Access-Control-Allow-Origin", "\*");
res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
return res.status(200).end();
}

if (req.method === "GET") {
return res.status(200).json({
status: "online",
mensagem: "API de impressão do Theron está operante.",
endpointsDisponiveis: \[
"/api/impressao",         // Recebe logs individuais do agente
"/api/impressao/listar",  // Retorna todos os logs salvos
"/api/impressao/logs"     // Log auxiliar do agente (status/envio)
],
horaServidor: new Date().toISOString()
});
}

return res.status(405).json({ erro: "Método não permitido. Use GET." });
}