document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const revealButton = document.getElementById('reveal-button');
    const revealText = document.getElementById('reveal-text');

    const revealMessage = "The final skill: This entire portfolio is a custom-coded website, built by me.";

    function highlightNavOnScroll() {
        let current = '';
        const scrollY = window.scrollY;
        const offset = 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    if (revealButton) {
        revealButton.addEventListener('click', function (event) {
            event.preventDefault();
            
            if (revealText.style.opacity === '1') {
                revealText.style.opacity = '0';
                revealButton.textContent = "View Final Portfolio Skill";
            } else {
                revealText.textContent = revealMessage;
                revealText.style.opacity = '1';
                revealButton.textContent = "Hide Final Portfolio Skill";
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll();
});
