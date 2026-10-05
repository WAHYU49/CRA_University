document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // ELEMENTS
    // ========================================

    const header = document.getElementById("header");
    const nav = document.getElementById("nav");
    const menuButton = document.getElementById("menuButton");
    const navLinks = document.querySelectorAll(".nav-link");
    const revealElements = document.querySelectorAll(".reveal");
    const counters = document.querySelectorAll(".commercial-number");
    const contactForm = document.getElementById("contactForm");


    // ========================================
    // MOBILE NAVBAR
    // ========================================

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("active");
            menuButton.classList.toggle("active");

            const isOpen = nav.classList.contains("active");

            document.body.classList.toggle("menu-open", isOpen);

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
        });


        // Tutup menu setelah link diklik
        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");
                menuButton.classList.remove("active");
                document.body.classList.remove("menu-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute("aria-label", "Open menu");

            });

        });

    }


    // ========================================
    // HERO CAROUSEL
    // ========================================

    const heroSlides = document.querySelectorAll(".hero-slide");
    const heroDots = document.querySelectorAll(".hero-dot");
    const previousSlide = document.querySelector(".hero-previous");
    const nextSlide = document.querySelector(".hero-next");

    if (heroSlides.length && heroDots.length) {

        let activeSlide = 0;

        function showSlide(index) {
            activeSlide = (index + heroSlides.length) % heroSlides.length;

            heroSlides.forEach((slide, slideIndex) => {
                const isActive = slideIndex === activeSlide;
                slide.classList.toggle("active", isActive);
                slide.setAttribute("aria-hidden", isActive ? "false" : "true");
            });

            heroDots.forEach((dot, dotIndex) => {
                const isActive = dotIndex === activeSlide;
                dot.classList.toggle("active", isActive);

                if (isActive) {
                    dot.setAttribute("aria-current", "true");
                } else {
                    dot.removeAttribute("aria-current");
                }
            });
        }

        heroDots.forEach((dot, index) => {
            dot.addEventListener("click", () => showSlide(index));
        });

        previousSlide?.addEventListener("click", () => {
            showSlide(activeSlide - 1);
        });

        nextSlide?.addEventListener("click", () => {
            showSlide(activeSlide + 1);
        });

    }


    // ========================================
    // ABOUT PAGE CAROUSELS
    // ========================================

    const clientTrack = document.querySelector(".client-track");
    const clientSlides = document.querySelectorAll(".client-slide");
    const clientDots = document.querySelectorAll(".client-dot");
    const clientArrows = document.querySelectorAll("[data-client-direction]");

    if (clientTrack && clientSlides.length && clientDots.length) {

        let activeClient = 0;

        function showClient(index) {
            activeClient = (index + clientSlides.length) % clientSlides.length;
            clientTrack.style.transform = `translateX(-${activeClient * 100}%)`;

            clientDots.forEach((dot, dotIndex) => {
                const isActive = dotIndex === activeClient;
                dot.classList.toggle("active", isActive);

                if (isActive) {
                    dot.setAttribute("aria-current", "true");
                } else {
                    dot.removeAttribute("aria-current");
                }
            });
        }

        clientDots.forEach((dot, index) => {
            dot.addEventListener("click", () => showClient(index));
        });

        clientArrows.forEach((arrow) => {
            arrow.addEventListener("click", () => {
                const direction = Number(arrow.dataset.clientDirection);
                showClient(activeClient + direction);
            });
        });

    }

    const offerSlides = document.querySelectorAll(".offer-slide");
    const offerDots = document.querySelectorAll(".offer-dot");
    const offerPrevious = document.querySelector(".offer-prev");
    const offerNext = document.querySelector(".offer-next");

    if (offerSlides.length && offerDots.length) {

        let activeOffer = 0;

        function showOffer(index) {
            activeOffer = (index + offerSlides.length) % offerSlides.length;

            offerSlides.forEach((slide, slideIndex) => {
                const isActive = slideIndex === activeOffer;
                slide.classList.toggle("active", isActive);
                slide.setAttribute("aria-hidden", isActive ? "false" : "true");
            });

            offerDots.forEach((dot, dotIndex) => {
                const isActive = dotIndex === activeOffer;
                dot.classList.toggle("active", isActive);

                if (isActive) {
                    dot.setAttribute("aria-current", "true");
                } else {
                    dot.removeAttribute("aria-current");
                }
            });
        }

        offerDots.forEach((dot, index) => {
            dot.addEventListener("click", () => showOffer(index));
        });

        offerPrevious?.addEventListener("click", () => {
            showOffer(activeOffer - 1);
        });

        offerNext?.addEventListener("click", () => {
            showOffer(activeOffer + 1);
        });

    }


    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    // ========================================
    // ACTIVE NAVIGATION
    // ========================================

    const sections = document.querySelectorAll("section[id]");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    // ========================================
    // SMOOTH SCROLL
    // ========================================

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 80;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    // ========================================
    // REVEAL ANIMATION
    // ========================================

    if (revealElements.length > 0) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    }


    // ========================================
    // NUMBER COUNTER
    // ========================================

    function animateCounter(element) {

        const target = Number(
            element.getAttribute("data-target")
        );

        if (isNaN(target)) {
            return;
        }

        let current = 0;

        const duration = 1800;

        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            // Ease out
            const easeOut =
                1 - Math.pow(1 - progress, 3);

            current = Math.floor(target * easeOut);

            element.textContent =
                current.toLocaleString("id-ID");


            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                element.textContent =
                    target.toLocaleString("id-ID");

            }

        }


        requestAnimationFrame(updateCounter);

    }


    // Observer untuk counter
    if (counters.length > 0) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


        counters.forEach((counter) => {

            counterObserver.observe(counter);

        });

    }


    // ========================================
    // CONTACT FORM
    // ========================================

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();


            const name =
                document.getElementById("name")?.value.trim();

            const email =
                document.getElementById("email")?.value.trim();

            const message =
                document.getElementById("message")?.value.trim();


            if (!name || !email || !message) {

                alert(
                    "Silakan lengkapi semua data terlebih dahulu."
                );

                return;

            }


            alert(
                `Terima kasih, ${name}!\n\nPesan Anda berhasil dikirim.`
            );


            contactForm.reset();

        });

    }


    // ========================================
    // BUTTON HOVER EFFECT
    // ========================================

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "translateY(-2px)";

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });


    // ========================================
    // ESCAPE KEY
    // ========================================

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (nav) {
                nav.classList.remove("active");
            }

            document.body.classList.remove("menu-open");

            if (menuButton) {

                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute("aria-label", "Open menu");

            }

        }

    });

});