# FaceEmoji 😊

אפליקציית PWA לזיהוי הבעות פנים והמרה לאימוגי.

## פרסום ב-Vercel (חינם)

### שלב 1 — העלה ל-GitHub
1. צור חשבון ב-[github.com](https://github.com) (חינם)
2. צור Repository חדש (+ New repository)
3. העלה את כל הקבצים

### שלב 2 — קשר ל-Vercel
1. כנס ל-[vercel.com](https://vercel.com) והירשם עם GitHub
2. לחץ **"Add New Project"**
3. בחר את ה-Repository שיצרת
4. לחץ **Deploy**

### שלב 3 — הוסף את ה-API Key
1. ב-Vercel: Settings → Environment Variables
2. הוסף:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** המפתח שלך מ-[console.anthropic.com](https://console.anthropic.com)
3. לחץ Save → Redeploy

### שלב 4 — שתף עם כולם
קבל קישור כמו: `face-emoji.vercel.app`

**משתמשים מתקינים:**
Safari → כפתור שתף → הוסף למסך הבית

---

## קבצים בפרויקט

```
face-emoji-pwa/
├── index.html        ← האפליקציה עצמה
├── manifest.json     ← הגדרות PWA
├── sw.js             ← Service Worker (תמיכת offline)
├── vercel.json       ← הגדרות Vercel
├── api/
│   └── detect.js    ← שרת צד (מסתיר את ה-API Key)
└── icons/
    ├── icon-192.png  ← הוסף אייקון 192×192
    └── icon-512.png  ← הוסף אייקון 512×512
```

## הוספת אייקונים
צור שתי תמונות של האפליקציה (אימוגי או לוגו):
- `icons/icon-192.png` — 192×192 פיקסל
- `icons/icon-512.png` — 512×512 פיקסל

---

## עלויות
| שירות | עלות |
|--------|------|
| Vercel Hosting | חינם |
| GitHub | חינם |
| Anthropic API | ~$0.001 לצילום (זול מאוד) |
