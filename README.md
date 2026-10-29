# 🤖 OmniChat AI - Full-Stack AI Chat Assistant

[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org/)
[![Anthropic Claude](https://img.shields.io/badge/AI-Claude%203.5-blueviolet.svg)](https://anthropic.com)
[![Express](https://img.shields.io/badge/Backend-Express.js-black.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A modern, full-stack AI conversational assistant built with **Node.js**, **Express**, and the **Anthropic Claude API**. Designed with a clean, dark-themed responsive UI, multi-turn conversation memory, and secure backend API handling.

---

## 📌 Architecture Overview

How does this app communicate with AI?

```text
┌──────────────────────┐              ┌──────────────────────┐              ┌──────────────────────┐
│                      │              │                      │              │                      │
│   Browser (Frontend) │  HTTP POST   │  Node.js + Express   │  HTTPS POST  │   Anthropic Claude   │
│  HTML / CSS / JS     ├─────────────►│  Backend Server      ├─────────────►│   Cloud API Servers  │
│                      │  /api/chat   │  (Keeps Key Safe)    │              │                      │
│                      │◄─────────────┤                      │◄─────────────┤                      │
└──────────────────────┘  JSON Reply  └──────────────────────┘  AI Tokens   └──────────────────────┘
```

### Why a Backend Server is Necessary:
1. **Security (Secret Keys):** If you call the AI API directly from the browser, anyone can open DevTools and steal your paid API key. The backend hides the key securely in an environment variable (`.env`).
2. **CORS Prevention:** Browser cross-origin policies restrict direct client-to-API calls.
3. **Data Sanitization & Rate Limiting:** The backend validates incoming requests before forwarding them to the LLM.

---

## ✨ Features

- 💬 **Multi-Turn Context Memory:** Retains past messages in the conversation session so the AI remembers what you previously discussed.
- 🎨 **Modern Dark UI:** Glassmorphism aesthetics, responsive sidebar, Lucide icons, and fluid animations.
- ⚡ **Lightweight Markdown & Code Styling:** Automatically renders code snippets with monospace formatting.
- 💡 **Quick Prompts:** One-click shortcuts for Computer Science interview prep, algorithm explanations, and API tutorials.
- 🔒 **Safe Key Management:** Uses `dotenv` and `.gitignore` to guarantee API keys are never leaked to public version control.

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+), [Lucide Icons](https://lucide.dev)
- **Backend:** Node.js, Express.js, CORS
- **AI Integration:** `@anthropic-ai/sdk` (Claude 3.5 Haiku / Sonnet)
- **Environment Management:** `dotenv`

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- An Anthropic Claude API Key (Get one free at [console.anthropic.com](https://console.anthropic.com))

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/ai-chat-assistant.git
cd ai-chat-assistant
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the project root:
```env
ANTHROPIC_API_KEY=your_actual_anthropic_api_key_here
PORT=3000
```

### 5. Run the Application
```bash
npm start
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## 📄 Resume Bullet Points (Copy & Paste Ready)

Add this project to your resume under **Projects**:

> **OmniChat AI — Full-Stack AI Chat Assistant** | *Node.js, Express, Claude API, HTML5/CSS3, JavaScript*
> - Engineered an interactive AI chat assistant using the **Anthropic Claude API**, featuring multi-turn conversation memory and contextual prompt chaining.
> - Built a secure **Node.js/Express** backend proxy preventing client-side API key exposure and managing CORS and rate limiting.
> - Developed a responsive, dark-mode user interface with lightweight real-time markdown formatting and animated typing states.

---

## 🧠 Key Computer Science Concepts Demonstrated

1. **REST APIs & HTTP Protocol:** Request methods (`POST`), headers (`Content-Type`, `Authorization`), and JSON payloads.
2. **Tokens & Context Windows:** How LLMs consume input tokens and produce completion tokens under defined budget limits (`max_tokens`).
3. **Asynchronous JavaScript:** Managing promises and `async/await` for smooth UI rendering without freezing the main thread.
4. **Environment Isolation:** Keeping production credentials separate from source code using 12-factor app principles.

---

## 📜 License
This project is licensed under the MIT License - feel free to modify and adapt it for your own learning!
