# 🚀 PRODUCTION DEPLOYMENT GUIDE

Complete step-by-step guide to deploy your AI Study Assistant to production.

---

## 📋 PRE-DEPLOYMENT CHECKLIST

Before deploying, ensure you have:

- [ ] MongoDB Atlas account (free tier)
- [ ] Railway OR Render account (free tier)
- [ ] Cloudinary account (free tier) 
- [ ] OpenAI API key
- [ ] All environment variables documented
- [ ] Frontend code ready with no errors
- [ ] Backend code ready with no errors

---

## 🗄️ PART 1: DATABASE SETUP (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** for free account
3. **Click:** "Build a Database"
4. **Select:** M0 Sandbox (FREE)
   - Region: Choose closest to your users
   - Cluster Name: `ai-study-assistant-prod`
5. **Click:** "Create"

### Step 2: Configure Database Access

1. **Database Access** → Add New Database User
   - Authentication Method: Password
   - Username: `admin`
   - Password: **Generate & Save Secure Password** (keep this!)
   - Database User Privileges: "Atlas admin"
2. **Click:** "Add User"

### Step 3: Configure Network Access

1. **Network Access** → Add IP Address
2. **Option 1 (Quick):** Click "ALLOW ACCESS FROM ANYWHERE" → Add Entry
   - This adds `0.0.0.0/0` (not recommended for production)
3. **Option 2 (Secure):** Add Railway/Render IP addresses
   - Get IP from deployment platform
   - Add each IP individually

### Step 4: Get Connection String

1. **Database** → Click "Connect"
2. **Select:** "Connect your application"
3. **Driver:** Node.js (4.1 or later)
4. **Copy Connection String:**
   ```
   mongodb+srv://admin:<password>@ai-study-assistant-prod.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace** `<password>` with your actual password
6. **Keep this safe!** You'll need it for backend deployment

---

## 🚂 PART 2: BACKEND DEPLOYMENT (Railway)

### Option A: Deploy to Railway (Recommended)

#### Step 1: Prepare Repository

```powershell
# Navigate to project root
cd C:\Users\ASUS\Documents\ai-study-assistant

# Initialize git (if not already)
git init
git add .
git commit -m "Ready for deployment"

# Create GitHub repository and push
# Go to https://github.com/new
# Create new repo: ai-study-assistant
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/ai-study-assistant.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy on Railway

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **Click:** "New Project"
4. **Select:** "Deploy from GitHub repo"
5. **Choose:** `ai-study-assistant` repository
6. **Select:** Root directory deployment
7. **Railway will auto-detect** Node.js project

#### Step 3: Configure Environment Variables

1. **Click** your deployment → "Variables" tab
2. **Add these variables:**

```env
# Server
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@ai-study-assistant-prod.xxxxx.mongodb.net/ai_study_assistant?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secure-random-string-change-this
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS
CORS_ORIGIN=*

# Email (Optional - Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=AI Study Assistant <your-email@gmail.com>

# Other
API_PREFIX=/api/v1
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Step 4: Configure Start Command

1. **Settings** → "Start Command"
2. **Set to:**
   ```bash
   cd backend && npm install && npm run start
   ```

#### Step 5: Deploy

1. **Railway auto-deploys** on push to main branch
2. **Wait** for build to complete (2-3 minutes)
3. **Click** "View Logs" to monitor
4. **Success!** You'll see:
   ```
   Server running on port 5000
   MongoDB Connected
   Network access: http://0.0.0.0:5000/api/v1
   ```

#### Step 6: Get Backend URL

1. **Settings** → "Domains"
2. **Click:** "Generate Domain"
3. **You'll get:** `https://your-app-name.up.railway.app`
4. **Save this URL!** You'll need it for frontend

#### Step 7: Test Backend

```powershell
# Test health check
curl https://your-app-name.up.railway.app/api/v1/health

# Should return:
# {"status":"success","message":"API is running"}
```

---

### Option B: Deploy to Render (Alternative)

#### Step 1: Create Render Account

1. **Go to:** https://render.com
2. **Sign up** with GitHub

#### Step 2: Create Web Service

1. **Dashboard** → "New +" → "Web Service"
2. **Connect** your GitHub repository
3. **Settings:**
   - Name: `ai-study-assistant`
   - Region: Oregon (US West)
   - Branch: `main`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm run start`
   - Instance Type: `Free`

#### Step 3: Add Environment Variables

Same as Railway (see Step 3 above)

#### Step 4: Deploy

1. **Click:** "Create Web Service"
2. **Wait** for deployment (5-7 minutes)
3. **Your URL:** `https://ai-study-assistant.onrender.com`

---

## 📱 PART 3: FRONTEND CONFIGURATION

### Step 1: Update API URL

```powershell
cd frontend
```

Edit `frontend/.env`:

```env
# Production Backend URL (Railway)
EXPO_PUBLIC_API_URL=https://your-app-name.up.railway.app/api/v1

# OR (Render)
EXPO_PUBLIC_API_URL=https://ai-study-assistant.onrender.com/api/v1
```

