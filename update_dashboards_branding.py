import os
import re

files_to_update = [
    "user-dashboard.html", "admin-dashboard.html"
]

for file_name in files_to_update:
    if not os.path.exists(file_name):
        print(f"File {file_name} not found.")
        continue
    
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    # Remove logo-sub span even if it has inline styles
    new_content = re.sub(r'<span class="logo-sub"[^>]*>STUDIO</span>', '', new_content)
    
    if new_content != content:
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_name}")
    else:
        print(f"No changes made to {file_name}")

print("Dashboard branding update complete.")
