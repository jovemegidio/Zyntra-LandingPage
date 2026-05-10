/* ============================================================
   Zyntra — Admin Panel
   Gerenciamento de conteúdo de treinamentos (localStorage)
   ============================================================ */

/* Senha de acesso — altere aqui para mudar */
const ADMIN_PASSWORD = 'zyntra@admin2024';

/* Estrutura dos cursos (espelha js/treinamentos.js) */
const adminCourseData = [
  { id: 'cat-guia', title: 'Guia Inicial Zyntra', color: '#6C5CE7', icon: '🚀', lessons: [
    { id: 'l-guia-1', title: 'Visão geral e primeiros passos', duration: '18min', description: 'Conheça a interface do Zyntra ERP, configure sua empresa e entenda a navegação principal.' },
    { id: 'l-guia-2', title: 'Configuração inicial da empresa', duration: '14min', description: 'Preencha os dados fiscais da empresa, logotipo, endereço e parâmetros gerais.' },
    { id: 'l-guia-3', title: 'Criação e gestão de usuários', duration: '10min', description: 'Crie logins, defina perfis de acesso e controle o que cada colaborador pode fazer.' },
  ]},
  { id: 'cat-whatsapp', title: 'Zyntra ERP no WhatsApp', color: '#25D366', icon: '💬', lessons: [
    { id: 'l-wpp-1', title: 'Configurando o WhatsApp Business', duration: '12min', description: 'Conecte o WhatsApp Business ao Zyntra para envio automático de notas e cobranças.' },
    { id: 'l-wpp-2', title: 'Envio de NF-e e boletos pelo WhatsApp', duration: '9min', description: 'Configure o envio automático de documentos fiscais e cobranças para o cliente.' },
  ]},
  { id: 'cat-novidades', title: 'Novidades de Produto', color: '#A29BFE', icon: '✨', lessons: [
    { id: 'l-nov-1', title: 'Atualizações recentes do sistema', duration: '8min', description: 'Conheça as últimas funcionalidades lançadas e como aproveitá-las no dia a dia.' },
    { id: 'l-nov-2', title: 'Roadmap e próximas novidades', duration: '6min', description: 'Veja o que está por vir no Zyntra ERP e como se preparar para os novos recursos.' },
  ]},
  { id: 'cat-seguranca', title: 'Zyntra Segurança', color: '#E17055', icon: '🔒', lessons: [
    { id: 'l-seg-1', title: 'Permissões e grupos de acesso', duration: '15min', description: 'Configure grupos de acesso, restrições por módulo e auditoria de ações.' },
    { id: 'l-seg-2', title: 'Autenticação em dois fatores (2FA)', duration: '8min', description: 'Ative o 2FA para proteger os acessos da sua equipe ao sistema.' },
    { id: 'l-seg-3', title: 'Backup e proteção de dados', duration: '10min', description: 'Entenda como o Zyntra realiza backups automáticos e garante a segurança dos dados.' },
  ]},
  { id: 'cat-app', title: 'App Zyntra', color: '#0984e3', icon: '📱', lessons: [
    { id: 'l-app-1', title: 'Instalando e navegando no app', duration: '10min', description: 'Baixe o app Zyntra para Android/iOS, faça login e conheça as funcionalidades móveis.' },
    { id: 'l-app-2', title: 'Emissão de NF-e pelo celular', duration: '12min', description: 'Emita notas fiscais diretamente pelo aplicativo, em qualquer lugar.' },
  ]},
  { id: 'cat-portal', title: 'Portal Zyntra', color: '#00cec9', icon: '🌐', lessons: [
    { id: 'l-por-1', title: 'Portal do cliente — visão geral', duration: '11min', description: 'Veja como o Portal Zyntra permite que seus clientes acompanhem pedidos e faturas.' },
    { id: 'l-por-2', title: 'Configurando o portal para seus clientes', duration: '14min', description: 'Personalize o portal, defina acessos e ative notificações automáticas.' },
  ]},
  { id: 'cat-cenarios', title: 'Cenários de Negócio', color: '#fd79a8', icon: '🏢', lessons: [
    { id: 'l-cen-1', title: 'Fluxo completo de venda ao recebimento', duration: '22min', description: 'Siga o ciclo: orçamento → pedido → NF-e → boleto → baixa financeira.' },
    { id: 'l-cen-2', title: 'Gestão de uma loja de varejo', duration: '18min', description: 'Configure o Zyntra para o varejo: PDV, estoque, promoções e relatórios.' },
    { id: 'l-cen-3', title: 'Controle para prestadores de serviços', duration: '16min', description: 'Use o Zyntra para gerenciar contratos, OS, NFS-e e receitas de serviços.' },
  ]},
  { id: 'cat-cadastros', title: 'Cadastros', color: '#636e72', icon: '📋', lessons: [
    { id: 'l-cad-1', title: 'Clientes e fornecedores', duration: '20min', description: 'Cadastre clientes e fornecedores com todos os dados fiscais e condições comerciais.' },
    { id: 'l-cad-2', title: 'Produtos e serviços', duration: '18min', description: 'Cadastre produtos com NCM, CEST, tributação e variantes.' },
    { id: 'l-cad-3', title: 'Transportadoras e tabelas de frete', duration: '12min', description: 'Cadastre transportadoras, tabelas de frete e vincule ao processo de venda.' },
  ]},
  { id: 'cat-vendas', title: 'Vendas', color: '#00B894', icon: '💰', lessons: [
    { id: 'l-vnd-1', title: 'Pedidos de venda e orçamentos', duration: '28min', description: 'Crie pedidos, envie orçamentos, controle aprovações e gere NF-e.' },
    { id: 'l-vnd-2', title: 'Gestão de comissões', duration: '16min', description: 'Configure comissões por vendedor, produto ou faixa de valor.' },
    { id: 'l-vnd-3', title: 'PDV e caixa', duration: '20min', description: 'Use o módulo de PDV para vendas balcão, controle de caixa e NFC-e.' },
  ]},
  { id: 'cat-compras', title: 'Compras', color: '#FDCB6E', icon: '🛒', lessons: [
    { id: 'l-cmp-1', title: 'Pedidos de compra e cotações', duration: '22min', description: 'Crie pedidos de compra, compare cotações e controle aprovações.' },
    { id: 'l-cmp-2', title: 'Entrada de mercadorias (XML NF-e)', duration: '18min', description: 'Importe XML de NF-e do fornecedor para dar entrada automática no estoque.' },
  ]},
  { id: 'cat-financas', title: 'Finanças', color: '#0984e3', icon: '📊', lessons: [
    { id: 'l-fin-1', title: 'Contas a Pagar e a Receber', duration: '35min', description: 'Controle vencimentos, baixas, parcelamentos e gere cobranças.' },
    { id: 'l-fin-2', title: 'Fluxo de caixa e conciliação bancária', duration: '25min', description: 'Acompanhe o fluxo de caixa em tempo real e importe extratos OFX.' },
    { id: 'l-fin-3', title: 'Desconto de duplicatas', duration: '14min', description: 'Configure o desconto de duplicatas integrado à sua instituição financeira.' },
  ]},
  { id: 'cat-estoque', title: 'Estoque', color: '#E17055', icon: '📦', lessons: [
    { id: 'l-est-1', title: 'Movimentações de estoque', duration: '22min', description: 'Entradas, saídas, transferências entre depósitos e ajustes.' },
    { id: 'l-est-2', title: 'Inventário físico', duration: '16min', description: 'Realize o inventário físico, compare com o sistema e ajuste divergências.' },
    { id: 'l-est-3', title: 'Lotes, séries e validade', duration: '14min', description: 'Controle lotes, números de série e datas de validade.' },
  ]},
  { id: 'cat-nfe', title: 'Notas Fiscais', color: '#00cec9', icon: '🧾', lessons: [
    { id: 'l-nfe-1', title: 'Emissão de NF-e (produto)', duration: '40min', description: 'Guia completo: emita, transmita, cancele e inutilize NF-e.' },
    { id: 'l-nfe-2', title: 'Migração para NFS-e Nacional', duration: '30min', description: 'Adapte seu processo de emissão de notas de serviço ao padrão NFS-e Nacional.' },
    { id: 'l-nfe-3', title: 'NFC-e e CT-e', duration: '20min', description: 'Emita notas fiscais de consumidor (NFC-e) e conhecimentos de transporte (CT-e).' },
  ]},
  { id: 'cat-contabil', title: 'Contabilidade', color: '#636e72', icon: '📈', lessons: [
    { id: 'l-cnt-1', title: 'Plano de contas e DRE', duration: '28min', description: 'Configure o plano de contas, centro de custos e gere DRE.' },
    { id: 'l-cnt-2', title: 'Integração com o contador', duration: '14min', description: 'Exporte lançamentos contábeis e relatórios para seu escritório.' },
  ]},
  { id: 'cat-relatorios', title: 'Relatórios', color: '#A29BFE', icon: '📉', lessons: [
    { id: 'l-rel-1', title: 'Dashboards e indicadores de desempenho', duration: '22min', description: 'Crie painéis visuais com os principais KPIs para tomada de decisão.' },
    { id: 'l-rel-2', title: 'Relatórios personalizados e exportações', duration: '18min', description: 'Gere relatórios por módulo e exporte em PDF, Excel e CSV.' },
  ]},
  { id: 'cat-pcp', title: 'PCP', color: '#6C5CE7', icon: '⚙️', lessons: [
    { id: 'l-pcp-1', title: 'Ordens de produção', duration: '25min', description: 'Crie e gerencie ordens de produção, controle insumos e acompanhe o progresso.' },
    { id: 'l-pcp-2', title: 'Gestão de insumos e ficha técnica', duration: '18min', description: 'Cadastre fichas técnicas, controle consumo de matéria-prima e custos.' },
  ]},
  { id: 'cat-rh', title: 'Recursos Humanos', color: '#fd79a8', icon: '👥', lessons: [
    { id: 'l-rh-1', title: 'Folha de Pagamento e eSocial', duration: '45min', description: 'Configure a folha de pagamento e envie os eventos do eSocial.' },
    { id: 'l-rh-2', title: 'Controle de ponto e horas extras', duration: '20min', description: 'Registre ponto, calcule horas extras, banco de horas e faltas.' },
  ]},
  { id: 'cat-faturamento', title: 'Faturamento', color: '#00B894', icon: '💳', lessons: [
    { id: 'l-fat-1', title: 'Contratos e faturamento recorrente', duration: '22min', description: 'Gerencie contratos e automatize o faturamento mensal.' },
    { id: 'l-fat-2', title: 'Régua de cobrança automática', duration: '14min', description: 'Configure lembretes e cobranças automáticas por e-mail e WhatsApp.' },
  ]},
  { id: 'cat-logistica', title: 'Logística', color: '#FDCB6E', icon: '🚚', lessons: [
    { id: 'l-log-1', title: 'Rastreamento de pedidos e entregas', duration: '18min', description: 'Acompanhe o status de entrega e integre com transportadoras.' },
    { id: 'l-log-2', title: 'CT-e e MDF-e', duration: '16min', description: 'Emita conhecimentos de transporte (CT-e) e manifesto de documentos (MDF-e).' },
  ]},
];

