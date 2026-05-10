/* ============================================================
   Zyntra — Treinamentos
   Navegação de cursos, player YouTube, comentários (localStorage)
   ============================================================ */

/* ------------------------------------------------------------------
   DADOS DOS CURSOS
   Para adicionar um vídeo:
   1. Faça upload no YouTube (público ou não-listado)
   2. Copie o ID do vídeo da URL: youtube.com/watch?v=VIDEO_ID
   3. Cole o ID no campo videoId da aula correspondente abaixo
   ------------------------------------------------------------------ */
const courseData = [
  {
    id: 'cat-inicio',
    title: 'Primeiros Passos',
    color: '#6C5CE7',
    lessons: [
      { id: 'l-inicio-1', title: 'Configuração inicial do sistema', duration: '18min', videoId: '', description: 'Visão geral do Zyntra ERP, primeiras configurações de empresa, usuários e preferências do sistema.', completed: true },
      { id: 'l-inicio-2', title: 'Integração com WhatsApp', duration: '12min', videoId: '', description: 'Configure o WhatsApp Business para envio de notas, cobranças e notificações automáticas.', completed: true },
      { id: 'l-inicio-3', title: 'Atualizações e novidades do produto', duration: '8min', videoId: '', description: 'Saiba como acompanhar as atualizações e aproveitar os novos recursos do sistema.', completed: false },
    ]
  },
  {
    id: 'cat-vendas',
    title: 'Módulo de Vendas',
    color: '#00B894',
    lessons: [
      { id: 'l-vendas-1', title: 'Cadastro de clientes e fornecedores', duration: '22min', videoId: '', description: 'Aprenda a cadastrar clientes e fornecedores, campos obrigatórios e importação de cadastros.', completed: true },
      { id: 'l-vendas-2', title: 'Emissão de pedidos e orçamentos', duration: '35min', videoId: '', description: 'Crie pedidos de venda, envie orçamentos e acompanhe o status de cada negociação.', completed: false, inProgress: true, progress: 50 },
      { id: 'l-vendas-3', title: 'Gestão de comissões e metas', duration: '20min', videoId: '', description: 'Configure comissões por vendedor ou produto e gere relatórios de desempenho.', completed: false },
    ]
  },
  {
    id: 'cat-financeiro',
    title: 'Módulo Financeiro',
    color: '#0984e3',
    lessons: [
      { id: 'l-fin-1', title: 'Contas a Pagar e a Receber', duration: '40min', videoId: '', description: 'Controle contas, gere boletos, realize baixas e acompanhe o fluxo de caixa.', completed: false, inProgress: true, progress: 65 },
      { id: 'l-fin-2', title: 'Conciliação bancária', duration: '28min', videoId: '', description: 'Importe extratos OFX e reconcilie automaticamente suas transações bancárias.', completed: false },
      { id: 'l-fin-3', title: 'Relatórios financeiros e DRE', duration: '32min', videoId: '', description: 'Gere relatórios de fluxo de caixa, DRE e balanço patrimonial.', completed: false },
    ]
  },
  {
    id: 'cat-estoque',
    title: 'Módulo de Estoque',
    color: '#E17055',
    lessons: [
      { id: 'l-est-1', title: 'Cadastro e categorização de produtos', duration: '25min', videoId: '', description: 'Cadastre produtos, defina categorias, unidades de medida e variantes.', completed: true },
      { id: 'l-est-2', title: 'Movimentações e inventário', duration: '30min', videoId: '', description: 'Realize entradas, saídas, transferências e inventário físico do estoque.', completed: false, inProgress: true, progress: 30 },
    ]
  },
  {
    id: 'cat-fiscal',
    title: 'Módulo Fiscal',
    color: '#00cec9',
    lessons: [
      { id: 'l-fisc-1', title: 'Emissão de Notas Fiscais (NF-e)', duration: '45min', videoId: '', description: 'Guia completo para emissão, cancelamento e inutilização de NF-e.', completed: false },
      { id: 'l-fisc-2', title: 'NFS-e Nacional e serviços', duration: '35min', videoId: '', description: 'Emita notas de serviço conforme o padrão NFS-e Nacional atualizado.', completed: false },
      { id: 'l-fisc-3', title: 'Desconto de duplicatas', duration: '18min', videoId: '', description: 'Entenda como funciona o desconto de duplicatas e integre com sua financeira.', completed: false },
    ]
  },
  {
    id: 'cat-rh',
    title: 'Módulo de RH',
    color: '#fd79a8',
    lessons: [
      { id: 'l-rh-1', title: 'Folha de Pagamento e eSocial', duration: '50min', videoId: '', description: 'Configure a folha de pagamento e envie os eventos do eSocial ao governo.', completed: false },
      { id: 'l-rh-2', title: 'Controle de ponto e horas extras', duration: '22min', videoId: '', description: 'Configure o controle de ponto, calcule horas extras e banco de horas.', completed: false },
    ]
  },
  {
    id: 'cat-compras',
    title: 'Módulo de Compras',
    color: '#FDCB6E',
    lessons: [
      { id: 'l-comp-1', title: 'Pedidos de compra e cotações', duration: '28min', videoId: '', description: 'Crie pedidos de compra, compare cotações e aprove solicitações de compra.', completed: false },
      { id: 'l-comp-2', title: 'Gestão de fornecedores', duration: '20min', videoId: '', description: 'Cadastre e avalie fornecedores, negocie condições e controle contratos.', completed: false },
    ]
  },
  {
    id: 'cat-bi',
    title: 'Dashboards e BI',
    color: '#A29BFE',
    lessons: [
      { id: 'l-bi-1', title: 'Dashboards e indicadores de desempenho', duration: '35min', videoId: '', description: 'Crie dashboards inteligentes para tomada de decisão estratégica.', completed: false },
      { id: 'l-bi-2', title: 'Relatórios avançados e exportações', duration: '25min', videoId: '', description: 'Gere e exporte relatórios avançados em PDF, Excel e outros formatos.', completed: false },
    ]
  },
];

