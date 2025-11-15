/**
 * Utilitários de interface de usuário
 */

/**
 * Exibe uma mensagem para o usuário
 * @param {HTMLElement} msgElement - Elemento da mensagem
 * @param {string} text - Texto da mensagem
 * @param {string} type - Tipo da mensagem ('success', 'error', '')
 */
export function showMessage(msgElement, text, type = '') {
  msgElement.textContent = text;
  msgElement.className = type;
  msgElement.focus({ preventScroll: true });
}
