// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    }
    
    // Iniciar skeleton loading para projetos
    initProjectsSkeleton();
});

// ===== SKELETON LOADING PARA PROJETOS =====
function initProjectsSkeleton() {
    const skeletonGrid = document.getElementById('skeleton-grid');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!skeletonGrid || !projectsGrid) return;
    
    // Simular tempo de carregamento (1.8s após o preloader)
    setTimeout(() => {
        // Esconder skeleton
        skeletonGrid.classList.add('hidden');
        
        // Mostrar projetos com animação
        projectsGrid.classList.add('loaded');
        
        // Remover skeleton do DOM após a animação
        setTimeout(() => {
            skeletonGrid.style.display = 'none';
        }, 300);
    }, 1800);
}

// ===== CURSOR CUSTOMIZADO =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 15 + 'px';
            cursorFollower.style.top = e.clientY - 15 + 'px';
        }, 50);
    });

    document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
    });
}

// ===== NAVEGAÇÃO =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu mobile
if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Acessibilidade - atualizar aria-expanded
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.setAttribute('aria-label', isExpanded ? 'Abrir menu de navegação' : 'Fechar menu de navegação');
    });
    
    // Suporte a teclado - fechar menu com Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
            hamburger.focus();
        }
    });
}

// Fechar menu ao clicar em link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Link ativo no scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== TYPING EFFECT =====
let typingElement = null;
const words = [
    'Full-Stack Developer',
    'Angular Specialist',
    'Node.js Developer',
    'Problem Solver',
    'Data Science Student'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;
let typingInitialized = false;

function typeEffect() {
    // Buscar elemento apenas uma vez e verificar se existe
    if (!typingElement) {
        typingElement = document.getElementById('typing');
    }
    
    if (!typingElement || typingElement.id !== 'typing') return;
    
    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex = Math.max(0, charIndex - 1);
        typingElement.textContent = currentWord.substring(0, charIndex);
        typeSpeed = 50;
    } else {
        charIndex = Math.min(currentWord.length, charIndex + 1);
        typingElement.textContent = currentWord.substring(0, charIndex);
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// ===== PARTICLES =====
const particles = document.getElementById('particles');
let particleCount = 0;
const MAX_PARTICLES = 30;

function createParticle() {
    if (!particles) return;
    
    // Limitar número de partículas para performance
    if (particleCount >= MAX_PARTICLES) return;
    
    particleCount++;
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(99, 102, 241, ${Math.random() * 0.4 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 8 + 12}s linear forwards;
        pointer-events: none;
        will-change: transform, opacity;
    `;
    particles.appendChild(particle);

    // Remover partícula após animação
    const animDuration = parseFloat(particle.style.animationDuration) * 1000;
    setTimeout(() => {
        particle.remove();
        particleCount--;
    }, animDuration);
}

// Criar partículas com intervalo maior para performance
setInterval(createParticle, 800);

// Adicionar animação de partículas ao CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// ===== FILTRO DE PROJETOS =====
const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover active de todos os botões
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }
});

// ===== FORMULÁRIO DE CONTATO =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        // Estado de loading
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btn.disabled = true;
        btn.style.opacity = '0.7';
        
        try {
            const formData = new FormData(contactForm);
            
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Sucesso
                btn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                btn.style.opacity = '1';
                showToast('✅ Mensagem enviada com sucesso! Retornarei em breve.');
                contactForm.reset();
                
                // Confetti celebration
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
            } else {
                throw new Error('Erro no envio');
            }
        } catch (error) {
            // Erro - oferece alternativa
            btn.innerHTML = '<i class="fas fa-times"></i> Erro no envio';
            btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            btn.style.opacity = '1';
            
            showToast('❌ Erro ao enviar. Tente pelo WhatsApp ou email direto!');
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }
    });
}

// Verificar se veio de um envio bem-sucedido (redirect do Formspree)
if (window.location.search.includes('enviado=true')) {
    showToast('✅ Mensagem enviada com sucesso! Obrigado pelo contato.');
    // Limpar URL
    window.history.replaceState({}, document.title, window.location.pathname);
}

// ===== ANIMAÇÕES DE SCROLL (Otimizado) =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

// Cache para melhor performance
let animateStyleAdded = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Usar requestAnimationFrame para melhor performance
            requestAnimationFrame(() => {
                entry.target.classList.add('animate');
            });
            // Parar de observar após animar
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Adicionar estilos de animação uma única vez
if (!animateStyleAdded) {
    const animateStyle = document.createElement('style');
    animateStyle.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(25px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .animate-ready.animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animateStyle);
    animateStyleAdded = true;
}

// Observar elementos para animação (usando classe ao invés de inline styles)
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-item').forEach((el, index) => {
    el.classList.add('animate-ready');
    // Adicionar delay escalonado para efeito cascata
    el.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(el);
});

// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== EFEITO PARALLAX NO HERO (Otimizado) =====
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const hero = document.querySelector('.hero');
            const scrolled = window.scrollY;
            if (hero && scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
            }
            ticking = false;
        });
        ticking = true;
    }
});

// ===== TOOLTIP PARA SKILLS =====
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.textContent = skill.querySelector('span').textContent;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--primary-color);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8rem;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            z-index: 100;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        skill.style.position = 'relative';
        skill.appendChild(tooltip);
        setTimeout(() => tooltip.style.opacity = '1', 10);
    });

    skill.addEventListener('mouseleave', () => {
        const tooltip = skill.querySelector('.skill-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
        }
    });
});

// ===== TEMA (DARK/LIGHT) COM TRANSIÇÃO SUAVE =====
function toggleTheme(event) {
    // Adiciona classe de transição
    document.body.classList.add('theme-transitioning');
    
    // Remove após a animação
    setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
    }, 500);
    
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    const icon = document.getElementById('theme-icon');
    const toggle = document.getElementById('theme-toggle');
    
    if (icon) {
        // Animação de rotação no ícone
        icon.style.transform = 'rotate(360deg)';
        icon.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
            icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
            icon.style.transform = 'rotate(0deg)';
        }, 250);
    }
    
    // Acessibilidade - atualizar aria-pressed e aria-label
    if (toggle) {
        toggle.setAttribute('aria-pressed', isLight);
        toggle.setAttribute('aria-label', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
    }
    
    // Anunciar mudança para leitores de tela
    announceToScreenReader(isLight ? 'Tema claro ativado' : 'Tema escuro ativado');
}

// Função para anunciar mudanças para leitores de tela
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 1000);
}

// Inicializar tema
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    const icon = document.getElementById('theme-icon');
    const toggle = document.getElementById('theme-toggle');
    if (icon) icon.className = 'fas fa-sun';
    if (toggle) {
        toggle.setAttribute('aria-pressed', 'true');
        toggle.setAttribute('aria-label', 'Ativar tema escuro');
    }
}

// Botão de toggle tema
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// ===== CONTADOR DE ESTATÍSTICAS =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Observer para iniciar contador quando visível
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== TESTIMONIALS SLIDER =====
function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonials-dots .dot');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    
    if (!cards.length) return;
    
    let current = 0;
    let interval;
    
    function show(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });
        
        cards[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }
    
    function next() {
        current = (current + 1) % cards.length;
        show(current);
    }
    
    function prev() {
        current = (current - 1 + cards.length) % cards.length;
        show(current);
    }
    
    function startAutoPlay() {
        interval = setInterval(next, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(interval);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoPlay(); next(); startAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoPlay(); prev(); startAutoPlay(); });
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            current = i;
            show(current);
            startAutoPlay();
        });
    });
    
    startAutoPlay();
}

// ===== DOWNLOAD CV =====
const downloadCV = document.getElementById('download-cv');
if (downloadCV) {
    downloadCV.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('📄 Download do CV iniciado!');
        // Aqui você pode adicionar o link real para o CV
        // window.open('caminho/para/seu/cv.pdf', '_blank');
    });
}

// ===== LAZY LOADING PARA IMAGENS =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Toast styles
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    .toast-notification {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 16px 32px;
        border-radius: 50px;
        font-weight: 500;
        font-size: 0.95rem;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(99, 102, 241, 0.4);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        white-space: nowrap;
    }
    
    .toast-notification.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
    
    @media (max-width: 768px) {
        .toast-notification {
            width: calc(100% - 40px);
            max-width: 400px;
            text-align: center;
            white-space: normal;
            bottom: 20px;
        }
    }
`;
document.head.appendChild(toastStyles);

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar typing apenas se o elemento existir e ainda não foi inicializado
    const typingEl = document.getElementById('typing');
    if (typingEl && !typingInitialized) {
        typingInitialized = true;
        typingElement = typingEl;
        typeEffect();
    }
    initPlaygroundTabs();
    initMarkdownEditor();
    initChecklist();
    initPomodoro();
    initSnakeGame();
    initMemoryGame();
    initTypingTest();
    initTestimonials();
    initCertFilters();
});

// ===== FILTRO DE CERTIFICADOS =====
function initCertFilters() {
    const filterBtns = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.cert-card');
    
    if (!filterBtns.length || !certCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Atualiza botão ativo
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtra os cards
            certCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ===== PLAYGROUND TABS =====
function initPlaygroundTabs() {
    const tabs = document.querySelectorAll('.playground-tab');
    const panels = document.querySelectorAll('.playground-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            const panel = document.getElementById(`panel-${tabName}`);
            if (panel) panel.classList.add('active');
        });
    });
}

// ===== MARKDOWN EDITOR =====
function initMarkdownEditor() {
    const input = document.getElementById('markdown-input');
    const output = document.getElementById('markdown-output');
    
    if (!input || !output) return;

    function parseMarkdown(text) {
        if (!text) return '';
        
        let html = text
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%">')
            .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/^[\-\*] (.*$)/gim, '<li>$1</li>')
            .replace(/^---$/gim, '<hr>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
        
        html = html.replace(/(<li>[\s\S]*?<\/li>)+/g, '<ul>$&</ul>');
        
        return html;
    }

    input.addEventListener('input', () => {
        output.innerHTML = parseMarkdown(input.value);
    });

    if (input.value) {
        output.innerHTML = parseMarkdown(input.value);
    }

    document.querySelectorAll('.toolbar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const text = input.value;
            const selected = text.substring(start, end);
            
            let insert = '';
            
            switch(action) {
                case 'bold': insert = `**${selected || 'texto'}**`; break;
                case 'italic': insert = `*${selected || 'texto'}*`; break;
                case 'heading': insert = `\n## ${selected || 'Título'}\n`; break;
                case 'link': insert = `[${selected || 'texto'}](https://exemplo.com)`; break;
                case 'image': insert = `![${selected || 'descrição'}](url)`; break;
                case 'code': insert = selected.includes('\n') ? `\n\`\`\`javascript\n${selected || 'código'}\n\`\`\`\n` : `\`${selected || 'código'}\``; break;
                case 'list': insert = `\n- ${selected || 'Item'}\n`; break;
                case 'quote': insert = `\n> ${selected || 'Citação'}\n`; break;
                case 'table': insert = `\n| Col 1 | Col 2 | Col 3 |\n|-------|-------|-------|\n| A     | B     | C     |\n`; break;
            }
            
            input.value = text.substring(0, start) + insert + text.substring(end);
            input.focus();
            input.setSelectionRange(start + insert.length, start + insert.length);
            output.innerHTML = parseMarkdown(input.value);
        });
    });

    document.getElementById('md-copy')?.addEventListener('click', () => {
        navigator.clipboard.writeText(output.innerHTML);
        showToast('📋 HTML copiado!');
    });

    document.getElementById('md-download')?.addEventListener('click', () => {
        const blob = new Blob([input.value], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'documento.md';
        a.click();
        URL.revokeObjectURL(url);
        showToast('📥 Arquivo baixado!');
    });

    document.getElementById('md-clear')?.addEventListener('click', () => {
        if (confirm('Limpar tudo?')) {
            input.value = '';
            output.innerHTML = '';
            showToast('🗑️ Conteúdo limpo!');
        }
    });
}

