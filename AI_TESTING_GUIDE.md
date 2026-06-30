# 🧪 AI FEATURES TESTING GUIDE

Complete guide to test all AI-powered features in your Study Assistant app.

---

## 📋 PREREQUISITES

### 1. Get OpenAI API Key

1. **Go to:** https://platform.openai.com/signup
2. **Sign up** or login
3. **Navigate to:** API Keys → Create new secret key
4. **Copy key:** `sk-...` (starts with sk-)
5. **Important:** This key has REAL costs, monitor usage!

**FREE TIER:**
- $5 free credits (expires after 3 months)
- After that: Pay-as-you-go
- **Cost:** ~$0.002 per 1K tokens (very cheap!)

### 2. Add API Key to Backend

Edit `backend/.env`:

```env
OPENAI_API_KEY=sk-your-actual-key-here
```

### 3. Restart Backend

```powershell
cd backend
npm run dev
```

Look for log:
```
✅ OpenAI API configured
```

---

## 🔍 TESTING CHECKLIST

- [ ] Backend running with OpenAI key
- [ ] Frontend connected to backend
- [ ] Expo app running on device
- [ ] Internet connection active
- [ ] MongoDB connected

---

## 🧠 TEST 1: AI QUIZ GENERATOR

### What it Does:
Generates multiple-choice quizzes from any topic using GPT-4

### Backend Endpoint:
```
POST /api/v1/ai/quiz
```

### Test Steps:

#### Step 1: Test via API (Postman/cURL)

