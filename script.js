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
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
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
const typingElement = document.getElementById('typing');
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

function typeEffect() {
    if (!typingElement) return;
    
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
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

function createParticle() {
    if (!particles) return;
    
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 5 + 2}px;
        height: ${Math.random() * 5 + 2}px;
        background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
        pointer-events: none;
    `;
    particles.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 20000);
}

// Criar partículas periodicamente
setInterval(createParticle, 500);

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
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            showToast('✅ Mensagem enviada com sucesso!');

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 2000);
    });
}

// ===== ANIMAÇÕES DE SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Adicionar classe animate
const animateStyle = document.createElement('style');
animateStyle.textContent = `
    .skill-category.animate,
    .project-card.animate,
    .timeline-item.animate,
    .contact-item.animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animateStyle);

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

// ===== EFEITO PARALLAX NO HERO =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
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

// ===== TEMA (DARK/LIGHT) =====
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
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
    typeEffect();
    initPlaygroundTabs();
    initMarkdownEditor();
    initChecklist();
    initPomodoro();
    initSnakeGame();
    initMemoryGame();
    initTypingTest();
});

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
    let record = parseInt(localStorage.getItem('snakeRecord') || '0');

    if (recordEl) recordEl.textContent = record;

    function init() {
        snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
        dir = { x: 1, y: 0 };
        nextDir = { x: 1, y: 0 };
        score = 0;
        speed = 100;
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
            score += 10;
            if (scoreEl) scoreEl.textContent = score;
            spawnFood();
            if (speed > 50) {
                speed -= 2;
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

        if (score > record) {
            record = score;
            localStorage.setItem('snakeRecord', record);
            if (recordEl) recordEl.textContent = record;
            showToast(`🎉 Novo recorde: ${record}!`);
        } else {
            showToast(`💀 Game Over! Pontos: ${score}`);
        }

        if (overlay) {
            overlay.classList.remove('hidden');
            const h4 = overlay.querySelector('h4');
            const p = overlay.querySelector('p');
            if (h4) h4.textContent = 'Game Over!';
            if (p) p.textContent = `Pontuação: ${score}`;
        }
    }

    function startGame() {
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

console.log('🚀 Portfolio Guilherme Mutão - Carregado com sucesso!');