// ===== CHECKLIST =====
function initChecklist() {
    const input = document.getElementById('checklist-input');
    const addBtn = document.getElementById('checklist-add');
    const container = document.getElementById('checklist-items');
    
    if (!input || !addBtn || !container) return;

    let items = JSON.parse(localStorage.getItem('checklistItems') || '[]');
    let filter = 'all';

    function save() {
        localStorage.setItem('checklistItems', JSON.stringify(items));
    }

    function escape(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function render() {
        const filtered = items.filter(item => {
            if (filter === 'pending') return !item.done;
            if (filter === 'completed') return item.done;
            return true;
        });

        container.innerHTML = filtered.map((item, i) => {
            const idx = items.indexOf(item);
            return `
                <li class="checklist-item ${item.done ? 'completed' : ''}">
                    <div class="checklist-checkbox" onclick="window.checklistToggle(${idx})">
                        ${item.done ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                    <span class="checklist-text">${escape(item.text)}</span>
                    <button class="checklist-delete" onclick="window.checklistDelete(${idx})">
                        <i class="fas fa-trash"></i>
                    </button>
                </li>
            `;
        }).join('');

        updateStats();
    }

    function updateStats() {
        const total = items.length;
        const done = items.filter(i => i.done).length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;

        const countEl = document.getElementById('checklist-count');
        const progressEl = document.getElementById('checklist-progress');
        const pctEl = document.getElementById('checklist-percentage');

        if (countEl) countEl.textContent = `${total} tarefa${total !== 1 ? 's' : ''}`;
        if (progressEl) progressEl.style.width = `${pct}%`;
        if (pctEl) pctEl.textContent = `${pct}%`;
    }

    function addItem() {
        const text = input.value.trim();
        if (text) {
            items.push({ text, done: false, id: Date.now() });
            input.value = '';
            save();
            render();
            showToast('✅ Tarefa adicionada!');
        }
    }

    window.checklistToggle = (idx) => {
        items[idx].done = !items[idx].done;
        save();
        render();
    };

    window.checklistDelete = (idx) => {
        items.splice(idx, 1);
        save();
        render();
    };

    addBtn.addEventListener('click', addItem);
    input.addEventListener('keypress', e => { if (e.key === 'Enter') addItem(); });

    document.querySelectorAll('.checklist-filters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.checklist-filters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filter = btn.dataset.filter;
            render();
        });
    });

    document.getElementById('checklist-clear-completed')?.addEventListener('click', () => {
        const count = items.filter(i => i.done).length;
        if (count > 0) {
            items = items.filter(i => !i.done);
            save();
            render();
            showToast(`🧹 ${count} tarefa(s) removida(s)!`);
        }
    });

    document.getElementById('checklist-clear-all')?.addEventListener('click', () => {
        if (items.length && confirm('Remover tudo?')) {
            items = [];
            save();
            render();
            showToast('🗑️ Tudo removido!');
        }
    });

    render();
}

