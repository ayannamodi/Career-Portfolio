document.addEventListener('DOMContentLoaded', function() {
    // Select all sections and nav links for dynamic highlighting
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Select reveal elements for the button functionality
    const revealButton = document.getElementById('reveal-button');
    const revealText = document.getElementById('reveal-text');

    const revealMessage = "The final skill: This entire portfolio is a custom-coded website, built by me.";

    // --- Dynamic Navigation Highlighting ---
    function highlightNavOnScroll() {
        let current = '';
        const scrollY = window.scrollY;
        // Offset (150px) is necessary so the link highlights when the section *starts* below the sticky navbar.
        const offset = 150; 

        // Determine which section is currently visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset; 
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        // Apply active class to the corresponding link
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's data-section attribute matches the current section ID
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    // --- Button Reveal Functionality ---
    if (revealButton) {
        revealButton.addEventListener('click', function (event) {
            event.preventDefault();
            
            // Toggle visibility of the reveal text
            if (revealText.style.opacity === '1') {
                revealText.style.opacity = '0';
                revealButton.textContent = "View Final Portfolio Skill";
            } else {
                // Set the text and fade it in
                revealText.textContent = revealMessage;
                revealText.style.opacity = '1';
                revealButton.textContent = "Hide Final Portfolio Skill";
            }
        });
    }

    // --- Event Listeners ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Run highlight function on scroll and load
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll();
});