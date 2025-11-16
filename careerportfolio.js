document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Elements for the vertical progress bar/timeline
    const progressLine = document.querySelector('.timeline-line');
    const progressDots = document.querySelectorAll('.dot-icon'); 
    const timelineContainer = document.getElementById('progress-timeline');
    
    // Elements for the final skill reveal
    const revealButton = document.getElementById('reveal-button');
    const revealText = document.getElementById('reveal-text');

    const revealMessage = "The final skill: This entire portfolio is a custom-coded website, built by me.";

    // Offset used to calculate when a section is considered "active" (accounts for sticky header)
    const offset = 150;

    function highlightNavAndDotsOnScroll() {
        let current = '';
        const scrollY = window.scrollY;

        // 1. Determine current visible section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionBottom = section.offsetTop + section.offsetHeight - offset;

            // Check if the current scroll position is within the section boundaries
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                 current = section.getAttribute('id');
            }
        });

        // 2. Update horizontal navbar and vertical dots
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });

        progressDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    }
    
    function updateTimelineProgress() {
        if (!progressLine || !timelineContainer || sections.length === 0) return;

        // CRITICAL FIX: Calculate the maximum scrollable area using document.documentElement.scrollHeight 
        // to reliably work on GitHub Pages/hosted environments.
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        // Calculate the current scroll fraction of the entire page
        let scrollFraction = 0;
        if (maxScroll > 0) {
            scrollFraction = window.scrollY / maxScroll;
        }

        // Clamp the fraction between 0 and 1
        scrollFraction = Math.max(0, Math.min(1, scrollFraction));

        // Set the height of the colored progress line based on the timeline container height
        const totalTimelineHeight = timelineContainer.offsetHeight;
        
        // Adjust the fraction slightly to ensure the bar reaches the bottom dot when the user hits the very end.
        let adjustedFraction = Math.max(0, Math.min(1, scrollFraction)); 

        progressLine.style.height = `${adjustedFraction * totalTimelineHeight}px`;
    }


    // --- Button Reveal Functionality ---
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

    // --- Smooth Scrolling for all links (including dots) ---
    document.querySelectorAll('a[href^="#"], .dot-icon').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            
            // Determine target ID
            let targetId;
            if (this.getAttribute('href')) {
                targetId = this.getAttribute('href');
            } else if (this.getAttribute('data-section')) {
                targetId = `#${this.getAttribute('data-section')}`;
            } else {
                return;
            }
            
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Main Initialization ---
    // Use the load event for setup to ensure all element positions are finalized before calculation.
    window.addEventListener('load', () => {
        // Set up the continuous scroll listener
        window.addEventListener('scroll', () => {
            highlightNavAndDotsOnScroll();
            updateTimelineProgress();
        });
        
        // Run initial calculations
        highlightNavAndDotsOnScroll();
        updateTimelineProgress();
    });
    
    // Fallback: Run highlight function once DOM is ready (needed for the nav bar and first dot to light up immediately)
    highlightNavAndDotsOnScroll();
});