// ===== POMODORO TIMER =====
function initPomodoro() {
    const timeEl = document.getElementById('pomodoro-time');
    const labelEl = document.getElementById('pomodoro-label');
    const circle = document.getElementById('pomodoro-circle');
    const startBtn = document.getElementById('pomodoro-start');
    const pauseBtn = document.getElementById('pomodoro-pause');
    const resetBtn = document.getElementById('pomodoro-reset');
    const sessionsEl = document.getElementById('pomodoro-sessions');
    const totalEl = document.getElementById('pomodoro-total-time');

    if (!timeEl || !startBtn) return;

    let time = 25 * 60;
    let total = 25 * 60;
    let running = false;
    let interval = null;
    let mode = 'work';
    let sessions = parseInt(localStorage.getItem('pomodoroSessions') || '0');
    let totalMins = parseInt(localStorage.getItem('pomodoroTotalMins') || '0');

    const circumference = 2 * Math.PI * 90;
    if (circle) circle.style.strokeDasharray = circumference;

    function updateDisplay() {
        const mins = Math.floor(time / 60);
        const secs = time % 60;
        timeEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        if (circle) {
            const progress = (total - time) / total;
            circle.style.strokeDashoffset = circumference * (1 - progress);
        }
    }

    function updateStats() {
        if (sessionsEl) sessionsEl.textContent = sessions;
        if (totalEl) {
            const h = Math.floor(totalMins / 60);
            const m = totalMins % 60;
            totalEl.textContent = `${h}h ${m}min`;
        }
    }

    function start() {
        if (running) return;
        running = true;
        if (startBtn) startBtn.disabled = true;
        if (pauseBtn) pauseBtn.disabled = false;

        interval = setInterval(() => {
            time--;
            updateDisplay();

            if (time <= 0) {
                clearInterval(interval);
                running = false;
                if (startBtn) startBtn.disabled = false;
                if (pauseBtn) pauseBtn.disabled = true;

                if (mode === 'work') {
                    sessions++;
                    totalMins += 25;
                    localStorage.setItem('pomodoroSessions', sessions);
                    localStorage.setItem('pomodoroTotalMins', totalMins);
                    updateStats();
                    showToast('🍅 Sessão concluída!');
                } else {
                    showToast('⏰ Pausa terminada!');
                }
            }
        }, 1000);
    }

    function pause() {
        clearInterval(interval);
        running = false;
        if (startBtn) startBtn.disabled = false;
        if (pauseBtn) pauseBtn.disabled = true;
    }

    function reset() {
        pause();
        const activeBtn = document.querySelector('.mode-btn.active');
        total = parseInt(activeBtn?.dataset.time || 25) * 60;
        time = total;
        updateDisplay();
    }

    startBtn.addEventListener('click', start);
    pauseBtn?.addEventListener('click', pause);
    resetBtn?.addEventListener('click', reset);

    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            mode = btn.dataset.mode;
            total = parseInt(btn.dataset.time) * 60;
            time = total;
            
            const labels = { work: 'Foco', short: 'Pausa Curta', long: 'Pausa Longa' };
            if (labelEl) labelEl.textContent = labels[mode];
            
            pause();
            updateDisplay();
        });
    });

    updateDisplay();
    updateStats();
}

// ===== SNAKE GAME =====
function initSnakeGame() {
    const canvas = document.getElementById('snake-canvas');
    const overlay = document.getElementById('snake-overlay');
    const startBtn = document.getElementById('snake-start');
    const scoreEl = document.getElementById('snake-score');
    const recordEl = document.getElementById('snake-record');
    const diffSelect = document.getElementById('snake-difficulty');

    if (!canvas || !startBtn) return;

    const ctx = canvas.getContext('2d');
    const grid = 20;
    const size = 400;
    
    let snake = [];
    let dir = { x: 1, y: 0 };
    let nextDir = { x: 1, y: 0 };
    let food = { x: 0, y: 0 };
    let score = 0;
    let loop = null;
    let speed = 100;
    let baseSpeed = 100;
    let speedDecrement = 2;
    let minSpeed = 50;
    let pointsPerFood = 10;
    let record = parseInt(localStorage.getItem('snakeRecord') || '0');
    let currentDifficulty = 'normal';

    if (recordEl) recordEl.textContent = record;

    // Configurações de dificuldade
    const difficulties = {
        easy: { baseSpeed: 150, speedDecrement: 1, minSpeed: 80, pointsPerFood: 5, name: 'Fácil' },
        normal: { baseSpeed: 100, speedDecrement: 2, minSpeed: 50, pointsPerFood: 10, name: 'Normal' },
        hard: { baseSpeed: 70, speedDecrement: 3, minSpeed: 35, pointsPerFood: 15, name: 'Difícil' },
        insane: { baseSpeed: 50, speedDecrement: 5, minSpeed: 25, pointsPerFood: 25, name: 'Insano' }
    };

    function setDifficulty(diff) {
        currentDifficulty = diff;
        const settings = difficulties[diff] || difficulties.normal;
        baseSpeed = settings.baseSpeed;
        speedDecrement = settings.speedDecrement;
        minSpeed = settings.minSpeed;
        pointsPerFood = settings.pointsPerFood;
    }

    function init() {
        snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
        dir = { x: 1, y: 0 };
        nextDir = { x: 1, y: 0 };
        score = 0;
        speed = baseSpeed;
        if (scoreEl) scoreEl.textContent = '0';
        spawnFood();
    }

    function spawnFood() {
        do {
            food = {
                x: Math.floor(Math.random() * (size / grid)),
                y: Math.floor(Math.random() * (size / grid))
            };
        } while (snake.some(s => s.x === food.x && s.y === food.y));
    }

    function draw() {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, size, size);

        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= size; i += grid) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, size);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(size, i);
            ctx.stroke();
        }

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(food.x * grid + grid/2, food.y * grid + grid/2, grid/2 - 2, 0, Math.PI * 2);
        ctx.fill();

        snake.forEach((seg, i) => {
            const grad = ctx.createRadialGradient(
                seg.x * grid + grid/2, seg.y * grid + grid/2, 0,
                seg.x * grid + grid/2, seg.y * grid + grid/2, grid/2
            );
            grad.addColorStop(0, i === 0 ? '#818cf8' : '#6366f1');
            grad.addColorStop(1, i === 0 ? '#6366f1' : '#4f46e5');
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(seg.x * grid + 2, seg.y * grid + 2, grid - 4, grid - 4, 4);
            ctx.fill();
        });
    }

    function update() {
        dir = nextDir;
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

        if (head.x < 0 || head.x >= size/grid || head.y < 0 || head.y >= size/grid) {
            gameOver();
            return;
        }

        if (snake.some(s => s.x === head.x && s.y === head.y)) {
            gameOver();
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += pointsPerFood;
            if (scoreEl) scoreEl.textContent = score;
            spawnFood();
            if (speed > minSpeed) {
                speed -= speedDecrement;
                clearInterval(loop);
                loop = setInterval(step, speed);
            }
        } else {
            snake.pop();
        }

        draw();
    }

    function step() {
        update();
    }

    function gameOver() {
        clearInterval(loop);
        loop = null;

        const diffName = difficulties[currentDifficulty]?.name || 'Normal';
        
        if (score > record) {
            record = score;
            localStorage.setItem('snakeRecord', record);
            if (recordEl) recordEl.textContent = record;
            showToast(`🎉 Novo recorde: ${record}! (${diffName})`);
        } else {
            showToast(`💀 Game Over! Pontos: ${score} (${diffName})`);
        }

        if (overlay) {
            overlay.classList.remove('hidden');
            const h4 = overlay.querySelector('h4');
            const p = overlay.querySelector('p');
            if (h4) h4.textContent = 'Game Over!';
            if (p) p.textContent = `Pontuação: ${score} (${diffName})`;
        }
    }

    function startGame() {
        // Aplicar dificuldade selecionada
        if (diffSelect) {
            setDifficulty(diffSelect.value);
        }
        init();
        if (overlay) overlay.classList.add('hidden');
        if (loop) clearInterval(loop);
        loop = setInterval(step, speed);
    }

    startBtn.addEventListener('click', startGame);

    document.addEventListener('keydown', e => {
        if (!loop) return;

        switch(e.key) {
            case 'ArrowUp': case 'w': case 'W':
                if (dir.y !== 1) nextDir = { x: 0, y: -1 };
                break;
            case 'ArrowDown': case 's': case 'S':
                if (dir.y !== -1) nextDir = { x: 0, y: 1 };
                break;
            case 'ArrowLeft': case 'a': case 'A':
                if (dir.x !== 1) nextDir = { x: -1, y: 0 };
                break;
            case 'ArrowRight': case 'd': case 'D':
                if (dir.x !== -1) nextDir = { x: 1, y: 0 };
                break;
        }
        e.preventDefault();
    });

    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!loop) return;
            
            switch(btn.dataset.direction) {
                case 'up': if (dir.y !== 1) nextDir = { x: 0, y: -1 }; break;
                case 'down': if (dir.y !== -1) nextDir = { x: 0, y: 1 }; break;
                case 'left': if (dir.x !== 1) nextDir = { x: -1, y: 0 }; break;
                case 'right': if (dir.x !== -1) nextDir = { x: 1, y: 0 }; break;
            }
        });
    });

    init();
    draw();
}

