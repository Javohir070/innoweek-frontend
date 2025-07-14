/**
 * Template Name: Strategy
 * Template URL: https://bootstrapmade.com/strategy-bootstrap-agency-template/
 * Updated: Jun 06 2025 with Bootstrap v5.3.6
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function() {
    "use strict";

    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    function toggleScrolled() {
        const selectBody = document.querySelector("body");
        const selectHeader = document.querySelector("#header");
        if (!selectHeader.classList.contains("scroll-up-sticky") &&
            !selectHeader.classList.contains("sticky-top") &&
            !selectHeader.classList.contains("fixed-top")
        )
            return;
        window.scrollY > 100 ?
            selectBody.classList.add("scrolled") :
            selectBody.classList.remove("scrolled");
    }

    document.addEventListener("scroll", toggleScrolled);
    window.addEventListener("load", toggleScrolled);

    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

    function mobileNavToogle() {
        document.querySelector("body").classList.toggle("mobile-nav-active");
        mobileNavToggleBtn.classList.toggle("bi-list");
        mobileNavToggleBtn.classList.toggle("bi-x");
    }
    if (mobileNavToggleBtn) {
        mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
    }

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll("#navmenu a").forEach((navmenu) => {
        navmenu.addEventListener("click", () => {
            if (document.querySelector(".mobile-nav-active")) {
                mobileNavToogle();
            }
        });
    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
        navmenu.addEventListener("click", function(e) {
            e.preventDefault();
            this.parentNode.classList.toggle("active");
            this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
            e.stopImmediatePropagation();
        });
    });

    /**
     * Preloader
     */
    const preloader = document.querySelector("#preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.remove();
        });
    }

    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector(".scroll-top");

    function toggleScrollTop() {
        if (scrollTop) {
            window.scrollY > 100 ?
                scrollTop.classList.add("active") :
                scrollTop.classList.remove("active");
        }
    }
    scrollTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);

    /**
     * Animation on scroll function and init
     */
    function aosInit() {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    }
    window.addEventListener("load", aosInit);

    /**
     * Init swiper sliders
     */
    function initSwiper() {
        document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
            let config = JSON.parse(
                swiperElement.querySelector(".swiper-config").innerHTML.trim()
            );

            if (swiperElement.classList.contains("swiper-tab")) {
                initSwiperWithCustomPagination(swiperElement, config);
            } else {
                new Swiper(swiperElement, config);
            }
        });
    }

    window.addEventListener("load", initSwiper);

    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
        selector: ".glightbox",
    });

    /**
     * Init isotope layout and filters
     */
    document.querySelectorAll(".isotope-layout").forEach(function(isotopeItem) {
        let layout = isotopeItem.getAttribute("data-layout") || "masonry";
        let filter = isotopeItem.getAttribute("data-default-filter") || "*";
        let sort = isotopeItem.getAttribute("data-sort") || "original-order";


        let initIsotope;
        imagesLoaded(isotopeItem.querySelector(".isotope-container"), function() {
            initIsotope = new Isotope(
                isotopeItem.querySelector(".isotope-container"), {
                    itemSelector: ".isotope-item",
                    layoutMode: layout,
                    filter: filter,
                    sortBy: sort,
                }
            );
        });

        isotopeItem
            .querySelectorAll(".isotope-filters li")
            .forEach(function(filters) {
                filters.addEventListener(
                    "click",
                    function() {
                        isotopeItem
                            .querySelector(".isotope-filters .filter-active")
                            .classList.remove("filter-active");
                        this.classList.add("filter-active");
                        initIsotope.arrange({
                            filter: this.getAttribute("data-filter"),
                        });
                        if (typeof aosInit === "function") {
                            aosInit();
                        }
                    },
                    false
                );
            });
    });

    /**
     * Frequently Asked Questions Toggle
     */
    document
        .querySelectorAll(
            ".faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header"
        )
        .forEach((faqItem) => {
            faqItem.addEventListener("click", () => {
                faqItem.parentNode.classList.toggle("faq-active");
            });
        });

    /**
     * Correct scrolling position upon page load for URLs containing hash links.
     */
    window.addEventListener("load", function(e) {
        if (window.location.hash) {
            if (document.querySelector(window.location.hash)) {
                setTimeout(() => {
                    let section = document.querySelector(window.location.hash);
                    let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
                    window.scrollTo({
                        top: section.offsetTop - parseInt(scrollMarginTop),
                        behavior: "smooth",
                    });
                }, 100);
            }
        }
    });

    /**
     * Navmenu Scrollspy
     */
    let navmenulinks = document.querySelectorAll(".navmenu a");

    function navmenuScrollspy() {
        navmenulinks.forEach((navmenulink) => {
            if (!navmenulink.hash) return;
            let section = document.querySelector(navmenulink.hash);
            if (!section) return;
            let position = window.scrollY + 200;
            if (
                position >= section.offsetTop &&
                position <= section.offsetTop + section.offsetHeight
            ) {
                document
                    .querySelectorAll(".navmenu a.active")
                    .forEach((link) => link.classList.remove("active"));
                navmenulink.classList.add("active");
            } else {
                navmenulink.classList.remove("active");
            }
        });
    }
    window.addEventListener("load", navmenuScrollspy);
    document.addEventListener("scroll", navmenuScrollspy);
})();



