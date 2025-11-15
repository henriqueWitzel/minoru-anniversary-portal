/**
 * Comunicação com a API
 */
import { CONFIG } from './config.js';

/**
 * Envia os dados do formulário para a API
 * @param {Object} data - Dados do formulário
 * @returns {Promise<Response>} Resposta da API
 */
export async function submitFormData(data) {
  const response = await fetch(CONFIG.SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    mode: 'no-cors'
  });

  return response;
}