```powershell
curl -X POST http://localhost:5000/api/v1/ai/quiz `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_JWT_TOKEN" `
  -d '{
    "topic": "Python Programming",
    "difficulty": "medium",
    "numQuestions": 5
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "quizId": "abc123",
    "topic": "Python Programming",
    "questions": [
      {
        "id": "q1",
        "question": "What is a list in Python?",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "B",
        "explanation": "Lists are..."
      }
    ]
  }
}
```

#### Step 2: Test in Mobile App

1. **Open app** → Login
2. **Navigate:** Home → "AI Quiz" button
3. **Fill form:**
   - Topic: "JavaScript Basics"
   - Difficulty: Medium
   - Questions: 5
4. **Click:** "Generate Quiz"
5. **Wait:** 5-10 seconds (loading state should show)
6. **Verify:**
   - ✅ 5 questions generated
   - ✅ Each has 4 options
   - ✅ Questions are relevant
   - ✅ Grammar is correct
   - ✅ Can select answers
   - ✅ Submit works

#### Step 3: Take Quiz

1. **Answer all questions**
2. **Click:** "Submit Quiz"
3. **Verify Results Screen:**
   - ✅ Score percentage shown
   - ✅ Correct/incorrect highlighted
   - ✅ Explanations appear
   - ✅ Can retake quiz

### Troubleshooting:

**Error:** "OpenAI API key not configured"
- **Fix:** Add `OPENAI_API_KEY` to `backend/.env`

**Error:** "Insufficient quota"
- **Fix:** Add payment method at https://platform.openai.com/account/billing

**Error:** "Request timeout"
- **Fix:** Reduce `numQuestions` to 3, check internet

---

## 📝 TEST 2: AI SUMMARY GENERATOR

### What it Does:
Summarizes notes/text in bullet points, paragraph, or essay format

### Backend Endpoint:
```
POST /api/v1/ai/summarize
```

### Test Steps:

#### Step 1: Test via API

```powershell
curl -X POST http://localhost:5000/api/v1/ai/summarize `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_JWT_TOKEN" `
  -d '{
    "notes": "Photosynthesis is the process by which plants convert light energy into chemical energy. It occurs in chloroplasts and involves two stages: light-dependent reactions and light-independent reactions (Calvin cycle). The overall equation is 6CO2 + 6H2O + light → C6H12O6 + 6O2.",
    "subject": "Biology",
    "style": "bullet"
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "summary": "• Photosynthesis converts light to chemical energy\n• Occurs in chloroplasts\n• Two stages: light-dependent and Calvin cycle\n• Formula: 6CO2 + 6H2O + light → C6H12O6 + 6O2"
  }
}
```

#### Step 2: Test in Mobile App

1. **Navigate:** Home → "AI Scanner" or "AI Summary"
2. **Enter text** (paste sample notes)
3. **Select:**
   - Subject: "Biology"
   - Style: "Bullet Points"
4. **Click:** "Summarize"
5. **Verify:**
   - ✅ Summary generated in 3-5 seconds
   - ✅ Format matches selected style
   - ✅ Key points extracted
   - ✅ Can copy summary
   - ✅ Can save to library

### Test Different Styles:

1. **Bullet Points:**
   ```
   • Point 1
   • Point 2
   • Point 3
   ```

2. **Paragraph:**
   ```
   This is a concise paragraph summarizing the key concepts...
   ```

3. **Essay:**
   ```
   Introduction paragraph...
   
   Body paragraphs with detailed analysis...
   
   Conclusion...
   ```

---

## 💬 TEST 3: AI Q&A (Ask Question)

### What it Does:
Answer any study-related question with explanations

### Backend Endpoint:
```
POST /api/v1/ai/ask
```

### Test Steps:

#### Step 1: Test via API

```powershell
curl -X POST http://localhost:5000/api/v1/ai/ask `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_JWT_TOKEN" `
  -d '{
    "question": "Explain Newtons second law of motion",
    "context": "Physics - Classical Mechanics"
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "answer": "Newton's second law states that F = ma...",
    "related": ["Newton's First Law", "Momentum"]
  }
}
```

#### Step 2: Test in Mobile App

1. **Navigate:** Home → "Ask Question"
2. **Type:** "What is quantum entanglement?"
3. **Click:** Send ✉️
4. **Verify:**
   - ✅ AI response appears in chat
   - ✅ Answer is educational
   - ✅ Can ask follow-up questions
   - ✅ Chat history preserved

### Test Questions:

Try these to verify quality:

1. **Math:** "How do I solve quadratic equations?"
2. **Science:** "Explain photosynthesis simply"
3. **History:** "What caused World War 1?"
4. **Programming:** "What is a for loop in Python?"
5. **Language:** "Conjugate the verb 'to be' in Spanish"

---

## 🔊 TEST 4: AI VOICE (Text-to-Speech)

### What it Does:
Converts text to natural-sounding speech using OpenAI TTS

### Backend Endpoint:
```
POST /api/v1/ai/speak
```

### Test Steps:

#### Step 1: Test via API

```powershell
curl -X POST http://localhost:5000/api/v1/ai/speak `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_JWT_TOKEN" `
  -d '{
    "text": "Hello! This is a test of the AI voice system.",
    "voice": "alloy",
    "format": "mp3"
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "audio": "base64-encoded-mp3-data...",
    "duration": 3.5
  }
}
```

#### Step 2: Test in Mobile App

**Prerequisites:**
```powershell
cd frontend
npm install expo-file-system
```

1. **Navigate:** Ask Question screen
2. **Ask:** "Explain gravity"
3. **Wait for AI response**
4. **Click:** 🔊 Voice Player button
5. **Verify:**
   - ✅ "Generating audio..." appears
   - ✅ Audio plays automatically
   - ✅ Can pause/play
   - ✅ Progress bar shows
   - ✅ Voice is clear and natural

### Test Different Voices:

OpenAI TTS has 6 voices:
- **alloy** - Neutral, balanced
- **echo** - Deep, authoritative
- **fable** - Warm, expressive  
- **onyx** - Deep, strong
- **nova** - Friendly, energetic
- **shimmer** - Soft, calm

**Test each:**
1. Modify `AIVoicePlayer.tsx` voice prop
2. Generate speech
3. Compare quality

---

## 🎯 TEST 5: AI RECOMMENDATIONS

### What it Does:
Analyzes study patterns and suggests improvements

### Backend Endpoint:
```
GET /api/v1/ai/recommendations/:userId
```

### Test Steps:

#### Step 1: Generate Sample Data

```powershell
# Create mock study activity
curl -X POST http://localhost:5000/api/v1/analytics/log-activity `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_JWT_TOKEN" `
  -d '{
    "type": "quiz",
    "subject": "Math",
    "score": 65,
    "duration": 600
  }'
