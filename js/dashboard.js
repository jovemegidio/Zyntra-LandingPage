/* ========================================
   Zyntra - Dashboard "Meus Aplicativos"
   JavaScript - Interactions & Logic
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== AUTH CHECK ==========
    const loggedUser = JSON.parse(localStorage.getItem('zyntra_user'));
    if (!loggedUser) {
        window.location.href = '../login.html';
        return;
    }

    // ========== SET USER INFO ==========
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const userFullName = document.getElementById('userFullName');
    const userEmail = document.getElementById('userEmail');

    if (userAvatar) userAvatar.textContent = loggedUser.name.charAt(0).toUpperCase();
    if (userName) userName.textContent = loggedUser.name;
    if (userFullName) userFullName.textContent = loggedUser.fullName;
    if (userEmail) userEmail.textContent = loggedUser.email;

    // ========== PROMO BANNER CAROUSEL ==========
    const promoSlides = [
        {
            tag: 'Novidade',
            tagIcon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
            title: 'Treinamentos gratuitos gravados',
            desc: 'Aprenda a utilizar todas as funcionalidades do Zyntra ERP com nossos cursos online gratuitos.',
            btn: 'Assistir agora',
            btnIcon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>'
        },
        {
            tag: 'Zyntra Academy',
            tagIcon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
            title: 'Certificações profissionais',
            desc: 'Torne-se um especialista Zyntra certificado e destaque-se no mercado de trabalho.',
            btn: 'Saiba mais',
            btnIcon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
        },
        {
            tag: 'Atualização',
            tagIcon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
            title: 'Novo módulo de BI integrado',
            desc: 'Dashboards inteligentes com indicadores-chave para tomada de decisão em tempo real.',
            btn: 'Explorar',
            btnIcon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
        },
        {
            tag: 'Webinar',
            tagIcon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
            title: 'Webinar: Gestão fiscal 2026',
            desc: 'Participe do webinar ao vivo sobre as principais mudanças fiscais e tributárias para 2026.',
            btn: 'Inscreva-se',
            btnIcon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
        }
    ];

    let currentSlide = 0;
    const promoContent = document.getElementById('promoContent');
    const promoDots = document.getElementById('promoDots');

    function updatePromo(index) {
        const slide = promoSlides[index];
        promoContent.innerHTML = `
            <div class="promo-slide active" data-slide="${index}">
                <span class="promo-banner__tag">
                    ${slide.tagIcon}
                    ${slide.tag}
                </span>
                <h2 class="promo-banner__title">${slide.title}</h2>
                <p class="promo-banner__desc">${slide.desc}</p>
                <button class="promo-banner__btn">
                    ${slide.btn}
                    ${slide.btnIcon}
                </button>
            </div>
        `;

        // Update dots
        promoDots.querySelectorAll('.promo-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Dot click
    promoDots.querySelectorAll('.promo-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlide = parseInt(dot.dataset.slide);
            updatePromo(currentSlide);
        });
    });

    // Auto-rotate every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % promoSlides.length;
        updatePromo(currentSlide);
    }, 5000);


    // ========== SEARCH FUNCTIONALITY ==========
    const searchInput = document.getElementById('searchInput');
    const companyGrid = document.getElementById('companyGrid');
    const companyCards = companyGrid.querySelectorAll('.company-card');
    const companyCount = document.getElementById('companyCount');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        let visibleCount = 0;

        companyCards.forEach(card => {
            const name = card.querySelector('.company-card__name')?.textContent.toLowerCase() || '';
            const cnpj = card.querySelector('.company-card__cnpj')?.textContent.toLowerCase() || '';

            if (name.includes(query) || cnpj.includes(query) || query === '') {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        companyCount.textContent = visibleCount;
    });


    // ========== VIEW TOGGLE ==========
    const viewBtns = document.querySelectorAll('.dash-view-btn[data-view]');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const view = btn.dataset.view;
            if (view === 'list') {
                companyGrid.style.gridTemplateColumns = '1fr';
            } else {
                companyGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            }
        });
    });


    // ========== USER DROPDOWN ==========
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');

    userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!userDropdown.contains(e.target) && !userBtn.contains(e.target)) {
            userDropdown.classList.remove('open');
        }
    });


    // ========== FAVORITE TOGGLE ==========
    document.querySelectorAll('.company-card__favorite').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const isFav = btn.classList.contains('active');

            if (isFav) {
                btn.querySelector('svg').setAttribute('fill', 'currentColor');
                showToast('Empresa adicionada aos favoritos ❤️');
            } else {
                btn.querySelector('svg').setAttribute('fill', 'none');
                showToast('Empresa removida dos favoritos');
            }
        });
    });


    // ========== MOBILE NAV ==========
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
        });

        // Close on click outside
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) {
                mobileNav.classList.remove('open');
            }
        });
    }


    // ========== LOGOUT ==========
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('zyntra_user');
            showToast('Saindo da conta...');
            setTimeout(() => {
                window.location.href = '../login.html';
            }, 1000);
        });
    }


    // ========== SHOW MORE ==========
    const btnShowMore = document.getElementById('btnShowMore');
    if (btnShowMore) {
        btnShowMore.addEventListener('click', () => {
            showToast('Todas as empresas já estão sendo exibidas');
        });
    }


    // ========== NOVO TESTE GRÁTIS BUTTON ==========
    const btnNewTest = document.getElementById('btnNewTest');
    if (btnNewTest) {
        btnNewTest.addEventListener('click', () => {
            openModal('modalNewTest');
        });
    }


    // ========== COMPRAR NOVO APLICATIVO BUTTON ==========
    const btnNewApp = document.getElementById('btnNewApp');
    if (btnNewApp) {
        btnNewApp.addEventListener('click', () => {
            openModal('modalNewApp');
        });
    }


    // ========== TOAST NOTIFICATION ==========
    const toast = document.getElementById('toast');
    let toastTimeout;

    function showToast(message) {
        clearTimeout(toastTimeout);
        toast.textContent = message;
        toast.classList.add('show');

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Make showToast available globally
    window.showToast = showToast;


    // ========== LOAD USER DATA & POPULATE REAL STATS ==========
    const companiesData = {
        companies: [
            {
                id: 'aluforce',
                name: 'ALUFORCE',
                cnpj: '12.345.678/0001-01',
                status: 'active',
                plan: 'Profissional',
                favorite: true,
                nfeMonth: 487
            },
            {
                id: 'energy',
                name: 'ENERGY',
                cnpj: '98.765.432/0001-02',
                status: 'active',
                plan: 'Profissional',
                favorite: false,
                nfeMonth: 312
            },
            {
                id: 'labor-energy',
                name: 'LABOR ENERGY',
                cnpj: '55.123.789/0001-03',
                status: 'active',
                plan: 'Profissional',
                favorite: false,
                nfeMonth: 449
            }
        ],
        systemUptime: 99.8
    };

    function populateStats() {
        const companies = companiesData.companies;
        const activeCompanies = companies.filter(c => c.status === 'active').length;
        const totalNfe = companies.reduce((sum, c) => sum + (c.nfeMonth || 0), 0);

        // Determine plan (use highest plan across companies)
        const planPriority = { 'Starter': 1, 'Profissional': 2, 'Enterprise': 3 };
        let bestPlan = 'Starter';
        companies.forEach(c => {
            if ((planPriority[c.plan] || 0) > (planPriority[bestPlan] || 0)) {
                bestPlan = c.plan;
            }
        });

        // Animated counter effect
        function animateValue(el, start, end, duration, suffix) {
            suffix = suffix || '';
            if (typeof end === 'string') {
                el.textContent = end;
                return;
            }
            const startTime = performance.now();
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // easeOutQuart
                const eased = 1 - Math.pow(1 - progress, 4);
                const current = Math.round(start + (end - start) * eased);
                el.textContent = current.toLocaleString('pt-BR') + suffix;
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            requestAnimationFrame(update);
        }

        const statActive = document.getElementById('statActiveCompanies');
        const statPlan = document.getElementById('statCurrentPlan');
        const statNfe = document.getElementById('statNfeCount');
        const statUptime = document.getElementById('statUptime');

        if (statActive) animateValue(statActive, 0, activeCompanies, 600);
        if (statPlan) statPlan.textContent = bestPlan;
        if (statNfe) animateValue(statNfe, 0, totalNfe, 900);
        if (statUptime) {
            statUptime.textContent = companiesData.systemUptime.toLocaleString('pt-BR', { minimumFractionDigits: 1 }) + '%';
        }

        // Update company count in toolbar
        if (companyCount) companyCount.textContent = activeCompanies;
    }

    populateStats();


    // ========== SHOW MORE: only visible with 5+ companies ==========
    const showMoreContainer = document.getElementById('showMoreContainer');
    function updateShowMore() {
        const totalCompanies = companyGrid.querySelectorAll('.company-card').length;
        if (showMoreContainer) {
            showMoreContainer.style.display = totalCompanies >= 5 ? '' : 'none';
        }
    }
    updateShowMore();

});


// ========== GLOBAL: ACCESS COMPANY ERP ==========
function acessarEmpresa(companyId) {
    const btn = event.target.closest('.company-card__btn');

    // Company routes mapping
    const companyRoutes = {
        'aluforce': 'aluforce/painel.html',
        'energy': 'energy/painel.html',
        'labor-energy': 'labor-energy/painel.html'
    };

    // Loading state
    if (btn) {
        btn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Carregando...
        `;
        btn.style.pointerEvents = 'none';
    }

    window.showToast(`Acessando ERP da empresa ${companyId.toUpperCase()}...`);

    // Redirect to company control panel
    setTimeout(() => {
        const route = companyRoutes[companyId];
        if (route) {
            window.location.href = route;
        } else {
            if (btn) {
                btn.innerHTML = `
                    Acessar
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                `;
                btn.style.pointerEvents = '';
            }
            window.showToast('❌ Empresa não encontrada');
        }
    }, 1500);
}


// ========== GLOBAL: MODAL FUNCTIONS ==========
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Close on overlay click
        modal.addEventListener('click', function handler(e) {
            if (e.target === modal) {
                closeModal(id);
                modal.removeEventListener('click', handler);
            }
        });
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => {
            m.classList.remove('open');
        });
        document.body.style.overflow = '';
    }
});


// ========== GLOBAL: CRIAR TESTE ==========
function criarTeste() {
    const name = document.getElementById('testCompanyName')?.value.trim();
    const segment = document.getElementById('testSegment')?.value;

    if (!name) {
        window.showToast('⚠️ Informe o nome da empresa');
        return;
    }
    if (!segment) {
        window.showToast('⚠️ Selecione o segmento');
        return;
    }

    closeModal('modalNewTest');
    window.showToast(`🧪 Criando ambiente de teste para "${name}"...`);

    setTimeout(() => {
        window.showToast(`✅ Teste criado com sucesso! Expira em 14 dias.`);
    }, 2000);
}


// ========== GLOBAL: COMPRAR APLICATIVO ==========
function comprarAplicativo() {
    const name = document.getElementById('newAppCompanyName')?.value.trim();
    const cnpj = document.getElementById('newAppCnpj')?.value.trim();
    const plan = document.getElementById('newAppPlan')?.value;

    if (!name) {
        window.showToast('⚠️ Informe a Razão Social');
        return;
    }
    if (!cnpj || cnpj.length < 14) {
        window.showToast('⚠️ Informe um CNPJ válido');
        return;
    }

    closeModal('modalNewApp');

    const planNames = {
        'starter': 'Starter',
        'profissional': 'Profissional',
        'enterprise': 'Enterprise'
    };

    window.showToast(`🛒 Processando compra do plano ${planNames[plan]} para "${name}"...`);

    setTimeout(() => {
        window.showToast(`✅ Aplicativo adquirido com sucesso!`);
    }, 2500);
}


// ========== CNPJ MASK ==========
document.addEventListener('DOMContentLoaded', () => {
    const cnpjInput = document.getElementById('newAppCnpj');
    if (cnpjInput) {
        cnpjInput.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 14) v = v.slice(0, 14);

            if (v.length > 12) {
                v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
            } else if (v.length > 8) {
                v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');
            } else if (v.length > 5) {
                v = v.replace(/^(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
            } else if (v.length > 2) {
                v = v.replace(/^(\d{2})(\d{1,3})/, '$1.$2');
            }

            e.target.value = v;
        });
    }
});
