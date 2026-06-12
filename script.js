/* ==========================================================================
   VERDANT STUDIO ATELIER - DYNAMIC INTERACTION LAYER & SENSORY CONTROLLERS
   Coordinated multi-page interaction system (Fault-tolerant & Modular)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 0. LUXURY DARK/LIGHT THEME SWITCHER
    initThemeToggle();

    // 0a. RTL LAYOUT SWITCHER
    initRtlToggle();

    // 1. PAGE PRELOADER SYSTEM
    initPagePreloader();

    // 2. STICKY NAVBAR & MOBILE MENU OVERLAY
    initNavbarSystem();

    // 3. STATISTIC COUNT-UP INTERSECTION OBSERVER
    initStatCounters();

    // 5. ASYMMETRICAL PORTFOLIO FILTER & LIGHTBOX MODAL
    initPortfolioFilters();
    initPortfolioLightboxModal();

    // 6. GALLERY FULLSCREEN LIGHTBOX PREVIEW
    initGalleryLightbox();

    // 7. BEFORE/AFTER TRANSFORM SPOTLIGHT
    initBeforeAfterSpotlight();

    // 8. ACCORDION COMPONENT
    initFaqAccordion();

    // 9. CLIENT TESTIMONIALS SLIDER
    initTestimonialsCarousel();

    // 10. ATELIER REGISTRY CONSULTATION BOOKING HANDLER
    initConsultationBookingForm();

    // 11. GLOBAL SCROLL REVEAL OBSERVER
    initScrollReveal();

    // 12. LUXURY ACCOUNT DROPDOWN
    initUserAccountDropdown();

    // 13. GALLERY COMPARISON SLIDERS
    initGalleryComparisonSliders();
    initBeforeAfterFilters();
});

/* --------------------------------------------------------------------------
   1. PAGE PRELOADER SYSTEM
   -------------------------------------------------------------------------- */
function initPagePreloader() {
    const preloader = document.querySelector(".page-loader");
    if (!preloader) return;

    // Simulate luxury progress bar filling, then fade out preloader
    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.classList.add("loaded");
        }, 800); // Small visual buffer to feel curated
    });

    // Fallback: in case window load event already fired or delayed
    setTimeout(() => {
        if (!preloader.classList.contains("loaded")) {
            preloader.classList.add("loaded");
        }
    }, 2500);
}

/* --------------------------------------------------------------------------
   2. STICKY NAVBAR & MOBILE MENU OVERLAY
   -------------------------------------------------------------------------- */
function initNavbarSystem() {
    const navbar = document.querySelector(".navbar-header");
    const menuToggle = document.querySelector(".menu-toggle-btn");
    const navLinksWrapper = document.querySelector(".nav-links-wrapper");

    if (navbar) {
        // Run on scroll
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check
    }

    if (menuToggle && navLinksWrapper) {
        // Toggle mobile menu state
        menuToggle.addEventListener("click", () => {
            const isActive = menuToggle.classList.toggle("active");
            navLinksWrapper.classList.toggle("active");

            // Prevent background page scroll when active
            if (isActive) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });

        // Close menu on clicking links
        const navLinks = navLinksWrapper.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navLinksWrapper.classList.remove("active");
                document.body.style.overflow = "";
            });
        });
    }
}

/* --------------------------------------------------------------------------
   4. STATISTIC COUNT-UP INTERSECTION OBSERVER
   -------------------------------------------------------------------------- */
function initStatCounters() {
    const counters = document.querySelectorAll(".counter-number");
    if (counters.length === 0) return;

    const countUp = (counter) => {
        const target = parseInt(counter.getAttribute("data-target"), 10);
        const duration = 1800; // Total count-up duration in ms
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Ease Out Cubic progression
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * target);

            counter.textContent = currentVal;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target;
            }
        };

        requestAnimationFrame(animate);
    };

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                self.unobserve(entry.target); // Trigger count up only once
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

