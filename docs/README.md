# Documentação - Minoru Anniversary Portal

Documentação técnica completa do projeto.

## 🏗️ Estrutura do Projeto

```
minoru-anniversary-portal/
├── index.html              # Arquivo principal (GitHub Pages)
├── styles/
│   └── main.css            # Estilos únicos consolidados
├── scripts/
│   └── app.js              # JavaScript principal (sem módulos)
├── package.json            # Dependências e scripts
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Documentação simples (raiz)
└── docs/
    └── README.md           # Documentação técnica (este arquivo)
```

## 🎯 Características

- ✅ **Compatível com GitHub Pages** — Sem dependências de build, sem módulos ES6
- ✅ **Acessibilidade** — ARIA labels, semantic HTML, suporte a motion reduzido
- ✅ **Design Responsivo** — Funciona em mobile e desktop
- ✅ **Integração Google Sheets** — Formulário envia dados diretamente para planilha
- ✅ **Sem Build** — Arquivo único de JavaScript e CSS, pronto para deploy

## 🚀 Como Usar

### Abrir Localmente

Abra `index.html` diretamente no navegador (não precisa de servidor, já que não usa módulos).

### Deploy no GitHub Pages

1. Faça push do código para seu repositório
2. Vá em **Settings → Pages**
3. Selecione **Deploy from a branch**
4. Escolha a branch `main` e pasta `/ (root)`
5. Seu portal estará disponível em `https://seu-usuario.github.io/minoru-anniversary-portal`

### Configuração

Edite `scripts/app.js` para alterar a URL do Google Apps Script:

```javascript
const CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/SEU_SCRIPT_ID/exec'
};
```

## 📝 Tecnologias

- **HTML5** — Semântico e acessível
- **CSS3** — Variáveis CSS, media queries, transições suaves
- **JavaScript** — Vanilla JS (sem frameworks, sem build tools)
- **Google Sheets API** — Integração para armazenar respostas

## 🔧 Desenvolvimento

### Modificar Estilos

Edite `styles/main.css`. As variáveis CSS estão no topo do arquivo:

```css
:root {
  --accent: #27528aff;        /* Cor principal */
  --accent-600: #312eccff;    /* Cor secundária */
  --max-width: 720px;       /* Largura máxima do container */
  /* ... outras variáveis */
}
```

### Modificar Lógica

Edite `scripts/app.js`. Todas as funções estão bem documentadas com comentários.

### Personalizar Conteúdo

Edite `index.html` para alterar:
- Nome do aniversariante
- Data e local do evento
- Textos dos campos do formulário

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/sua-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona feature'`)
4. Push para a branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

## 👤 Author

*Henrique Witzel*