/* ── Estado ───────────────────────────────────────────── */
let adminContent = {};  // { lessonId: { videoId, title, description, duration } }

/* ── Init ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Checar se já está autenticado na sessão
  if (sessionStorage.getItem('zyntra_admin_auth') === '1') {
    showPanel();
  }

  const input = document.getElementById('adminPassword');
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') adminLogin(); });
});

/* ── Autenticação ─────────────────────────────────────── */
function adminLogin() {
  const input = document.getElementById('adminPassword');
  const error = document.getElementById('adminError');
  const val = input?.value?.trim();

  if (val === ADMIN_PASSWORD) {
    sessionStorage.setItem('zyntra_admin_auth', '1');
    error.textContent = '';
    showPanel();
  } else {
    error.textContent = '❌ Senha incorreta. Tente novamente.';
    input.value = '';
    input.focus();
    // Shake animation
    input.style.borderColor = '#e74c3c';
    setTimeout(() => { input.style.borderColor = ''; }, 1200);
  }
}

function adminLogout() {
  sessionStorage.removeItem('zyntra_admin_auth');
  location.reload();
}

function showPanel() {
  document.getElementById('adminGate').style.display = 'none';
  document.getElementById('adminPanel').style.display = '';
  loadSavedContent();
  renderCategories();
}

