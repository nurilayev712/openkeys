# OPENKEYS — CS 2 & PUBG Keys va Case Ochish Platformasi (BullDrop Style)

Sizning buyurtmangiz bo'yicha **BullDrop** uslubidagi, Counter-Strike 2 va PUBG: BATTLEGROUNDS o'yinlari uchun zamonaviy, tezkor va yuqori sifatli keys ochish platformasi yaratildi.

---

## 🌟 Asosiy Imkoniyatlar va Funksiyalar

1. **Kirishdan oldin Login / Sign In (Avtorizatsiya):**
   - Saytga birinchi kirgan foydalanuvchiga avtomatik **Kirish (Sign In)** va **Ro'yxatdan o'tish (Sign Up)** modali chiqadi.
   - **1-Click Tezkor Demo Kirish**: Ro'yxatdan o'tmasdan darhol **1,000,000 so'm** balans bilan keyslarni ochib ko'rish imkoniyati!
   - **Steam orqali kirish**: Steam avatari, darajasi va 500,000 so'm starter balans.
   - **Ro'yxatdan o'tish bonusi**: Yangi akkaunt ochganlarga +300,000 so'm xush kelibsiz bonusi.

2. **CS 2 va PUBG Keyslari:**
   - **CS 2**: Dragon Lore Mystery, Knife & Glove Elite (100% Pichoqlar, Karambit Doppler, Butterfly Fade), Revolution Case, Omadli Arzon Case.
   - **PUBG**: Glacier & Fool M416 Case, Survivor Trenchcoat Crate, Golden Pan & Airdrop Crate.
   - Har bir keysda skinlarning narxi (so'mda), kamyobligi (Mil-Spec, Restricted, Classified, Covert, Special/Knife, Legendary, Mythic) va tushish ehtimolligi (Odds) ko'rsatilgan.

3. **Haqiqiy BullDrop Gorizontal Ruletka (Spinner Reel):**
   - 60+ ta skinli silliq gorizontal aylanuvchi lenta (`cubic-bezier` tormozlanish fizikasi bilan).
   - Har bir skin markaziy qizil/oltin ko'rsatkichdan o'tganida **mexanik chertish ovozi (Audio Tick SFX)**.
   - Yutuq chiqqanida kamyoblikka mos **g'alaba akkordi va epik bas ovozi**.
   - Salohiyatli g'alaba nishonlanishi: Rang-barang **Konfetti salyutlari (Canvas Confetti)**.
   - **Tez ochish (Fast Open)** rejimi: animatsiyani o'tkazib yuborib bir lahzada ochish.
   - Ko'p martalik ochish tanlovi: **1x, 2x, 3x, 5x**.

4. **Yutuqlar bilan Amallar (Actions):**
   - **Balansga sotish**: Yutib olingan skinni darhol bozor narxida sotib hisobni ko'paytirish.
   - **Inventarga saqlash**: Skin foydalanuvchining shaxsiy inventariga tushadi.
   - **O'yinga yechib olish (Withdraw)**: Steam Trade / PUBG ID orqali o'yinga yuborish simulyatsiyasi.
   - **Hammasini sotish (Sell All)**: 1 bosishda barcha inventarni naqdlashtirish.

5. **Jonli Droplar Tasmati (Live Drops Stream):**
   - Saytning eng yuqori qismida boshqa o'yinchilarning real vaqtdagi yutuqlari (avatar, skin, narx, o'yin belgisi) tinimsiz oqib turadi.

6. **Skin Upgrader (Bonus O'yin):**
   - BullDrop ning eng mashhur funksiyasi: arzon stavka tikib, doira ruletkasi orqali Karambit yoki AWP Dragon Lore ga oshirib olish (Upgrade) imkoni.

7. **Balansni To'ldirish (Deposit):**
   - O'zbekistondagi ommabop usullar: **Click Up**, **Payme**, **Uzum Bank**, **Humo / Uzcard / Visa**, **USDT Kriptovalyuta**.
   - Promokod qo'llash: `BULLDROP` yoki `OPENKEYS` (+20% qo'shimcha sovg'a balans).

8. **Provably Fair (100% Halol Tizim):**
   - Kriptografik SHA-256 xesh, Server Seed, Client Seed va Nonce kalkulyatori.

9. **Kunlik Bepul Sovg'a (Daily Bonus):**
   - Har kuni kirganingiz uchun 25,000 dan 100,000 so'mgacha bepul sovg'a.

---

## 🌐 24/7 Online Render & GitHub orqali Joylashtirish (Avtomatik Yangilanish)

Loyiha Render va GitHub orqali 24/7 uzluksiz ishlashga va har safar yangilik kiritganingizda avtomatik yangilanishga (CI/CD) to'liq tayyorlangan!

### 1-qadam: GitHub ga joylashtirish (Push)
1. [GitHub.com](https://github.com) ga kiring va yangi repository oching (masalan: `openkeys`).
2. Terminalda (PowerShell) quyidagi buyruqlarni yuboring:
```powershell
git add .
git commit -m "feat: complete OpenKeys 24/7 platform"
git branch -M main
git remote add origin https://github.com/SIZNING_USERNAME/openkeys.git
git push -u origin main
```

---

### 2-qadam: Render.com da 24/7 Bepul Onlayn Qilish
1. [Render.com](https://render.com) ga kiring va o'z GitHub akkauntingiz orqali kiring.
2. Yuqoridagi **"New +"** tugmasini bosing va **"Static Site"** ni tanlang.
3. O'zingiz ochgan `openkeys` GitHub repository'sini tanlang (**Connect**).
4. Quyidagi parametrlarni tekshiring:
   - **Name**: `openkeys`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Pastroqda **"Advanced"** yoki **"Redirects/Rewrites"** bo'limida bitta qoida qo'shing:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
6. **"Create Static Site"** tugmasini bosing!

---

### 3-qadam: Saytda yangilik kiritganda avtomatik yangilanish (Auto-Deploy)
Hech narsani qayta sozlash shart emas! Kelgusida sayt kodida istalgan o'zgarish qilsangiz, faqat quyidagilarni yuborsangiz kifoya:
```powershell
git add .
git commit -m "yangi keyslar va dizayn yangilandi"
git push
```
Render bir necha soniyada GitHub'dagi o'zgarishni ko'radi, yangi versiyani avtomatik yig'adi (`build`) va saytingizni 1 soniyada yangilab beradi! Sayt hech qachon o'chmaydi (24/7 onlayn ishlaydi).

