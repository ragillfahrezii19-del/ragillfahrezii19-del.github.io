document.addEventListener('DOMContentLoaded', () => {
    // Welcome message without interrupting the visitor with an alert.
    const welcome = document.querySelector('[data-welcome]');
    if (welcome) {
        const hour = new Date().getHours();
        let greeting = 'Selamat malam';
        if (hour >= 5 && hour < 12) greeting = 'Selamat pagi';
        else if (hour >= 12 && hour < 18) greeting = 'Selamat siang';
        else if (hour >= 18 && hour < 22) greeting = 'Selamat sore';
        welcome.textContent = `${greeting}, selamat datang di portfolio saya.`;
    }

    // Typing effect on the Home page.
    const typingElement = document.querySelector('[data-typing]');
    if (typingElement) {
        const roles = [
            'Computer Engineering Student',
            'Networking Enthusiast',
            'Digital Forensics Enthusiast',
            'Technology Enthusiast'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const type = () => {
            const current = roles[roleIndex];
            typingElement.textContent = current.substring(0, charIndex);

            if (!deleting && charIndex < current.length) {
                charIndex++;
                setTimeout(type, 80);
            } else if (!deleting && charIndex === current.length) {
                deleting = true;
                setTimeout(type, 1400);
            } else if (deleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 45);
            } else {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 300);
            }
        };
        type();
    }

    // Theme switcher with localStorage.
    const themeButton = document.querySelector('[data-theme-toggle]');
    const savedTheme = localStorage.getItem('ragil-theme');
    if (savedTheme === 'light') document.body.classList.add('light-theme');

    const updateThemeButton = () => {
        if (!themeButton) return;
        const isLight = document.body.classList.contains('light-theme');
        themeButton.textContent = isLight ? '☀️' : '🌙';
        themeButton.setAttribute('aria-label', isLight ? 'Aktifkan dark mode' : 'Aktifkan light mode');
        themeButton.title = isLight ? 'Dark mode' : 'Light mode';
    };
    updateThemeButton();

    if (themeButton) {
        themeButton.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem(
                'ragil-theme',
                document.body.classList.contains('light-theme') ? 'light' : 'dark'
            );
            updateThemeButton();
        });
    }

    // Mobile navigation.
    const menuButton = document.querySelector('[data-menu-toggle]');
    const navLinks = document.querySelector('[data-nav-links]');
    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            const open = navLinks.classList.toggle('show');
            menuButton.setAttribute('aria-expanded', String(open));
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('show'));
        });
    }

    // Hobby/photo lightbox.
    const lightbox = document.querySelector('[data-lightbox]');
    const lightboxImage = document.querySelector('[data-lightbox-image]');
    const lightboxTitle = document.querySelector('[data-lightbox-title]');
    const lightboxClose = document.querySelector('[data-lightbox-close]');

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('show');
        document.body.classList.remove('no-scroll');
    };

    document.querySelectorAll('[data-gallery-image]').forEach(image => {
        image.addEventListener('click', () => {
            if (!lightbox || !lightboxImage) return;
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            if (lightboxTitle) lightboxTitle.textContent = image.dataset.title || image.alt;
            lightbox.classList.add('show');
            document.body.classList.add('no-scroll');
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', event => {
            if (event.target === lightbox) closeLightbox();
        });
    }
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeLightbox();
    });

    // Contact form validation. This is front-end validation only.
    const contactForm = document.querySelector('[data-contact-form]');
    const formMessage = document.querySelector('[data-form-message]');
    if (contactForm) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            const name = contactForm.querySelector('#name');
            const email = contactForm.querySelector('#email');
            const message = contactForm.querySelector('#message');

            const errors = [];
            if (!name.value.trim()) errors.push('Nama belum diisi.');
            if (!email.value.trim()) errors.push('Email belum diisi.');
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) errors.push('Format email belum benar.');
            if (!message.value.trim()) errors.push('Pesan belum diisi.');

            if (errors.length) {
                if (formMessage) {
                    formMessage.className = 'form-message error';
                    formMessage.textContent = errors.join(' ');
                }
                return;
            }

            if (formMessage) {
                formMessage.className = 'form-message success';
                formMessage.textContent = `Terima kasih, ${name.value.trim()}! Form sudah tervalidasi. Untuk pengiriman nyata, hubungkan form ini ke backend atau layanan form.`;
            }
            contactForm.reset();
        });
    }

    // Reveal animation.
    const revealItems = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add('visible'));
    }

    // Back-to-top button.
    const topButton = document.querySelector('[data-back-top]');
    const toggleTopButton = () => {
        if (topButton) topButton.classList.toggle('show', window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleTopButton, { passive: true });
    toggleTopButton();
    if (topButton) {
        topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
});
