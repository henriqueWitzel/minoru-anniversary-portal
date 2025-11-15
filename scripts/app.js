/**
 * Aplicação RSVP - Confirmação de Presença
 * Arquivo único sem módulos ES6 para compatibilidade com GitHub Pages
 */

const CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxPpjtHik6zKSXgZAM04BHEbPLXRPQMUnFVm9zJlV9uY010-TGceM-d7vuaenho4vDq/exec'
};

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
 * Exibe uma mensagem para o usuário
 * @param {string} text - Texto da mensagem
 * @param {string} type - Tipo da mensagem ('success', 'error', '')
 */
function showMessage(text, type = '') {
  msg.textContent = text;
  msg.className = type;
  msg.focus({ preventScroll: true });
}

/**
 * Coleta os dados do formulário
 * @returns {Object} Dados do formulário
 */
function collectFormData() {
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
 */
function resetForm() {
  form.reset();
  document.getElementById('nome').focus();
}

/**
 * Envia os dados do formulário para a API
 * @param {Object} data - Dados do formulário
 * @returns {Promise<Response>} Resposta da API
 */
async function submitFormData(data) {
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

  showMessage('Enviando...', '');

  try {
    const data = collectFormData();
    await submitFormData(data);

    showMessage('Resposta registrada, obrigado!', 'success');
    resetForm();
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    showMessage('Não foi possível enviar. Tente novamente mais tarde.', 'error');
  }
}

/**
 * Inicializa a aplicação
 */
function init() {
  if (!initDOMElements()) return;
  
  form.addEventListener('submit', handleFormSubmit);
  console.log('Formulário inicializado com sucesso');
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