/* ── Estado ─────────────────────────────────────────── */
let state = {
  currentLessonId: null,
  currentCatId: null,
  flatLessons: [],   // todos os lessons em ordem linear
  userName: 'Usuário',
};

/* ── Init ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Pegar userName do localStorage (definido por pages-app.js)
  try {
    const u = JSON.parse(localStorage.getItem('zyntra_user') || '{}');
    state.userName = u.name || u.email || 'Usuário';
    const initial = (state.userName[0] || 'U').toUpperCase();
    const el = document.getElementById('commentAvatar');
    if (el) el.textContent = initial;
  } catch (_) {}

  // Carregar progresso salvo
  loadProgress();

  // Construir lista plana de aulas
  state.flatLessons = courseData.flatMap(cat => cat.lessons.map(l => ({ ...l, catId: cat.id })));

  renderSidebarNav();
  renderHomeModules();
  renderInProgress();
  updateStats();

  // Botão voltar
  document.getElementById('backToHome')?.addEventListener('click', showHome);
  document.getElementById('sidebarHomeBtn')?.addEventListener('click', showHome);

  // Prev / Next
  document.getElementById('prevLessonBtn')?.addEventListener('click', prevLesson);
  document.getElementById('nextLessonBtn')?.addEventListener('click', nextLesson);

  // Marcar como concluída
  document.getElementById('markCompleteBtn')?.addEventListener('click', toggleComplete);

  // Comentários
  document.getElementById('commentSubmit')?.addEventListener('click', submitComment);
  document.getElementById('commentInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitComment(); }
  });

  // Busca na sidebar
  document.getElementById('trnSearch')?.addEventListener('input', e => filterNav(e.target.value));

  // Sidebar mobile
  document.getElementById('sidebarOpenBtn')?.addEventListener('click', openSidebar);
  document.getElementById('sidebarCloseBtn')?.addEventListener('click', closeSidebar);
  document.getElementById('sidebarOverlay')?.addEventListener('click', closeSidebar);
});

/* ── Progresso (localStorage) ───────────────────────── */
function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('zyntra_trn_progress') || '{}');
    courseData.forEach(cat => {
      cat.lessons.forEach(l => {
        if (saved[l.id]) l.completed = true;
      });
    });
  } catch (_) {}
}

