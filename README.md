# DevPilot — The Ultimate Computer Science Study & Revision Engine 🚀

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://ai-chat-assistant-gold.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/piyushraj3263-dot/ai-chat-assistant)

🔗 **Live Deployment:** [https://ai-chat-assistant-gold.vercel.app](https://ai-chat-assistant-gold.vercel.app)  
👤 **Author:** [Piyush Raj](https://github.com/piyushraj3263-dot) (2nd Year B.Tech CSE)

---

Hey there! 👋 I'm **Piyush Raj**, a 2nd-year Computer Science & Engineering student. 

I built **DevPilot** to solve a problem every engineering student faces during semester exams and technical placements: having to jump between 10 different websites, textbooks, and documentation to find clear, exam-oriented notes. 

Rather than relying on generic chatbots that produce long, wordy essays, **DevPilot** provides structured, high-yield revision notes, ASCII architectural diagrams, Big-O comparison tables, and production-ready code implementations for every core Computer Science subject.

---

## 📚 Comprehensive Subject Coverage

DevPilot provides instant revision notes and cheatsheets across all core CSE curriculum areas:

1. **Data Structures & Algorithms (DSA):**
   - Asymptotic complexity comparison table (Arrays, Linked Lists, Stacks, Queues, Trees, Heaps).
   - Comparison sorting algorithms (QuickSort, MergeSort, HeapSort) with stability and in-place trade-offs.
   - Master algorithm patterns for technical interviews (Two Pointers, Sliding Window, Floyd's Cycle, BFS/DFS, Dynamic Programming).
   - Clean, bug-free C++ implementations with edge-case handling.

2. **Operating Systems (OS):**
   - Process vs Thread memory layouts and context switching mechanics.
   - CPU Scheduling (FCFS, SJF, Round Robin, Priority) with Turnaround and Waiting Time formulas.
   - Classical synchronization: Semaphores (counting vs binary), Mutex locking, Critical Section problem.
   - Deadlocks: The 4 Coffman conditions, Banker's algorithm, prevention and avoidance.
   - Memory Management: Paging, Segmentation, TLB caching, Page Replacement (FIFO, LRU, Optimal).

3. **Database Management Systems (DBMS) & SQL:**
   - Transaction management & ACID properties with real-world banking examples.
   - Complete Schema Normalization guide (1NF, 2NF, 3NF, BCNF) with dependency tables.
   - SQL Cheatsheet: \`INNER\`, \`LEFT\`, \`RIGHT\` joins, \`GROUP BY\` with \`HAVING\`, aggregate queries.
   - Indexing internals: B+ Trees vs Hash indexing.

4. **Computer Networks (CN):**
   - Complete breakdown of the OSI 7-Layer Model vs TCP/IP Protocol Stack.
   - TCP vs UDP transport layer comparison and TCP 3-Way Handshake flow.
   - Step-by-step DNS resolution lifecycle.
   - IPv4/IPv6 addressing and subnetting.

5. **Object-Oriented Programming (OOP) & System Design:**
   - The 4 Pillars (Encapsulation, Abstraction, Inheritance, Polymorphism) with clean C++ code.
   - SOLID architectural principles with practical code violations and refactorings.

6. **Placement & Technical Interview Cheatsheet:**
   - Top 15 most frequent placement interview questions asked by top tech firms.
   - Memory leak prevention, virtual memory, TCP handshake, and hashing trade-offs.

---

## 🛠️ System Architecture

```text
Browser Client (Workspace)         Node.js + Express Server           Anthropic Claude API
┌─────────────────────────┐        ┌─────────────────────────┐        ┌───────────────────────┐
│ Interactive Subject UI  │        │ Express Backend Proxy   │        │ Cloud LLM Engine      │
│ Topic Pills & Notes Nav ├───────►│ (server.js)             ├───────►│ (Deep Technical Mode) │
│ Markdown & Tables View  │  POST  │ High-Yield Knowledge    │ HTTPS  │ Context-Aware Answers │
│                         │  JSON  │ Base + Secure Key Proxy │ Req    │                       │
│                         │◄───────┤                         │◄───────┤                       │
└─────────────────────────┘        └─────────────────────────┘        └───────────────────────┘
```

---

## 🚀 Features

- 📑 **Instant Subject Filters:** One-click pills for DSA, OS, DBMS, Networks, and Interview Prep.
- 📊 **Markdown Tables & Code Formatting:** Renders clean complexity tables, bulleted summaries, and syntax-highlighted code.
- 🔒 **Secure Backend Proxy:** API keys are never exposed to client-side browsers.
- ⚡ **Zero-Latency Fallback Engine:** Provides high-yield revision notes instantly even without an external API connection.
- 📱 **Responsive Dark-Mode Workspace:** Optimized for desktop monitors, tablets, and mobile devices.

---

## 🧰 Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+), Lucide Icons
- **Backend:** Node.js, Express.js, CORS
- **AI Integration:** `@anthropic-ai/sdk` (Claude API)
- **Deployment & CI/CD:** Vercel, Git, GitHub

---

## 💻 Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/piyushraj3263-dot/ai-chat-assistant.git
cd ai-chat-assistant

# 2. Install dependencies
npm install

# 3. Create .env file with your API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env
echo "PORT=3000" >> .env

# 4. Start the server
npm start
```
Visit **http://localhost:3000** in your browser!

---

## 👤 Author

**Piyush Raj**
- GitHub: [@piyushraj3263-dot](https://github.com/piyushraj3263-dot)
- Education: B.Tech in Computer Science & Engineering (2nd Year)
