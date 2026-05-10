/* ============================================================
   Zyntra — Chat de Suporte (visual Teams)
   Widget flutuante com sidebar + BOB I.A. auto-resposta
   ============================================================ */

/* ── Dados dos canais ────────────────────────────────── */
const chatChannels = {
  suporte: {
    name: 'suporte-geral',
    desc: 'Canal de suporte geral da Zyntra',
    icon: '#',
    messages: [
      { id: 'sys-1', author: 'Equipe Zyntra', initials: 'ZN', role: 'Suporte', time: formatTime(new Date()), isAI: true,
        text: 'Bem-vindo ao suporte Zyntra! 👋 Estamos aqui para ajudar. Como podemos te ajudar hoje?' },
    ]
  },
  tecnico: {
    name: 'problemas-técnicos',
    desc: 'Reporte erros e problemas técnicos do sistema',
    icon: '#',
    messages: [
      { id: 'sys-2', author: 'Equipe Zyntra', initials: 'ZN', role: 'Suporte Técnico', time: formatTime(new Date()), isAI: true,
        text: 'Canal de suporte técnico. Para agilizar o atendimento, descreva: 1) O que estava fazendo, 2) O erro que apareceu, 3) Seu navegador e sistema operacional.' },
    ]
  },
  financeiro: {
    name: 'financeiro',
    desc: 'Dúvidas sobre planos, cobranças e faturas',
    icon: '#',
    messages: [
      { id: 'sys-3', author: 'Equipe Zyntra', initials: 'ZN', role: 'Financeiro', time: formatTime(new Date()), isAI: true,
        text: 'Canal financeiro. Para dúvidas sobre planos, faturas ou upgrades, fale com a gente!' },
    ]
  },
  duvidas: {
    name: 'dúvidas-sistema',
    desc: 'Perguntas gerais sobre como usar o Zyntra ERP',
    icon: '#',
    messages: [
      { id: 'sys-4', author: 'BOB I.A.', initials: 'IA', role: 'Assistente Virtual', time: formatTime(new Date()), isAI: true, isBob: true,
        text: 'Olá! Sou o BOB I.A., seu assistente virtual. Faça sua dúvida sobre o sistema Zyntra e farei o possível para ajudar!' },
    ]
  },
  bob: {
    name: 'BOB I.A.',
    desc: 'Assistente virtual — responde dúvidas do sistema 24h',
    icon: '★',
    messages: [
      { id: 'bob-1', author: 'BOB I.A.', initials: 'IA', role: 'Assistente Virtual', time: formatTime(new Date()), isAI: true, isBob: true,
        text: 'Olá! Sou o **BOB**, assistente virtual da Zyntra. Posso te ajudar com dúvidas sobre NF-e, financeiro, estoque, vendas e muito mais. O que você precisa?' },
    ]
  },
  'dm-suporte': {
    name: 'Suporte Zyntra',
    desc: 'Mensagem direta com o time de suporte',
    icon: '●',
    messages: [
      { id: 'dm-1', author: 'Suporte Zyntra', initials: 'SZ', role: 'Atendimento', time: formatTime(new Date()), isAI: true,
        text: 'Olá! Você está falando diretamente com o time de suporte Zyntra. Em que posso te ajudar?' },
    ]
  },
};

