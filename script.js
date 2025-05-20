// Nav scroll
const nav = document.querySelector('nav');
let isScrolled = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 0 && !isScrolled) {
    nav.classList.add('scrolled');
    isScrolled = true;
    } else if (window.scrollY === 0 && isScrolled) {
    nav.classList.remove('scrolled');
    isScrolled = false;
    }
});

//Close Menu when click link in mobile mode
document.addEventListener("DOMContentLoaded", function() {
    // Verifica se nei body ci sono gli ID specificati
    var bodyHasThankyouPage = document.body.id === "thankyou-page";
    var bodyHasVerificaForm = document.body.id === "verifica-form";

    // Se uno dei due ID è presente, esce dalla funzione
    if (bodyHasThankyouPage || bodyHasVerificaForm) {
        return;
    }

    const navLinks = document.querySelectorAll(".nav-links li a");
    const hamburger = document.querySelector(".hamburger");

    function closeMenuAndClickHamburger() {
        if (hamburger.classList.contains("toggle")) {
            hamburger.click();
        }
    }

    navLinks.forEach(function(link) {
        link.addEventListener("click", closeMenuAndClickHamburger);
    });

    document.addEventListener("click", function(event) {
        if (!document.querySelector("header").contains(event.target)) {
            closeMenuAndClickHamburger();
        }
    });
});


//Change Menu in Mobile
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

if (!document.body.id.includes("thankyou-page") && !document.body.id.includes("verifica-form")) {
    hamburger.addEventListener('click', () => {
        //Animate Links
        navLinks.classList.toggle("open");
        links.forEach(link => {
            link.classList.toggle("fade");
        });

        //Hamburger Animation
        hamburger.classList.toggle("toggle");
    });
}

//Dark Mode

const btnSwitch = document.querySelector('#switch');

if (!document.body.id.includes("thankyou-page") && !document.body.id.includes("verifica-form")) {
    btnSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        btnSwitch.classList.toggle('active');

        //LocalStorage
        if(document.body.classList.contains('dark')) {
            localStorage.setItem('dark-mode', 'true');
        } else {
            localStorage.setItem('dark-mode', 'false');
        }
    });
}

// Verifica se il corpo ha l'ID "thankyou-page o verifica-form" prima di eseguire la parte di codice che aggiunge/rimuove la classe 'dark'
if (!document.body.id.includes("thankyou-page") && !document.body.id.includes("verifica-form")) {
    // Solo la parte di codice che aggiunge/rimuove la classe
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark');
        btnSwitch.classList.add('active');
    } else {
        document.body.classList.remove('dark');
        btnSwitch.classList.remove('active');
    }
}

//DarkMode in grazie.html e contatti.php
if (document.body.id.includes("thankyou-page") || document.body.id.includes("verifica-form")) {
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

// Circle Burst animation
function createBurst() {
    // Verifica se siamo sulla pagina contatti.php
    if (document.body.id.includes("thankyou-page")) {
        let animContainer = document.querySelector('.animation-container');
        let burst = document.querySelector('.burst');

        if (burst) {
            burst.remove(); // Rimuovi l'elemento burst precedente
        }

        burst = document.createElement('div');
        burst.className = 'burst';

        // Calcola le coordinate finali considerando uno spostamento massimo di 150px
        let maxLeft = window.innerWidth - 200;
        let maxTop = window.innerHeight - 200;

        burst.style.top = Math.min(Math.random() * maxTop, maxTop) + 'px';
        burst.style.left = Math.min(Math.random() * maxLeft, maxLeft) + 'px';

        for (let i = 0; i < 10; i++) {
            let line = document.createElement('div');
            line.className = 'line';
            burst.appendChild(line);
        }

        animContainer.appendChild(burst);

        setTimeout(() => {
            burst.remove();
        }, 2000);
    }
}

setInterval(createBurst, 2000);

// RECAPTCHA
document.addEventListener('DOMContentLoaded', function () {
    initReCaptchaForm();
    initValidationHandlers();
});

function initReCaptchaForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submitBtn');

    if (!form || !submitBtn) return;

    submitBtn.addEventListener('click', function(event) {
        if (form.checkValidity()) {
            event.preventDefault();
            grecaptcha.execute();
        } else {
            form.reportValidity();
        }
    }); // ← QUESTA parentesi chiude il click listener
}

function onSubmit(token) {
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.submit();
    }
}

function initValidationHandlers() {
    const form = document.getElementById('contact-form');
    const errorDiv = document.getElementById('form-error');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            showValidationErrors();
        }
    });
}

function showValidationErrors() {
    const form = document.getElementById('contact-form');
    const errorDiv = document.getElementById('form-error');

    if (errorDiv) errorDiv.style.display = 'block';

    const invalidFields = form.querySelectorAll(':invalid');
    invalidFields.forEach(field => {
        field.classList.add('input-error');
        field.addEventListener('input', () => {
            if (field.checkValidity()) {
                field.classList.remove('input-error');
                if (form.checkValidity() && errorDiv) {
                    errorDiv.style.display = 'none';
                }
            }
        });
    });
}