```

#### Step 2: Test in Mobile App

1. **Navigate:** Home → "AI Recommendations" card
2. **View recommendations:**
   - ✅ Weak subjects identified
   - ✅ Study time suggestions
   - ✅ Difficulty adjustments
   - ✅ Personalized tips

---

## 📸 TEST 6: OCR + AI SUMMARY

### What it Does:
Scans images of notes → Extract text → AI Summary

### Backend Endpoint:
```
POST /api/v1/ocr/scan-and-summarize
```

### Test Steps:

#### Step 1: Prepare Test Images

Create test images with text:
1. Handwritten notes
2. Typed textbook pages
3. Whiteboard photos

#### Step 2: Test via Mobile App

1. **Navigate:** AI Scanner screen
2. **Click:** Camera icon 📷
3. **Take photo** of notes OR **Select from gallery**
4. **Wait:** OCR processing (2-5 seconds)
5. **Verify:**
   - ✅ Text extracted correctly
   - ✅ Can edit extracted text
   - ✅ Click "Summarize with AI"
   - ✅ Summary appears

#### Step 3: Test Accuracy

Compare:
- Original text in image
- Extracted text
- AI summary

**Quality Metrics:**
- OCR accuracy: >95%
- Summary quality: Captures key points
- Processing time: <10 seconds

---

## 📊 PERFORMANCE TESTING

### Response Times (Expected)

| Feature | Time | Acceptable | Slow |
|---------|------|------------|------|
| Quiz (5Q) | 8-12s | <15s | >20s |
| Summary | 3-5s | <8s | >10s |
| Q&A | 2-4s | <6s | >10s |
| Voice | 2-3s | <5s | >8s |
| OCR | 1-3s | <5s | >8s |

### Cost Tracking

Monitor costs at: https://platform.openai.com/usage

**Estimated costs per 100 users:**
- Quiz: $0.10 (5 questions)
- Summary: $0.02
- Q&A: $0.03
- Voice: $0.05 (30 seconds)

**Monthly estimate:** $20-50 for 1000 active users

---

## 🐛 COMMON ISSUES

### Issue 1: "Request failed with status 401"
**Cause:** Invalid or missing API key  
**Fix:** Check `OPENAI_API_KEY` in `.env`

### Issue 2: "Rate limit exceeded"
**Cause:** Too many requests  
**Fix:** Wait 60 seconds, add rate limiting

### Issue 3: "Content policy violation"
**Cause:** Inappropriate input  
**Fix:** Filter user input, add moderation

### Issue 4: Voice doesn't play
**Cause:** Missing expo-file-system  
**Fix:** `npm install expo-file-system`

### Issue 5: Slow responses
**Cause:** Large prompts, slow internet  
**Fix:** Reduce input size, use gpt-3.5-turbo

---

## ✅ TESTING CHECKLIST

### Basic Tests
- [ ] Backend starts without errors
- [ ] OpenAI API key loaded
- [ ] All endpoints respond (200 OK)
- [ ] Frontend connects to backend
- [ ] Loading states show correctly

### AI Quiz
- [ ] Generate 5-question quiz
- [ ] Questions are relevant
- [ ] Can take quiz
- [ ] Results show correctly
- [ ] Can retake quiz

### AI Summary
- [ ] Bullet points format works
- [ ] Paragraph format works
- [ ] Essay format works
- [ ] Can save summary
- [ ] Handles long text (>1000 words)

### AI Q&A
- [ ] Simple questions answered
- [ ] Follow-up questions work
- [ ] Chat history preserved
- [ ] Can clear chat
- [ ] Handles edge cases

### Voice TTS
- [ ] Audio generates
- [ ] Audio plays
- [ ] Can pause/resume
- [ ] Progress bar updates
- [ ] Different voices work

### OCR + AI
- [ ] Image uploads
- [ ] Text extracted accurately
- [ ] Can edit OCR text
- [ ] AI summary from OCR works
- [ ] Saves to library

---

## 🎯 SUCCESS CRITERIA

**Your AI features are production-ready if:**

✅ All 6 tests pass  
✅ Response times < 10 seconds  
✅ Accuracy > 90%  
✅ No crashes or errors  
✅ Costs < $50/month for 1000 users  
✅ Users find it helpful  

---

## 📈 MONITORING

### Track These Metrics:

1. **Usage:**
   - Queries per day
   - Peak hours
   - Most used features

2. **Performance:**
   - Average response time
   - Error rate
   - Success rate

3. **Costs:**
   - Daily spend
   - Cost per user
   - Monthly projection

4. **Quality:**
   - User ratings
   - Feature adoption
   - Retention rate

---

## 🚀 NEXT STEPS

After testing:

1. **Deploy to production** (see DEPLOYMENT_GUIDE.md)
2. **Monitor costs** for first week
3. **Gather user feedback**
4. **Optimize prompts** for better results
5. **Add more AI features:**
   - Flashcard generation
   - Study plan creation
   - Past paper analysis
   - Personalized tutoring

---

**Happy Testing! Your AI features are powerful! 🧠✨**
