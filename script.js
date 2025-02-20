// Responsive Navbar Toggle
const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
    menuIcon.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".home-content, .home-img");

function revealOnScroll() {
    revealElements.forEach((el) => {
        let elementTop = el.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        } else {
            el.style.opacity = "0";
            el.style.transform = "translateY(50px)";
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Image Carousel (Slider)
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel img');
const totalSlides = slides.length;
const carousel = document.querySelector('.carousel');

if (carousel) {
    function moveSlide(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        const offset = -currentSlide * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    function autoSlide() {
        moveSlide(1);
    }

    let autoSlideInterval = setInterval(autoSlide, 3000);

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlide, 3000);
    }

    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            moveSlide(-1);
            resetAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            moveSlide(1);
            resetAutoSlide();
        });
    }

    // Swipe functionality for touch devices
    let touchStartX = 0, touchEndX = 0;

    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].clientX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
        resetAutoSlide();
    }

    function handleSwipe() {
        if (touchStartX > touchEndX + 50) {
            moveSlide(1); // Swipe left
        } else if (touchStartX < touchEndX - 50) {
            moveSlide(-1); // Swipe right
        }
    }

    const carouselContainer = document.querySelector('.carousel-container');

    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', handleTouchStart);
        carouselContainer.addEventListener('touchend', handleTouchEnd);
    }
}

// Contact Form Validation
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent page reload

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const statusMessage = document.getElementById("form-status");

        if (!statusMessage) return;

        // Basic validation
        if (name === "" || email === "" || message === "") {
            statusMessage.style.color = "red";
            statusMessage.textContent = "All fields are required!";
            return;
        }

        if (!validateEmail(email)) {
            statusMessage.style.color = "red";
            statusMessage.textContent = "Enter a valid email!";
            return;
        }

        // Success message
        statusMessage.style.color = "green";
        statusMessage.textContent = "Message sent successfully!";

        // Reset form
        contactForm.reset();
    });
}

// Email Validation Function
function validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
