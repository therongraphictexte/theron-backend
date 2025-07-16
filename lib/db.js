// lib/db.js

// ⚠️ Este arquivo simula um banco de dados em memória
// Em produção, você deve conectar a um banco real (MongoDB, PostgreSQL, Supabase etc.)

// Lista de clientes cadastrados (em memória temporária)
export const clientes = \[];

// Lista de logs de impressão (em memória temporária)
export const logsImpressao = \[];

// Função para gerar um token único (substituir futuramente por JWT ou UUID)
import crypto from "crypto";

/\*\*

* Gera um token seguro de 32 caracteres.
* @returns {string} token
  \*/
  export function gerarToken() {
  return crypto.randomBytes(16).toString("hex"); // 32 caracteres hexadecimais
  }