function saveProgress() {
  const map = {};
  courseData.forEach(cat => cat.lessons.forEach(l => { if (l.completed) map[l.id] = true; }));
  localStorage.setItem('zyntra_trn_progress', JSON.stringify(map));
}

/* ── Stats ───────────────────────────────────────────── */
function updateStats() {
  const total = courseData.reduce((s, c) => s + c.lessons.length, 0);
  const done  = courseData.reduce((s, c) => s + c.lessons.filter(l => l.completed).length, 0);
  const pct   = total ? Math.round((done / total) * 100) : 0;
  const certs = Math.floor(done / 2); // simplificado: 1 cert a cada 2 aulas

  setText('homeProgressBadge', `${done} de ${total} aulas concluídas`);
  setText('statProgress', `${pct}%`);
  setText('statCerts', certs);
  setText('sidebarProgressPct', `${pct}%`);
  setText('sidebarCompleted', done);
  setText('sidebarTotal', total);
  setText('statCerts', certs);

  const fill = document.getElementById('sidebarProgressFill');
  if (fill) fill.style.width = pct + '%';

  // Tempo total (soma de durações)
  let totalMin = 0;
  courseData.forEach(cat => cat.lessons.forEach(l => {
    const m = parseInt(l.duration) || 0;
    totalMin += m;
  }));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  setText('statTime', h > 0 ? `${h}h ${m}min` : `${m}min`);
}