// ===== MEMORY GAME =====
function initMemoryGame() {
    const grid = document.getElementById('memory-grid');
    const restartBtn = document.getElementById('memory-restart');
    const diffSelect = document.getElementById('memory-difficulty');
    const movesEl = document.getElementById('memory-moves');
    const timeEl = document.getElementById('memory-time');

    if (!grid || !restartBtn) return;

    const emojis = ['🎮', '🎨', '🎵', '🎬', '📚', '💻', '🚀', '⭐', '🎯', '🔥', '💎', '🌟', 
                   '🎪', '🎭', '🎸', '🎹', '🎺', '🎻', '🏆', '🎁', '🌈', '🦄', '🐱', '🐶',
                   '🦊', '🦁', '🐼', '🐨', '🐸', '🦋', '🌸', '🌺'];

    let cards = [];
    let flipped = [];
    let matched = 0;
    let moves = 0;
    let time = 0;
    let timer = null;
    let canClick = true;

    function create() {
        const size = parseInt(diffSelect?.value || 4);
        const pairs = (size * size) / 2;
        
        flipped = [];
        matched = 0;
        moves = 0;
        time = 0;
        canClick = true;
        
        if (movesEl) movesEl.textContent = '0';
        if (timeEl) timeEl.textContent = '0:00';
        
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            time++;
            if (timeEl) {
                const m = Math.floor(time / 60);
                const s = time % 60;
                timeEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;
            }
        }, 1000);

        const selected = emojis.slice(0, pairs);
        cards = [...selected, ...selected];
        
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        grid.innerHTML = cards.map((emoji, i) => `
            <div class="memory-card" data-index="${i}" data-emoji="${emoji}">
                <div class="card-front"><i class="fas fa-question"></i></div>
                <div class="card-back">${emoji}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.memory-card').forEach(card => {
            card.addEventListener('click', () => flip(card));
        });
    }

    function flip(card) {
        if (!canClick) return;
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        if (flipped.length >= 2) return;

        card.classList.add('flipped');
        flipped.push(card);

        if (flipped.length === 2) {
            moves++;
            if (movesEl) movesEl.textContent = moves;
            
            const [c1, c2] = flipped;
            
            if (c1.dataset.emoji === c2.dataset.emoji) {
                c1.classList.add('matched');
                c2.classList.add('matched');
                matched++;
                flipped = [];
                
                if (matched === cards.length / 2) {
                    clearInterval(timer);
                    setTimeout(() => {
                        showToast(`🎉 Venceu em ${moves} movimentos!`);
                    }, 300);
                }
            } else {
                canClick = false;
                setTimeout(() => {
                    c1.classList.remove('flipped');
                    c2.classList.remove('flipped');
                    flipped = [];
                    canClick = true;
                }, 1000);
            }
        }
    }

    restartBtn.addEventListener('click', create);
    diffSelect?.addEventListener('change', create);

    create();
}

// ===== TYPING TEST =====
function initTypingTest() {
    const display = document.getElementById('typing-text');
    const input = document.getElementById('typing-input');
    const startBtn = document.getElementById('typing-start');
    const wpmEl = document.getElementById('typing-wpm');
    const accEl = document.getElementById('typing-accuracy');
    const timeEl = document.getElementById('typing-time');
    const durSelect = document.getElementById('typing-duration');

    if (!display || !input || !startBtn) return;

    const texts = [
        "A programação é a arte de transformar ideias em realidade através de código. Cada linha escrita é um passo em direção à solução de um problema.",
        "JavaScript é uma linguagem versátil que permite criar desde simples scripts até aplicações complexas. Seu ecossistema é vasto e está sempre evoluindo.",
        "O desenvolvimento web moderno envolve diversas tecnologias trabalhando em conjunto. Front-end, back-end e banco de dados formam a base de qualquer aplicação.",
        "Aprender a programar requer paciência e prática constante. Os erros são parte essencial do processo de aprendizado e crescimento profissional.",
        "A tecnologia está em constante evolução e os desenvolvedores precisam se adaptar continuamente. Estudar e praticar são fundamentais para o sucesso.",
        "Algoritmos são sequências de instruções que resolvem problemas específicos. Dominar algoritmos é essencial para qualquer desenvolvedor de software."
    ];

    let text = '';
    let startTime = null;
    let timer = null;
    let duration = 60;
    let timeLeft = 60;
    let running = false;

    function selectText() {
        text = texts[Math.floor(Math.random() * texts.length)];
        renderText();
    }

    function renderText() {
        const typed = input.value;
        let html = '';
        
        for (let i = 0; i < text.length; i++) {
            if (i < typed.length) {
                html += typed[i] === text[i] 
                    ? `<span class="correct">${text[i]}</span>`
                    : `<span class="incorrect">${text[i]}</span>`;
            } else if (i === typed.length) {
                html += `<span class="current">${text[i]}</span>`;
            } else {
                html += text[i];
            }
        }
        
        display.innerHTML = html;
    }

    function calcStats() {
        const typed = input.value;
        const elapsed = (Date.now() - startTime) / 1000 / 60;
        
        let correct = 0;
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] === text[i]) correct++;
        }
        
        const words = correct / 5;
        const wpm = Math.round(words / elapsed) || 0;
        const acc = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;
        
        if (wpmEl) wpmEl.textContent = wpm;
        if (accEl) accEl.textContent = `${acc}%`;
    }

    function start() {
        duration = parseInt(durSelect?.value || 60);
        timeLeft = duration;
        running = true;
        
        selectText();
        input.value = '';
        input.disabled = false;
        input.focus();
        
        startTime = Date.now();
        startBtn.innerHTML = '<i class="fas fa-redo"></i> Reiniciar';
        
        if (wpmEl) wpmEl.textContent = '0';
        if (accEl) accEl.textContent = '100%';
        if (timeEl) timeEl.textContent = duration;
        
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            if (timeEl) timeEl.textContent = timeLeft;
            if (timeLeft <= 0) end();
        }, 1000);
    }

    function end() {
        running = false;
        clearInterval(timer);
        input.disabled = true;
        
        calcStats();
        
        const wpm = wpmEl?.textContent || '0';
        const acc = accEl?.textContent || '100%';
        showToast(`⌨️ Finalizado! ${wpm} WPM com ${acc} precisão`);
        
        startBtn.innerHTML = '<i class="fas fa-play"></i> Novo Teste';
    }

    startBtn.addEventListener('click', () => {
        if (running) {
            clearInterval(timer);
            running = false;
        }
        start();
    });

    input.addEventListener('input', () => {
        if (!running) return;
        renderText();
        calcStats();
        if (input.value.length >= text.length) end();
    });

    input.addEventListener('paste', e => e.preventDefault());

    selectText();
    if (timeEl) timeEl.textContent = durSelect?.value || 60;
}

// ===== FUNCIONALIDADES EXTRAS =====

// Toast de Boas-vindas
function showWelcomeToast() {
    const hour = new Date().getHours();
    let greeting = '';
    let emoji = '';
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Bom dia';
        emoji = '☀️';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Boa tarde';
        emoji = '🌤️';
    } else {
        greeting = 'Boa noite';
        emoji = '🌙';
    }
    
    const isReturning = localStorage.getItem('visited');
    const message = isReturning 
        ? `${emoji} ${greeting}! Que bom te ver de novo!`
        : `${emoji} ${greeting}! Seja bem-vindo ao meu portfólio!`;
    
    setTimeout(() => {
        showToast(message, 4000);
        localStorage.setItem('visited', 'true');
    }, 2500);
}

// Mostrar toast customizado
function showToast(message, duration = 3000) {
    // Remove toast existente
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" aria-label="Fechar">&times;</button>
    `;
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto-remover
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-title, .skill-category, .timeline-item, .education-card, .about-text, .about-image, .contact-info, .contact-form-container');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => {
        el.classList.add('reveal-element');
        revealObserver.observe(el);
    });
}

