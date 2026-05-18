import os
import re

new_footer = """    <!-- FOOTER -->
    <footer class="modern-footer">
        <div class="container">
            <div class="footer-grid">
                
                <!-- Column 1: Brand & Social -->
                <div class="brand-col">
                    <a href="index.html" class="logo footer-logo">
                        <img src="assets/images/logo.png" alt="Verdant Studio Logo" class="brand-logo-img">
                        <div class="brand-text">
                            <span class="logo-main">VERDANT</span>
                            <span class="logo-sub">STUDIO</span>
                        </div>
                    </a>
                    <p class="brand-bio">
                        Crafting cinematic residential spaces with deep emerald, charcoal, and warm gold aesthetics. We sculpt environments that feel intensely bespoke, elevated, and deeply memorable.
                    </p>
                    <div class="socials-row">
                        <a href="#" class="social-icon-btn" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        </a>
                        <a href="#" class="social-icon-btn" aria-label="Pinterest">
                            <i data-lucide="pin"></i>
                        </a>
                        <a href="#" class="social-icon-btn" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                        <a href="#" class="social-icon-btn" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </a>
                    </div>
                </div>

                <!-- Column 2: Curation Services -->
                <div class="footer-col">
                    <h4 class="footer-col-title">Services</h4>
                    <ul class="footer-links-list">
                        <li><a href="services.html">Bespoke Interior Design</a></li>
                        <li><a href="home-staging.html">Elite Home Staging</a></li>
                        <li><a href="services.html">Art & Accent Curation</a></li>
                        <li><a href="contact.html">Spatial Consultation</a></li>
                    </ul>
                </div>

                <!-- Column 3: The Atelier -->
                <div class="footer-col">
                    <h4 class="footer-col-title">The Atelier</h4>
                    <ul class="footer-links-list">
                        <li><a href="about.html">Our Narrative</a></li>
                        <li><a href="portfolio.html">Selected Works</a></li>
                        <li><a href="gallery.html">Creative Gallery</a></li>
                        <li><a href="faq.html">FAQ & Resources</a></li>
                        <li><a href="contact.html">Client Registry</a></li>
                    </ul>
                </div>

                <!-- Column 4: Registry & Newsletter -->
                <div class="footer-col">
                    <h4 class="footer-col-title">Atelier Access</h4>
                    <p class="newsletter-desc">Subscribe to receive private collection viewings, editorial staging notes, and design philosophy updates.</p>
                    <form class="footer-newsletter-form" id="footerNewsletterForm" onsubmit="event.preventDefault(); alert('Subscribed successfully!');">
                        <input type="email" placeholder="Your email address..." required aria-label="Email address">
                        <button type="submit" aria-label="Subscribe to newsletter"><i data-lucide="arrow-right"></i></button>
                    </form>
                    <span class="newsletter-sub-label">By subscribing, you agree to our privacy policy.</span>
                </div>
            </div>

            <div class="footer-bottom-row">
                <div class="footer-copyright">
                    <p>&copy; 2026 VERDANT STUDIO. All rights reserved.</p>
                </div>
                <div class="footer-meta-links">
                    <a href="faq.html">Privacy Policy</a>
                    <a href="faq.html">Terms of Service</a>
                    <a href="contact.html">Atelier Support</a>
                </div>
            </div>
        </div>
    </footer>"""

files_to_update = [
    "about.html", "blog-details.html", "blog.html", "contact.html", 
    "faq.html", "gallery.html", "home-staging.html", "index.html", 
    "index2.html", "portfolio.html", "pricing.html", "project-details.html", 
    "services.html", "testimonials.html"
]

pattern = re.compile(r'[ \t]*<footer class="modern-footer">.*?</footer>', re.DOTALL)
pattern_with_comment = re.compile(r'[ \t]*<!-- FOOTER -->\s*<footer class="modern-footer">.*?</footer>', re.DOTALL)
pattern_with_double_comment = re.compile(r'[ \t]*<!-- FOOTER DESIGN -->\s*<!-- FOOTER -->\s*<footer class="modern-footer">.*?</footer>', re.DOTALL)

updated_count = 0

for file_name in files_to_update:
    if not os.path.exists(file_name):
        print(f"Skipping {file_name}, does not exist.")
        continue
    
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    if '<footer class="modern-footer">' in new_content:
        if pattern_with_double_comment.search(new_content):
            new_content = pattern_with_double_comment.sub(new_footer, new_content)
        elif pattern_with_comment.search(new_content):
            new_content = pattern_with_comment.sub(new_footer, new_content)
        else:
            new_content = pattern.sub(new_footer, new_content)
            
        if new_content != content:
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated_count += 1
            print(f"Updated {file_name}")
        else:
            print(f"No changes made to {file_name}")
    else:
        print(f"Footer not found in {file_name}")

print(f"Done. Updated {updated_count} files.")
