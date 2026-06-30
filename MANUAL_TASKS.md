# 📋 Manual Tasks Checklist

This document lists all the tasks you need to complete **manually** to get your AI Study Assistant fully working.

---

## ⚠️ CRITICAL ISSUES TO FIX FIRST

### 1. ❌ Fix Frontend Dependencies Conflict
**Problem:** React version mismatch causing npm install to fail
**Error:** React 19.1.0 installed, but React Native 0.81.6 requires React ^19.1.4

**Solution:** Run this command in `frontend` folder:
```bash
cd frontend
npm install react@19.1.4 --save
npm install --legacy-peer-deps
```

**Why:** The new dependencies we added (@react-native-async-storage, expo-blur, etc.) can't install due to this version conflict.

---

## 🔧 BACKEND SETUP

### 2. ✅ Start MongoDB Database
**Status:** Required before backend can run
**Action:**
```bash
# If MongoDB is installed locally:
mongod

# Or use MongoDB Compass to start the server
# Default connection: mongodb://localhost:27017
```

**Verify:** Your `.env` file already has: `MONGODB_URI=mongodb://localhost:27017/ai_study_assistant`

### 3. ✅ Start Backend Server
**Current Status:** Backend code is ready but needs restart to load new routes
**Action:**
```bash
cd backend
npm run dev
```

**Expected Output:**
```
🚀 Server running on port 5000
✓ MongoDB connected to ai_study_assistant
```

**What This Loads:**
- ✅ New Gamification routes (`/api/v1/gamification/`)
- ✅ New Study Plan routes (`/api/v1/study-plans/`)
- ✅ All 80+ API endpoints

---

## 📱 FRONTEND SETUP

### 4. ⚠️ Install Frontend Dependencies (AFTER fixing React version)
**Action:**
```bash
cd frontend
npm install --legacy-peer-deps
```

**This Installs:**
- @react-native-async-storage/async-storage (for dark mode persistence)
- expo-av (for audio features)
- expo-blur (for glassmorphism effects)
- expo-document-picker (for file uploads)
- lottie-react-native (for animations)

### 5. ✅ Add New Screens to Navigation
**File to Edit:** `frontend/src/navigation/AppNavigator.tsx`

**What's Missing:** GamificationScreen and StudyPlanScreen are not registered in navigation yet

**You Need to:**

1. **Import the new screens** (add to top of file):
```typescript
import { GamificationScreen } from '../screens/GamificationScreen';
import { StudyPlanScreen } from '../screens/StudyPlanScreen';
```

2. **Add routes to Stack.Navigator** (inside AppNavigator function):
```typescript
<Stack.Screen name="Gamification" component={GamificationScreen} />
<Stack.Screen name="StudyPlan" component={StudyPlanScreen} />
```

3. **Optional: Add to bottom tabs** - You can add Gamification as a tab in MainTabs (replace one of the existing tabs or add 6th tab)

**Why:** Without this, users can't navigate to the new screens

### 6. ✅ Link Screens from HomeScreen
**File to Edit:** `frontend/src/screens/HomeScreen.tsx`

