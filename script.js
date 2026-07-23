/* ============================================================
   DATA
   ============================================================ */
const PROJECTS = [
    {
        name: "ShadowScan",
        cat: "Network Security",
        catKey: "network",
        desc: "Automated internal network vulnerability scanner wrapping Nmap with custom Python scoring, flagging high-risk hosts before quarterly audits. Automatically diffs external DNS, ports, and certificates against a known baseline.",
        tags: ["Python", "Nmap", "CVSS"],
        link: "#"
    },
    {
        name: "RedTeam CTF Toolkit",
        cat: "Penetration Testing",
        catKey: "pentest",
        desc: "A curated set of custom Metasploit modules and payload generators built for internal CTFs and authorized red-team drills.",
        tags: ["Metasploit", "Ruby", "C2"],
        link: "#"
    },
    {
        name: "CipherVault",
        cat: "Cryptography",
        catKey: "crypto",
        desc: "Command-line AES-256 file encryption tool with automatic key rotation and HMAC integrity verification.",
        tags: ["AES-256", "Go", "HMAC"],
        link: "#"
    },
    {
        name: "SOC Dashboard",
        cat: "Incident Response",
        catKey: "incident",
        desc: "Real-time anomaly detection dashboard built on the ELK stack, correlating log sources into a single triage view.",
        tags: ["ELK", "Kibana", "Sigma"],
        link: "#"
    },
    {
        name: "PhishNet Simulator",
        cat: "Incident Response",
        catKey: "incident",
        desc: "Internal phishing simulation and awareness platform used to benchmark and improve org-wide click-through rates.",
        tags: ["Node.js", "SMTP", "Analytics"],
        link: "#"
    },
    {
        name: "SecureChat",
        cat: "Cryptography",
        catKey: "crypto",
        desc: "End-to-end encrypted messaging demo implementing Signal-protocol-style double ratchet key exchange.",
        tags: ["E2EE", "Rust", "X3DH"],
        link: "#"
    },
    {
        name: "PerimeterMapper",
        cat: "Network Security",
        catKey: "network",
        desc: "Attack-surface mapping tool that continuously diffs external DNS, ports, and certificates against a known baseline.",
        tags: ["Python", "DNS", "TLS"],
        link: "#"
    },
    {
        name: "WebPen Recon Suite",
        cat: "Penetration Testing",
        catKey: "pentest",
        desc: "Burp Suite extension chain automating recon and OWASP Top 10 checks for web application engagements.",
        tags: ["Burp Suite", "OWASP", "Python"],
        link: "#"
    }
];

const FILTERS = [
    { key: "all", label: "All" },
    { key: "pentest", label: "Penetration Testing" },
    { key: "network", label: "Network Security" },
    { key: "crypto", label: "Cryptography" },
    { key: "incident", label: "Incident Response" }
];