### Step 2: Test Locally with Production Backend

```powershell
cd frontend
npx expo start
```

- Scan QR code
- Test login, register
- Test AI features
- Verify all API calls work

---

## 🏗️ PART 4: BUILD MOBILE APP

### For Android APK

#### Step 1: Install EAS CLI

```powershell
npm install -g eas-cli
```

#### Step 2: Login to Expo

```powershell
cd frontend
eas login
```

- Use your Expo account
- Or create one at https://expo.dev

#### Step 3: Configure EAS Build

```powershell
eas build:configure
```

This creates `eas.json`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

#### Step 4: Build APK (For Testing)

```powershell
eas build --platform android --profile preview
```

- **Wait** 10-15 minutes
- **Download APK** from Expo dashboard
- **Test on Android device**

#### Step 5: Build AAB (For Play Store)

```powershell
eas build --platform android --profile production
```

---

### For iOS App (Requires Mac)

#### Step 1: Build iOS

```powershell
eas build --platform ios --profile production
```

#### Step 2: Submit to App Store

```powershell
eas submit --platform ios
```

---

## 📱 PART 5: PUBLISH TO GOOGLE PLAY STORE

### Step 1: Create Google Play Developer Account

1. **Go to:** https://play.google.com/console
2. **Pay:** $25 one-time fee
3. **Complete** account setup

### Step 2: Create App

1. **Create app** → Fill details:
   - App name: **AI Study Assistant**
   - Default language: English
   - App or game: App
   - Free or paid: Free

### Step 3: Prepare Store Listing

#### App Details
- **Short description** (80 chars):
  ```
  AI-powered study companion: quizzes, summaries, OCR scanner & study plans
  ```

- **Full description** (4000 chars):
  ```
  🤖 AI Study Assistant - Your Smart Learning Partner

  Transform your study experience with cutting-edge AI technology!

  ✨ KEY FEATURES:

  📷 AI Scanner
  - Scan notes, textbooks, past papers
  - Instant OCR text extraction
  - AI-powered summaries

  🧠 AI Quiz Generator
  - Generate quizzes from any topic
  - Multiple difficulty levels
  - Instant feedback & explanations

  💬 AI Study Tutor
  - Ask any question, get instant answers
  - Context-aware responses
  - 24/7 learning support

  📊 Smart Analytics
  - Track study hours
  - Monitor progress
  - Identify weak areas

  🏆 Gamification
  - Earn points & badges
  - Daily streaks
  - Level up your knowledge

  📅 Timetable & Reminders
  - Organize study schedule
  - Exam countdown
  - Push notifications

  🎨 Beautiful UI
  - Modern glassmorphism design
  - Dark mode support
  - Smooth animations

  🔒 Secure & Private
  - End-to-end encryption
  - GDPR compliant
  - Your data stays safe

  💰 FREE FOREVER
  - No hidden costs
  - All features included
  - No ads

  Perfect for high school students, college students, and lifelong learners!

  Download now and study smarter, not harder! 🚀
  ```

#### Screenshots
- **Minimum:** 2 screenshots
- **Recommended:** 8 screenshots
- **Size:** 1080 x 1920 (portrait) or 1920 x 1080 (landscape)

Use these screens:
1. Splash Screen
2. Onboarding
3. Home Dashboard
4. AI Scanner
5. Quiz Generator
6. Quiz Results
7. Timetable
8. Profile/Settings

#### Graphic Assets
- **App Icon:** 512 x 512 PNG
- **Feature Graphic:** 1024 x 500 PNG (banner)
- **Promo Video:** Optional YouTube link

### Step 4: Content Rating

1. **Start questionnaire**
2. **Select:** Education
3. **Answer** questions honestly
4. **Get rating** (probably PEGI 3 / Everyone)

### Step 5: Upload App Bundle

1. **Production** → "Create new release"
2. **Upload** AAB file (from EAS build)
3. **Release notes:**
   ```
   🎉 Initial Release - v1.0.0

   - AI-powered quiz generation
   - Smart OCR scanner
   - Study analytics
   - Gamification system
   - Dark mode support
   - Beautiful UI with animations

   We're excited to help you study smarter! 🚀
   ```

### Step 6: Pricing & Distribution

- **Countries:** All countries
- **Price:** Free

### Step 7: Submit for Review

1. **Review** all sections
2. **Click:** "Send for review"
3. **Wait:** 3-7 days for Google approval

---

## 🍎 PART 6: PUBLISH TO APPLE APP STORE

### Requirements
- **Apple Developer Account:** $99/year
- **Mac computer** with Xcode

### Step 1: Create App Store Connect Account

1. **Go to:** https://appstoreconnect.apple.com
2. **Sign in** with Apple ID
3. **Enroll** in Apple Developer Program

### Step 2: Create App

1. **My Apps** → "+" → "New App"
2. **Fill:**
   - Platform: iOS
   - Name: AI Study Assistant
   - Language: English
   - Bundle ID: com.yourcompany.aistudyassistant
   - SKU: aistudyassistant

### Step 3: Build & Submit