function changeLang(lang = 'uz') {
    // Hamma .lang elementlarni yangilash
    document.querySelectorAll('.lang').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text) {
            const textEl = el.querySelector('.lang-text');
            if (textEl) {
                textEl.innerText = text;
            } else {
                el.innerText = text;
            }
        }
    });

    document
        .querySelectorAll(
            "a[data-uz], a[data-ru], a[data-en], input[data-uz], input[data-ru], input[data-en], textarea[data-uz], textarea[data-ru], textarea[data-en]"
        )
        .forEach((el) => {
            const text = el.getAttribute("data-" + lang);
            if (text) {
                if ("placeholder" in el) {
                    el.placeholder = text;
                } else {
                    el.innerText = text;
                }
            }
        });

    // Hamma <a> larni tekshirish
    document.querySelectorAll('a[data-uz], a[data-ru], a[data-en]').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text) {
            el.innerText = text;
        }
    });

    // Hamma <h1>, <h2>, <h5>, <p> kabi matnlarni ham yangilash
    document.querySelectorAll('[data-uz], [data-ru], [data-en]').forEach(el => {
        if (!el.classList.contains('lang')) {
            const text = el.getAttribute('data-' + lang);
            if (text) {
                el.innerText = text;
            }
        }
    });
}

// ⏱ DOM yuklangach default tilni o‘rnatish
document.addEventListener('DOMContentLoaded', () => {
    changeLang('uz'); // yoki 'ru' yoki 'en'
});

// 🌐 Til menyusi uchun toggle
document.getElementById('langToggle').addEventListener('click', () => {
    document.getElementById('langMenu').classList.toggle('show');
});
const COUNTDOWN_SECONDS =
    97 * 24 * 60 * 60 + // kunlar
    15 * 60 * 60 + // soatlar
    31 * 60 + // daqiqalar
    15; // soniyalar

// Boshlanish vaqtini localStorage orqali saqlaymiz
let startTime = localStorage.getItem("customTimerStart");
if (!startTime) {
    startTime = Date.now();
    localStorage.setItem("customTimerStart", startTime);
} else {
    startTime = parseInt(startTime);
}

const targetTime = startTime + COUNTDOWN_SECONDS * 1000;

function formatTime(value) {
    return value.toString().padStart(2, "0");
}

function updateTimer() {
    const currentTime = Date.now();
    const remaining = Math.floor((targetTime - currentTime) / 1000);
    const countdown = document.getElementById("countdown");

    if (remaining <= 0) {
        clearInterval(timerInterval);
        const container = document.querySelector(".timer-container");
        if (container) {
            container.remove(); // yoki container.style.display = "none";
        }
        return;
    }

    const days = Math.floor(remaining / 86400);
    const hours = Math.floor((remaining % 86400) / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;

    countdown.innerHTML = `
        <div class="time-box">
        <div>
            <span>${formatTime(days)}</span>
            <div class="time-label">Days</div>
        </div>

        </div>
        <div class="time-box">
        <div>
            <span>${formatTime(hours)}</span>
            <div class="time-label">Hours</div>
        </div>
        </div>
        <div class="time-box">
        <div>
            <span>${formatTime(minutes)}</span>
            <div class="time-label">Mins</div>
        </div>
        </div>

        <div>
        <div class="time-box">
        <div>
            <span>${formatTime(seconds)}</span>
            <div class="time-label">Secs</div>
        </div>
        </div>

    `;
}

updateTimer();
const timerInterval = setInterval(updateTimer, 1000);