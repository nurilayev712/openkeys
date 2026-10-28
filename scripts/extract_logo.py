from PIL import Image
import os

out_dir = r"c:\Users\user\OneDrive\Desktop\openkeys\public\images\ggdrop"
media1 = r"C:\Users\user\.gemini\antigravity\brain\54b2697f-e923-4203-8e84-f99af950929f\.user_uploaded\media_1793012371196_569d6439.png"
img1 = Image.open(media1)

# Extract Logo
logo = img1.crop((60, 93, 100, 137))
logo.save(os.path.join(out_dir, "gg-logo.png"))

# Extract Bonus box
bonus = img1.crop((65, 160, 180, 215))
bonus.save(os.path.join(out_dir, "bonus-box.png"))

print("Extracted logo and bonus box successfully!")
