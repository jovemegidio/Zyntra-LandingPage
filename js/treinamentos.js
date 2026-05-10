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
  // ── Categorias espelhando o help center: aluforce.api.br/ajuda ──
  {
    id: 'cat-guia',
    title: 'Guia Inicial Zyntra',
    color: '#6C5CE7',
    lessons: [
      { id: 'l-guia-1', title: 'Visão geral e primeiros passos', duration: '18min', videoId: '', description: 'Conheça a interface do Zyntra ERP, configure sua empresa e entenda a navegação principal.', completed: true },
      { id: 'l-guia-2', title: 'Configuração inicial da empresa', duration: '14min', videoId: '', description: 'Preencha os dados fiscais da empresa, logotipo, endereço e parâmetros gerais.', completed: true },
      { id: 'l-guia-3', title: 'Criação e gestão de usuários', duration: '10min', videoId: '', description: 'Crie logins, defina perfis de acesso e controle o que cada colaborador pode fazer no sistema.', completed: false },
    ]
  },
  {
    id: 'cat-whatsapp',
    title: 'Zyntra ERP no WhatsApp',
    color: '#25D366',
    lessons: [
      { id: 'l-wpp-1', title: 'Configurando o WhatsApp Business', duration: '12min', videoId: '', description: 'Conecte o WhatsApp Business ao Zyntra para envio automático de notas, cobranças e confirmações.', completed: true },
      { id: 'l-wpp-2', title: 'Envio de NF-e e boletos pelo WhatsApp', duration: '9min', videoId: '', description: 'Configure o envio automático de documentos fiscais e cobranças diretamente para o cliente.', completed: false },
    ]
  },
  {
    id: 'cat-novidades',
    title: 'Novidades de Produto',
    color: '#A29BFE',
    lessons: [
      { id: 'l-nov-1', title: 'Atualizações recentes do sistema', duration: '8min', videoId: '', description: 'Conheça as últimas funcionalidades lançadas e como aproveitá-las no seu dia a dia.', completed: false },
      { id: 'l-nov-2', title: 'Roadmap e próximas novidades', duration: '6min', videoId: '', description: 'Veja o que está por vir no Zyntra ERP e como se preparar para os novos recursos.', completed: false },
    ]
  },
  {
    id: 'cat-seguranca',
    title: 'Zyntra Segurança',
    color: '#E17055',
    lessons: [
      { id: 'l-seg-1', title: 'Permissões e grupos de acesso', duration: '15min', videoId: '', description: 'Configure grupos de acesso, restrições por módulo e auditoria de ações dos usuários.', completed: false },
      { id: 'l-seg-2', title: 'Autenticação em dois fatores (2FA)', duration: '8min', videoId: '', description: 'Ative o 2FA para proteger os acessos da sua equipe ao sistema.', completed: false },
      { id: 'l-seg-3', title: 'Backup e proteção de dados', duration: '10min', videoId: '', description: 'Entenda como o Zyntra realiza backups automáticos e garante a segurança dos seus dados.', completed: false },
    ]
  },
  {
    id: 'cat-app',
    title: 'App Zyntra',
    color: '#0984e3',
    lessons: [
      { id: 'l-app-1', title: 'Instalando e navegando no app', duration: '10min', videoId: '', description: 'Baixe o app Zyntra para Android/iOS, faça login e conheça as funcionalidades móveis.', completed: false },
      { id: 'l-app-2', title: 'Emissão de NF-e pelo celular', duration: '12min', videoId: '', description: 'Emita notas fiscais diretamente pelo aplicativo, em qualquer lugar.', completed: false },
    ]
  },
  {
    id: 'cat-portal',
    title: 'Portal Zyntra',
    color: '#00cec9',
    lessons: [
      { id: 'l-por-1', title: 'Portal do cliente — visão geral', duration: '11min', videoId: '', description: 'Veja como o Portal Zyntra permite que seus clientes acompanhem pedidos, faturas e documentos.', completed: false },
      { id: 'l-por-2', title: 'Configurando o portal para seus clientes', duration: '14min', videoId: '', description: 'Personalize o portal, defina acessos e ative notificações automáticas para clientes.', completed: false },
    ]
  },
  {
    id: 'cat-cenarios',
    title: 'Cenários de Negócio',
    color: '#fd79a8',
    lessons: [
      { id: 'l-cen-1', title: 'Fluxo completo de venda ao recebimento', duration: '22min', videoId: '', description: 'Siga o ciclo completo: orçamento → pedido → NF-e → boleto → baixa financeira.', completed: false },
      { id: 'l-cen-2', title: 'Gestão de uma loja de varejo', duration: '18min', videoId: '', description: 'Configure o Zyntra para o varejo: PDV, estoque, promoções e relatórios de vendas.', completed: false },
      { id: 'l-cen-3', title: 'Controle para prestadores de serviços', duration: '16min', videoId: '', description: 'Use o Zyntra para gerenciar contratos, OS, NFS-e e receitas de serviços.', completed: false },
    ]
  },
  {
    id: 'cat-cadastros',
    title: 'Cadastros',
    color: '#636e72',
    lessons: [
      { id: 'l-cad-1', title: 'Clientes e fornecedores', duration: '20min', videoId: '', description: 'Cadastre clientes e fornecedores com todos os dados fiscais, contatos e condições comerciais.', completed: true },
      { id: 'l-cad-2', title: 'Produtos e serviços', duration: '18min', videoId: '', description: 'Cadastre produtos com NCM, CEST, tributação e variantes. Gerencie serviços e tabelas de preços.', completed: true },
      { id: 'l-cad-3', title: 'Transportadoras e tabelas de frete', duration: '12min', videoId: '', description: 'Cadastre transportadoras, tabelas de frete e vincule ao processo de venda ou compra.', completed: false },
    ]
  },
  {
    id: 'cat-vendas',
    title: 'Vendas',
    color: '#00B894',
    lessons: [
      { id: 'l-vnd-1', title: 'Pedidos de venda e orçamentos', duration: '28min', videoId: '', description: 'Crie pedidos, envie orçamentos, controle aprovações e gere NF-e a partir do pedido.', completed: false, inProgress: true, progress: 50 },
      { id: 'l-vnd-2', title: 'Gestão de comissões', duration: '16min', videoId: '', description: 'Configure comissões por vendedor, produto ou faixa de valor e emita relatórios.', completed: false },
      { id: 'l-vnd-3', title: 'PDV e caixa', duration: '20min', videoId: '', description: 'Use o módulo de PDV para vendas balcão, controle de caixa e emissão de NFC-e.', completed: false },
    ]
  },
  {
    id: 'cat-compras',
    title: 'Compras',
    color: '#FDCB6E',
    lessons: [
      { id: 'l-cmp-1', title: 'Pedidos de compra e cotações', duration: '22min', videoId: '', description: 'Crie pedidos de compra, compare cotações de fornecedores e controle aprovações.', completed: false },
      { id: 'l-cmp-2', title: 'Entrada de mercadorias (XML NF-e)', duration: '18min', videoId: '', description: 'Importe XML de NF-e do fornecedor para dar entrada automática no estoque.', completed: false },
    ]
  },
  {
    id: 'cat-financas',
    title: 'Finanças',
    color: '#0984e3',
    lessons: [
      { id: 'l-fin-1', title: 'Contas a Pagar e a Receber', duration: '35min', videoId: '', description: 'Controle vencimentos, baixas, parcelamentos e gere cobranças por boleto ou Pix.', completed: false, inProgress: true, progress: 65 },
      { id: 'l-fin-2', title: 'Fluxo de caixa e conciliação bancária', duration: '25min', videoId: '', description: 'Acompanhe o fluxo de caixa em tempo real e importe extratos OFX para conciliação.', completed: false },
      { id: 'l-fin-3', title: 'Desconto de duplicatas', duration: '14min', videoId: '', description: 'Entenda e configure o desconto de duplicatas integrado à sua instituição financeira.', completed: false },
    ]
  },
  {
    id: 'cat-estoque',
    title: 'Estoque',
    color: '#E17055',
    lessons: [
      { id: 'l-est-1', title: 'Movimentações de estoque', duration: '22min', videoId: '', description: 'Realize entradas, saídas, transferências entre depósitos e ajustes de estoque.', completed: true },
      { id: 'l-est-2', title: 'Inventário físico', duration: '16min', videoId: '', description: 'Realize o inventário físico, compare com o sistema e ajuste as divergências.', completed: false, inProgress: true, progress: 30 },
      { id: 'l-est-3', title: 'Lotes, séries e validade', duration: '14min', videoId: '', description: 'Controle lotes, números de série e datas de validade nos movimentos de estoque.', completed: false },
    ]
  },
  {
    id: 'cat-nfe',
    title: 'Notas Fiscais',
    color: '#00cec9',
    lessons: [
      { id: 'l-nfe-1', title: 'Emissão de NF-e (produto)', duration: '40min', videoId: '', description: 'Guia completo: emita, transmita, cancele e inutilize NF-e com o Zyntra.', completed: false },
      { id: 'l-nfe-2', title: 'Migração para NFS-e Nacional', duration: '30min', videoId: '', description: 'Adapte seu processo de emissão de notas de serviço ao novo padrão NFS-e Nacional.', completed: false },
      { id: 'l-nfe-3', title: 'NFC-e e CT-e', duration: '20min', videoId: '', description: 'Emita notas fiscais de consumidor (NFC-e) e conhecimentos de transporte (CT-e).', completed: false },
    ]
  },
  {
    id: 'cat-contabil',
    title: 'Contabilidade',
    color: '#636e72',
    lessons: [
      { id: 'l-cnt-1', title: 'Plano de contas e DRE', duration: '28min', videoId: '', description: 'Configure o plano de contas, centre de custos e gere demonstrativo de resultado (DRE).', completed: false },
      { id: 'l-cnt-2', title: 'Integração com o contador', duration: '14min', videoId: '', description: 'Exporte lançamentos contábeis e relatórios para seu escritório de contabilidade.', completed: false },
    ]
  },
  {
    id: 'cat-relatorios',
    title: 'Relatórios',
    color: '#A29BFE',
    lessons: [
      { id: 'l-rel-1', title: 'Dashboards e indicadores de desempenho', duration: '22min', videoId: '', description: 'Crie painéis visuais com os principais KPIs do negócio para tomada de decisão.', completed: false },
      { id: 'l-rel-2', title: 'Relatórios personalizados e exportações', duration: '18min', videoId: '', description: 'Gere relatórios por módulo e exporte em PDF, Excel e CSV conforme a necessidade.', completed: false },
    ]
  },
  {
    id: 'cat-pcp',
    title: 'PCP',
    color: '#6C5CE7',
    lessons: [
      { id: 'l-pcp-1', title: 'Ordens de produção', duration: '25min', videoId: '', description: 'Crie e gerencie ordens de produção, controle insumos e acompanhe o progresso.', completed: false },
      { id: 'l-pcp-2', title: 'Gestão de insumos e ficha técnica', duration: '18min', videoId: '', description: 'Cadastre fichas técnicas de produtos, controle consumo de matéria-prima e custos.', completed: false },
    ]
  },
  {
    id: 'cat-rh',
    title: 'Recursos Humanos',
    color: '#fd79a8',
    lessons: [
      { id: 'l-rh-1', title: 'Folha de Pagamento e eSocial', duration: '45min', videoId: '', description: 'Configure a folha de pagamento e envie os eventos obrigatórios do eSocial ao governo.', completed: false },
      { id: 'l-rh-2', title: 'Controle de ponto e horas extras', duration: '20min', videoId: '', description: 'Registre ponto, calcule horas extras, banco de horas e faltas automaticamente.', completed: false },
    ]
  },
  {
    id: 'cat-faturamento',
    title: 'Faturamento',
    color: '#00B894',
    lessons: [
      { id: 'l-fat-1', title: 'Contratos e faturamento recorrente', duration: '22min', videoId: '', description: 'Gerencie contratos de prestação de serviço e automatize o faturamento mensal.', completed: false },
      { id: 'l-fat-2', title: 'Régua de cobrança automática', duration: '14min', videoId: '', description: 'Configure lembretes e cobranças automáticas por e-mail, WhatsApp ou SMS.', completed: false },
    ]
  },
  {
    id: 'cat-logistica',
    title: 'Logística',
    color: '#FDCB6E',
    lessons: [
      { id: 'l-log-1', title: 'Rastreamento de pedidos e entregas', duration: '18min', videoId: '', description: 'Acompanhe o status de entrega dos pedidos e integre com transportadoras parceiras.', completed: false },
      { id: 'l-log-2', title: 'CT-e e MDF-e', duration: '16min', videoId: '', description: 'Emita conhecimentos de transporte eletrônico (CT-e) e manifesto de documentos (MDF-e).', completed: false },
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

/* ── Admin Content Override (salvo pelo painel admin) ─── */
function loadAdminContent() {
  try {
    const overrides = JSON.parse(localStorage.getItem('zyntra_admin_content') || '{}');
    courseData.forEach(cat => {
      cat.lessons.forEach(l => {
        const o = overrides[l.id];
        if (!o) return;
        if (o.videoId    !== undefined) l.videoId    = o.videoId;
        if (o.title)                    l.title      = o.title;
        if (o.description)              l.description = o.description;
        if (o.duration)                 l.duration   = o.duration;
      });
    });
  } catch (_) {}
}

/* ── Init ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Aplicar conteúdo publicado pelo admin (sobrescreve padrões)
  loadAdminContent();

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
