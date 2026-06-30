# 🚀 QUICK START - Run App Locally

# This script sets up and runs your AI Study Assistant app

Write-Host "🎉 AI STUDY ASSISTANT - QUICK START" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if in correct directory
if (!(Test-Path "backend") -or !(Test-Path "frontend")) {
    Write-Host "❌ Error: Run this script from project root directory" -ForegroundColor Red
    Write-Host "   Expected: C:\Users\ASUS\Documents\ai-study-assistant\" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Project directory found" -ForegroundColor Green
Write-Host ""

# 1. Install Dependencies
Write-Host "📦 Step 1: Installing Dependencies..." -ForegroundColor Yellow
Write-Host ""

Write-Host "   Installing backend packages..." -ForegroundColor Gray
cd backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend install failed" -ForegroundColor Red
    exit 1
}
cd ..

Write-Host "   Installing frontend packages (including expo-file-system)..." -ForegroundColor Gray
cd frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend install failed" -ForegroundColor Red
    exit 1
}
cd ..

Write-Host ""
Write-Host "✅ All dependencies installed!" -ForegroundColor Green
Write-Host ""

# 2. Check Environment Files
Write-Host "🔧 Step 2: Checking Environment Variables..." -ForegroundColor Yellow
Write-Host ""

# Check backend .env
if (!(Test-Path "backend\.env")) {
    Write-Host "⚠️  backend/.env not found. Creating from template..." -ForegroundColor Yellow
    
    $backendEnv = @"
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/ai_study_assistant

# JWT
JWT_SECRET=your-super-secure-jwt-secret-change-this-in-production
JWT_EXPIRES_IN=7d

# OpenAI API (Get from: https://platform.openai.com/api-keys)
OPENAI_API_KEY=

# Cloudinary (Get from: https://cloudinary.com)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email (Optional - Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASSWORD=
EMAIL_FROM=AI Study Assistant <noreply@example.com>

# CORS
CORS_ORIGIN=*

# API
API_PREFIX=/api/v1

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
"@
    
    Set-Content -Path "backend\.env" -Value $backendEnv
    Write-Host "   ✅ Created backend/.env" -ForegroundColor Green
} else {
    Write-Host "   ✅ backend/.env exists" -ForegroundColor Green
}

# Check frontend .env
if (!(Test-Path "frontend\.env")) {
    Write-Host "⚠️  frontend/.env not found. Creating..." -ForegroundColor Yellow
    
    # Get computer IP
    $ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notmatch "Loopback"} | Select-Object -First 1).IPAddress
    
    $frontendEnv = @"
# Backend API URL
# Local development (use your computer's IP for mobile testing)
EXPO_PUBLIC_API_URL=http://${ip}:5000/api/v1

# For emulator only, use:
# EXPO_PUBLIC_API_URL=http://localhost:5000/api/v1
"@
    
    Set-Content -Path "frontend\.env" -Value $frontendEnv
    Write-Host "   ✅ Created frontend/.env with IP: $ip" -ForegroundColor Green
} else {
    Write-Host "   ✅ frontend/.env exists" -ForegroundColor Green
}

Write-Host ""

# 3. Check MongoDB
Write-Host "🗄️  Step 3: Checking MongoDB..." -ForegroundColor Yellow
Write-Host ""

$mongoRunning = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
if ($mongoRunning) {
    Write-Host "   ✅ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  MongoDB not detected" -ForegroundColor Yellow
    Write-Host "   Start MongoDB with: net start MongoDB" -ForegroundColor Gray
    Write-Host "   Or install from: https://www.mongodb.com/try/download/community" -ForegroundColor Gray
}

Write-Host ""

# 4. Display Configuration Status
Write-Host "📋 Configuration Status:" -ForegroundColor Yellow
Write-Host ""

# Check OpenAI API Key
$backendEnvContent = Get-Content "backend\.env" -Raw
if ($backendEnvContent -match "OPENAI_API_KEY=sk-") {
    Write-Host "   ✅ OpenAI API Key: Configured" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  OpenAI API Key: NOT SET" -ForegroundColor Yellow
    Write-Host "      → Get key from: https://platform.openai.com/api-keys" -ForegroundColor Gray
    Write-Host "      → Add to backend/.env: OPENAI_API_KEY=sk-..." -ForegroundColor Gray
    Write-Host "      → Required for AI features (quiz, summary, chat, voice)" -ForegroundColor Gray
}

Write-Host ""

# Check Cloudinary
if ($backendEnvContent -match "CLOUDINARY_CLOUD_NAME=\w+") {
    Write-Host "   ✅ Cloudinary: Configured" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Cloudinary: NOT SET" -ForegroundColor Yellow
    Write-Host "      → Get credentials from: https://cloudinary.com" -ForegroundColor Gray
    Write-Host "      → Required for image/PDF uploads" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 5. Prompt to start servers
Write-Host "🚀 Ready to Start!" -ForegroundColor Green
Write-Host ""
Write-Host "Choose an option:" -ForegroundColor Yellow
Write-Host "  1. Start Backend Only" -ForegroundColor White
Write-Host "  2. Start Frontend Only" -ForegroundColor White
Write-Host "  3. Start Both (Recommended)" -ForegroundColor White
Write-Host "  4. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🔧 Starting Backend Server..." -ForegroundColor Cyan
        Write-Host "   URL: http://localhost:5000/api/v1" -ForegroundColor Gray
        Write-Host ""
        cd backend
        npm run dev
    }
    "2" {
        Write-Host ""
        Write-Host "📱 Starting Frontend..." -ForegroundColor Cyan
        Write-Host "   Scan QR code with Expo Go app" -ForegroundColor Gray
        Write-Host ""
        cd frontend
        npx expo start
    }
    "3" {
        Write-Host ""
        Write-Host "🚀 Starting Both Servers..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "⚡ Backend will start first, then Frontend" -ForegroundColor Yellow
        Write-Host "   Press CTRL+C to stop servers" -ForegroundColor Gray
        Write-Host ""
        
        # Start backend in new window
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🔧 Backend Server' -ForegroundColor Cyan; Write-Host 'URL: http://localhost:5000/api/v1' -ForegroundColor Green; Write-Host ''; npm run dev"
        
        # Wait a bit for backend to start
        Start-Sleep -Seconds 3
        
        # Start frontend in current window
        cd frontend
        Write-Host "📱 Frontend Starting..." -ForegroundColor Cyan
        Write-Host ""
        npx expo start
    }
    "4" {
        Write-Host ""
        Write-Host "👋 Goodbye!" -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host ""
        Write-Host "❌ Invalid choice. Exiting." -ForegroundColor Red
        exit 1
    }
}
