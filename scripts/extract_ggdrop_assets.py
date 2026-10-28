from PIL import Image
import os

out_dir = r"c:\Users\user\OneDrive\Desktop\openkeys\public\images\ggdrop"
os.makedirs(out_dir, exist_ok=True)

media = [
    r"C:\Users\user\.gemini\antigravity\brain\54b2697f-e923-4203-8e84-f99af950929f\.user_uploaded\media_1793012371196_569d6439.png",
    r"C:\Users\user\.gemini\antigravity\brain\54b2697f-e923-4203-8e84-f99af950929f\.user_uploaded\media_1793012384551_ca56e588.png",
    r"C:\Users\user\.gemini\antigravity\brain\54b2697f-e923-4203-8e84-f99af950929f\.user_uploaded\media_1793012401879_f61b2370.png",
    r"C:\Users\user\.gemini\antigravity\brain\54b2697f-e923-4203-8e84-f99af950929f\.user_uploaded\media_1793012416602_96d2d277.png",
    r"C:\Users\user\.gemini\antigravity\brain\54b2697f-e923-4203-8e84-f99af950929f\.user_uploaded\media_1793012442016_645345b1.png"
]

img1 = Image.open(media[0])
img2 = Image.open(media[1])
img3 = Image.open(media[2])
img4 = Image.open(media[3])
img5 = Image.open(media[4])

# 1. Event Banner from img1
# Banner starts around y=190 down to y=478
banner = img1.crop((0, 180, 1024, 478))
banner.save(os.path.join(out_dir, "event-banner.png"))
print("Saved event-banner.png")

# 2. Extract cases from img2 (Carnival of Madness)
# Total width 1024, 5 columns:
# col widths ~ 190 each, centers around 125, 315, 505, 695, 885
# Row 1: y=130 to 300
carnival_row1 = [
    ("case-mary", 40, 120, 220, 305),
    ("case-boogeyman", 225, 120, 400, 305),
    ("case-deadman", 405, 120, 580, 305),
    ("case-scream", 590, 120, 770, 305),
    ("case-frankenstein", 775, 120, 950, 305),
]

for name, x1, y1, x2, y2 in carnival_row1:
    c = img2.crop((x1, y1, x2, y2))
    c.save(os.path.join(out_dir, f"{name}.png"))
    print(f"Saved {name}.png")

# Row 2 from img2: y=345 to 510
carnival_row2 = [
    ("case-ghost", 40, 345, 220, 517),
    ("case-trainer", 225, 345, 400, 517),
    ("case-juggler", 405, 345, 580, 517),
    ("case-strongman", 590, 345, 770, 517),
    ("case-magician", 775, 345, 950, 517),
]

for name, x1, y1, x2, y2 in carnival_row2:
    c = img2.crop((x1, y1, x2, y2))
    c.save(os.path.join(out_dir, f"{name}.png"))
    print(f"Saved {name}.png")

# 3. From img3: Человек-ядро and Шут (y=30 to 240)
carnival_row3 = [
    ("case-cannonball", 310, 40, 500, 245),
    ("case-jester", 505, 40, 690, 245),
]

for name, x1, y1, x2, y2 in carnival_row3:
    c = img3.crop((x1, y1, x2, y2))
    c.save(os.path.join(out_dir, f"{name}.png"))
    print(f"Saved {name}.png")

# 4. From img4: 7 Keys series (y=240 to 440)
keys_cases = [
    ("key-stone", 60, 240, 235, 435),
    ("key-bronze", 240, 240, 415, 435),
    ("key-silver", 420, 240, 595, 435),
    ("key-gold", 600, 240, 775, 435),
    ("key-platinum", 780, 240, 955, 435),
]

for name, x1, y1, x2, y2 in keys_cases:
    c = img4.crop((x1, y1, x2, y2))
    c.save(os.path.join(out_dir, f"{name}.png"))
    print(f"Saved {name}.png")

# 5. From img5: Community cases
# Row 1: y=35 to 225
comm_row1 = [
    ("case-tamagotchi", 55, 35, 230, 225),
    ("case-pets", 235, 35, 410, 225),
    ("case-gambler", 415, 35, 590, 225),
    ("case-rambo", 595, 35, 770, 225),
    ("case-arabesque", 775, 35, 950, 225),
]

for name, x1, y1, x2, y2 in comm_row1:
    c = img5.crop((x1, y1, x2, y2))
    c.save(os.path.join(out_dir, f"{name}.png"))
    print(f"Saved {name}.png")

# Row 2: y=260 to 450
comm_row2 = [
    ("case-dj", 55, 260, 230, 450),
    ("case-dragon", 235, 260, 410, 450),
    ("case-vandal", 415, 260, 590, 450),
    ("case-ratatouille", 595, 260, 770, 450),
    ("case-ezgame", 775, 260, 950, 450),
]

for name, x1, y1, x2, y2 in comm_row2:
    c = img5.crop((x1, y1, x2, y2))
    c.save(os.path.join(out_dir, f"{name}.png"))
    print(f"Saved {name}.png")

print("All GGDROP assets extracted successfully!")