const CONTACT_ITEMS = [
    { label: "EMAIL", value: "divya.pratap.singh@protonmail.com", href: "mailto:divya.pratap.singh@protonmail.com",
      icon: '<path d="M4 4h16v16H4z"/><path d="M22 6 12 13 2 6"/>' },
    { label: "GITHUB", value: "github.com/divyapratapsingh", href: "https://github.com/divyapratapsingh",
      icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>' },
    { label: "LINKEDIN", value: "linkedin.com/in/divyapratapsingh", href: "https://linkedin.com/in/divyapratapsingh",
      icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>' },
    { label: "BLOG", value: "divyasec.dev/blog", href: "#",
      icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' }
];

const EXTRAS = [
    { type: "TALK", title: "Red Teaming in Zero Trust Environments", meta: "BSides Delhi · 2024" },
    { type: "PUBLICATION", title: "Practical Threat Hunting with MITRE ATT&CK", meta: "InfoSec Write-ups · 2023" },
    { type: "TALK", title: "From SOC Analyst to Red Teamer", meta: "null Delhi Chapter Meet · 2022" },
    { type: "PUBLICATION", title: "Automating Recon Without Losing Nuance", meta: "Personal blog · 2022" }
];

const SOCIALS = [
    { name: "GitHub", href: "https://github.com/divyapratapsingh", icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>' },
    { name: "LinkedIn", href: "https://linkedin.com/in/divyapratapsingh", icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>' },
    { name: "Email", href: "mailto:divya.pratap.singh@protonmail.com", icon: '<path d="M4 4h16v16H4z"/><path d="M22 6 12 13 2 6"/>' },
    { name: "Blog", href: "#", icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' }
];

/* ============================================================
   RENDER HELPERS (Classic Layout)
   ============================================================ */
function renderProjects(gridId) {
    const grid = document.getElementById(gridId);
    if(!grid) return;
    grid.innerHTML = PROJECTS.map(p => `
        <div class="project-card" data-cat="${p.catKey}">
            <span class="p-cat">${p.cat}</span>
            <h4>${p.name}</h4>
            <p>${p.desc}</p>
            <div class="tag-row">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            <a class="p-link" href="${p.link}">View writeup →</a>
        </div>
    `).join('');
}

function renderFilters(rowId, gridId) {
    const row = document.getElementById(rowId);
    if(!row) return;
    row.innerHTML = FILTERS.map((f, i) => `<button class="filter-chip${i===0?' active':''}" data-filter="${f.key}">${f.label}</button>`).join('');
    row.querySelectorAll('.filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            row.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const key = btn.dataset.filter;
            document.querySelectorAll(`#${gridId} .project-card`).forEach(card => {
                card.classList.toggle('hide', key !== 'all' && card.dataset.cat !== key);
            });
        });
    });
}

function renderContact(listId) {
    const list = document.getElementById(listId);
    if(!list) return;
    list.innerHTML = CONTACT_ITEMS.map(c => `
        <a class="contact-item" href="${c.href}" target="_blank" rel="noopener">
            <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${c.icon}</svg>
            <div>
                <div class="label">${c.label}</div>
                <div class="value">${c.value}</div>
            </div>
        </a>
    `).join('');
}

function renderExtras(listId) {
    const list = document.getElementById(listId);
    if(!list) return;
    list.innerHTML = EXTRAS.map(e => `
        <div class="extra-item">
            <span class="e-type">${e.type}</span>
            <h5>${e.title}</h5>
            <span class="e-meta">${e.meta}</span>
        </div>
    `).join('');
}

function renderSocials(rowId) {
    const row = document.getElementById(rowId);
    if(!row) return;
    row.innerHTML = SOCIALS.map(s => `
        <a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.name}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${s.icon}</svg>
        </a>
    `).join('');
}

// Initial rendering for Classic Layout Elements
renderProjects('classic-projects-grid');
renderFilters('classic-filters', 'classic-projects-grid');
renderContact('classic-contact-list');
renderExtras('classic-extras-list');
renderSocials('classic-footer-socials');

/* ============================================================
   BOOT SEQUENCE
   ============================================================ */
(function boot() {
    const overlay = document.getElementById('boot-overlay');
    const linesEl = document.getElementById('boot-lines');
    const skipBtn = document.getElementById('boot-skip');
    const script = [
        "> initializing secure session...",
        "> verifying identity: DIVYA_PRATAP_SINGH",
        "> clearance level: PUBLIC",
        "> loading modules: about, experience, projects, contact",
        "> status: ALL SYSTEMS NOMINAL",
        "> welcome."
    ];
    document.body.classList.add('no-scroll');
    let li = 0, ci = 0, out = "";
    
    function typeNext() {
        if (li >= script.length) {
            linesEl.innerHTML = out + '<span class="cursor"></span>';
            setTimeout(finish, 500);
            return;
        }
        const line = script[li];
        if (ci <= line.length) {
            linesEl.innerHTML = out + line.slice(0, ci) + '<span class="cursor"></span>';
            ci++;
            setTimeout(typeNext, 14);
        } else {
            out += line + "\n";
            li++; ci = 0;
            setTimeout(typeNext, 120);
        }
    }
    
    function finish() {
        overlay.classList.add('hidden');
        document.body.classList.remove('no-scroll');
        initReveal();
    }
    
    skipBtn.addEventListener('click', finish);
    document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Enter') { finish(); document.removeEventListener('keydown', esc); }
    });
    
    typeNext();
    setTimeout(finish, 6000);
})();

/* ============================================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
function initReveal() {
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    targets.forEach(t => io.observe(t));
}

/* ============================================================
   THEME TOGGLE
   ============================================================ */
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const iconMoon = document.getElementById('icon-moon');
const iconSun = document.getElementById('icon-sun');

themeToggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    iconMoon.style.display = isDark ? 'none' : 'block';
    iconSun.style.display = isDark ? 'block' : 'none';
});

/* ============================================================
   LAYOUT TOGGLE (classic / modern)
   ============================================================ */
const btnClassic = document.getElementById('btn-classic');
const btnModern = document.getElementById('btn-modern');

function setLayout(mode) {
    html.setAttribute('data-layout', mode);
    btnClassic.classList.toggle('active', mode === 'classic');
    btnModern.classList.toggle('active', mode === 'modern');
    btnClassic.setAttribute('aria-pressed', mode === 'classic');
    btnModern.setAttribute('aria-pressed', mode === 'modern');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    setTimeout(initReveal, 50);
}

