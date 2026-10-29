// ==============================================================================
// 🛠️ DevPilot - Comprehensive Computer Science Study & Revision Engine
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
// 📚 The Ultimate Computer Science Knowledge Engine
// High-Yield Exam Notes, Formulas, Comparison Tables, & Production Code
// ==============================================================================
function getStudyNotes(prompt) {
  const query = prompt.toLowerCase().trim();

  // 1. DATA STRUCTURES & ALGORITHMS (DSA)
  if (query.includes('dsa') || query.includes('algorithm') || query.includes('data structure') || query.includes('big-o') || query.includes('complexity')) {
    return `### 🌲 Data Structures & Algorithms (DSA) — Complete Master Notes

#### 1. Asymptotic Complexity Reference
Big-O denotes the theoretical upper bound of execution time/space relative to input size \`n\`:
\`O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)\`

| Data Structure | Access | Search | Insertion | Deletion | Space |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Array** | O(1) | O(n) | O(n) | O(n) | O(n) |
| **Singly Linked List** | O(n) | O(n) | O(1) *(at head)* | O(1) *(at head)* | O(n) |
| **Stack (LIFO)** | O(n) | O(n) | O(1) *(push)* | O(1) *(pop)* | O(n) |
| **Queue (FIFO)** | O(n) | O(n) | O(1) *(enqueue)*| O(1) *(dequeue)*| O(n) |
| **Hash Table** | N/A | O(1) avg / O(n) | O(1) avg / O(n) | O(1) avg / O(n) | O(n) |
| **Binary Search Tree**| O(log n) avg | O(log n) avg | O(log n) avg | O(log n) avg | O(n) |
| **AVL / Red-Black Tree**| O(log n) | O(log n) | O(log n) | O(log n) | O(n) |

#### 2. Comparison Sorting Algorithms
| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? | In-Place? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **QuickSort** | O(n log n) | O(n log n) | O(n²) *(bad pivot)*| O(log n) | No | Yes |
| **MergeSort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | No |
| **HeapSort** | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Yes |
| **InsertionSort** | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes |

#### 3. Standard Binary Search (C++):
\`\`\`cpp
int binarySearch(const vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2; // Prevents 32-bit integer overflow
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1; // Target not found
}
\`\`\`

#### 4. Top Algorithm Patterns for Technical Placements:
- **Two Pointers:** Pair sum in sorted array, palindrome checks, Dutch National Flag.
- **Sliding Window:** Longest substring without repeating characters, maximum sum subarray of size k.
- **Fast & Slow Pointers (Floyd's Cycle):** Cycle detection in linked list, finding list middle.
- **Breadth-First Search (BFS):** Level-order traversal, shortest path in unweighted graphs (Queue).
- **Depth-First Search (DFS):** Connected components, topological sort, backtracking (Recursion/Stack).
- **Dynamic Programming (Memoization/Tabulation):** 0/1 Knapsack, Longest Common Subsequence (LCS), Coin Change.`;
  }

  // 2. OPERATING SYSTEMS (OS)
  if (query.includes('operating system') || query.includes(' os ') || query.includes('deadlock') || query.includes('scheduling') || query.includes('paging') || query.includes('semaphore') || query.includes('process')) {
    return `### ⚙️ Operating Systems (OS) — Exam & Interview Notes

#### 1. Process vs Thread
- **Process:** An executing program with isolated address space, PCB (Process Control Block), heap, and file descriptors. Context switching is expensive.
- **Thread:** Lightweight execution unit within a process. Threads share code segment, data segment, and OS resources, but maintain independent stacks and registers.

#### 2. CPU Scheduling Algorithms
Key Formulas:
- **Turnaround Time (TAT)** = Completion Time (CT) &minus; Arrival Time (AT)
- **Waiting Time (WT)** = Turnaround Time (TAT) &minus; Burst Time (BT)

| Scheduling Algorithm | Preemptive? | Starvation Possible? | Optimal For |
| :--- | :--- | :--- | :--- |
| **FCFS (First-Come First-Served)** | No | No (suffers Convoy Effect) | Simple batch systems |
| **SJF (Shortest Job First)** | No / Yes (SRTF) | Yes (long processes starve)| Minimum average waiting time |
| **Round Robin (RR)** | Yes (time quantum) | No | Time-sharing systems, fairness |
| **Priority Scheduling** | Both | Yes (mitigated via Aging) | Real-time / critical jobs |

#### 3. Classical Synchronization: Mutex vs Semaphore
- **Mutex (Mutual Exclusion):** Locking mechanism. Only the thread that locked the mutex can unlock it (ownership semantics).
- **Binary Semaphore:** Integer flag (\`0\` or \`1\`) with atomic \`wait()\` (P) and \`signal()\` (V) operations. Any thread can signal.
- **Counting Semaphore:** Integer value \`N\` representing available shared resource instances.

#### 4. Deadlocks — The 4 Coffman Conditions
A deadlock occurs if and only if all four conditions hold concurrently:
1. **Mutual Exclusion:** At least one non-shareable resource.
2. **Hold and Wait:** A process holds resources while requesting others.
3. **No Preemption:** Resources cannot be forcibly reclaimed from a running process.
4. **Circular Wait:** Closed circular loop of processes waiting for held resources.
*Mitigation:* Banker's Algorithm (Avoidance), Resource Hierarchy (Prevention), Resource Allocation Graph cycle detection (Detection & Recovery).

#### 5. Memory Management & Virtual Memory
- **Paging:** Divides physical memory into fixed-size **Frames** and logical memory into same-size **Pages**. Eliminates external fragmentation, but causes internal fragmentation.
- **TLB (Translation Lookaside Buffer):** Fast hardware cache for page table lookups.
- **Page Replacement Policies:** FIFO (suffers Belady's Anomaly), LRU (Least Recently Used), Optimal (offline benchmark).`;
  }

  // 3. DATABASE MANAGEMENT SYSTEMS (DBMS) & SQL
  if (query.includes('dbms') || query.includes('database') || query.includes('sql') || query.includes('normalization') || query.includes('acid') || query.includes('join')) {
    return `### 🗄️ Database Management Systems (DBMS) & SQL Notes

#### 1. ACID Properties (Transaction Integrity)
- **Atomicity:** Entire transaction executes or completely rolls back ("all-or-nothing").
- **Consistency:** Transactions preserve schema constraints, primary/foreign keys, and triggers.
- **Isolation:** Concurrent transactions execute without mutual interference.
  - *Isolation Levels:* Read Uncommitted < Read Committed < Repeatable Read < Serializable.
- **Durability:** Committed state modifications are permanent on disk via Write-Ahead Logging (WAL).

#### 2. Normalization Stages (Eliminating Anomalies)
Normalization eliminates update, insertion, and deletion anomalies by decomposing redundant schemas:

| Normal Form | Rule Requirement | Dependency Addressed |
| :--- | :--- | :--- |
| **1NF** | Atomic values per column, unique row identifiers, no repeating arrays | Eliminates non-atomic composite values |
| **2NF** | Must be in 1NF + No **Partial Dependencies** | Non-prime attributes must depend on entire candidate key |
| **3NF** | Must be in 2NF + No **Transitive Dependencies** | For X &rarr; Y, X is Super Key or Y is prime attribute |
| **BCNF** | Stricter 3NF: For every functional dependency X &rarr; Y, **X must be a Super Key** | Eliminates all functional redundancy |

#### 3. SQL Joins Cheatsheet
\`\`\`sql
-- INNER JOIN: Records with matching keys in BOTH tables
SELECT u.name, o.total
FROM Users u
INNER JOIN Orders o ON u.id = o.user_id;

-- LEFT JOIN: All records from Left, matched records from Right (NULL if none)
SELECT u.name, o.total
FROM Users u
LEFT JOIN Orders o ON u.id = o.user_id;

-- GROUP BY with HAVING (Aggregate filter)
SELECT department, COUNT(*) as emp_count, AVG(salary) as avg_sal
FROM Employees
GROUP BY department
HAVING AVG(salary) > 75000;
\`\`\`

#### 4. Indexing: B-Trees vs Hash Indexes
- **B+ Tree Index:** Balanced multi-level tree storing data pointers only at leaf nodes. Supports \`O(log n)\` lookups and efficient **range queries** (\`BETWEEN\`, \`<\`, \`>\`).
- **Hash Index:** Direct key-to-bucket mapping. Super-fast \`O(1)\` equality checks (\`=\`), but cannot perform range searches.`;
  }

  // 4. COMPUTER NETWORKS (CN)
  if (query.includes('network') || query.includes(' cn ') || query.includes('osi') || query.includes('tcp') || query.includes('dns') || query.includes('http') || query.includes('subnet')) {
    return `### 🌐 Computer Networks (CN) — Complete Exam & Interview Guide

#### 1. OSI 7-Layer vs TCP/IP Protocol Stack
| Layer | OSI Name | Primary Role | Core Protocols | Data Unit |
| :--- | :--- | :--- | :--- | :--- |
| **7** | **Application** | Network services to user software | HTTP, HTTPS, FTP, DNS, SSH | Messages / Data |
| **6** | **Presentation** | Data encryption, compression, formatting | TLS/SSL, JPEG, ASCII | Data |
| **5** | **Session** | Dialog control and session tokens | RPC, NetBIOS | Data |
| **4** | **Transport** | End-to-end reliability and port addressing | TCP, UDP | **Segments / Datagrams** |
| **3** | **Network** | Logical addressing and routing | IPv4, IPv6, ICMP, OSPF, BGP | **Packets** |
| **2** | **Data Link** | MAC addressing, error detection (CRC), framing | Ethernet, Wi-Fi (802.11), ARP | **Frames** |
| **1** | **Physical** | Transmission of raw bits over physical media | Cables, Fiber, Radio signals | **Bits** |

#### 2. Transport Protocols: TCP vs UDP
- **TCP (Transmission Control Protocol):** Connection-oriented, guaranteed delivery, sequenced packets, flow control (sliding window), congestion avoidance. Used by Web, Banking, File Transfer.
- **UDP (User Datagram Protocol):** Connectionless, lightweight, low-latency, packet loss possible without acknowledgments. Used by DNS queries, VoIP, live streaming, online gaming.

#### 3. TCP 3-Way Handshake (Connection Establishment)
\`\`\`text
Client                                  Server
  │                 SYN (seq=x)            │
  ├───────────────────────────────────────►│  (Server allocates buffers)
  │                                        │
  │            SYN-ACK (seq=y, ack=x+1)    │
  │◄───────────────────────────────────────┤  (Client validates seq)
  │                                        │
  │                 ACK (ack=y+1)          │
  ├───────────────────────────────────────►│  (Connection ESTABLISHED)
\`\`\`
*Connection Termination:* 4-way handshake using \`FIN\` and \`ACK\` packets.

#### 4. DNS Resolution (Step-by-Step)
When you type \`https://google.com\` in a browser:
1. Browser Cache &rarr; OS Cache &rarr; Router Cache.
2. Query reaches **Recursive DNS Resolver** (ISP / 8.8.8.8).
3. Resolver queries **Root Nameserver** (\`.\`) &rarr; returns TLD server (\`.com\`).
4. Resolver queries **TLD Nameserver** (\`.com\`) &rarr; returns Authoritative server (\`ns1.google.com\`).
5. **Authoritative Nameserver** returns IPv4/IPv6 address.
6. Browser opens TCP connection to resolved IP.`;
  }

  // 5. OBJECT-ORIENTED PROGRAMMING (OOP) & SYSTEM DESIGN
  if (query.includes('oop') || query.includes('solid') || query.includes('inheritance') || query.includes('polymorphism') || query.includes('design pattern')) {
    return `### 🧱 Object-Oriented Programming (OOP) & SOLID Architecture

#### 1. The 4 Pillars of OOP
1. **Encapsulation:** Wrapping attributes and methods into a class while restricting direct member access via \`private\`/\`protected\` specifiers.
2. **Abstraction:** Exposing high-level interfaces while hiding complex internal logic (using abstract classes / pure virtual functions).
3. **Inheritance:** Deriving attributes and methods from base classes to maximize code reusability.
4. **Polymorphism:**
   - *Compile-Time (Static):* Method overloading, operator overloading.
   - *Run-Time (Dynamic):* Virtual functions and method overriding via vtables.

#### Clean C++ Implementation:
\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

// Abstraction via Interface
class PaymentMethod {
public:
    virtual void pay(double amount) = 0; // Pure virtual function
    virtual ~PaymentMethod() = default;
};

// Polymorphic implementations
class CreditCard : public PaymentMethod {
private:
    string cardNumber; // Encapsulated private field
public:
    CreditCard(string num) : cardNumber(num) {}
    void pay(double amount) override {
        cout << "Paid ₹" << amount << " using Card ending in " << cardNumber.substr(cardNumber.length() - 4) << endl;
    }
};

class UPI : public PaymentMethod {
private:
    string upiId;
public:
    UPI(string id) : upiId(id) {}
    void pay(double amount) override {
        cout << "Paid ₹" << amount << " via UPI ID: " << upiId << endl;
    }
};
\`\`\`

#### 2. SOLID Design Principles
- **S - Single Responsibility Principle:** A class should have one, and only one, reason to change.
- **O - Open/Closed Principle:** Software entities should be open for extension, but closed for modification.
- **L - Liskov Substitution Principle:** Derived classes must be substitutable for their base classes without breaking program correctness.
- **I - Interface Segregation Principle:** Clients should not be forced to depend on interfaces they do not use.
- **D - Dependency Inversion Principle:** Depend on abstractions (interfaces), not on concrete implementations.`;
  }

  // 6. PLACEMENT & TECHNICAL INTERVIEW CHEATSHEET
  if (query.includes('interview') || query.includes('placement') || query.includes('question') || query.includes('prep') || query.includes('job')) {
    return `### 💼 Top 15 Technical Interview Questions for CSE Placements

#### Core Technical Questions & Concise Answers:
1. **What is the difference between Stack and Heap memory?**
   - *Stack:* Fast, CPU-managed LIFO memory for local variables and function call frames. Fixed size, automatic cleanup.
   - *Heap:* Slower dynamic runtime memory allocated manually via \`malloc\`/\`new\`. Requires manual \`free\`/\`delete\` to avoid memory leaks.

2. **What is a Memory Leak and how do you prevent it?**
   - Occurs when dynamically allocated heap memory is no longer referenced but never freed. Prevented using RAII, smart pointers (\`std::unique_ptr\`, \`std::shared_ptr\`) in C++, or garbage collection.

3. **What is the difference between Primary Key and Unique Key?**
   - Primary Key uniquely identifies a record and **never** permits NULLs (only 1 per table).
   - Unique Key prevents duplicate entries but permits a single NULL value (multiple allowed per table).

4. **What is a Semaphore vs a Mutex?**
   - Mutex is a locking mechanism with ownership (only owner can unlock).
   - Semaphore is a signaling mechanism (counter \`>= 0\`) without ownership; any thread can signal.

5. **Explain Database Normalization:**
   - Eliminates insertion, update, and deletion anomalies by decomposing tables: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies), BCNF (every determinant is super key).

6. **What is the difference between TCP and UDP?**
   - TCP is connection-oriented, reliable, and sequenced (HTTP, SSH).
   - UDP is connectionless, fast, and does not guarantee delivery (DNS, VoIP, video streaming).

7. **How does Hashing achieve O(1) average lookup time?**
   - A hash function computes an array index from a key. Collisions are handled via Chaining (linked lists) or Open Addressing (probing).

8. **What is Virtual Memory?**
   - Memory management technique providing an illusion of large continuous RAM by swapping pages between physical RAM and disk storage.

9. **What are the 4 conditions for Deadlock?**
   - Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.

10. **Explain Overloading vs Overriding:**
    - Overloading: Same function name, different parameter signature in same scope (Compile-Time).
    - Overriding: Child class redefines a base class virtual method with identical signature (Run-Time).`;
  }

  // 7. WEB & REST APIS
  if (query.includes('rest') || query.includes('api') || query.includes('web') || query.includes('http')) {
    return `### 🌐 REST APIs & Client-Server Web Architecture

#### 1. Core Principles of REST:
- **Stateless:** Each request carries all context necessary for processing. No server-side session dependencies.
- **Client-Server Decoupling:** Frontend and backend evolve independently.
- **Uniform Interface:** Standard HTTP methods (\`GET\`, \`POST\`, \`PUT\`, \`PATCH\`, \`DELETE\`).

#### 2. Express.js REST API Implementation:
\`\`\`javascript
const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let students = [
  { id: 1, name: 'Piyush Raj', branch: 'CSE' }
];

// GET: Retrieve all records
app.get('/api/students', (req, res) => {
  res.status(200).json(students);
});

// POST: Create a new record
app.post('/api/students', (req, res) => {
  const { name, branch } = req.body;
  if (!name || !branch) {
    return res.status(400).json({ error: 'Name and branch are required.' });
  }
  const newStudent = { id: students.length + 1, name, branch };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.listen(3000, () => console.log('Server running on port 3000'));
\`\`\`

#### 3. Standard HTTP Status Code Reference:
- \`200 OK\`: Standard successful response.
- \`201 Created\`: Resource successfully created.
- \`400 Bad Request\`: Malformed client syntax/payload.
- \`401 Unauthorized\`: Missing authentication token/credentials.
- \`403 Forbidden\`: Authenticated client lacks permissions.
- \`404 Not Found\`: Target resource does not exist.
- \`500 Internal Server Error\`: Unhandled backend exception.`;
  }

  // General Fallback formatted as structured CS study note
  return `### 💻 DevPilot CS Study Hub

Topic Searched: **"${prompt}"**

#### Key Engineering Analysis:
1. **Core Definition:**
   Every technical system is defined by its computational trade-offs, architecture patterns, and reliability guarantees.
2. **Key Metrics to Evaluate:**
   - **Time Complexity:** Computational work growth rate (\`O(1)\` to \`O(n!)\`).
   - **Space Complexity:** Auxiliary memory allocations required by call stacks and data buffers.
   - **Fault Tolerance:** How the component behaves during network partitions or process crashes.

#### Recommended Core Study Areas:
- 🌲 **Data Structures:** Arrays, Trees, Graphs, Hash Tables, Heaps.
- ⚙️ **Operating Systems:** CPU Scheduling, Deadlocks, Paging, Semaphores.
- 🗄️ **DBMS:** Normalization 1NF-BCNF, ACID Transactions, SQL Joins.
- 🌐 **Computer Networks:** OSI 7 Layers, TCP 3-Way Handshake, DNS Resolution.
- 💼 **Interview Preparation:** 15 Most Common Placement Concepts.

*(Select any topic from the top pills or sidebar to view the full revision guide!)*`;
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

    // If live Claude API key is configured, use Claude with strict CSE professor instructions
    if (anthropic) {
      try {
        const response = await anthropic.messages.create({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 1500,
          system: "You are DevPilot, the ultimate Computer Science & Engineering study platform created by Piyush Raj, a 2nd-year CSE student. Deliver high-yield, structured, exam-grade notes for Computer Science topics. Every response MUST include: (1) Core definition, (2) Clean Markdown tables or ASCII flow diagrams, (3) Precise Time & Space complexity analysis, (4) Production-quality C++, Java, or Python code with edge case handling, and (5) Placement interview tips. Use professional, clear English without filler.",
          messages: messages,
        });
        return res.json({ reply: response.content[0].text });
      } catch (apiErr) {
        console.warn('API call failed, falling back to knowledge engine:', apiErr.message);
      }
    }

    // High quality intelligent response engine
    const reply = getStudyNotes(latestMessage);
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
