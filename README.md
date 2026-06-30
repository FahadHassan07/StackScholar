# AI Study Assistant

An AI-powered mobile learning application that helps students study more effectively using intelligent quiz generation, note summarization, OCR, voice learning, and progress analytics.

Built using **React Native**, **Node.js**, **Express**, **MongoDB**, and **OpenAI APIs**.

---

## Features

### AI Learning

* AI Quiz Generator
* AI Note Summarizer
* AI Tutor
* Voice Learning (Text-to-Speech)
* OCR Note Scanner
* Personalized Study Recommendations

### Study Management

* Subject-wise Notes
* Digital Library
* Study Timetable
* Progress Tracking
* Quiz History
* Learning Analytics

### Authentication & Security

* JWT Authentication
* Google Sign-In
* Password Hashing
* Protected Routes
* Input Validation
* Rate Limiting

---

## Tech Stack

| Category       | Technology                      |
| -------------- | ------------------------------- |
| Frontend       | React Native, Expo, TypeScript  |
| Backend        | Node.js, Express.js             |
| Database       | MongoDB, Mongoose               |
| Authentication | JWT, Google OAuth               |
| AI             | OpenAI API                      |
| OCR            | Tesseract OCR                   |
| Storage        | Cloudinary                      |
| Navigation     | React Navigation                |
| Animations     | React Native Reanimated, Lottie |

---

## System Architecture

```
                React Native App
                       │
              REST API (Express)
                       │
      ┌────────────────┼────────────────┐
      │                │                │
 MongoDB          OpenAI API      Cloudinary
      │                │                │
      └──────── OCR + AI Services ──────┘
```

---

## Key Functionalities

### AI Quiz Generator

Generate multiple-choice quizzes from any topic or study material.

### AI Summarizer

Convert long notes into concise summaries, bullet points, or detailed explanations.

### AI Tutor

Ask questions about any concept and receive AI-generated explanations.

### OCR Scanner

Extract text from handwritten or printed notes using Optical Character Recognition.

### Voice Learning

Convert study material into natural speech for hands-free learning.

### Analytics Dashboard

Track study time, quiz performance, and overall learning progress.

---

## Project Structure

```
AI-Study-Assistant
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middlewares
│   ├── services
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── components
│   ├── screens
│   ├── navigation
│   ├── hooks
│   ├── context
│   ├── assets
│   └── App.tsx
│
├── README.md
└── package.json
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/AI-Study-Assistant.git
cd AI-Study-Assistant
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npx expo start
```

---

## Environment Variables

Backend

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret

OPENAI_API_KEY=your_openai_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_key

CLOUDINARY_API_SECRET=your_secret
```

Frontend

```env
EXPO_PUBLIC_API_URL=http://YOUR_IP:5000/api/v1
```

---

## API Overview

### Authentication

```
POST /auth/register
POST /auth/login
GET /auth/profile
```

### AI

```
POST /ai/quiz
POST /ai/summarize
POST /ai/chat
POST /ai/tts
```

### OCR

```
POST /ocr/scan
POST /ocr/scan-summary
```

### Notes

```
GET /notes
POST /notes
PUT /notes/:id
DELETE /notes/:id
```

---

## Screenshots

Add screenshots inside a `screenshots` folder.

```
screenshots/
│
├── home.png
├── login.png
├── quiz.png
├── summary.png
├── analytics.png
└── profile.png
```

Example

```md
## Home

![Home](screenshots/home.png)

## AI Quiz

![Quiz](screenshots/quiz.png)

## Analytics

![Analytics](screenshots/analytics.png)
```

---

## Core Features

* AI-powered quiz generation
* AI note summarization
* OCR text extraction
* AI tutor chatbot
* Voice learning
* Secure authentication
* Progress analytics
* Responsive UI
* Dark mode
* Study history

---

## Security

* JWT Authentication
* Password Encryption
* Protected APIs
* Request Validation
* Error Handling
* Rate Limiting

---

## Technologies Used

Frontend

* React Native
* Expo
* TypeScript
* React Navigation
* Axios
* Lottie
* Reanimated

Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* Multer
* Bcrypt

AI

* OpenAI
* OCR
* Cloudinary

---

## Future Improvements

* Flashcards
* Spaced Repetition
* Study Groups
* Push Notifications
* Offline Mode
* Web Version
* Multi-language Support
* AI Study Planner

---

## Why This Project?

This project demonstrates practical experience in building an AI-enabled full-stack mobile application. It integrates authentication, REST APIs, cloud storage, AI services, OCR, analytics, and modern mobile development practices into a scalable architecture.

---

## Skills Demonstrated

* Full Stack Development
* REST API Design
* React Native
* Express.js
* MongoDB
* Authentication
* AI Integration
* OCR Integration
* State Management
* Mobile UI Development
* Cloud Services
* TypeScript

---

## Performance

* Modular Architecture
* Reusable Components
* Secure Authentication
* Optimized API Calls
* Responsive Design
* Scalable Backend

---

## Deployment

Backend

* Railway
* Render

Database

* MongoDB Atlas

Frontend

* Expo
* EAS Build

---

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---


**Fahad Hassan**

GitHub: https://github.com/FahadHassan07



If you found this project useful, consider giving it a ⭐ on GitHub.
