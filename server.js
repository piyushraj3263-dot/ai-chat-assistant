// ==============================================================================
// 🛠️ DevPilot - Multilingual & Hinglish Backend Server
// Developed by Piyush Raj (B.Tech CSE)
// ==============================================================================

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Initialize Anthropic client if key is configured
const hasLiveKey = process.env.ANTHROPIC_API_KEY &&
                   process.env.ANTHROPIC_API_KEY !== 'your_api_key_here' &&
                   process.env.ANTHROPIC_API_KEY.startsWith('sk-');

const anthropic = hasLiveKey ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) : null;

// ==============================================================================
// 🗣️ Hinglish / Hindi Detector
// ==============================================================================
function isHinglishQuery(text) {
  const lower = text.toLowerCase();
  // Hindi Devanagari script check
  if (/[ऀ-ॿ]/.test(text)) return true;

  // Common Hinglish keywords
  const hinglishTokens = [
    'kya', 'hai', 'kaise', 'kese', 'kare', 'karo', 'samjha', 'samjhao',
    'batao', 'bata', 'bhai', 'taiyari', 'aur', 'ka', 'ki', 'ke', 'ko',
    'me', 'mein', 'nahi', 'hota', 'hoti', 'hote', 'chalega', 'samajh',
    'bataiye', 'mujhe', 'mera', 'meri', 'karna', 'kaunsa', 'kyu', 'shuru',
    'bhasha', 'chahiye', 'sikhe', 'sikho', 'dost', 'batao'
  ];

  return hinglishTokens.some(token => new RegExp(`\\b${token}\\b`, 'i').test(lower));
}

