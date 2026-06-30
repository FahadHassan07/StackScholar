# 🤝 Contributing to AI Study Assistant

First off, thank you for considering contributing to AI Study Assistant! 🎉

It's people like you that make this project such a great tool for students worldwide.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)
- [Issue Guidelines](#issue-guidelines)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to fostering an open and welcoming environment. Please be respectful and constructive.

**Our Standards:**
- ✅ Using welcoming and inclusive language
- ✅ Being respectful of differing viewpoints
- ✅ Gracefully accepting constructive criticism
- ✅ Focusing on what is best for the community
- ❌ Trolling, insulting/derogatory comments, and personal attacks
- ❌ Publishing others' private information without permission

---

## 🎯 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include as many details as possible:

**Use this template:**

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - Device: [e.g. iPhone 12, Samsung Galaxy S21]
 - OS: [e.g. iOS 15, Android 12]
 - App Version: [e.g. 1.0.0]

**Additional context**
Any other context about the problem.
```

### ✨ Suggesting Features

Feature requests are welcome! Please provide:

- Clear description of the feature
- Why it would be useful
- Possible implementation approach (if you have ideas)

**Use this template:**

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Any alternative solutions or features you've considered.

**Additional context**
Any other context or screenshots about the feature request.
```

### 🔧 Good First Issues

New to the project? Look for issues labeled `good first issue`:
- [Good First Issues](https://github.com/MalithShehan/AI-Smart-Study-Assistant/labels/good%20first%20issue)

These are typically:
- Documentation improvements
- Simple bug fixes
- UI/UX tweaks
- Adding tests

---

## 💻 Development Setup

### Prerequisites

- Node.js 18+
- MongoDB 6.0+
- Git
- Code editor (VS Code recommended)

### Setup Steps

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/AI-Smart-Study-Assistant.git
   cd AI-Smart-Study-Assistant
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/MalithShehan/AI-Smart-Study-Assistant.git
   ```

4. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

5. **Set up environment variables**
   ```bash
   # Copy example files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   
   # Edit with your values
   ```

6. **Start development servers**
   ```bash
   # Use the quick start script
   .\START.ps1
   
   # Or manually:
   # Terminal 1: Backend
   cd backend && npm run dev
   
   # Terminal 2: Frontend
   cd frontend && npx expo start
   ```

### Project Structure

```
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── middlewares/  # Auth, validation, etc.
│   │   └── utils/        # Helpers
│   └── tests/            # Backend tests
│
├── frontend/             # React Native + Expo
│   ├── src/
│   │   ├── screens/      # App screens
│   │   ├── components/   # Reusable components
│   │   ├── navigation/   # React Navigation
│   │   ├── theme/        # Colors, fonts
│   │   └── types/        # TypeScript types
│   └── __tests__/        # Frontend tests
```

---

## 🚀 Pull Request Process

1. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/bug-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow coding guidelines below
   - Add/update tests if needed
   - Update documentation if needed

3. **Test your changes**
   ```bash
   # Backend tests
   cd backend && npm test
   
   # Frontend tests
   cd frontend && npm test
   
   # Manual testing
   # Test on both iOS and Android if possible
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "✨ Add amazing feature"
   ```
   See [Commit Messages](#commit-messages) for guidelines

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template
   - Link related issues

### PR Requirements

- ✅ Descriptive title and description
- ✅ All tests passing
- ✅ No merge conflicts
- ✅ Follows coding guidelines
- ✅ Documentation updated (if needed)
- ✅ Screenshots/videos for UI changes

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Fixes #(issue number)

## Testing
How has this been tested?
- [ ] Manual testing
- [ ] Unit tests
- [ ] Integration tests

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] My code follows the project's coding guidelines
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] All tests pass locally
```

---

## 📝 Coding Guidelines

### TypeScript (Frontend)

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

const fetchUser = async (id: string): Promise<User> => {
  const response = await apiGet(`/users/${id}`);
  return response.data;
};

// ❌ Bad
const fetchUser = async (id) => {
  const response = await apiGet("/users/" + id);
  return response.data;
};
```

**Rules:**
- Use TypeScript for all new code
- Define interfaces for data structures
- Use `const` and `let`, never `var`
- Use async/await over promises
- Use meaningful variable names
- Add JSDoc comments for complex functions

### JavaScript (Backend)

```javascript
// ✅ Good
const createQuiz = async (req, res) => {
  const { topic, difficulty, numQuestions } = req.body;
  
  const quiz = await aiService.generateQuiz({
    topic,
    difficulty,
    numQuestions,
  });
  
  return res.json({ success: true, data: quiz });
};

// ❌ Bad
const createQuiz = async (req, res) => {
  const quiz = await aiService.generateQuiz(req.body.topic, req.body.difficulty, req.body.numQuestions);
  return res.json({ success: true, data: quiz });
};
```

**Rules:**
- Use ES6+ features
- Destructure objects and arrays
- Use arrow functions for callbacks
- Handle errors properly
- Use async/await consistently

### React Native Components

```typescript
// ✅ Good
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

export const Button: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    backgroundColor: '#FF7A00',
    borderRadius: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

// ❌ Bad - Using inline styles
export const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={{ padding: 16, backgroundColor: '#FF7A00' }} onPress={onPress}>
      <Text style={{ color: '#FFFFFF' }}>{title}</Text>
    </TouchableOpacity>
  );
};
```

**Rules:**
- Use functional components with hooks
- Use StyleSheet.create() for styles
- Type all props with interfaces
- Keep components focused and small
- Extract reusable logic into hooks

### File Naming

- **Components:** PascalCase - `Button.tsx`, `UserProfile.tsx`
- **Screens:** PascalCase + "Screen" - `HomeScreen.tsx`, `LoginScreen.tsx`
- **Utilities:** camelCase - `apiClient.ts`, `formatDate.ts`
- **Types:** PascalCase - `User.ts`, `Quiz.ts`
- **Constants:** UPPER_SNAKE_CASE - `API_URL`, `MAX_RETRIES`

---

## 💬 Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **✨ feat:** New feature
- **🐛 fix:** Bug fix
- **📝 docs:** Documentation changes
- **🎨 style:** Code style changes (formatting, etc.)
- **♻️ refactor:** Code refactoring
- **⚡ perf:** Performance improvements
- **✅ test:** Adding or updating tests
- **🔧 chore:** Build process or auxiliary tool changes
- **🚀 deploy:** Deployment changes

### Examples

```bash
# Good commits
✨ feat(ai): Add voice speed control to TTS
🐛 fix(auth): Fix token expiration handling
📝 docs: Update installation instructions
♻️ refactor(quiz): Simplify quiz generation logic
⚡ perf(api): Optimize database queries
```

```bash
# Bad commits
❌ fixed stuff
❌ update
❌ WIP
❌ asdfasdf
```

### Tips

- Use the imperative mood ("Add feature" not "Added feature")
- First line should be 50 characters or less
- Reference issues: "Fixes #123" or "Closes #456"
- Explain *what* and *why*, not *how*

---

## 🏷️ Issue Guidelines

### Creating Issues

**Good Issue:**
```markdown
Title: Quiz generation fails with math topics