// Easter Eggs
function initEasterEggs() {
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    // Konami Code
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            activatePartyMode();
        }
    });
    
    // Click secreto no logo
    let logoClicks = 0;
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            logoClicks++;
            if (logoClicks === 7) {
                e.preventDefault();
                showToast('🎉 Você descobriu o clique secreto! Você é curioso! 😄');
                logoClicks = 0;
                confettiEffect();
            }
            setTimeout(() => logoClicks = 0, 2000);
        });
    }
    
    // Console Easter Egg
    console.log('%c🚀 Olá, dev curioso!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%cQue bom que você veio explorar o console!', 'font-size: 14px; color: #10b981;');
    console.log('%c💡 Dica: Tente o código Konami (↑↑↓↓←→←→BA)', 'font-size: 12px; color: #f59e0b;');
    console.log('%c📧 guilhermemutao@gmail.com', 'font-size: 12px; color: #94a3b8;');
}

// Party Mode (Konami Code)
function activatePartyMode() {
    showToast('🎮 PARTY MODE ATIVADO! 🎉');
    
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    // Adicionar CSS de rainbow se não existir
    if (!document.getElementById('party-style')) {
        const style = document.createElement('style');
        style.id = 'party-style';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    confettiEffect();
    
    // Desativar após 5 segundos
    setTimeout(() => {
        document.body.style.animation = '';
        showToast('Party mode desativado 😴');
    }, 5000);
}

// Efeito de Confete
function confettiEffect() {
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 99999;
            animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
    
    // Adicionar animação se não existir
    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes confetti-fall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Título da aba dinâmico
function initDynamicTitle() {
    const originalTitle = document.title;
    let isVisible = true;
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isVisible = false;
            document.title = '👋 Ei, volta aqui!';
        } else {
            isVisible = true;
            document.title = '🎉 Que bom que voltou!';
            setTimeout(() => {
                document.title = originalTitle;
            }, 2000);
        }
    });
}

// Efeito de Click Ripple em botões
function initRippleEffect() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Adicionar animação se não existir
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Parallax suave no hero
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        });
    }
}

// Cursor trail effect melhorado
function initCursorTrail() {
    const trail = [];
    const trailLength = 8;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: ${8 - i}px;
            height: ${8 - i}px;
            background: rgba(99, 102, 241, ${0.5 - i * 0.05});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    const trailPositions = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        trailPositions.unshift({ x: mouseX, y: mouseY });
        trailPositions.splice(trailLength);
        
        trail.forEach((dot, i) => {
            const pos = trailPositions[i] || { x: mouseX, y: mouseY };
            dot.style.left = pos.x + 'px';
            dot.style.top = pos.y + 'px';
            dot.style.opacity = mouseX > 0 ? 1 : 0;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Inicializar todas as funcionalidades extras
document.addEventListener('DOMContentLoaded', () => {
    showWelcomeToast();
    initScrollReveal();
    initEasterEggs();
    initDynamicTitle();
    initRippleEffect();
    initParallax();
    initScrollProgress();
    initMusicPlayer();
    initTerminal();
    initGuestbook();
    initCursorBySection();
    init3DTilt();
    initInteractiveParticles();
    initGlassmorphism();
    // initCursorTrail(); // Descomente para ativar trail do cursor
});

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== MUSIC PLAYER =====
function initMusicPlayer() {
    const player = document.getElementById('music-player');
    const toggle = document.getElementById('music-toggle');
    const icon = document.getElementById('music-icon');
    const volumeSlider = document.getElementById('music-volume');
    
    if (!player || !toggle) return;
    
    // Criar elemento de áudio com stream de lo-fi
    const audio = new Audio();
    audio.src = 'https://streams.ilovemusic.de/iloveradio17.mp3'; // Lo-Fi stream
    audio.volume = 0.3;
    audio.loop = true;
    
    let isPlaying = false;
    
    toggle.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            icon.className = 'fas fa-play';
            player.classList.remove('playing');
            toggle.classList.remove('playing');
        } else {
            audio.play().catch(() => {
                showToast('🔇 Clique novamente para tocar música');
            });
            icon.className = 'fas fa-pause';
            player.classList.add('playing');
            toggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
    
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value / 100;
        });
    }
}