/* --------------------------------------------------------------------------
   5. ASYMMETRICAL PORTFOLIO FILTER & LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update active state in UI
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            // Filter grid cards
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                
                if (filterValue === "all" || cardCategory === filterValue) {
                    card.classList.remove("filtered-out");
                    
                    // Simple entrance animation
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.96)";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                        card.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
                    }, 50);
                } else {
                    card.classList.add("filtered-out");
                }
            });
        });
    });
}

function initPortfolioLightboxModal() {
    const projectTriggers = document.querySelectorAll(".js-open-project-modal");
    const modal = document.querySelector(".project-modal");

    if (!modal || projectTriggers.length === 0) return;

    const modalBackdrop = modal.querySelector(".modal-backdrop");
    const modalCloseBtn = modal.querySelector(".modal-close-btn");

    // Modal data items to populate
    const modalImg = modal.querySelector(".modal-visual-side img");
    const modalTag = modal.querySelector(".modal-tag");
    const modalTitle = modal.querySelector(".modal-title-heading");
    const modalLocation = modal.querySelector(".modal-location-text");
    const modalDesc = modal.querySelector(".modal-description-paragraph");
    
    const specArea = modal.querySelector("[data-spec='area']");
    const specStyle = modal.querySelector("[data-spec='style']");
    const specCuration = modal.querySelector("[data-spec='curation']");
    const specScope = modal.querySelector("[data-spec='scope']");

    const openModal = (trigger) => {
        // 1. Extract specs and assets data from trigger card attributes
        const imgPath = trigger.getAttribute("data-modal-img");
        const category = trigger.getAttribute("data-modal-category");
        const title = trigger.getAttribute("data-modal-title");
        const location = trigger.getAttribute("data-modal-location");
        const description = trigger.getAttribute("data-modal-desc");
        
        const area = trigger.getAttribute("data-spec-area");
        const style = trigger.getAttribute("data-spec-style");
        const curation = trigger.getAttribute("data-spec-curation");
        const scope = trigger.getAttribute("data-spec-scope");

        // 2. Populate Modal Content
        if (modalImg && imgPath) modalImg.src = imgPath;
        if (modalTag && category) modalTag.textContent = category;
        if (modalTitle && title) modalTitle.textContent = title;
        if (modalLocation && location) modalLocation.textContent = location;
        if (modalDesc && description) modalDesc.textContent = description;

        if (specArea && area) specArea.textContent = area;
        if (specStyle && style) specStyle.textContent = style;
        if (specCuration && curation) specCuration.textContent = curation;
        if (specScope && scope) specScope.textContent = scope;

        // 3. Open Modal View
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent main page scrolling
    };

    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    };

    projectTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(trigger);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

    // Escape Key Listener
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
}

/* --------------------------------------------------------------------------
   6. GALLERY FULLSCREEN LIGHTBOX PREVIEW
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.querySelector(".gallery-lightbox");

    if (!lightbox || galleryItems.length === 0) return;

    const lightboxImg = lightbox.querySelector(".lightbox-content-wrapper img");
    const lightboxClose = lightbox.querySelector(".lightbox-close-btn");

    const openLightbox = (item) => {
        const fullImgSrc = item.getAttribute("data-src") || item.querySelector("img").src;
        if (lightboxImg && fullImgSrc) {
            lightboxImg.src = fullImgSrc;
        }
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    };

    galleryItems.forEach(item => {
        item.addEventListener("click", () => openLightbox(item));
    });

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
}

/* --------------------------------------------------------------------------
   7. BEFORE/AFTER TRANSFORM SPOTLIGHT
   -------------------------------------------------------------------------- */
