Theron Backend — API de Monitoramento de Impressões
Este é o backend oficial do sistema Theron, utilizado para receber, armazenar e consultar logs de impressão enviados por agentes instalados nas gráficas (como o Theron Agent) e integrar com o frontend criado no Lovable.dev.
________________________________________
📁 Estrutura do Projeto
theron-backend/
├── api/
│   ├── clientes.js              → Cadastro e listagem de gráficas (clientes)
│   └── impressao/
│       ├── index.js             → Recebe logs reais de impressão (com token)
│       ├── listar.js           → Lista logs por cliente autenticado
│       ├── logs.js             → Recebe logs auxiliares (diagnóstico do agente)
│       └── relatorios.js       → Retorna relatório resumido por cliente
├── lib/
│   └── storage.js              → Armazenamento temporário em memória (clientes, logs)
├── package.json                → Configurações do Node.js (ES Modules)
└── vercel.json                 → Configuração do Vercel (API e rotas)
________________________________________
✅ O que está incluído
•	Suporte a múltiplos clientes (gráficas), com token exclusivo.
•	Recebimento de logs de impressão por API.
•	Listagem e relatório de impressões por cliente autenticado.
•	Totalmente integrado com Lovable.dev e Theron Agent.
•	Backend pronto para deploy na Vercel (serverless).
________________________________________
🚀 Como cadastrar uma nova gráfica (cliente)
Você pode usar o endpoint:
POST https://seu-domínio/api/clientes
Exemplo com cURL:
curl -X POST https://seu-domínio/api/clientes \
  -H "Content-Type: application/json" \
  -d '{ "nome": "Gráfica Central", "email": "grafica@central.ao" }'
Resposta esperada:
{
  "sucesso": true,
  "mensagem": "Cliente criado com sucesso!",
  "cliente": {
    "id": 1,
    "nome": "Gráfica Central",
    "email": "grafica@central.ao",
    "auth_token": "c9fe72bda4094ee99e0a4c2185c5eefd"
  }
}
O auth_token deve ser inserido no agente correspondente desta gráfica.
________________________________________
📤 Como o agente envia logs
O Theron Agent lê arquivos .csv gerados pelo PaperCut Print Logger, converte os dados em JSON e envia para:
POST https://seu-domínio/api/impressao
Exemplo de payload:
{
  "usuario": "joao",
  "documento": "fatura.pdf",
  "paginas": 2,
  "impressora": "HP M402",
  "computador": "PC-JOAO",
  "dataHora": "2025-07-16T12:33:00",
  "texto": "joao imprimiu fatura.pdf (2 págs) em HP M402"
}
Cabeçalho obrigatório:
Authorization: Bearer SEU_AUTH_TOKEN
________________________________________
🔐 Segurança e Identificação
•	Cada agente deve enviar o token do cliente (auth_token) no cabeçalho Authorization como Bearer Token.
•	O backend valida esse token e associa cada log ao respectivo cliente.
________________________________________
🔍 Como visualizar os logs no Lovable.dev
•	Configure um endpoint GET para:
GET https://seu-domínio/api/impressao/listar
•	Cabeçalho:
Authorization: Bearer SEU_AUTH_TOKEN
•	A resposta incluirá todos os logs daquele cliente autenticado:
{
  "status": "ok",
  "cliente_id": 1,
  "total_logs": 3,
  "dados": [...]
}
Você pode usar essa API para montar dashboards, tabelas, relatórios e análises em tempo real no Lovable.dev.
________________________________________
🧪 Testes rápidos com Postman ou cURL
1.	Cadastrar nova gráfica (POST /api/clientes)
2.	Copiar o token recebido
3.	Enviar logs de teste para (POST /api/impressao)
4.	Consultar logs com (GET /api/impressao/listar ou relatorios)
________________________________________
⚠️ Observações
•	Os dados são armazenados em memória (RAM). Se o backend reiniciar, os dados se perdem.
•	Ideal para prototipação ou MVP. Para produção real, recomenda-se banco de dados (Firebase, Supabase, MongoDB).
•	Posso adaptar para banco real a qualquer momento, caso deseje.
________________________________________
📫 Suporte: Para dúvidas ou melhorias, entre em contato com o desenvolvedor do SaaS Theron.