/* ── Respostas do BOB I.A. ───────────────────────────── */
const bobResponses = {
  nf: 'Para emitir NF-e no Zyntra: acesse **Módulo Fiscal → NF-e → Nova Nota**. Preencha os dados do destinatário, produtos e impostos. Se tiver dificuldade, confira o tutorial "Emissão de Notas Fiscais" na seção Treinamentos.',
  fiscal: 'Para dúvidas fiscais (NF-e, NFS-e, impostos): acesse **Módulo Fiscal** no painel da sua empresa. Se quiser aprender do zero, recomendo o tutorial "Módulo Fiscal" nos seus Treinamentos.',
  financeiro: 'O **Módulo Financeiro** do Zyntra cobre: contas a pagar/receber, fluxo de caixa, conciliação bancária e DRE. Acesse a partir do painel da empresa → Financeiro.',
  estoque: 'Para controlar estoque: vá em **Módulo de Estoque → Produtos** para cadastrar, e **Movimentações** para entradas e saídas. O inventário físico fica em Estoque → Inventário.',
  senha: 'Para redefinir sua senha: acesse a página de login e clique em "Esqueci minha senha". Um e-mail será enviado com o link de redefinição.',
  relatorio: 'Os relatórios ficam em cada módulo, no menu lateral. Para relatórios consolidados: **Dashboards e BI → Relatórios**. Você pode exportar em PDF ou Excel.',
  integracoes: 'O Zyntra integra com: WhatsApp Business, bancos (OFX/extrato), emissão fiscal, eSocial e marketplaces. As configurações ficam em **Configurações → Integrações**.',
  usuario: 'Para gerenciar usuários: acesse **Configurações → Gerenciar Usuários**. Lá você pode criar, editar permissões e desativar acessos.',
  default: [
    'Entendi sua dúvida! Deixa eu verificar... 🤔 Para uma resposta mais detalhada, recomendo abrir um chamado no canal **#suporte-geral** ou acessar o tutorial correspondente em **Meus Treinamentos**.',
    'Boa pergunta! Essa funcionalidade está no módulo correspondente do seu painel Zyntra. Se quiser, posso te guiar pelo tutorial passo a passo na seção **Treinamentos**.',
    'Para isso você precisará acessar as configurações do módulo correspondente. Nossa equipe de suporte pode te ajudar com mais detalhes — use o canal **#suporte-geral**.',
    'Vou registrar sua dúvida! Nossa equipe de suporte entrará em contato pelo seu e-mail cadastrado em até 2 horas úteis. Posso te ajudar com mais alguma coisa?',
  ],
};

/* ── Estado ──────────────────────────────────────────── */
let chatState = {
  activeChannel: 'suporte',
  open: false,
  msgCounter: 100,
};

/* ── Init ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Pegar nome do usuário logado
  try {
    const u = JSON.parse(localStorage.getItem('zyntra_user') || '{}');
    const name    = u.name || u.email || 'Usuário';
    const initial = (name[0] || 'U').toUpperCase();
    setText('chatUserName', name);
    setText('chatUserAvatar', initial);
  } catch (_) {}

  // Toggle do widget
  document.getElementById('chatToggleBtn')?.addEventListener('click', chatToggle);
  document.getElementById('chatCloseBtn')?.addEventListener('click', chatClose);

  // Canais (sidebar items)
  document.querySelectorAll('.chat-sidebar__item, .chat-sidebar__bob').forEach(btn => {
    btn.addEventListener('click', () => {
      const ch = btn.dataset.channel;
      if (ch) chatSelectChannel(ch, btn);
    });
  });

  // Input
  const input = document.getElementById('chatInputArea');
  const send  = document.getElementById('chatSendBtn');

  input?.addEventListener('input', () => {
    send.disabled = !input.value.trim();
    // Auto-resize
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  });

  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); chatSend(); }
  });

  send?.addEventListener('click', chatSend);

  // Renderizar canal inicial
  renderChatMessages('suporte');
});

/* ── Toggle widget ───────────────────────────────────── */
function chatToggle() {
  chatState.open ? chatClose() : chatOpen();
}

