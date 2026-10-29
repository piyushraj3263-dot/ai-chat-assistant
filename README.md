# OmniChat — Full-Stack AI Chat Assistant 💬

Hey there! 👋 I'm **Piyush Raj**, a 2nd-year Computer Science & Engineering student. 

I built **OmniChat** to get hands-on experience with how modern web applications integrate with Large Language Model (LLM) APIs. Rather than just using ChatGPT or Claude through a browser, I wanted to understand what actually happens behind the scenes: how HTTP requests are structured, how backend servers securely proxy API keys, and how multi-turn conversation memory is maintained in the client.

---

## 💡 Why I Built This

Earlier, I created a **CGPA Management System** to practice core data handling and logic. For my next project, I wanted to challenge myself by building a full-stack project involving:
1. **Third-party API Integration:** Connecting a Node.js backend to the Anthropic Claude API.
2. **Security Best Practices:** Ensuring secret keys are never exposed in client-side code by using environment variables (`dotenv`) and proper `.gitignore` rules.
3. **Asynchronous JavaScript:** Handling `async/await`, `fetch()` calls, and dynamic DOM updates without page reloads.
4. **Clean UI/UX:** Designing a responsive, dark-mode interface with code snippet formatting and typing animations.

---

## 🛠️ How It Works (Architecture)

```text
Browser (Client)               Backend Server                 Anthropic Claude API
┌──────────────────┐           ┌──────────────────┐           ┌────────────────────┐
│ User types prompt│           │ Express Server   │           │ Cloud LLM Engine   │
│ & views messages ├──────────►│ (server.js)      ├──────────►│                    │
│                  │ POST JSON │ Attaches private │ HTTPS Req │ Processes context  │
│                  │ /api/chat │ API key securely │ with body │ & returns reply    │
│                  │◄──────────┤                  │◄──────────┤                    │
└──────────────────┘ Returns   └──────────────────┘ Receives  └────────────────────┘
                     AI reply                       tokens
```

### The Key Lesson I Learned:
In my first draft, I thought about calling the API directly from the browser's JavaScript. But I quickly realized that anyone could open DevTools (`F12`), look at network requests or source code, and steal the API key! 

To fix this, I built a lightweight **Express.js backend** that acts as a secure intermediary (proxy). The browser only talks to `/api/chat`, and my server handles the sensitive API authentication.

---

## 🚀 Features

- **Multi-Turn Memory:** Retains conversation context so the assistant remembers past questions during a session.
- **Code Formatting:** Automatically detects and formats code blocks and backticks for readable syntax.
- **Dark-Themed UI:** Custom CSS layout with quick-start prompt shortcuts for CS topics (Big-O, interview prep, API concepts).
- **Responsive Design:** Includes mobile sidebar toggle and auto-expanding input field.
- **Environment-based Config:** Separates secrets from code using `.env`.

---

## 🧰 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+), Lucide Icons
- **Backend:** Node.js, Express.js, CORS
- **AI Integration:** `@anthropic-ai/sdk` (Claude API)
- **Tools:** Git, GitHub, npm

---

## 💻 Running Locally

If you want to run this project on your own machine:

### 1. Clone the repo
```bash
git clone https://github.com/piyushraj3263-dot/ai-chat-assistant.git
cd ai-chat-assistant
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your API key
Create a `.env` file in the root folder:
```env
ANTHROPIC_API_KEY=your_claude_api_key_here
PORT=3000
```
*(Get a key from [console.anthropic.com](https://console.anthropic.com))*

### 4. Start the server
```bash
npm start
```
Then open [http://localhost:3000](http://localhost:3000) in your browser!

---

## 📚 What I Learned Building This Project

1. **Client-Server Separation:** How frontend `fetch()` communicates with backend Express routes using JSON bodies.
2. **LLM Mechanics:** What system prompts are, how token limits (`max_tokens`) work, and how conversation arrays (`role: 'user'` / `role: 'assistant'`) maintain context.
3. **API Security:** The importance of `.env` files and keeping production secrets out of public GitHub repositories.
4. **Git Workflow:** Managing branches, clean commit messages, and deployment setup for cloud hosting.

---

## 👤 Author

**Piyush Raj**
- GitHub: [@piyushraj3263-dot](https://github.com/piyushraj3263-dot)
- Education: B.Tech in Computer Science & Engineering (2nd Year)

Feel free to star ⭐ the repo if you found this project helpful!
