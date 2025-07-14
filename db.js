// lib/db.js

export const clientes = [];
export const logsImpressao = [];

export function gerarToken() {
  return Math.random().toString(36).substr(2, 32);
}
