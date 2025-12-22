# Troubleshooting Guide

## ❌ Error: "Only one line of text showing"

**Cause**: Package.json had `"type": "commonjs"` which conflicts with Next.js ES Modules.

**Solution**: Removed the `type` field from `frontend/package.json`.

---

## ✅ How to Run (Updated)

### Step 1: Navigate to Frontend Directory
```bash
cd C:\Users\ABID\Documents\appMajuPetani\frontend
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to: **http://localhost:3000**

---

## 🔍 Verification

After starting the server, you should see:
- ✅ Weather dashboard with 32°C temperature
- ✅ 7-day forecast cards
- ✅ Daily tips section
- ✅ Bottom navigation (Beranda, Tips, Profil)

If you still see errors, check the terminal output for specific error messages.