/* ── Sidebar Nav ─────────────────────────────────────── */
function renderSidebarNav() {
  const nav = document.getElementById('trnNav');
  if (!nav) return;

  nav.innerHTML = courseData.map(cat => {
    const total = cat.lessons.length;
    const done  = cat.lessons.filter(l => l.completed).length;
    const pct   = total ? Math.round((done / total) * 100) : 0;

    const lessonsHtml = cat.lessons.map(l => {
      const isActive    = l.id === state.currentLessonId ? 'active' : '';
      const isCompleted = l.completed ? 'completed' : '';
      const checkIcon   = l.completed
        ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00B894" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>`
        : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>`;

      return `<li>
        <button class="trn-nav__lesson-btn ${isActive} ${isCompleted}" onclick="openLesson('${l.id}','${cat.id}')">
          <span class="trn-nav__check">${checkIcon}</span>
          <span class="trn-nav__lesson-name">${l.title}</span>
          <span class="trn-nav__lesson-dur">${l.duration}</span>
        </button>
      </li>`;
    }).join('');

    // Abrir categoria se tiver aula ativa
    const hasActive = cat.lessons.some(l => l.id === state.currentLessonId);
    const openClass = hasActive ? 'open' : '';

    return `<div class="trn-nav__cat ${openClass}" id="cat-block-${cat.id}">
      <button class="trn-nav__cat-toggle" onclick="toggleCat('${cat.id}')">
        <span class="trn-nav__cat-icon-inner" style="background:${cat.color}15; color:${cat.color}; width:24px; height:24px; border-radius:7px; display:flex; align-items:center; justify-content:center;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="${cat.color}" stroke="none"><rect width="24" height="24" rx="4" fill="${cat.color}" fill-opacity="0"/><path fill="${cat.color}" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        </span>
        <span class="trn-nav__cat-label">${cat.title}</span>
        <span class="trn-nav__cat-pct">${pct}%</span>
        <svg class="trn-nav__cat-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <ul class="trn-nav__lessons">${lessonsHtml}</ul>
    </div>`;
  }).join('');
}

function toggleCat(catId) {
  const block = document.getElementById(`cat-block-${catId}`);
  if (block) block.classList.toggle('open');
}

/* ── Home: módulos ───────────────────────────────────── */
function renderHomeModules() {
  const grid = document.getElementById('allModulesGrid');
  if (!grid) return;

  grid.innerHTML = courseData.map(cat => {
    const total = cat.lessons.length;
    const done  = cat.lessons.filter(l => l.completed).length;
    const pct   = total ? Math.round((done / total) * 100) : 0;

    return `<div class="trn-module-card" onclick="openFirstLesson('${cat.id}')">
      <div class="trn-module-card__icon" style="background:${cat.color}15; color:${cat.color};">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${cat.color}" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </div>
      <div class="trn-module-card__title">${cat.title}</div>
      <div class="trn-module-card__meta">
        <span class="trn-module-card__count">${total} aulas</span>
        <span class="trn-module-card__pct">${pct}%</span>
      </div>
      <div class="trn-module-card__bar">
        <div class="trn-module-card__bar-fill" style="width:${pct}%; background:${cat.color};"></div>
      </div>
    </div>`;
  }).join('');
}

/* ── Home: em andamento ──────────────────────────────── */
function renderInProgress() {
  const section = document.getElementById('inProgressSection');
  const cards   = document.getElementById('inProgressCards');
  if (!section || !cards) return;

  const inProgress = [];
  courseData.forEach(cat => {
    cat.lessons.forEach(l => {
      if (l.inProgress && !l.completed) inProgress.push({ ...l, catTitle: cat.title, catColor: cat.color });
    });
  });

  if (!inProgress.length) { section.style.display = 'none'; return; }
  section.style.display = '';

  cards.innerHTML = inProgress.map(l => {
    const pct = l.progress || 0;
    return `<div class="trn-course-card" onclick="openLesson('${l.id}','${l.id.split('-').slice(0,2).join('-').replace('l','cat')}')">
      <div class="trn-course-card__thumb" style="background:linear-gradient(135deg, ${l.catColor}, ${l.catColor}99);">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <span class="trn-course-card__duration">${l.duration}</span>
      </div>
      <div class="trn-course-card__body">
        <span class="trn-course-card__category">${l.catTitle}</span>
        <h3 class="trn-course-card__title">${l.title}</h3>
        <p class="trn-course-card__desc">${l.description}</p>
        <div class="trn-course-card__progress">
          <div class="trn-course-card__progress-bar">
            <div class="trn-course-card__progress-fill" style="width:${pct}%; background:${l.catColor};"></div>
          </div>
          <span>${pct}%</span>
        </div>
        <button class="trn-course-card__btn">
          Continuar
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </button>
      </div>
    </div>`;
  }).join('');
}

/* ── Abrir aula ──────────────────────────────────────── */
function openLesson(lessonId, catId) {
  const cat    = courseData.find(c => c.id === catId) || courseData.find(c => c.lessons.some(l => l.id === lessonId));
  const lesson = cat?.lessons.find(l => l.id === lessonId);
  if (!cat || !lesson) return;

  state.currentLessonId = lessonId;
  state.currentCatId    = cat.id;

  // Mostrar view da aula
  document.getElementById('trnHome').style.display   = 'none';
  document.getElementById('trnLesson').style.display = '';

  // Sidebar: mostrar botão home, ocultar busca visualmente
  const homeBtn = document.getElementById('sidebarHomeBtn');
  if (homeBtn) homeBtn.style.display = 'flex';

  // Fechar sidebar no mobile
  closeSidebar();

  // Breadcrumb
  setText('breadcrumbCat', cat.title);
  setText('breadcrumbLesson', lesson.title);
  setText('mobileBreadcrumb', lesson.title);

  // Meta
  setText('lessonCategory', cat.title);
  setText('lessonTitle', lesson.title);
  setText('lessonDesc', lesson.description);
  setText('lessonDuration', lesson.duration);

  // Botão "concluída"
  const markBtn = document.getElementById('markCompleteBtn');
  if (markBtn) {
    if (lesson.completed) {
      markBtn.classList.add('completed');
      markBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Concluída ✓`;
    } else {
      markBtn.classList.remove('completed');
      markBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Marcar como concluída`;
    }
  }

  // Player
  renderPlayer(lesson);

  // Prev / Next
  const idx     = state.flatLessons.findIndex(l => l.id === lessonId);
  const prevBtn = document.getElementById('prevLessonBtn');
  const nextBtn = document.getElementById('nextLessonBtn');
  if (prevBtn) prevBtn.disabled = idx <= 0;
  if (nextBtn) nextBtn.disabled = idx >= state.flatLessons.length - 1;

  // Comentários
  renderComments(lessonId);

  // Sidebar: marca aula ativa
  renderSidebarNav();

  // Scroll ao topo do conteúdo
  document.querySelector('.trn-content')?.scrollTo({ top: 0, behavior: 'smooth' });
}

function openFirstLesson(catId) {
  const cat = courseData.find(c => c.id === catId);
  if (cat?.lessons?.[0]) openLesson(cat.lessons[0].id, catId);
}

/* ── Player YouTube ──────────────────────────────────── */
function renderPlayer(lesson) {
  const player = document.getElementById('trnPlayer');
  if (!player) return;

  if (lesson.videoId && lesson.videoId.trim()) {
    // Embed YouTube real
    player.innerHTML = `<iframe
      src="https://www.youtube.com/embed/${lesson.videoId}?modestbranding=1&rel=0&showinfo=0&color=white"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      title="${lesson.title}"
    ></iframe>`;
  } else {
    // Placeholder — instrução para adicionar vídeo
    player.innerHTML = `
      <div class="trn-player__placeholder">
        <div class="trn-player__placeholder-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <h3>Vídeo em breve</h3>
        <p>Faça upload do treinamento no YouTube e cole o ID do vídeo no arquivo <strong>js/treinamentos.js</strong></p>
        <div class="trn-player__placeholder-guide">
          <code>videoId: 'SEU_VIDEO_ID_AQUI'</code>
        </div>
      </div>`;
  }
}

/* ── Navegação prev / next ───────────────────────────── */
function prevLesson() {
  const idx = state.flatLessons.findIndex(l => l.id === state.currentLessonId);
  if (idx > 0) {
    const l = state.flatLessons[idx - 1];
    openLesson(l.id, l.catId);
  }
}

function nextLesson() {
  const idx = state.flatLessons.findIndex(l => l.id === state.currentLessonId);
  if (idx < state.flatLessons.length - 1) {
    const l = state.flatLessons[idx + 1];
    openLesson(l.id, l.catId);
  }
}

/* ── Marcar como concluída ───────────────────────────── */
function toggleComplete() {
  const cat    = courseData.find(c => c.id === state.currentCatId);
  const lesson = cat?.lessons.find(l => l.id === state.currentLessonId);
  if (!lesson) return;

  lesson.completed = !lesson.completed;
  saveProgress();
  updateStats();
  renderSidebarNav();
  renderInProgress();

  const markBtn = document.getElementById('markCompleteBtn');
  if (markBtn) {
    if (lesson.completed) {
      markBtn.classList.add('completed');
      markBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Concluída ✓`;
      showToast('✅ Aula marcada como concluída!');
    } else {
      markBtn.classList.remove('completed');
      markBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Marcar como concluída`;
    }
  }
}

/* ── Voltar para Home ────────────────────────────────── */
function showHome() {
  state.currentLessonId = null;
  state.currentCatId    = null;

  document.getElementById('trnHome').style.display   = '';
  document.getElementById('trnLesson').style.display = 'none';

  const homeBtn = document.getElementById('sidebarHomeBtn');
  if (homeBtn) homeBtn.style.display = 'none';

  setText('mobileBreadcrumb', 'Meus Treinamentos');
  renderSidebarNav();
  renderHomeModules();

  document.querySelector('.trn-content')?.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Comentários (localStorage) ─────────────────────── */
function renderComments(lessonId) {
  const list = document.getElementById('commentsList');
  if (!list) return;

  const comments = getComments(lessonId);

  if (!comments.length) {
    list.innerHTML = `<p class="trn-comments__empty">Nenhum comentário ainda. Seja o primeiro a perguntar!</p>`;
    return;
  }

  list.innerHTML = comments.map(c => {
    const initial  = (c.author[0] || 'U').toUpperCase();
    const isAI     = c.isAI;
    const roleBadge = isAI ? '<span class="trn-comment__role">Equipe Zyntra</span>' : '';
    return `
      <div class="trn-comment">
        <div class="trn-comment__avatar ${isAI ? 'ai' : ''}">${isAI ? 'ZN' : initial}</div>
        <div class="trn-comment__body">
          <div class="trn-comment__header">
            <span class="trn-comment__author">${escHtml(c.author)}</span>
            ${roleBadge}
            <span class="trn-comment__date">${c.date}</span>
          </div>
          <p class="trn-comment__text">${escHtml(c.text)}</p>
        </div>
      </div>`;
  }).join('');
}

function getComments(lessonId) {
  try {
    return JSON.parse(localStorage.getItem(`zyntra_comments_${lessonId}`) || '[]');
  } catch (_) { return []; }
}

function saveComment(lessonId, comment) {
  const comments = getComments(lessonId);
  comments.push(comment);
  localStorage.setItem(`zyntra_comments_${lessonId}`, JSON.stringify(comments));
}

function submitComment() {
  const input = document.getElementById('commentInput');
  const text  = input?.value?.trim();
  if (!text || !state.currentLessonId) return;

  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  saveComment(state.currentLessonId, { author: state.userName, text, date: dateStr, isAI: false });

  if (input) input.value = '';

  // Auto-resposta da equipe Zyntra
  setTimeout(() => {
    saveComment(state.currentLessonId, {
      author: 'Equipe Zyntra',
      text: 'Olá! Recebemos seu comentário. Nossa equipe analisará e responderá em breve. Se precisar de suporte urgente, use o chat de suporte ao lado.',
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      isAI: true,
    });
    renderComments(state.currentLessonId);
  }, 1500);

  renderComments(state.currentLessonId);
  showToast('💬 Comentário enviado!');
}

/* ── Busca na sidebar ────────────────────────────────── */
function filterNav(query) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll('.trn-nav__cat').forEach(catEl => {
    const catId  = catEl.id.replace('cat-block-', '');
    const cat    = courseData.find(c => c.id === catId);
    if (!cat) return;

    let anyVisible = false;
    catEl.querySelectorAll('.trn-nav__lesson-btn').forEach((btn, i) => {
      const lesson = cat.lessons[i];
      const match  = !q || lesson.title.toLowerCase().includes(q);
      btn.parentElement.style.display = match ? '' : 'none';
      if (match) anyVisible = true;
    });

    catEl.style.display = anyVisible ? '' : 'none';
    if (q && anyVisible) catEl.classList.add('open');
  });
}

/* ── Sidebar mobile ──────────────────────────────────── */
function openSidebar() {
  document.getElementById('trnSidebar')?.classList.add('open');
  document.getElementById('sidebarOverlay')?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  document.getElementById('trnSidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('active');
  document.body.style.overflow = '';
}

/* ── Helpers ─────────────────────────────────────────── */
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Fallback se pages-app.js não definiu showToast
if (typeof showToast !== 'function') {
  window.showToast = function(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  };
}
