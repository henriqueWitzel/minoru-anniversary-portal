/**
 * Gerenciamento do formulário RSVP
 */

/**
 * Coleta os dados do formulário
 * @param {HTMLFormElement} form - Elemento do formulário
 * @returns {Object} Dados do formulário
 */
export function collectFormData(form) {
  return {
    nome: document.getElementById('nome').value,
    contato: document.getElementById('contato').value,
    presenca: document.getElementById('presenca').value,
    acompanhantes: document.getElementById('acompanhantes').value,
    observacoes: document.getElementById('observacoes').value
  };
}

/**
 * Reseta o formulário
 * @param {HTMLFormElement} form - Elemento do formulário
 */
export function resetForm(form) {
  form.reset();
  document.getElementById('nome').focus();
}
