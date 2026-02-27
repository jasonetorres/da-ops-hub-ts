# Firebase Setup - Quick Reference

## 30-Second Overview
✅ Firebase SDK installed
✅ Sync service implemented
✅ Zustand store integrated
⏳ **YOUR TURN:** Add Firebase credentials to `.env`

## The 3 Steps You Need to Do

### 1. Create Firebase Project (2 min)
```
https://console.firebase.google.com
→ New Project → Name it anything → Create
```

### 2. Enable Realtime Database (1 min)
```
Firebase Console → Build > Realtime Database → Create Database
→ Test Mode → Your nearest location → Enable
```

### 3. Copy Credentials (1 min)
```
Settings (gear) → General → Copy all config values to .env file
Plus: Realtime Database URL
```

## Copy-Paste: Your .env File

1. Open `.env` in project root
2. Replace with your Firebase values:

```bash
VITE_FIREBASE_API_KEY=abc123def456ghi789jkl
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abc123def456
VITE_FIREBASE_DATABASE_URL=https://your-project.firebasedatabase.app
```

3. Save file
4. Restart dev server: `npm run dev`

## Test It Works

Open 2 browser windows/tabs:
1. Toggle a task in one
2. See it change in the other instantly ✓

## What Happens Now

| You | System |
|-----|--------|
| Toggle task on phone | ✅ Updates instantly |
| Toggle task on desktop | ✅ Updates in phone automatically |
| Close phone app | ✅ Data still there (localStorage) |
| Offline | ✅ Still works, syncs when back online |

## Troubleshooting in 10 Seconds

**See "Offline Mode" in top-right?**
→ Check `.env` file has all 7 variables → Restart dev server

**Changes not syncing between devices?**
→ Check both devices on same WiFi → Refresh browser → Check Firebase console

**App broken?**
→ It's not. App always works. Firebase sync is optional bonus.

## Full Setup Guide

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for:
- Detailed screenshots
- Security rules
- Production deployment
- Troubleshooting details

---

**That's it. 4 minutes to cross-device sync.** 🚀
