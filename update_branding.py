import os
import re

files_to_update = [
    "about.html", "admin-dashboard.html", "blog-details.html", "blog.html", "contact.html", 
    "faq.html", "gallery.html", "home-staging.html", "index.html", 
    "index2.html", "portfolio.html", "pricing.html", "project-details.html", 
    "services.html", "testimonials.html", "user-dashboard.html"
]

for file_name in files_to_update:
    if not os.path.exists(file_name):
        continue
    
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    # Remove logo-sub span
    new_content = re.sub(r'<span class="logo-sub">STUDIO</span>', '', new_content)
    
    # Replace Verdant Studio variants
    new_content = new_content.replace('VERDANT STUDIO', 'VERDANT')
    new_content = new_content.replace('Verdant Studio', 'Verdant')
    new_content = new_content.replace('verdant studio', 'verdant')
    
    if new_content != content:
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_name}")

print("Branding update complete.")