```powershell
cd frontend
eas build --platform ios --profile production
eas submit --platform ios
```

### Step 4: App Store Listing

- Use same descriptions as Google Play
- Add iOS screenshots
- Set price: Free
- Age rating: 4+

### Step 5: Submit for Review

- Wait 1-3 days for Apple review
- Respond to any feedback

---

## 🔧 PART 7: POST-DEPLOYMENT SETUP

### Step 1: Monitor Logs

**Railway:**
```
https://railway.app/project/YOUR_PROJECT/logs
```

**Render:**
```
https://dashboard.render.com/web/YOUR_SERVICE/logs
```

### Step 2: Set Up Monitoring (Optional)

**Install Sentry for Error Tracking:**

```powershell
cd backend
npm install @sentry/node
```

Add to `backend/src/index.js`:
```javascript
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Step 3: Database Backups

**MongoDB Atlas:**
1. **Backup** → Enable automated backups
2. **Frequency:** Daily
3. **Retention:** 7 days (free tier)

### Step 4: Set Up CI/CD (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Railway

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Trigger Railway Deploy
        run: |
          curl -X POST https://api.railway.app/project/${{secrets.RAILWAY_PROJECT_ID}}/deploy
```

---

## 📊 PART 8: COST BREAKDOWN

### FREE TIER (Recommended for Start)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **MongoDB Atlas** | 512MB storage | 100 connections, 10GB bandwidth |
| **Railway** | $5 free/month | 500 hours, 1GB RAM, 1GB storage |
| **Render** | 750 hours/month | Sleeps after 15 min inactivity |
| **Cloudinary** | 25GB storage | 25GB bandwidth, 25K transformations |
| **Expo EAS** | Free builds | Limited builds/month |
| **Google Play** | $25 one-time | Unlimited updates |
| **Total:** | **$25-30** | (One-time + free monthly services) |

### PAID TIER (After 100+ Users)

| Service | Paid Plan | Cost |
|---------|-----------|------|
| **MongoDB Atlas** | M10 cluster | $9/month (2GB RAM) |
| **Railway** | Pro | $5/month + usage ($0.000463/GB-hour) |
| **Render** | Starter | $7/month (no sleep) |
| **OpenAI API** | Pay-as-you-go | ~$0.002 per 1K tokens |
| **Cloudinary** | Plus | $99/month (if exceeding free) |
| **Total:** | **$20-120/month** | (Depends on usage) |

---

## ✅ DEPLOYMENT CHECKLIST

### Pre-Launch
- [ ] All features tested locally
- [ ] No console errors or warnings
- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Railway/Render
- [ ] Environment variables set
- [ ] Frontend .env updated with production URL
- [ ] API endpoints tested with production backend

### App Build
- [ ] Android APK built and tested
- [ ] iOS app built (if applicable)
- [ ] App icon created (512x512)
- [ ] Screenshots captured (8 screens)
- [ ] Feature graphic designed (1024x500)

### Store Submission
- [ ] Google Play Developer account created ($25)
- [ ] App listing written (short + full description)
- [ ] Content rating completed
- [ ] Privacy policy URL added
- [ ] Terms of service URL added
- [ ] App submitted for review

### Post-Launch
- [ ] Monitor Railway/Render logs
- [ ] Test app on real devices
- [ ] Respond to user feedback
- [ ] Fix any critical bugs
- [ ] Plan next update features

---

## 🚨 TROUBLESHOOTING

### Backend Won't Start

**Error:** `EADDRINUSE: port 5000 already in use`
- **Solution:** Railway/Render auto-assigns ports, use `process.env.PORT`

**Error:** `MongoNetworkError: connection timeout`
- **Solution:** Check MongoDB Atlas IP whitelist, allow `0.0.0.0/0`

### Frontend Can't Connect

**Error:** `Network request failed`
- **Solution:** 
  1. Check `EXPO_PUBLIC_API_URL` in `.env`
  2. Ensure backend is running: `curl https://your-app.railway.app/api/v1/health`
  3. Check CORS settings in backend

### Build Failures

**Error:** `eas build` fails
- **Solution:**
  1. Check `app.json` configuration
  2. Ensure all dependencies are in `package.json`
  3. Run `npm install` before building

### App Store Rejection

**Common reasons:**
- Missing privacy policy
- Missing app icons
- Incomplete metadata
- Crashes on launch

**Solution:**
- Fix issues mentioned in review
- Resubmit within 7 days

---

## 🎉 SUCCESS!

Your AI Study Assistant is now live in production!

### Next Steps:
1. **Share** with friends and get feedback
2. **Monitor** user analytics
3. **Update** based on feedback
4. **Market** your app (social media, forums, etc.)
5. **Plan** new features

### Support:
- **Railway Docs:** https://docs.railway.app
- **Render Docs:** https://render.com/docs
- **Expo Docs:** https://docs.expo.dev
- **MongoDB Atlas:** https://docs.atlas.mongodb.com

---

**Congratulations on deploying your startup! 🚀**

You went from 0 to Production. That's massive! 🎊