function initBeforeAfterSpotlight() {
    const tabButtons = document.querySelectorAll(".spotlight-tab-btn");
    const imagePanes = document.querySelectorAll(".slider-image-pane");
    const tabPanes = document.querySelectorAll(".tab-pane");

    if (tabButtons.length === 0) return;

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-tab");

            // 1. Toggle Tab Button state
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // 2. Toggle Staging Image Panes (Before / After visuals)
            imagePanes.forEach(pane => {
                if (pane.id === `img-${targetId}`) {
                    pane.classList.add("active");
                } else {
                    pane.classList.remove("active");
                }
            });

            // 3. Toggle Text Tab Panes (Before / After lists)
            tabPanes.forEach(pane => {
                if (pane.id === targetId) {
                    pane.classList.add("active");
                } else {
                    pane.classList.remove("active");
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   8. FAQ ACCORDION COMPONENT
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const trigger = item.querySelector(".faq-trigger");
        const content = item.querySelector(".faq-content");

        if (!trigger || !content) return;

        trigger.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Close all items
            faqItems.forEach(i => {
                i.classList.remove("active");
                i.querySelector(".faq-content").style.maxHeight = null;
            });

            // Open clicked item if it was closed
            if (!isActive) {
                item.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

/* --------------------------------------------------------------------------
   9. CLIENT TESTIMONIALS SLIDER
   -------------------------------------------------------------------------- */
function initTestimonialsCarousel() {
    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    const prevBtn = document.querySelector(".carousel-prev-btn");
    const nextBtn = document.querySelector(".carousel-next-btn");

    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoSlideInterval = null;

    const showSlide = (index) => {
        // Range validation
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        currentIndex = index;

        // Toggle visual active states
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });

        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    };

    const startAutoSlide = () => {
        stopAutoSlide(); // Avoid duplicate loops
        autoSlideInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 8000); // Immersive long duration for luxury copy read
    };

    const stopAutoSlide = () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    };

    // Events Listeners
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            stopAutoSlide();
            showSlide(currentIndex + 1);
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            stopAutoSlide();
            showSlide(currentIndex - 1);
            startAutoSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    // Start carousel
    showSlide(0);
    startAutoSlide();
}

/* --------------------------------------------------------------------------
   10. ATELIER REGISTRY CONSULTATION BOOKING HANDLER
   -------------------------------------------------------------------------- */
function initConsultationBookingForm() {
    const bookingForm = document.querySelector(".js-consultation-form");
    const successModal = document.querySelector(".success-modal");

    if (!bookingForm || !successModal) return;

    const submitBtn = bookingForm.querySelector("button[type='submit']");
    const successBackdrop = successModal.querySelector(".success-modal-backdrop");
    const successDismiss = successModal.querySelector(".btn-success-dismiss");

    // Dynamic output tags inside confirmation window
    const outName = successModal.querySelector("[data-out='name']");
    const outStyle = successModal.querySelector("[data-out='style']");
    const outDate = successModal.querySelector("[data-out='date']");

    const formatProseDate = (rawDateString) => {
        if (!rawDateString) return "Immediate Contact Scheduled";
        
        try {
            const dateObj = new Date(rawDateString);
            const options = { year: "numeric", month: "long", day: "numeric" };
            return dateObj.toLocaleDateString("en-US", options);
        } catch (e) {
            return rawDateString;
        }
    };

    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // 1. Gather Input Data
        const nameVal = bookingForm.querySelector("input[name='client-name']").value;
        const emailVal = bookingForm.querySelector("input[name='client-email']").value;
        const serviceSelect = bookingForm.querySelector("select[name='client-service']");
        const serviceVal = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : "Bespoke Consulting";
        const dateVal = bookingForm.querySelector("input[name='client-date']").value;

        // 2. Loading State Transition
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";
            submitBtn.textContent = "PROCURING REGISTRY SPACE...";
        }

        // Simulate secure loading connection (2s delay for premium weight)
        setTimeout(() => {
            // Restore button styling
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                submitBtn.textContent = "REQUEST STUDIO INVITATION";
            }

            // 3. Populate confirmation lines
            if (outName) outName.textContent = nameVal;
            if (outStyle) outStyle.textContent = serviceVal;
            if (outDate) outDate.textContent = formatProseDate(dateVal);

            // 4. Open success modal & reset form
            successModal.classList.add("active");
            document.body.style.overflow = "hidden";
            bookingForm.reset();
        }, 1800);
    });

    const closeSuccess = () => {
        successModal.classList.remove("active");
        document.body.style.overflow = "";
    };

    if (successDismiss) successDismiss.addEventListener("click", closeSuccess);
    if (successBackdrop) successBackdrop.addEventListener("click", closeSuccess);
}