/* ── Load / Save ──────────────────────────────────────── */
function loadSavedContent() {
  try {
    adminContent = JSON.parse(localStorage.getItem('zyntra_admin_content') || '{}');
  } catch (_) {
    adminContent = {};
  }
}

function saveAllContent() {
  const newContent = {};

  adminCourseData.forEach(cat => {
    cat.lessons.forEach(l => {
      const videoId    = getFieldVal(`${l.id}_videoId`).trim();
      const title      = getFieldVal(`${l.id}_title`).trim();
      const desc       = getFieldVal(`${l.id}_desc`).trim();
      const duration   = getFieldVal(`${l.id}_duration`).trim();

      const entry = {};
      if (videoId)   entry.videoId    = videoId;
      if (title)     entry.title      = title;
      if (desc)      entry.description = desc;
      if (duration)  entry.duration   = duration;

      if (Object.keys(entry).length) newContent[l.id] = entry;
    });
  });

  adminContent = newContent;
  localStorage.setItem('zyntra_admin_content', JSON.stringify(newContent));

  // Update status dots
  updateStatusDots();

  showAdminToast('✅ Alterações publicadas com sucesso!');

  const status = document.getElementById('saveStatus');
  if (status) {
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    status.innerHTML = `✓ Salvo às ${now}`;
  }
}