// ===== TERMINAL INTERATIVO =====
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const clearBtn = document.getElementById('terminal-clear');
    
    if (!input || !output) return;
    
    const commands = {
        help: () => `
<span class="terminal-text info">Comandos disponíveis:</span>
  <span class="cmd-highlight">about</span>      - Sobre mim
  <span class="cmd-highlight">skills</span>     - Minhas habilidades
  <span class="cmd-highlight">projects</span>   - Meus projetos
  <span class="cmd-highlight">contact</span>    - Informações de contato
  <span class="cmd-highlight">social</span>     - Redes sociais
  <span class="cmd-highlight">experience</span> - Experiência profissional
  <span class="cmd-highlight">education</span>  - Formação acadêmica
  <span class="cmd-highlight">coffee</span>     - ☕ Contador de cafés
  <span class="cmd-highlight">joke</span>       - Piada de programador
  <span class="cmd-highlight">matrix</span>     - 🟢 Modo Matrix
  <span class="cmd-highlight">clear</span>      - Limpar terminal
  <span class="cmd-highlight">exit</span>       - Sair (spoiler: não funciona 😄)
        `,
        about: () => `
<span class="terminal-ascii">
   _____ __  __ 
  / ____|  \\/  |
 | |  __| \\  / |
 | | |_ | |\\/| |
 | |__| | |  | |
  \\_____|_|  |_|
</span>
<span class="terminal-text success">Guilherme Mutão</span>
<span class="terminal-text">Full-Stack Developer | Angular | Java | Node.js</span>
<span class="terminal-text">📍 Uberaba, MG - Brasil</span>
<span class="terminal-text">💼 Atualmente na Radix</span>
<span class="terminal-text">🎓 Pós-graduando em Data Science</span>
        `,
        skills: () => `
<span class="terminal-text info">💻 Habilidades Técnicas:</span>

<span class="terminal-text success">Front-end:</span> Angular, TypeScript, RxJS, HTML5, CSS3, React
<span class="terminal-text success">Back-end:</span> Node.js, Java, Python, PHP, REST APIs
<span class="terminal-text success">Databases:</span> Oracle, PostgreSQL, MySQL, MongoDB
<span class="terminal-text success">Tools:</span> Git, Docker, Scrum, CI/CD, Linux
        `,
        projects: () => `
<span class="terminal-text info">📁 Projetos em Destaque:</span>

1. <span class="cmd-highlight">SGA</span> - Sistema de Gestão de Atletas
2. <span class="cmd-highlight">LogísticaHub</span> - Gestão de Frotas
3. <span class="cmd-highlight">IPTU Digital</span> - Portal do Contribuinte
4. <span class="cmd-highlight">IntegrationAPI</span> - Middleware Empresarial
5. <span class="cmd-highlight">ScrumAnalytics</span> - Métricas de Time
6. <span class="cmd-highlight">EventCheck</span> - Check-in por QR Code
7. <span class="cmd-highlight">SmartBot</span> - Atendimento Automatizado
8. <span class="cmd-highlight">EstoqueSmart</span> - Gestão de Inventário
9. <span class="cmd-highlight">VistoriaApp</span> - Inspeção de Veículos

<span class="terminal-text">Digite o nome do projeto para mais detalhes!</span>
        `,
        contact: () => `
<span class="terminal-text info">📬 Entre em contato:</span>

📧 Email: <span class="cmd-highlight">guilhermemutao@gmail.com</span>
📱 WhatsApp: <span class="cmd-highlight">+55 34 99768-0592</span>
🌐 Website: <span class="cmd-highlight">guilhermemutao.dev</span>
        `,
        social: () => `
<span class="terminal-text info">🌐 Redes Sociais:</span>

<span class="terminal-text success">LinkedIn:</span> linkedin.com/in/guilhermemutao
<span class="terminal-text success">GitHub:</span> github.com/GuilhermeMutao
<span class="terminal-text success">Email:</span> guilhermemutao@gmail.com
        `,
        experience: () => `
<span class="terminal-text info">💼 Experiência Profissional:</span>

<span class="terminal-text success">2026 - Presente</span> | Full-Stack Developer @ Radix
    → Angular, Java, TypeScript, Oracle DB

<span class="terminal-text success">2023 - 2026</span> | Full-Stack Developer @ Bravo Logistics
    → Angular, Node.js, Python, PostgreSQL

<span class="terminal-text success">2022 - 2023</span> | Developer @ Codiub
    → Angular, PHP, Java, MySQL
        `,
        education: () => `
<span class="terminal-text info">🎓 Formação Acadêmica:</span>

<span class="terminal-text success">2024 - 2025</span> | Pós-graduação em Data Science
    → Descomplica Faculdade Digital

<span class="terminal-text success">2020 - 2023</span> | Tecnólogo em ADS
    → IFTM - Instituto Federal do Triângulo Mineiro
        `,
        coffee: () => {
            let coffees = parseInt(localStorage.getItem('coffeeCount') || '0');
            coffees++;
            localStorage.setItem('coffeeCount', coffees);
            return `<span class="terminal-text">☕ Contador de cafés: <span class="cmd-highlight">${coffees}</span> xícaras!</span>
<span class="terminal-text">Mais um café para continuar codando! ☕😄</span>`;
        },
        joke: () => {
            const jokes = [
                "Por que o programador usa óculos? Porque ele não consegue C#! 😄",
                "Quantos programadores são necessários para trocar uma lâmpada? Nenhum, isso é problema de hardware! 💡",
                "Por que programadores confundem Halloween com Natal? Porque OCT 31 = DEC 25! 🎃🎄",
                "Um SQL query entra num bar, vai até duas mesas e pergunta: 'Posso juntar vocês?' 🍺",
                "!false - É engraçado porque é true! 😂",
                "Existem 10 tipos de pessoas: as que entendem binário e as que não! 🔢",
                "Programador é a única profissão onde você pode dizer 'funciona na minha máquina' e isso ser uma defesa válida! 💻"
            ];
            return `<span class="terminal-text">${jokes[Math.floor(Math.random() * jokes.length)]}</span>`;
        },
        matrix: () => {
            document.body.style.filter = 'hue-rotate(80deg) saturate(1.5)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 5000);
            return `<span class="terminal-text success">🟢 MODO MATRIX ATIVADO! (5 segundos)</span>
<span class="terminal-text">Wake up, Neo... The Matrix has you...</span>`;
        },
        clear: () => {
            output.innerHTML = '';
            return null;
        },
        exit: () => `<span class="terminal-text error">Você realmente achou que ia funcionar? 😄</span>
<span class="terminal-text">Não tem como sair dessa jornada de código!</span>`,
        ls: () => `<span class="terminal-text">about.txt  skills.json  projects/  contact.md  README.md</span>`,
        pwd: () => `<span class="terminal-text">/home/visitor/gm-portfolio</span>`,
        whoami: () => `<span class="terminal-text">visitor (convidado especial! 🌟)</span>`,
        date: () => `<span class="terminal-text">${new Date().toLocaleString('pt-BR')}</span>`,
        echo: (args) => `<span class="terminal-text">${args.join(' ') || ''}</span>`,
        sudo: () => `<span class="terminal-text error">Nice try! Mas você não tem permissão de superusuário aqui 😏</span>`,
        rm: () => `<span class="terminal-text error">🚫 Operação negada! Você está tentando destruir meu portfólio? 😱</span>`,
        cat: (args) => {
            if (args[0] === 'README.md') {
                return `<span class="terminal-text"># Bem-vindo ao Portfolio de Guilherme Mutão!</span>
<span class="terminal-text">Este é um portfólio interativo com muitas surpresas.</span>
<span class="terminal-text">Explore os comandos digitando <span class="cmd-highlight">help</span></span>`;
            }
            return `<span class="terminal-text error">cat: ${args[0] || 'arquivo'}: Arquivo não encontrado</span>`;
        },
        neofetch: () => `
<span class="terminal-ascii" style="color: #6366f1;">
       _,met\$\$\$\$\$gg.          </span><span class="terminal-text success">visitor@gm-portfolio</span>
<span class="terminal-ascii" style="color: #6366f1;">    ,g\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$P.       </span><span class="terminal-text">-------------------</span>
<span class="terminal-ascii" style="color: #6366f1;">  ,g\$\$P"     """Y\$\$."".        </span><span class="terminal-text"><span class="cmd-highlight">OS:</span> Portfolio OS 2.0</span>
<span class="terminal-ascii" style="color: #6366f1;"> ,\$\$P'              \`\$\$\$.       </span><span class="terminal-text"><span class="cmd-highlight">Host:</span> guilhermemutao.dev</span>
<span class="terminal-ascii" style="color: #6366f1;">',\$\$P       ,ggs.     \`\$\$b:     </span><span class="terminal-text"><span class="cmd-highlight">Kernel:</span> HTML5 + CSS3 + JS</span>
<span class="terminal-ascii" style="color: #6366f1;">\`d\$\$'     ,\$P"'   .    \$\$\$      </span><span class="terminal-text"><span class="cmd-highlight">Uptime:</span> 4+ years coding</span>
<span class="terminal-ascii" style="color: #6366f1;"> \$\$P      d\$'     ,    \$\$P      </span><span class="terminal-text"><span class="cmd-highlight">Packages:</span> Angular, Node, Java</span>
<span class="terminal-ascii" style="color: #6366f1;"> \$\$:      \$\$.   -    ,d\$\$'      </span><span class="terminal-text"><span class="cmd-highlight">Shell:</span> /bin/creativity</span>
<span class="terminal-ascii" style="color: #6366f1;"> \$\$;      Y\$b._   _,d\$P'        </span><span class="terminal-text"><span class="cmd-highlight">Theme:</span> Dark Mode</span>
<span class="terminal-ascii" style="color: #6366f1;"> Y\$\$.    \`.\`"Y\$\$\$\$P"'           </span><span class="terminal-text"><span class="cmd-highlight">Coffee:</span> ${localStorage.getItem('coffeeCount') || 0} cups</span>
        `
    };
    
    // Histórico de comandos
    let commandHistory = [];
    let historyIndex = -1;
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            if (!cmd) return;
            
            // Adicionar ao histórico
            commandHistory.unshift(cmd);
            historyIndex = -1;
            
            // Mostrar comando digitado
            addLine(`<span class="terminal-prompt">visitor@gm-portfolio:~$</span> <span class="terminal-text">${input.value}</span>`);
            
            // Processar comando
            const [command, ...args] = cmd.split(' ');
            
            if (commands[command]) {
                const result = typeof commands[command] === 'function' 
                    ? commands[command](args) 
                    : commands[command];
                if (result) addLine(result);
            } else {
                addLine(`<span class="terminal-text error">Comando não encontrado: ${command}. Digite <span class="cmd-highlight">help</span> para ver os comandos.</span>`);
            }
            
            input.value = '';
            output.scrollTop = output.scrollHeight;
        }
        
        // Navegar no histórico com setas
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            }
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                input.value = '';
            }
        }
    });
    
    function addLine(html) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = html;
        output.appendChild(line);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            output.innerHTML = `<div class="terminal-line">
                <span class="terminal-prompt">visitor@gm-portfolio:~$</span>
                <span class="terminal-text">Terminal limpo! Digite <span class="cmd-highlight">help</span> para ver os comandos.</span>
            </div>`;
        });
    }
}

