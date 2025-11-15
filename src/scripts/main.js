/**
 * Aplicação principal - Confirmação de Presença
 */
import { showMessage } from './ui.js';
import { collectFormData, resetForm } from './form.js';
import { submitFormData } from './api.js';

let form;
let msg;

/**
 * Inicializa os elementos do DOM
 */
function initDOMElements() {
  form = document.getElementById('rsvp-form');
  msg = document.getElementById('msg');

  if (!form || !msg) {
    console.error('Elementos do formulário não encontrados');
    return false;
  }
  return true;
}

/**
 * Inicializa os event listeners do formulário
 */
function initFormListener() {
  if (!initDOMElements()) return;
  
  form.addEventListener('submit', handleFormSubmit);
  console.log('Formulário inicializado com sucesso');
}

/**
 * Manipula o envio do formulário
 * @param {Event} event - Evento de submit
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  // Validação nativa
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  showMessage(msg, 'Enviando...', '');

  try {
    const data = collectFormData(form);
    await submitFormData(data);

    showMessage(msg, 'Resposta registrada, obrigado!', 'success');
    resetForm(form);
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    showMessage(msg, 'Não foi possível enviar. Tente novamente mais tarde.', 'error');
  }
}

// Inicializa a aplicação quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFormListener);
} else {
  // DOM já está pronto
  initFormListener();
}