btnClassic.addEventListener('click', () => setLayout('classic'));
btnModern.addEventListener('click', () => setLayout('modern'));

/* ============================================================
   CLASSIC NAV — mobile toggle + scrollspy
   ============================================================ */
const classicNavToggle = document.getElementById('classic-nav-toggle');
const classicNavLinks = document.getElementById('classic-nav-links');

classicNavToggle.addEventListener('click', () => classicNavLinks.classList.toggle('open'));
classicNavLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => classicNavLinks.classList.remove('open')));

const sections = ['about', 'experience', 'projects', 'contact'].map(id => document.getElementById(id));
const navAnchors = classicNavLinks.querySelectorAll('a');
const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        }
    });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach(s => spyObserver.observe(s));


/* ============================================================
   MODERN BENTO IN-PAGE INTERACTIONS
   ============================================================ */

// 1. Smooth Scroll for Internal Links
function scrollToBento(id) {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 2. Project Modal Logic
const modalOverlay = document.getElementById('project-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCat = document.getElementById('modal-cat');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTags = document.getElementById('modal-tags');
const modalLink = document.getElementById('modal-link');

function openProjectModal(projectName) {
    const project = PROJECTS.find(p => p.name === projectName);
    if (!project) return;
    
    // Populate Data
    modalCat.textContent = project.cat;
    modalTitle.textContent = project.name;
    modalDesc.textContent = project.desc;
    modalTags.innerHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join('');
    modalLink.href = project.link;
    
    // Show Modal
    modalOverlay.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

function closeModal() {
    modalOverlay.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
        closeModal();
    }
});

// 3. Copy Email to Clipboard & Toast
const toast = document.getElementById('toast');
let toastTimeout;

function copyEmail() {
    const emailStr = "divya.pratap.singh@protonmail.com";
    navigator.clipboard.writeText(emailStr).then(() => {
        // Show Toast
        toast.classList.remove('hidden');
        
        // Reset timeout if clicked multiple times quickly
        if(toastTimeout) clearTimeout(toastTimeout);
        
        toastTimeout = setTimeout(() => {
            toast.classList.add('hidden');
        }, 2500);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Mobile "More / Less" Projects Toggle
document.addEventListener("DOMContentLoaded", function() {
    
    // We use setTimeout to wait 500ms so your other JS has time to inject the projects into the HTML first!
    setTimeout(function() {
        // 1. UPDATED: Targeting your specific container class from your HTML
        const projectsContainer = document.querySelector('.projects-grid'); 
        
        if (projectsContainer && window.innerWidth <= 1024) {
            
            // 2. We are assuming your generated cards use the class '.project-card'. 
            // If they use something else (like '.card'), change it right here!
            const projects = projectsContainer.querySelectorAll('.project-card');
            
            if (projects.length > 2) {
                // Hide all projects after the second one
                for (let i = 2; i < projects.length; i++) {
                    projects[i].classList.add('mobile-hidden-project');
                }

                // Create the "More..." button
                const toggleText = document.createElement('div');
                toggleText.innerText = 'More...';
                toggleText.className = 'project-toggle-text';
                projectsContainer.appendChild(toggleText);

                // Add the click action
                toggleText.addEventListener('click', function() {
                    const isCurrentlyHidden = this.innerText === 'More...';
                    
                    for (let i = 2; i < projects.length; i++) {
                        if (isCurrentlyHidden) {
                            projects[i].classList.remove('mobile-hidden-project');
                        } else {
                            projects[i].classList.add('mobile-hidden-project');
                        }
                    }
                    
                    // Swap the text
                    this.innerText = isCurrentlyHidden ? 'Less...' : 'More...';
                });
            }
        }
    }, 500); // 500 milliseconds delay
});

// ============================================================
// MOBILE MENU ESCAPE HATCH (CLICK OUTSIDE TO CLOSE)
// ============================================================
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('classic-nav-links');
    
    // Replace '.hamburger' with your actual hamburger button class/ID
    const hamburgerBtn = document.querySelector('.nav-toggle-mobile') || document.querySelector('.menu-toggle'); 
    
    // Check if the menu is currently open (checking all possible classes you might be using)
    const isOpen = navMenu.classList.contains('active') || 
                   navMenu.classList.contains('show') || 
                   navMenu.classList.contains('open');

    if (isOpen) {
        // If the user clicks outside the menu AND not on the hamburger button itself
        if (!navMenu.contains(event.target) && hamburgerBtn && !hamburgerBtn.contains(event.target)) {
            // Remove the open classes to slide it back off-screen
            navMenu.classList.remove('active', 'show', 'open');
        }
    }
});