// ===== GUESTBOOK =====
function initGuestbook() {
    const form = document.getElementById('guestbook-form');
    const messagesContainer = document.getElementById('guestbook-messages');
    const countEl = document.getElementById('guestbook-count');
    const emojiTrigger = document.getElementById('emoji-trigger');
    const emojiDropdown = document.getElementById('emoji-dropdown');
    const selectedEmojiEl = document.getElementById('selected-emoji');
    
    if (!form || !messagesContainer) return;
    
    // Estado do emoji selecionado
    let selectedEmoji = '😊';
    
    // Inicializar seletor de emoji
    if (emojiTrigger && emojiDropdown) {
        emojiTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            emojiTrigger.classList.toggle('active');
            emojiDropdown.classList.toggle('show');
        });
        
        // Selecionar emoji
        emojiDropdown.querySelectorAll('.emoji-option').forEach(option => {
            option.addEventListener('click', () => {
                selectedEmoji = option.dataset.emoji;
                selectedEmojiEl.textContent = selectedEmoji;
                
                // Atualizar visual de selecionado
                emojiDropdown.querySelectorAll('.emoji-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                // Fechar dropdown
                emojiTrigger.classList.remove('active');
                emojiDropdown.classList.remove('show');
            });
        });
        
        // Fechar dropdown ao clicar fora
        document.addEventListener('click', (e) => {
            if (!emojiTrigger.contains(e.target) && !emojiDropdown.contains(e.target)) {
                emojiTrigger.classList.remove('active');
                emojiDropdown.classList.remove('show');
            }
        });
    }
    
    // Carregar mensagens do localStorage
    let messages = JSON.parse(localStorage.getItem('guestbook') || '[]');
    
    // Adicionar mensagens de exemplo se vazio
    if (messages.length === 0) {
        messages = [
            {
                name: 'Visitante Anônimo',
                emoji: '👋',
                message: 'Portfólio incrível! Adorei as funcionalidades interativas.',
                date: new Date().toISOString()
            }
        ];
        localStorage.setItem('guestbook', JSON.stringify(messages));
    }
    
    renderMessages();
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('guest-name').value.trim();
        const message = document.getElementById('guest-message').value.trim();
        
        if (!name || !message) return;
        
        const newMessage = {
            name,
            emoji: selectedEmoji,
            message,
            date: new Date().toISOString()
        };
        
        messages.unshift(newMessage);
        localStorage.setItem('guestbook', JSON.stringify(messages));
        
        form.reset();
        selectedEmoji = '😊';
        if (selectedEmojiEl) selectedEmojiEl.textContent = selectedEmoji;
        renderMessages();
        showToast('📝 Mensagem enviada com sucesso!');
    });
    
    function renderMessages() {
        if (messages.length === 0) {
            messagesContainer.innerHTML = `
                <div class="guestbook-empty">
                    <i class="fas fa-book-open"></i>
                    <p>Nenhuma mensagem ainda. Seja o primeiro a deixar uma! 💬</p>
                </div>
            `;
        } else {
            messagesContainer.innerHTML = messages.map(msg => `
                <div class="guestbook-message">
                    <div class="guestbook-message-header">
                        <span class="guestbook-author">
                            <span class="guestbook-emoji">${msg.emoji}</span>
                            ${msg.name}
                        </span>
                        <span class="guestbook-date">${formatDate(msg.date)}</span>
                    </div>
                    <p class="guestbook-message-text">${msg.message}</p>
                </div>
            `).join('');
        }
        
        if (countEl) {
            countEl.textContent = `${messages.length} mensagem${messages.length !== 1 ? 's' : ''}`;
        }
    }
    
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Agora mesmo';
        if (diff < 3600000) return `${Math.floor(diff / 60000)} min atrás`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)} h atrás`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)} dias atrás`;
        
        return date.toLocaleDateString('pt-BR');
    }
}

