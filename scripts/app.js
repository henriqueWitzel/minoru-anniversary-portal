/**
 * Aplicação RSVP - Confirmação de Presença
 * Arquivo único sem módulos ES6 para compatibilidade com GitHub Pages
 */

const CONFIG = {
  SCRIPT_URL:
    'https://script.google.com/macros/s/AKfycbxWQbgPg6yld0pmcZ_J6WKLFxsvYytxviAYD4PO3Qpl9JsK9C6HaMmGKs4M9um-PMok/exec'
};

let form;
let msg;
let submitBtn;

/**
 * Inicializa os elementos do DOM
 */
function initDOMElements() {
  form = document.getElementById('rsvp-form');
  msg = document.getElementById('msg');
  submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (!form || !msg || !submitBtn) {
    console.error('Elementos do formulário não encontrados');
    return false;
  }

  // Guarda o texto original do botão para reuso
  if (submitBtn && !submitBtn.dataset.label) {
    submitBtn.dataset.label = submitBtn.textContent.trim();
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
    nomesAcompanhante: document.getElementById('nomesAcompanhante').value
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

  if (submitBtn && submitBtn.disabled) {
    // Já está enviando, evita duplo clique / Enter repetido
    return;
  }

  // Validação nativa
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (submitBtn) {
    const defaultLabel = submitBtn.dataset.label || submitBtn.textContent;
    submitBtn.dataset.label = defaultLabel;

    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.textContent = 'Enviando...';
  }

  showMessage('Enviando...', '');

  try {
    const data = collectFormData();
    await submitFormData(data);

    showMessage('Resposta registrada, obrigado!', 'success');
    resetForm();

    if (submitBtn) {
      submitBtn.removeAttribute('aria-busy');
      submitBtn.textContent = 'Enviado ✔';
      // Mantém desabilitado para não duplicar submissão
    }
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    showMessage(
      'Não foi possível enviar. Tente novamente mais tarde.',
      'error'
    );

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.textContent = submitBtn.dataset.label || 'Enviar';
    }
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
