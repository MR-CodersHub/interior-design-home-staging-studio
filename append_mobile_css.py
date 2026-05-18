import os

css_to_append = """
/* ==========================================================================
   ULTRA MOBILE RESPONSIVENESS (360px and below)
   ========================================================================== */
@media (max-width: 480px) {
    /* 1. Base Scaling and Layout */
    .container {
        padding-left: 15px !important;
        padding-right: 15px !important;
        width: 100% !important;
        overflow-x: hidden !important;
    }
    
    body {
        overflow-x: hidden !important;
        font-size: 14px !important;
    }
    
    /* 2. Typography Scaling */
    h1, .hero-title, .page-title {
        font-size: 2.2rem !important;
        line-height: 1.15 !important;
        word-wrap: break-word !important;
        hyphens: auto !important;
    }
    
    h2, .section-title {
        font-size: 1.8rem !important;
        line-height: 1.2 !important;
        word-wrap: break-word !important;
    }
    
    h3 { font-size: 1.4rem !important; }
    h4 { font-size: 1.1rem !important; }
    
    p, .hero-description, .section-desc, .about-p, .service-text, .testimonial-quote {
        font-size: 0.9rem !important;
        line-height: 1.6 !important;
    }
    
    /* 3. Navigation & Hamburger */
    .navbar-header {
        padding: 10px 0 !important;
    }
    
    .nav-container {
        padding: 0 15px !important;
        flex-wrap: nowrap !important;
        justify-content: space-between !important;
    }
    
    .logo-main {
        font-size: 1.1rem !important;
        letter-spacing: 0.1em !important;
    }
    
    .brand-logo-img {
        height: 28px !important;
    }
    
    .nav-actions {
        gap: 10px !important;
    }
    
    .btn-nav-cta {
        display: none !important; /* Hide on small mobile to fit hamburger */
    }
    
    /* Mobile Menu Fixes */
    .nav-links-wrapper {
        padding: 20px 15px !important;
        width: 100% !important;
        max-width: 100vw !important;
    }
    
    .nav-menu {
        gap: 15px !important;
    }
    
    .nav-link {
        font-size: 1.2rem !important;
        padding: 8px 0 !important;
    }
    
    /* 4. Sections & Spacing */
    .py-large {
        padding-top: 60px !important;
        padding-bottom: 60px !important;
    }
    
    .section-divider {
        margin-bottom: 40px !important;
    }
    
    /* 5. Grids and Flex Adjustments */
    .about-grid, .services-grid, .contact-wrapper-grid, .team-grid, .counters-grid, .pricing-grid {
        grid-template-columns: 1fr !important;
        gap: 30px !important;
    }
    
    /* Footer Fixes */
    .footer-grid {
        grid-template-columns: 1fr !important;
        gap: 35px !important;
    }
    
    .footer-bottom-row {
        flex-direction: column !important;
        text-align: center !important;
        gap: 15px !important;
    }
    
    .footer-meta-links {
        flex-direction: column !important;
        gap: 10px !important;
    }
    
    /* 6. Forms & Buttons */
    .form-row.two-col {
        flex-direction: column !important;
        gap: 20px !important;
    }
    
    .glass-form-container, .contact-form-panel, .contact-details-panel {
        padding: 25px 15px !important;
    }
    
    .btn {
        width: 100% !important;
        justify-content: center !important;
        padding: 12px 20px !important;
        font-size: 0.9rem !important;
    }
    
    /* 7. Image Constraints */
    img {
        max-width: 100% !important;
        height: auto !important;
    }
    
    /* 8. Dashboard components */
    .dashboard-grid, .admin-stats-grid, .dashboard-cards {
        grid-template-columns: 1fr !important;
        gap: 15px !important;
    }
    
    .table-responsive-wrapper {
        overflow-x: auto !important;
        width: 100% !important;
        -webkit-overflow-scrolling: touch !important;
    }
    
    /* Prevent table columns from squishing too much */
    .data-table {
        min-width: 500px !important;
    }

    /* 9. Miscellaneous components */
    .hero-actions {
        flex-direction: column !important;
        gap: 15px !important;
    }
    
    .project-card, .service-card, .testimonial-slide, .pricing-card {
        padding: 20px !important;
        width: 100% !important;
    }
    
    /* Project Masonry Layout - Force 1 column on ultra-small screens */
    .projects-masonry-grid {
        columns: 1 !important;
        column-count: 1 !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 20px !important;
    }
    
    .masonry-item {
        width: 100% !important;
        break-inside: avoid !important;
        margin-bottom: 0 !important;
    }
    
    /* 10. Avoid modal overflow */
    .modal-card-container, .project-modal .modal-card-container {
        width: 95% !important;
        padding: 20px !important;
        margin: 20px auto !important;
        max-height: 90vh !important;
        overflow-y: auto !important;
    }
    
    .modal-grid {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
    }
}
"""

style_file = "style.css"
if os.path.exists(style_file):
    with open(style_file, "a", encoding="utf-8") as f:
        f.write(css_to_append)
    print("Mobile styles appended successfully.")
else:
    print("style.css not found.")