/* ── Render ───────────────────────────────────────────── */
function renderCategories() {
  const container = document.getElementById('adminCategories');
  if (!container) return;

  container.innerHTML = adminCourseData.map((cat, ci) => {
    const videosCount = cat.lessons.filter(l => {
      const saved = adminContent[l.id];
      return saved?.videoId;
    }).length;
    const total = cat.lessons.length;
    const allDone = videosCount === total;
    const badge = videosCount > 0
      ? `<span class="admin-cat__badge ${allDone ? 'admin-cat__badge--ok' : 'admin-cat__badge--pending'}">${videosCount}/${total} vídeos</span>`
      : `<span class="admin-cat__badge admin-cat__badge--pending">Sem vídeos</span>`;

    const lessonsHtml = cat.lessons.map((l, li) => {
      const saved = adminContent[l.id] || {};
      const hasVideo = !!saved.videoId;
      return `
        <div class="admin-lesson">
          <div>
            <div class="admin-lesson__num">Aula ${li + 1}</div>
            <div class="admin-lesson__name">${escHtml(saved.title || l.title)}</div>
            <div class="admin-lesson__desc-preview">${escHtml(l.description)}</div>
          </div>

          <div class="admin-field">
            <label>ID do Vídeo (YouTube)</label>
            <input
              type="text"
              id="${l.id}_videoId"
              value="${escHtml(saved.videoId || '')}"
              placeholder="ex: dQw4w9WgXcQ"
              class="${hasVideo ? 'has-value' : ''}"
              oninput="onVideoIdChange(this)"
            >
          </div>

          <div class="admin-field">
            <label>Duração</label>
            <input
              type="text"
              id="${l.id}_duration"
              value="${escHtml(saved.duration || l.duration)}"
              placeholder="${l.duration}"
            >
          </div>

          <div class="admin-lesson__status">
            <div class="admin-lesson__status-dot ${hasVideo ? 'ok' : ''}" id="dot-${l.id}" title="${hasVideo ? 'Vídeo configurado' : 'Sem vídeo'}"></div>
          </div>

          <!-- Hidden fields for title and description overrides -->
          <input type="hidden" id="${l.id}_title" value="${escHtml(saved.title || '')}">
          <input type="hidden" id="${l.id}_desc" value="${escHtml(saved.description || '')}">
        </div>`;
    }).join('');

    return `
      <div class="admin-cat" id="admin-cat-${cat.id}">
        <div class="admin-cat__header" onclick="toggleAdminCat('${cat.id}')">
          <div class="admin-cat__icon" style="background:${cat.color}18;">${cat.icon}</div>
          <div class="admin-cat__title">${cat.title}</div>
          <div class="admin-cat__meta">
            ${badge}
            <span>${total} aulas</span>
          </div>
          <svg class="admin-cat__chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </div>
        <div class="admin-lessons">${lessonsHtml}</div>
      </div>`;
  }).join('');
}

function toggleAdminCat(catId) {
  const el = document.getElementById(`admin-cat-${catId}`);
  el?.classList.toggle('open');
}

function onVideoIdChange(input) {
  const hasVal = !!input.value.trim();
  input.classList.toggle('has-value', hasVal);
  // Update nearby status dot
  const lessonId = input.id.replace('_videoId', '');
  const dot = document.getElementById(`dot-${lessonId}`);
  if (dot) dot.classList.toggle('ok', hasVal);
}

function updateStatusDots() {
  adminCourseData.forEach(cat => {
    cat.lessons.forEach(l => {
      const hasVideo = !!adminContent[l.id]?.videoId;
      const dot = document.getElementById(`dot-${l.id}`);
      if (dot) dot.classList.toggle('ok', hasVideo);
    });
  });
}

/* ── Toast ────────────────────────────────────────────── */
function showAdminToast(msg) {
  const t = document.getElementById('adminToast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ── Helpers ──────────────────────────────────────────── */
function getFieldVal(id) {
  return document.getElementById(id)?.value || '';
}

function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
