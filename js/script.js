/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
});


/* =========================================
   CLOSE MOBILE MENU
========================================= */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {
        navMenu.classList.remove("show");
    });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

window.addEventListener("scroll", function () {

    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 150;

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(function (link) {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.nav-menu a[href="#${sectionId}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

});


/* =========================================
   COUNTER ANIMATION
========================================= */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounter() {

    if (counterStarted) {
        return;
    }

    const statsSection = document.querySelector(".stats");

    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {

        counterStarted = true;

        counters.forEach(function (counter) {

            const target = Number(
                counter.getAttribute("data-target")
            );

            let current = 0;

            const increment = Math.ceil(target / 60);

            const updateCounter = setInterval(function () {

                current += increment;

                if (current >= target) {
                    current = target;
                    clearInterval(updateCounter);
                }

                counter.textContent = current + "+";

            }, 30);

        });

    }

}

window.addEventListener("scroll", startCounter);

startCounter();


/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;

    alert(
        "Terima kasih " +
        name +
        "! Pesan Anda berhasil dikirim."
    );

    contactForm.reset();

});