// ===== 3D TILT NOS CARDS =====
function init3DTilt() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .education-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease';
            
            // Efeito de luz seguindo o mouse
            const glare = card.querySelector('.card-glare') || createGlare(card);
            glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
            
            const glare = card.querySelector('.card-glare');
            if (glare) glare.style.background = 'transparent';
        });
    });
    
    function createGlare(card) {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        glare.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            border-radius: inherit;
            z-index: 1;
        `;
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(glare);
        return glare;
    }
}

// ===== PARTÍCULAS INTERATIVAS =====
function initInteractiveParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    const particles = [];
    let mouseX = 0, mouseY = 0;
    
    // Criar partículas
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'interactive-particle';
        
        const size = Math.random() * 6 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            pointer-events: none;
            transition: transform 0.3s ease;
            box-shadow: 0 0 ${size * 2}px rgba(99, 102, 241, 0.3);
        `;
        
        particlesContainer.appendChild(particle);
        particles.push({
            element: particle,
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: size,
            speed: Math.random() * 0.5 + 0.1
        });
    }
    
    // Movimento do mouse
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * 100;
            mouseY = ((e.clientY - rect.top) / rect.height) * 100;
        });
    }
    
    // Animar partículas
    function animateParticles() {
        particles.forEach(p => {
            // Calcular distância do mouse
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Fugir do mouse se próximo
            if (distance < 20) {
                const angle = Math.atan2(dy, dx);
                const force = (20 - distance) / 20;
                p.x -= Math.cos(angle) * force * 3;
                p.y -= Math.sin(angle) * force * 3;
            } else {
                // Voltar para posição original suavemente
                p.x += (p.baseX - p.x) * 0.02;
                p.y += (p.baseY - p.y) * 0.02;
            }
            
            // Movimento flutuante
            p.y += Math.sin(Date.now() * 0.001 + p.baseX) * 0.05;
            p.x += Math.cos(Date.now() * 0.001 + p.baseY) * 0.03;
            
            p.element.style.left = p.x + '%';
            p.element.style.top = p.y + '%';
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// ===== GLASSMORPHISM EFFECT =====
function initGlassmorphism() {
    // Adicionar estilos de glassmorphism dinamicamente
    const style = document.createElement('style');
    style.id = 'glassmorphism-style';
    style.textContent = `
        .glass-effect {
            background: rgba(255, 255, 255, 0.05) !important;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        
        body.light-theme .glass-effect {
            background: rgba(255, 255, 255, 0.7) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }
        
        .navbar.scrolled {
            background: rgba(15, 23, 42, 0.8) !important;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }
        
        body.light-theme .navbar.scrolled {
            background: rgba(248, 250, 252, 0.8) !important;
        }
        
        .project-card {
            background: rgba(30, 41, 59, 0.6) !important;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        body.light-theme .project-card {
            background: rgba(255, 255, 255, 0.7) !important;
            border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .skill-category {
            background: rgba(30, 41, 59, 0.5) !important;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .timeline-content {
            background: rgba(30, 41, 59, 0.6) !important;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        
        .education-card {
            background: rgba(30, 41, 59, 0.5) !important;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }
        
        .testimonial-content {
            background: rgba(30, 41, 59, 0.6) !important;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        
        .contact-info, .contact-form-container {
            background: rgba(30, 41, 59, 0.5) !important;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        
        .music-player {
            background: rgba(30, 41, 59, 0.8) !important;
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
        }
        
        .custom-toast {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
    `;
    document.head.appendChild(style);
}

// ===== CURSOR POR SEÇÃO =====
function initCursorBySection() {
    const sections = document.querySelectorAll('section');
    const cursorFollower = document.getElementById('cursor-follower');
    
    if (!cursorFollower) return;
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const colors = {
                    home: '#6366f1',
                    about: '#10b981',
                    skills: '#f59e0b',
                    projects: '#ec4899',
                    playground: '#8b5cf6',
                    experience: '#06b6d4',
                    testimonials: '#f43f5e',
                    education: '#14b8a6',
                    contact: '#10b981'
                };
                
                cursorFollower.style.borderColor = colors[sectionId] || '#6366f1';
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// ===== BOTÕES MAGNÉTICOS =====
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-btn, .btn-primary, .btn-secondary, .social-link');
    
    buttons.forEach(btn => {
        btn.classList.add('magnetic-btn');
        
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Efeito magnético sutil
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ===== SCROLL REVEAL MELHORADO =====
function initScrollReveal() {
    const elementsToReveal = document.querySelectorAll('.project-card, .skill-item, .timeline-item, .stat-item, .about-image-container, .contact-info, .contact-form-container');
    
    elementsToReveal.forEach((el, index) => {
        el.classList.add('reveal-element');
        
        // Adiciona variação de direção
        if (index % 3 === 0) {
            el.classList.add('reveal-left');
        } else if (index % 3 === 1) {
            el.classList.add('reveal-scale');
        } else {
            el.classList.add('reveal-right');
        }
    });
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.reveal-element').forEach(el => {
        revealObserver.observe(el);
    });
}

// ===== SHINE EFFECT NOS CARDS =====
function initShineEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.classList.add('shine-effect');
    });
}

// Inicializar novas funcionalidades visuais
document.addEventListener('DOMContentLoaded', () => {
    initMagneticButtons();
    initScrollReveal();
    initShineEffect();
});
console.log('🚀 Portfolio Guilherme Mutão - Carregado com sucesso!');
console.log('💡 Dica: Experimente o código Konami!');
console.log('🎮 Ou digite "help" no terminal do Playground!');

