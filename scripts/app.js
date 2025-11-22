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
let acompanhantesInput;
let nomesTextarea;
let nomesHelp;
let toastTimeoutId;

/**
 * Inicializa os elementos do DOM
 */
function initDOMElements() {
  form = document.getElementById('rsvp-form');
  msg = document.getElementById('msg');
  submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  acompanhantesInput = document.getElementById('acompanhantes');
  nomesTextarea = document.getElementById('nomesAcompanhante');
  nomesHelp = document.getElementById('nomesAcompanhante-help');

  if (!form || !msg || !submitBtn) {
    console.error('Elementos do formulário não encontrados');
    return false;
  }

  if (submitBtn && !submitBtn.dataset.label) {
    submitBtn.dataset.label = submitBtn.textContent.trim();
  }

  return true;
}

/**
 * Esconde o toast, se existir
 */
function hideToast() {
  if (!msg) return;
  const toast = msg.querySelector('.msg-toast');
  if (!toast) return;

  toast.classList.remove('visible');
  setTimeout(() => {
    if (toast.parentElement === msg) {
      msg.innerHTML = '';
    }
  }, 200);
}

/**
 * Exibe uma mensagem para o usuário em formato de popup (toast)
 * @param {string} text - Texto da mensagem
 * @param {string} type - Tipo da mensagem ('success', 'error', '')
 */
function showMessage(text, type = '') {
  if (!msg || !text) return;

  // cancela timeout anterior, se houver
  if (toastTimeoutId) {
    clearTimeout(toastTimeoutId);
  }

  // limpa qualquer toast anterior
  msg.innerHTML = '';

  const toast = document.createElement('div');
  toast.className = type ? `msg-toast ${type}` : 'msg-toast';
  toast.textContent = text;

  // permite fechar clicando
  toast.addEventListener('click', hideToast);

  msg.appendChild(toast);

  // ativa animação
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  const duration = type === 'error' ? 6000 : 4000;
  toastTimeoutId = setTimeout(hideToast, duration);
}

/**
 * Deixa o campo "nomesAcompanhante" obrigatório
 * quando o número de acompanhantes for maior que 0
 * e mostra/oculta a mensagem de ajuda
 */
function updateAcompanhantesRequirement() {
  if (!acompanhantesInput || !nomesTextarea) return;

  const qtd = parseInt(acompanhantesInput.value, 10) || 0;

  if (qtd > 0) {
    nomesTextarea.required = true;
    nomesTextarea.setAttribute('aria-required', 'true');

    if (nomesHelp) {
      nomesTextarea.setAttribute('aria-describedby', 'nomesAcompanhante-help');
      nomesHelp.textContent =
        'Obrigatório informar os nomes dos acompanhantes quando houver acompanhantes.';
      nomesHelp.classList.add('visible');
    }
  } else {
    nomesTextarea.required = false;
    nomesTextarea.removeAttribute('aria-required');

    if (nomesHelp) {
      nomesTextarea.removeAttribute('aria-describedby');
      nomesHelp.textContent = '';
      nomesHelp.classList.remove('visible');
    }
  }
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
  updateAcompanhantesRequirement();
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

  if (!form || !submitBtn) return;

  // se já estiver enviando, evita duplo clique / Enter repetido
  if (submitBtn.disabled) {
    return;
  }

  // garante que a regra de obrigatoriedade esteja atualizada
  updateAcompanhantesRequirement();

  // Validação nativa
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const defaultLabel = submitBtn.dataset.label || submitBtn.textContent.trim();
  submitBtn.dataset.label = defaultLabel;

  // trava o botão e mostra estado de carregando
  submitBtn.disabled = true;
  submitBtn.setAttribute('aria-busy', 'true');
  submitBtn.textContent = 'Enviando...';

  try {
    const data = collectFormData();
    await submitFormData(data);

    showMessage('Sua presença foi confirmada. Obrigado!', 'success');
    resetForm();

    // mantém desabilitado para não duplicar submissão
    submitBtn.removeAttribute('aria-busy');
    submitBtn.textContent = 'Enviado ✔';
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    showMessage(
      'Não foi possível enviar. Tente novamente mais tarde.',
      'error'
    );

    submitBtn.disabled = false;
    submitBtn.removeAttribute('aria-busy');
    submitBtn.textContent = defaultLabel;
  }
}

/**
 * Inicializa a aplicação
 */
function init() {
  if (!initDOMElements()) return;

  if (acompanhantesInput) {
    acompanhantesInput.addEventListener(
      'input',
      updateAcompanhantesRequirement
    );
    acompanhantesInput.addEventListener(
      'change',
      updateAcompanhantesRequirement
    );
    updateAcompanhantesRequirement();
  }

  form.addEventListener('submit', handleFormSubmit);
  console.log('Formulário inicializado com sucesso');
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