**Add Navigation Buttons:** 
You need to manually add buttons on the home dashboard that navigate to:
- Gamification screen (show points/badges/level)
- Study Plan screen (show today's plan or generate new one)

**Example:**
```typescript
<TouchableOpacity onPress={() => navigation.navigate('Gamification')}>
  <Text>🏆 My Progress</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('StudyPlan')}>
  <Text>📅 Study Plan</Text>
</TouchableOpacity>
```

### 7. ✅ Start Frontend App
**Action:**
```bash
cd frontend
npx expo start
```

**Then:** Press `a` for Android emulator or `i` for iOS simulator

---

## 🎨 OPTIONAL ENHANCEMENTS

### 8. ⬜ Add Lottie Animations
**Status:** Package installed, but not integrated
**Files to Update:**
- `frontend/src/screens/SplashScreen.tsx` - Add loading animation
- `frontend/src/screens/GamificationScreen.tsx` - Add badge unlock animations
- `frontend/src/screens/StudyPlanScreen.tsx` - Add completion confetti

**Where to Get Animations:**
- Free Lottie files: https://lottiefiles.com/
- Recommended: Study, trophy, confetti, loading animations

**Example Usage:**
```typescript
import LottieView from 'lottie-react-native';

<LottieView
  source={require('../assets/animations/confetti.json')}
  autoPlay
  loop={false}
  style={{ width: 200, height: 200 }}
/>
```

### 9. ⬜ Setup Firebase Cloud Messaging (Push Notifications)
**Status:** Backend has fcmTokens array, frontend needs implementation

**Steps:**
1. Create Firebase project at https://console.firebase.google.com/
2. Add Android/iOS apps to Firebase
3. Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
4. Install package: `npx expo install expo-notifications`
5. Create `frontend/src/services/notificationService.ts`
6. Register FCM token with backend on login

**Backend Already Has:**
- User model with `fcmTokens[]` array
- Notification controller with send capabilities

### 10. ⬜ Create Privacy Policy Screen
**File to Create:** `frontend/src/screens/PrivacyPolicyScreen.tsx`

**Content Needed:**
- App name and developer info
- Data collection practices (email, profile data, study data)
- Third-party services (OpenAI, Cloudinary, Firebase)
- User rights (data deletion, access, portability)
- Contact information

**Then Link:** From `SettingsScreen.tsx` "Privacy Policy" button

### 11. ⬜ Create Terms of Service Screen
**File to Create:** `frontend/src/screens/TermsOfServiceScreen.tsx`

**Content Needed:**
- Acceptable use policy
- Intellectual property rights
- Disclaimer (AI-generated content accuracy)
- Termination clause
- Governing law

**Then Link:** From `SettingsScreen.tsx` "Terms & Conditions" button

### 12. ⬜ Add App Icon and Splash Screen
**Files Needed:**
- `frontend/assets/icon.png` (1024x1024 - you already have orange robot icon)
- `frontend/assets/splash.png` (1242x2688 for iOS, 1080x1920 for Android)

**Update:** `frontend/app.json`
```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FFF6EB"
    }
  }
}
```

### 13. ⬜ Test Dark Mode Across All Screens
**Status:** ThemeContext created, but only 3 screens updated with useTheme()

**Screens That Need Testing:**
- ✅ GamificationScreen (already uses useTheme)
- ✅ StudyPlanScreen (already uses useTheme)
- ✅ SettingsScreen (already uses useTheme)
- ⬜ HomeScreen
- ⬜ LoginScreen
- ⬜ RegisterScreen
- ⬜ AIScannerScreen
- ⬜ QuizGeneratorScreen
- ⬜ LibraryScreen
- ⬜ TimetableScreen
- ⬜ NotificationsScreen
- ⬜ ProfileScreen
- ⬜ AskQuestionScreen
- ⬜ AISummaryScreen
- ⬜ QuizResultScreen

**What to Do:**
For each screen, replace:
```typescript
import { Colors } from '../theme';
```
With:
```typescript
import { useTheme } from '../context/ThemeContext';
// Inside component:
const { theme } = useTheme();
// Use theme.primary instead of Colors.primary
```

---

## 🧪 TESTING CHECKLIST

### Backend Testing
- [ ] MongoDB is running
- [ ] Backend server starts without errors on port 5000
- [ ] Test API endpoint: http://localhost:5000/api/v1/gamification/profile
- [ ] Test API endpoint: http://localhost:5000/api/v1/study-plans/today
- [ ] Check logs for any errors

### Frontend Testing
- [ ] App starts in Expo without errors
- [ ] Can navigate to GamificationScreen
- [ ] Can navigate to StudyPlanScreen
- [ ] Dark mode toggle works in Settings
- [ ] Theme persists after app restart
- [ ] Can generate AI study plan (requires OpenAI API key)
- [ ] Can earn points and unlock badges
- [ ] Can see leaderboard
- [ ] Can complete tasks in study plan
- [ ] All animations work smoothly

### Full Flow Testing
1. [ ] Register new user
2. [ ] Log in
3. [ ] Navigate to Study Plan screen
4. [ ] Generate AI study plan (enter study hours like "6")
5. [ ] Complete a task (check checkbox)
6. [ ] Navigate to Gamification screen
7. [ ] See points awarded (20 points per task)
8. [ ] Check if badge unlocked
9. [ ] Log activity to update streak
10. [ ] Toggle dark mode in Settings
11. [ ] Verify theme persists after closing/reopening app

---

## 📊 ENVIRONMENT VERIFICATION

### ✅ Backend Environment (.env file)
Your `.env` file already has all required values:
- ✅ `MONGODB_URI` - Set
- ✅ `JWT_ACCESS_SECRET` - Set
- ✅ `JWT_REFRESH_SECRET` - Set
- ✅ `OPENAI_API_KEY` - Set (sk-proj-...)
- ✅ `CLOUDINARY_CLOUD_NAME` - Set (dbpezb8mc)
- ✅ `CLOUDINARY_API_KEY` - Set
- ✅ `CLOUDINARY_API_SECRET` - Set
- ✅ `EMAIL_HOST/USER/PASS` - Set (Gmail SMTP)

**No backend .env changes needed!** ✅

### Frontend Environment
**File:** `frontend/src/api/client.ts`
**Current:** `const BASE_URL = 'http://localhost:5000/api/v1';`

**For Production:** Update to your deployed backend URL

---

## 🚨 KNOWN ISSUES

### Issue 1: React Version Conflict
**Status:** Not fixed yet
**Impact:** Can't install new dependencies
**Fix:** See task #1 above

### Issue 2: New Screens Not in Navigation
**Status:** Not fixed yet
**Impact:** Can't access Gamification or Study Plan features
**Fix:** See task #5 above

### Issue 3: MongoDB Not Running
**Status:** Unknown (need to verify)
**Impact:** Backend won't start
**Fix:** See task #2 above

---

## 🎯 PRIORITY ORDER

### HIGH PRIORITY (Do these first)
1. ✅ Fix React version conflict (Task #1)
2. ✅ Start MongoDB (Task #2)
3. ✅ Install frontend dependencies (Task #4)
4. ✅ Add screens to navigation (Task #5)
5. ✅ Start backend server (Task #3)
6. ✅ Start frontend app (Task #7)
7. ✅ Test basic functionality

### MEDIUM PRIORITY (Do soon)
8. ⬜ Link screens from HomeScreen (Task #6)
9. ⬜ Add Lottie animations (Task #8)
10. ⬜ Test dark mode on all screens (Task #13)

### LOW PRIORITY (Nice to have)
11. ⬜ Setup Firebase notifications (Task #9)
12. ⬜ Create Privacy Policy (Task #10)
13. ⬜ Create Terms of Service (Task #11)
14. ⬜ Update app icon/splash (Task #12)

---

## 📝 QUICK START COMMANDS

**To get everything running NOW:**

```bash
# Terminal 1 - Start MongoDB
mongod

# Terminal 2 - Backend
cd backend
npm run dev

# Terminal 3 - Frontend (after fixing React version)
cd frontend
npm install react@19.1.4 --save
npm install --legacy-peer-deps
npx expo start
```

Then press `a` for Android or `i` for iOS.

---

## 💡 HELPFUL TIPS

1. **Verify MongoDB is running:** Open MongoDB Compass and connect to `mongodb://localhost:27017`

2. **Check backend logs:** If backend fails, read the error message - usually MongoDB connection or missing .env

3. **Frontend won't start:** Run `npx expo doctor` to check for issues

4. **API calls failing:** Check that `BASE_URL` in `frontend/src/api/client.ts` matches your backend port (5000)

5. **Dark mode not working:** Make sure App.tsx has `<ThemeProvider>` wrapping everything (already done ✅)

6. **Can't see new screens:** Check AppNavigator.tsx - new screens must be imported and added as Stack.Screen

---

## 📞 NEXT STEPS AFTER SETUP

Once everything is running:

1. **Test AI Features:**
   - Generate study plan (uses OpenAI GPT-4)
   - Ask questions to AI tutor
   - Generate quiz from notes
   - Scan documents with OCR

2. **Test Gamification:**
   - Complete study tasks → earn 20 points
   - Log daily activity → update streak
   - Unlock badges at milestones
   - Check leaderboard ranking

3. **Customize:**
   - Add your own badge types in `backend/src/models/Gamification.js`
   - Adjust point values in controllers
   - Change theme colors in `frontend/src/theme/index.ts`
   - Add more task types in StudyPlan model

---

**Last Updated:** May 26, 2026  
**Status:** Ready for manual setup 🚀

**Questions?** Check the terminal errors or backend logs for specific issues.