**Description:**
When trying to generate a quiz with topic "Calculus", the app crashes.

**Steps to Reproduce:**
1. Login to app
2. Navigate to Quiz Generator
3. Enter "Calculus" as topic
4. Click "Generate Quiz"
5. App crashes

**Expected:** Quiz should be generated
**Actual:** App crashes with error "Cannot read property 'map' of undefined"

**Environment:**
- Device: iPhone 13
- iOS: 16.0
- App Version: 1.0.0

**Screenshots:**
[Attach screenshot of error]
```

**Bad Issue:**
```markdown
Title: doesn't work

app crashes help
```

### Labels

When creating issues, add appropriate labels:

- `bug` - Something isn't working
- `enhancement` - New feature request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested
- `ai-feature` - Related to AI features
- `frontend` - React Native related
- `backend` - Node.js related

---

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests (if available)
npm run test:e2e
```

### Writing Tests

**Example Backend Test:**
```javascript
describe('Quiz Generation', () => {
  it('should generate a quiz with correct number of questions', async () => {
    const quiz = await aiService.generateQuiz({
      topic: 'JavaScript',
      difficulty: 'medium',
      numQuestions: 5,
    });
    
    expect(quiz.questions).toHaveLength(5);
    expect(quiz.topic).toBe('JavaScript');
  });
});
```

**Example Frontend Test:**
```typescript
describe('Button Component', () => {
  it('should call onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<Button title="Click Me" onPress={mockOnPress} />);
    
    fireEvent.press(getByText('Click Me'));
    
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
```

---

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [MongoDB Documentation](https://docs.mongodb.com)

---

## 🎉 Recognition

Contributors will be:
- Listed in README.md
- Shown on GitHub contributors page
- Mentioned in release notes (for significant contributions)

---

## ❓ Questions?

- 💬 [Start a Discussion](https://github.com/MalithShehan/AI-Smart-Study-Assistant/discussions)
- 🐛 [Open an Issue](https://github.com/MalithShehan/AI-Smart-Study-Assistant/issues)

---

**Thank you for contributing! 🙏**

Every contribution, no matter how small, makes a difference! ⭐