function chatOpen() {
  chatState.open = true;
  document.getElementById('chatWidget')?.classList.add('open');
  hideBadge();
  renderChatMessages(chatState.activeChannel);
  setTimeout(() => {
    const msgs = document.getElementById('chatMessages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }, 50);
}

function chatClose() {
  chatState.open = false;
  document.getElementById('chatWidget')?.classList.remove('open');
}

function hideBadge() {
  const badge = document.getElementById('chatBadge');
  if (badge) badge.classList.add('hidden');
}

/* ── Trocar canal ────────────────────────────────────── */
function chatSelectChannel(channelId, btn) {
  if (!chatChannels[channelId]) return;

  chatState.activeChannel = channelId;

  // UI: remover active de todos
  document.querySelectorAll('.chat-sidebar__item, .chat-sidebar__bob').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Unread: esconder badge do canal ativado
  const unread = document.getElementById(`unread-${channelId}`);
  if (unread) unread.style.display = 'none';

  // Header
  const ch = chatChannels[channelId];
  const isBob = channelId === 'bob';
  const isDM  = channelId === 'dm-suporte';

  setText('chatChannelName', ch.name);
  setText('chatChannelDesc', ch.desc);

  const iconEl = document.getElementById('chatChannelIcon');
  if (iconEl) {
    iconEl.textContent = ch.icon;
    iconEl.style.color = isBob ? '#a78bfa' : '';
  }

  // Placeholder do input
  const input = document.getElementById('chatInputArea');
  if (input) input.placeholder = `Mensagem ${isBob ? 'para BOB I.A.' : isDM ? 'para Suporte Zyntra' : 'em #' + ch.name}`;

  renderChatMessages(channelId);
}

/* ── Renderizar mensagens ────────────────────────────── */
function renderChatMessages(channelId) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const ch = chatChannels[channelId];
  if (!ch) return;

  const msgs = ch.messages;

  // Welcome card para canal ativo
  const welcomeHtml = `
    <div class="chat-welcome">
      <div class="chat-welcome__icon">${channelId === 'bob' ? '🤖' : channelId === 'dm-suporte' ? '💬' : '💡'}</div>
      <h4>${channelId === 'bob' ? 'BOB I.A. — Assistente Virtual' : 'Bem-vindo ao canal #' + ch.name}</h4>
      <p>${ch.desc}</p>
    </div>
    <div class="chat-date-divider">Hoje</div>`;

  const msgsHtml = msgs.map((m, i) => buildMessageHtml(m, msgs[i - 1])).join('');

  container.innerHTML = welcomeHtml + msgsHtml;
  container.scrollTop = container.scrollHeight;
}

function buildMessageHtml(msg, prev) {
  const grouped = prev && prev.author === msg.author;
  const avatarClass = msg.isBob ? 'ai' : '';
  const avatarHidden = grouped ? 'hidden' : '';
  const authorClass  = msg.isBob ? 'ai-label' : '';
  const headerHtml   = grouped ? '' : `
    <div class="chat-msg__header">
      <span class="chat-msg__author ${authorClass}">${escHtml(msg.author)}</span>
      ${msg.role ? `<span class="chat-msg__role">${escHtml(msg.role)}</span>` : ''}
      <span class="chat-msg__time">${msg.time}</span>
    </div>`;

  const textFormatted = escHtml(msg.text).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  const ownClass = msg.isOwn ? 'own' : '';

  return `<div class="chat-msg ${ownClass}">
    <div class="chat-msg__avatar ${avatarClass} ${avatarHidden}">${msg.initials}</div>
    <div class="chat-msg__body">
      ${headerHtml}
      <div class="chat-msg__text">${textFormatted}</div>
    </div>
  </div>`;
}

/* ── Enviar mensagem ─────────────────────────────────── */
function chatSend() {
  const input = document.getElementById('chatInputArea');
  const text  = input?.value?.trim();
  if (!text) return;

  const channelId = chatState.activeChannel;
  const ch        = chatChannels[channelId];
  if (!ch) return;

  // Pegar nome do usuário
  let userName = 'Você';
  let userInitial = 'V';
  try {
    const u = JSON.parse(localStorage.getItem('zyntra_user') || '{}');
    userName   = u.name || u.email || 'Você';
    userInitial = (userName[0] || 'V').toUpperCase();
  } catch (_) {}

  // Adicionar mensagem do usuário
  const userMsg = {
    id: 'msg-' + (++chatState.msgCounter),
    author: userName,
    initials: userInitial,
    role: '',
    time: formatTime(new Date()),
    text,
    isOwn: true,
  };

  ch.messages.push(userMsg);

  // Limpar input
  if (input) { input.value = ''; input.style.height = 'auto'; }
  const send = document.getElementById('chatSendBtn');
  if (send) send.disabled = true;

  renderChatMessages(channelId);

  // Auto-resposta do BOB / Equipe
  const delay = 1200 + Math.random() * 800;

  // Mostrar typing indicator
  setTimeout(() => showTyping(channelId), 400);

  setTimeout(() => {
    hideTyping();
    const reply = buildReply(text, channelId);
    ch.messages.push(reply);
    renderChatMessages(channelId);
  }, delay);
}

function showTyping(channelId) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const ch     = chatChannels[channelId];
  const isBot  = channelId === 'bob' || channelId === 'duvidas';
  const author = isBot ? 'BOB I.A.' : 'Suporte Zyntra';

  const typing = document.createElement('div');
  typing.id = 'chatTyping';
  typing.className = 'chat-typing';
  typing.innerHTML = `
    <div class="chat-msg__avatar ${isBot ? 'ai' : ''}">
      ${isBot ? 'IA' : 'SZ'}
    </div>
    <span>${author} está digitando</span>
    <div class="chat-typing-dots">
      <span></span><span></span><span></span>
    </div>`;

  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
}

function hideTyping() {
  document.getElementById('chatTyping')?.remove();
}

function buildReply(userText, channelId) {
  const lc     = userText.toLowerCase();
  const isBot  = channelId === 'bob' || channelId === 'duvidas';

  let text;

  if (isBot) {
    // BOB I.A. — respostas temáticas
    if (lc.includes('nf') || lc.includes('nota fiscal')) {
      text = bobResponses.nf;
    } else if (lc.includes('fiscal') || lc.includes('imposto') || lc.includes('nfse')) {
      text = bobResponses.fiscal;
    } else if (lc.includes('financeiro') || lc.includes('boleto') || lc.includes('conta') || lc.includes('caixa')) {
      text = bobResponses.financeiro;
    } else if (lc.includes('estoque') || lc.includes('produto') || lc.includes('inventario')) {
      text = bobResponses.estoque;
    } else if (lc.includes('senha') || lc.includes('acesso') || lc.includes('login')) {
      text = bobResponses.senha;
    } else if (lc.includes('relatorio') || lc.includes('relatório') || lc.includes('bi') || lc.includes('dashboard')) {
      text = bobResponses.relatorio;
    } else if (lc.includes('integra') || lc.includes('whatsapp') || lc.includes('banco')) {
      text = bobResponses.integracoes;
    } else if (lc.includes('usuario') || lc.includes('usuário') || lc.includes('permiss')) {
      text = bobResponses.usuario;
    } else {
      const arr = bobResponses.default;
      text = arr[Math.floor(Math.random() * arr.length)];
    }
  } else if (channelId === 'financeiro') {
    text = 'Recebemos sua mensagem sobre o plano financeiro! Nossa equipe de vendas entrará em contato em até 1 hora útil pelo e-mail cadastrado.';
  } else if (channelId === 'tecnico') {
    text = 'Ticket de suporte técnico registrado! ✅ Um especialista analisará seu caso e responderá em até 2 horas úteis. Número do ticket: **#TKT-' + Math.floor(10000 + Math.random() * 90000) + '**';
  } else {
    // suporte geral e dm
    const replies = [
      'Mensagem recebida! Nossa equipe de suporte analisará e responderá em breve. ✅',
      'Entendido! Estamos verificando sua solicitação e retornaremos pelo e-mail cadastrado em breve.',
      'Obrigado pelo contato! Para questões urgentes, ligue para nosso suporte: (11) 92090-6946.',
      'Registramos sua solicitação! Alguém do time de suporte entrará em contato em até 2 horas úteis.',
    ];
    text = replies[Math.floor(Math.random() * replies.length)];
  }

  const isBob = isBot;
  return {
    id: 'reply-' + (++chatState.msgCounter),
    author: isBob ? 'BOB I.A.' : 'Suporte Zyntra',
    initials: isBob ? 'IA' : 'SZ',
    role: isBob ? 'Assistente Virtual' : 'Suporte',
    time: formatTime(new Date()),
    text,
    isAI: true,
    isBob,
  };
}

/* ── Helpers ─────────────────────────────────────────── */
function formatTime(date) {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