// ==============================================================================
// 🧠 Computer Science Knowledge Base (English & Hinglish Support)
// ==============================================================================
function getKnowledgeBaseResponse(prompt) {
  const query = prompt.toLowerCase();
  const isHinglish = isHinglishQuery(prompt);

  // 1. REST APIs & Architecture
  if (query.includes('rest') || query.includes('api') || query.includes('client-server')) {
    if (isHinglish) {
      return `### 🌐 REST API Kya Hoti Hai? (Simple Hinglish Me)

Bhai, **REST API** ko ek restaurant ke example se samjho:
- **Client (Aap / Browser):** Table pe baitha customer jo khana order karta hai.
- **Server (Backend / Database):** Restaurant ka kitchen jahan sara data aur khana store hota hai.
- **API (Waiter):** Jo aapka order (Request) kitchen le jata hai aur khana banne ke baad aapki table pe wapas laata hai (Response)!

#### 4 Main HTTP Methods:
1. \`GET\`: Data laane ke liye (jaise user profile fetch karna).
2. \`POST\`: Naya data bhejne ke liye (jaise naya account banana ya message send karna).
3. \`PUT\` / \`PATCH\`: Purana data update ya edit karne ke liye.
4. \`DELETE\`: Data delete karne ke liye.

#### Simple Express.js Backend Code:
\`\`\`javascript
const express = require('express');
const app = express();
app.use(express.json());

// GET Endpoint - Data bhejne ke liye
app.get('/api/student', (req, res) => {
  res.json({ name: 'Piyush Raj', branch: 'CSE 2nd Year' });
});

// POST Endpoint - Client se naya data lene ke liye
app.post('/api/student', (req, res) => {
  const data = req.body;
  res.status(201).json({ message: 'Data successfully save ho gaya!', data });
});

app.listen(3000);
\`\`\`

#### HTTP Status Codes jo interview me puchte hain:
- \`200 OK\`: Request successful rahi.
- \`201 Created\`: Naya resource successfully ban gaya.
- \`400 Bad Request\`: Client ne galat data bheja.
- \`404 Not Found\`: Wo page ya data server pe mila hi nahi.
- \`500 Server Error\`: Backend server code me koi crash ho gaya.`;
    }

    return `### 🌐 Understanding REST APIs & Client-Server Architecture

A **REST (Representational State Transfer)** API is an architectural standard for exchanging data between a client (browser/mobile app) and a backend server over **HTTP**.

#### 1. Core Principles:
- **Statelessness:** Every request contains all information needed to process it. The server stores no client session context.
- **Client-Server Separation:** The user interface (client) and data storage (server) operate independently.
- **HTTP Methods:** \`GET\` (Read), \`POST\` (Create), \`PUT\`/\`PATCH\` (Update), \`DELETE\` (Remove).

#### 2. Express.js Code Example:
\`\`\`javascript
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/users/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Piyush', branch: 'CSE' });
});

app.post('/api/users', (req, res) => {
  res.status(201).json({ message: 'User created successfully', data: req.body });
});

app.listen(3000);
\`\`\`

#### 3. Common Status Codes:
- \`200 OK\` &bull; \`201 Created\` &bull; \`400 Bad Request\` &bull; \`404 Not Found\` &bull; \`500 Server Error\``;
  }

  // 2. Binary Search
  if (query.includes('binary search') || query.includes('binary')) {
    if (isHinglish) {
      return `### 🔍 Binary Search Algorithm (Hinglish Explanation)

**Binary Search** ek bohot fast search technique hai, par iska **ek rule hai: Array hamesha sorted hona chahiye!**

#### Kaam kaise karta hai (Divide & Conquer):
1. Array ke beech ka index (\`mid\`) find karo: \`mid = low + (high - low) / 2\`
2. Agar \`arr[mid] == target\`, toh number mil gaya!
3. Agar target chhota hai, toh left half me dhundo (\`high = mid - 1\`).
4. Agar target bada hai, toh right half me dhundo (\`low = mid + 1\`).
5. Har step pe search space **aadhi (half)** ho jaati hai, isiliye time complexity sirf **O(log n)** aati hai!

#### C++ Implementation:
\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2; // Overflow se bachne ke liye

        if (arr[mid] == target) return mid;       // Mil gaya!
        else if (arr[mid] < target) low = mid + 1; // Right side jao
        else high = mid - 1;                      // Left side jao
    }
    return -1; // Nahi mila
}
\`\`\`

#### Time & Space Complexity:
- **Best Case:** \`O(1)\` (agar pehli baar me hi mid element mil jaye)
- **Worst Case:** \`O(log n)\` (agar array me 1,000,000 elements hain, toh sirf ~20 comparisons me answer mil jayega!)
- **Space Complexity:** \`O(1)\` (iterative approach me koi extra memory nahi lagti)`;
    }

    return `### 🔍 Binary Search Algorithm

Binary search is an efficient search algorithm on **sorted** arrays operating on the **Divide and Conquer** paradigm.

#### Complexity:
- **Time Complexity:** Best: \`O(1)\`, Worst: \`O(log n)\`
- **Space Complexity:** Iterative: \`O(1)\`, Recursive: \`O(log n)\`

#### C++ Implementation:
\`\`\`cpp
int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
\`\`\``;
  }

  // 3. QuickSort vs MergeSort
  if (query.includes('quicksort') || query.includes('mergesort') || query.includes('sort')) {
    if (isHinglish) {
      return `### ⚡ QuickSort vs MergeSort (Dono ka Comparison)

Dono algorithms **Divide and Conquer** approach use karte hain, par dono me kuch major differences hain:

| Feature | QuickSort | MergeSort |
| :--- | :--- | :--- |
| **Kaam karne ka tareeka** | Pivot choose karta hai aur elements ko pivot ke around partition karta hai | Array ko recursively do hisso me baantta hai, fir merge karta hai |
| **Average Time** | O(n log n) | O(n log n) |
| **Worst Time** | O(n²) *(agar pivot sabse chhota ya bada ho)* | O(n log n) *(guaranteed)* |
| **Space Complexity** | O(log n) auxiliary stack space | O(n) extra space chahiye merge karne ke liye |
| **In-place Sorting?** | Haan (array ke andar hi swap karta hai) | Nahi (extra array memory chahiye) |
| **Stability** | Not Stable | Stable (equal elements ka order preserve rehta hai) |

#### Kaunsa kab use kare?
- **QuickSort:** In-memory arrays ke liye best hai kyunki ye cache-friendly hai aur extra RAM nahi mangta.
- **MergeSort:** Linked Lists aur bohot bade data (jo RAM me fit na ho aur disk pe ho) ke liye best hai.`;
    }

    return `### ⚡ QuickSort vs MergeSort Comparison

Both algorithms employ **Divide and Conquer**, but vary in memory and partitioning strategy:

| Metric | QuickSort | MergeSort |
| :--- | :--- | :--- |
| **Average Time** | O(n log n) | O(n log n) |
| **Worst Time** | O(n²) | O(n log n) |
| **Auxiliary Space**| O(log n) stack | O(n) heap memory |
| **Stability** | Unstable | Stable |
| **Optimal For** | In-memory arrays | Linked Lists & External Sorting |`;
  }

  // 4. Deadlock in OS
  if (query.includes('deadlock') || query.includes('operating system') || query.includes('os')) {
    if (isHinglish) {
      return `### 🔒 Operating Systems me Deadlock kya hota hai?

**Deadlock** ka simple matlab hai: "Aap meri cheez chhod nahi rahe, aur mai aapki cheez maang raha hu — dono aage nahi badh sakte!"

Computer me: Jab Process 1 ke paas Resource A hai aur wo Resource B chahta hai, aur Process 2 ke paas Resource B hai aur wo Resource A chahta hai. Dono ek doosre ka wait karte rehte hain aur system freeze ho jata hai.

#### 4 Necessary Conditions (Coffman Conditions):
Agar ye chaaro conditions ek sath honge, tabhi deadlock hoga:
1. **Mutual Exclusion:** Resource non-shareable hai (ek time pe ek hi process use kar sakta hai, jaise Printer).
2. **Hold and Wait:** Process ek resource pakad ke baitha hai aur dusre ka wait kar raha hai.
3. **No Preemption:** Kisi process se zabardasti resource chheen nahi sakte; wo khud release karega.
4. **Circular Wait:** Ek circular loop ban jaye: P1 waits for P2, P2 waits for P3, aur P3 waits for P1.

#### Deadlock kaise solve karte hain?
- **Deadlock Prevention:** In 4 conditions me se kisi ek ko tod do.
- **Deadlock Avoidance:** Banker's Algorithm use karke safe state check karo.
- **Deadlock Detection & Recovery:** Resource Allocation Graph (RAG) me cycle check karo aur process kill karo.`;
    }

    return `### 🔒 Deadlocks in Operating Systems

A deadlock happens when processes are indefinitely blocked because each holds a resource while awaiting another held by another process.

#### 4 Coffman Conditions:
1. **Mutual Exclusion:** At least one resource is non-shareable.
2. **Hold and Wait:** Process holds one resource while requesting another.
3. **No Preemption:** Resources cannot be forcibly revoked.
4. **Circular Wait:** A closed dependency loop of processes and resources exists.`;
  }

  // 5. ACID Properties in DBMS
  if (query.includes('acid') || query.includes('dbms') || query.includes('transaction')) {
    if (isHinglish) {
      return `### 🗄️ DBMS me ACID Properties Kya Hain?

Jab bhi database me koi transaction hoti hai (jaise Google Pay se ₹500 transfer karna), tab **ACID properties** ensure karti hain ki paisa gayab na ho!

#### 1. Atomicity ("Ya toh pura hoga, ya kuch nahi")
- Transaction ke saare operations complete hone chahiye. Agar beech me light chali jaye ya server crash ho jaye, toh pura rollback ho jayega.
- *Example:* Mere account se ₹500 kate par dost ke paas nahi pahuche, toh Atomicity mere ₹500 wapas account me daal degi!

#### 2. Consistency
- Transaction se pehle aur transaction ke baad database ke rules/constraints valid rehne chahiye.
- *Example:* Mere account me ₹500 kate aur dost ko ₹500 mile, toh total balance system me barabar raha.

#### 3. Isolation
- Agar 10 log ek sath paise bhej rahe hain, toh ek doosre ke transaction me koi gadbad nahi hogi. Har transaction alag execute hoti hai.

#### 4. Durability
- Ek baar transaction successful ho gaya aur "Success" likha aa gaya, toh chahe server restart ho jaye, data permanently disk pe save ho chuka hai.`;
    }

    return `### 🗄️ DBMS ACID Properties

- **Atomicity:** All operations succeed or none do (rollback on failure).
- **Consistency:** Database transitions between valid states preserving schema constraints.
- **Isolation:** Concurrent transactions run without interference.
- **Durability:** Committed transactions survive system restarts via non-volatile logging.`;
  }

  // 6. 2nd Year Interview Prep
  if (query.includes('interview') || query.includes('taiyari') || query.includes('prep') || query.includes('placement')) {
    if (isHinglish) {
      return `### 🎯 2nd Year CSE ke Top 5 Technical Interview Questions

Bhai, college placements aur internship interviews me ye 5 sawal sabse zyada puchte hain:

#### 1. Array vs Linked List me kya farak hai?
- **Array:** Continuous memory hoti hai, isiliye kisi bhi index pe \`O(1)\` me pahuch sakte ho. Par size fixed hota hai.
- **Linked List:** Alag-alag jagah memory hoti hai jo pointers se judi hoti hai. Insert/delete fast hota hai, par traverse \`O(n)\` lagta hai.

#### 2. Stack aur Heap memory me kya antar hai?
- **Stack:** Bohot fast hoti hai, function call aur local variables yahan store hote hain. CPU khud allocate/deallocate karta hai.
- **Heap:** Dynamic memory hoti hai jo \`malloc()\` ya \`new\` keyword se banti hai. Developer ko manually free karni padti hai, warna memory leak ho jata hai.

#### 3. TCP aur UDP me kaunsa fast hai?
- **TCP:** Reliable hai, handshake karta hai, guarantee deta hai ki packet पहुंचेga (used in HTTP, Web, Banking).
- **UDP:** Fast aur lightweight hai, packet loss ka parwah nahi karta (used in Live Streaming, Online Gaming, Voice calls).

#### 4. Primary Key vs Unique Key:
- Primary key table me sirf 1 ho sakti hai aur NULL value allow nahi karti.
- Unique key multiple ho sakti hain aur 1 NULL value allow karti hai.

#### 5. OOPs ke 4 Pillars:
- **Encapsulation:** Data ko methods ke andar bandhna (private variables).
- **Abstraction:** Complex code chupana aur simple interface dikhana.
- **Inheritance:** Code reuse karna parent class se child class me.
- **Polymorphism:** Ek function ke alag-alag roop (Method Overloading & Overriding).`;
    }

    return `### 🎯 Top 5 Technical Interview Questions for CSE
1. **Array vs Linked List:** Contiguous O(1) random access vs dynamic non-contiguous pointer nodes.
2. **Stack vs Heap:** CPU-managed automatic function memory vs manually allocated dynamic heap space.
3. **TCP vs UDP:** Reliable connection-oriented 3-way handshake vs fast connectionless streaming.
4. **Primary Key vs Unique Key:** Single NOT NULL constraint vs multiple permissible single-NULL columns.
5. **OOP 4 Pillars:** Encapsulation, Abstraction, Inheritance, and Polymorphism.`;
  }

  // Fallback for general queries in Hinglish vs English
  if (isHinglish) {
    return `### 💻 DevPilot Assistant (Hinglish Support)

Bhai, aapne pucha: **"${prompt}"**

DevPilot aapki help ke liye ready hai! Aap mujhse Computer Science aur Coding ke baare me kuch bhi pooch sakte ho:
- 📌 **DSA:** Binary Search, Sorting, Linked Lists, Trees, Graphs
- 🌐 **Web & Backend:** REST APIs, Node.js, Express, HTTP Status Codes
- 🗄️ **Core Subjects:** Operating Systems, DBMS Normalization, Computer Networks
- 💼 **Interview Prep:** Coding questions, Placements tips, Big-O Complexity

Bas prompt type karo ya sidebar se koi topic choose karo!`;
  }

  return `### 💻 DevPilot CS Assistant

You asked: **"${prompt}"**

DevPilot is ready to assist you! You can ask questions in **English**, **Hinglish** (e.g. *"bhai REST API samjha do"*), or any language across:
- **Data Structures & Algorithms:** Arrays, Binary Search, Trees, Graphs, Sorting
- **Web Development & Architecture:** REST APIs, HTTP protocols, Express.js, Async JS
- **Core Subjects:** OS Deadlocks, DBMS ACID & Normalization, Networking
- **Interview Preparation:** Technical questions, Big-O Complexity, Best practices`;
}

// ==============================================================================
// 📨 Chat Endpoint
// ==============================================================================
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const latestMessage = messages[messages.length - 1].content || '';

    // If live Claude API key is configured, use Claude with multilingual instructions
    if (anthropic) {
      try {
        const response = await anthropic.messages.create({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 1024,
          system: "You are DevPilot, a technical Computer Science assistant developed by Piyush Raj, a 2nd-year CSE student. You are completely multilingual and support ALL languages, including Hinglish (Hindi written in Roman script like 'bhai binary search samjha do'), Hindi, English, and others. Always match the user's language and style naturally. When user asks in Hinglish, respond in natural, friendly, articulate Hinglish with clear English technical terms and syntax-highlighted code blocks.",
          messages: messages,
        });
        return res.json({ reply: response.content[0].text });
      } catch (apiErr) {
        console.warn('API call failed, falling back to knowledge engine:', apiErr.message);
      }
    }

    // High quality intelligent response engine
    const reply = getKnowledgeBaseResponse(latestMessage);
    res.json({ reply: reply });

  } catch (error) {
    console.error('Error handling chat request:', error);
    res.status(500).json({ error: 'Server could not process message.' });
  }
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 DevPilot server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