/* --------------------------------------------------------------------------
   11. GLOBAL SCROLL REVEAL OBSERVER
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".animate-on-scroll");
    if (revealElements.length === 0) return;

    const revealOptions = {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target); // Animate entry only once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   12. LUXURY DARK/LIGHT THEME SWITCHER
   -------------------------------------------------------------------------- */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    
    // A. Retrieve preference from localStorage or system fallback
    const savedTheme = localStorage.getItem("theme-preference");
    
    const applyTheme = (theme) => {
        if (theme === "light") {
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
        } else {
            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");
        }
        // Force updating Lucide icon states
        if (window.lucide) window.lucide.createIcons();
    };

    // B. Apply initial state
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
        applyTheme(systemPrefersLight ? "light" : "dark");
    }

    // C. Click event listener
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isLight = document.body.classList.contains("light-mode");
            const newTheme = isLight ? "dark" : "light";
            localStorage.setItem("theme-preference", newTheme);
            applyTheme(newTheme);
        });
    }
}

/* --------------------------------------------------------------------------
   13. LUXURY ACCOUNT DROPDOWN INTERACTION
   -------------------------------------------------------------------------- */
function initUserAccountDropdown() {
    const accountToggleBtn = document.getElementById("accountToggleBtn");
    const accountDropdown = document.getElementById("accountDropdown");

    if (accountToggleBtn && accountDropdown) {
        accountToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            accountDropdown.classList.toggle("active");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (!accountDropdown.contains(e.target) && e.target !== accountToggleBtn && !accountToggleBtn.contains(e.target)) {
                accountDropdown.classList.remove("active");
            }
        });

        // Close on escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                accountDropdown.classList.remove("active");
            }
        });
    }
}

/* --------------------------------------------------------------------------
   14. GALLERY INTERACTIVE COMPARISON SLIDERS
   -------------------------------------------------------------------------- */
function initGalleryComparisonSliders() {
    const sliderCards = document.querySelectorAll('.ba-slider-card');
    if (sliderCards.length === 0) return;

    sliderCards.forEach(card => {
        const range = card.querySelector('.ba-slider-range');
        if (range) {
            range.addEventListener('input', (e) => {
                card.style.setProperty('--slider-pos', e.target.value + '%');
            });
        }
    });
}

function initBeforeAfterFilters() {
    const filters = document.querySelectorAll('.ba-filter-btn');
    const items = document.querySelectorAll('.ba-slider-card');
    if (filters.length === 0) return;

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            items.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   15. RTL LAYOUT DIRECTION TOGGLE
   -------------------------------------------------------------------------- */
function initRtlToggle() {
    const rtlToggleBtn = document.getElementById("rtlToggleBtn");
    
    // A. Retrieve preference from localStorage
    const savedRtl = localStorage.getItem("rtl-preference");
    
    const applyRtl = (isRtl) => {
        if (isRtl) {
            document.documentElement.setAttribute("dir", "rtl");
            document.body.classList.add("rtl-mode");
        } else {
            document.documentElement.setAttribute("dir", "ltr");
            document.body.classList.remove("rtl-mode");
        }
        // Force updating Lucide icon states
        if (window.lucide) window.lucide.createIcons();
    };

    // B. Apply initial state
    if (savedRtl === "true") {
        applyRtl(true);
    } else {
        applyRtl(false);
    }

    // C. Click event listener
    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener("click", () => {
            const isRtl = document.documentElement.getAttribute("dir") === "rtl";
            const newRtl = !isRtl;
            localStorage.setItem("rtl-preference", newRtl);
            applyRtl(newRtl);
        });
    }
}
