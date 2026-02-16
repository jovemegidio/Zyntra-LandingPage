/* ========================================
   Zyntra - Dashboard "Meus Aplicativos"
   JavaScript - Interactions & Logic
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

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
            showToast('Nenhuma empresa adicional encontrada');
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


    // ========== LOAD USER DATA (simulated) ==========
    function loadUserData() {
        // In production, this would fetch from an API
        const userData = {
            name: 'Antonio Silva',
            email: 'antonio@empresa.com.br',
            plan: 'Profissional',
            maxCompanies: 3,
            companies: [
                {
                    id: 'aluforce',
                    name: 'ALUFORCE',
                    cnpj: '12.345.678/0001-01',
                    status: 'active',
                    plan: 'Profissional',
                    favorite: true
                },
                {
                    id: 'energy',
                    name: 'ENERGY',
                    cnpj: '98.765.432/0001-02',
                    status: 'active',
                    plan: 'Profissional',
                    favorite: false
                },
                {
                    id: 'techmais',
                    name: 'TECHMAIS',
                    cnpj: '55.123.789/0001-03',
                    status: 'active',
                    plan: 'Profissional',
                    favorite: false
                }
            ]
        };

        // Update company count
        if (companyCount) {
            companyCount.textContent = userData.companies.length;
        }

        return userData;
    }

    loadUserData();

});


// ========== GLOBAL: ACCESS COMPANY ERP ==========
function acessarEmpresa(companyId) {
    const btn = event.target.closest('.company-card__btn');

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

    // Simulate redirect to ERP
    setTimeout(() => {
        // In production: window.location.href = `/erp/${companyId}`;
        if (btn) {
            btn.innerHTML = `
                Acessar
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            `;
            btn.style.pointerEvents = '';
        }
        window.showToast(`✅ Conectado ao ERP: ${companyId.toUpperCase()}`);
    }, 2000);
}
