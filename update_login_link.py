import os
import re

files_to_update = [
    "about.html", "admin-dashboard.html", "blog-details.html", "blog.html", "contact.html", 
    "faq.html", "gallery.html", "home-staging.html", "index.html", 
    "index2.html", "portfolio.html", "pricing.html", "project-details.html", 
    "services.html", "testimonials.html", "user-dashboard.html"
]

pattern = re.compile(r'<a href="contact\.html">\s*<i data-lucide="user-plus"></i>\s*<span>Register / Sign Up</span>', re.DOTALL)
replacement = r'<a href="login.html">\n                                    <i data-lucide="user-plus"></i>\n                                    <span>Register / Sign Up</span>'

for file_name in files_to_update:
    if not os.path.exists(file_name):
        continue
    
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = pattern.sub(replacement, content)
    
    if new_content != content:
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_name}")

print("Dropdown links updated.")
