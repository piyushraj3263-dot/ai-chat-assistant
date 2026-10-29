// ==============================================================================
// 🛠️ DevPilot - Backend Server
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
// 🧠 Computer Science Knowledge Base (Built-in Knowledge Engine)
// Provides instant technical answers with code snippets
// ==============================================================================
function getKnowledgeBaseResponse(prompt) {
  const query = prompt.toLowerCase();

  // 1. REST APIs & Architecture
  if (query.includes('rest') || query.includes('api') || query.includes('client-server')) {
    return `### 🌐 Understanding REST APIs & Client-Server Architecture

A **REST (Representational State Transfer)** API is an architectural style for communication between a client (like a browser or mobile app) and a server over the **HTTP protocol**.

#### 1. Core Principles:
- **Statelessness:** Each request from client to server must contain all necessary info. The server stores no session context.
- **Client-Server Separation:** The UI (client) and data storage (server) are decoupled.
- **Standard HTTP Methods:**
  - \`GET\`: Retrieve data (e.g., fetch user profile)
  - \`POST\`: Submit new data (e.g., create an account or send a message)
  - \`PUT\` / \`PATCH\`: Update existing resources
  - \`DELETE\`: Remove a resource

#### 2. Realistic Code Example (Express.js):
\`\`\`javascript
const express = require('express');
const app = express();
app.use(express.json());

// GET endpoint
app.get('/api/users/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Piyush', branch: 'CSE' });
});

// POST endpoint
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: 'User created successfully', data: newUser });
});

app.listen(3000);
\`\`\`

#### 3. Standard HTTP Status Codes:
- \`200 OK\` - Request succeeded
- \`201 Created\` - Resource created successfully
- \`400 Bad Request\` - Invalid client payload
- \`401 Unauthorized\` - Missing or invalid credentials
- \`404 Not Found\` - Resource does not exist
- \`500 Internal Server Error\` - Unhandled server-side exception`;
  }

  // 2. QuickSort vs MergeSort
  if (query.includes('quicksort') || query.includes('mergesort') || query.includes('sort')) {
    return `### ⚡ QuickSort vs MergeSort Comparison

Both algorithms follow the **Divide and Conquer** paradigm, but they partition and combine data differently.

| Criteria | QuickSort | MergeSort |
| :--- | :--- | :--- |
| **Strategy** | Partition around pivot, sort in-place | Recursively divide into halves, merge sorted sub-arrays |
| **Best Time** | O(n log n) | O(n log n) |
| **Average Time** | O(n log n) | O(n log n) |
| **Worst Time** | O(n²) *(bad pivot selection)* | O(n log n) |
| **Space Complexity** | O(log n) auxiliary stack space | O(n) auxiliary memory for merging |
| **Stability** | Not stable by default | Stable (preserves order of duplicates) |
| **Best Used For** | In-memory arrays (cache-friendly) | Linked lists & external sorting (disk/tape) |

#### QuickSort Implementation in C++:
\`\`\`cpp
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
\`\`\``;
  }

  // 3. DBMS ACID Properties
  if (query.includes('acid') || query.includes('dbms') || query.includes('transaction')) {
    return `### 🗄️ DBMS ACID Properties Explained

A **Transaction** in a database is a single logical unit of work. To maintain database consistency, transactions must satisfy the **ACID** properties:

#### 1. Atomicity ("All or Nothing")
- Either all operations of a transaction execute completely, or none do. If a system crashes mid-transaction, changes are rolled back.
- *Example:* Transferring ₹500 from Account A to Account B. If money is deducted from A but server crashes before adding to B, Atomicity rolls back the debit.

#### 2. Consistency
- The database moves from one valid state to another, preserving all schema integrity constraints (foreign keys, check conditions).
- *Example:* Total money in (Account A + Account B) must remain constant before and after the transfer.

#### 3. Isolation
- Multiple concurrent transactions execute independently without interfering with each other until committed.
- *Levels:* Read Uncommitted, Read Committed, Repeatable Read, Serializable.

#### 4. Durability
- Once a transaction commits, its modifications are permanently recorded in non-volatile storage (WAL / disk) even during unexpected power loss.

\`\`\`sql
-- SQL Transaction Example
BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 500 WHERE account_id = 101;
UPDATE Accounts SET balance = balance + 500 WHERE account_id = 202;
COMMIT; -- Changes are now permanently durable
\`\`\``;
  }

  // 4. Deadlock in Operating Systems
  if (query.includes('deadlock') || query.includes('operating system') || query.includes('os')) {
    return `### 🔒 Deadlocks in Operating Systems

A **Deadlock** occurs when a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by another process.

#### The 4 Necessary Coffman Conditions:
All four conditions must hold simultaneously for a deadlock to happen:

1. **Mutual Exclusion:** At least one resource must be non-shareable (only one process can use it at a time).
2. **Hold and Wait:** A process is holding at least one resource and requesting additional resources held by other processes.
3. **No Preemption:** Resources cannot be forcibly taken from a process; they can only be released voluntarily.
4. **Circular Wait:** A closed loop of processes exists where P₀ waits for P₁, P₁ waits for P₂, and Pn waits for P₀.

#### Deadlock Handling Strategies:
- **Prevention:** Invalidate at least one of the 4 Coffman conditions (e.g., impose resource ordering to eliminate circular wait).
- **Avoidance:** Dynamically evaluate resource allocation state using algorithms like **Banker's Algorithm**.
- **Detection & Recovery:** Allow deadlock to occur, detect cycle via Resource Allocation Graph (RAG), and abort processes or preempt resources.
- **Ostrich Algorithm:** Ignore the problem if it happens very rarely (used by modern general-purpose operating systems like Linux and Windows).`;
  }

  // 5. Big-O & Complexity
  if (query.includes('big-o') || query.includes('complexity') || query.includes('time complexity')) {
    return `### 📊 Big-O Notation: Time & Space Complexity

Big-O notation describes the **upper bound** (worst-case scenario) of an algorithm's execution time or memory footprint as input size \`n\` scales.

#### Common Complexities Ranked (Fastest to Slowest):

1. **O(1) - Constant Time:** Runtime does not depend on \`n\`.
   - *Example:* Accessing an array element by index (\`arr[5]\`), Hash map lookup.
2. **O(log n) - Logarithmic Time:** Problem size is halved at each step.
   - *Example:* Binary search on a sorted array.
3. **O(n) - Linear Time:** Runtime grows directly proportional to \`n\`.
   - *Example:* Iterating through an array with a single loop.
4. **O(n log n) - Linearithmic Time:** Typical for efficient comparison sorting.
   - *Example:* MergeSort, QuickSort (average), HeapSort.
5. **O(n²) - Quadratic Time:** Nested loops over the input.
   - *Example:* BubbleSort, SelectionSort, brute-force pair comparison.
6. **O(2ⁿ) - Exponential Time:** Growth doubles with each additional element.
   - *Example:* Naive recursive Fibonacci without memoization.

#### Practical Example:
\`\`\`cpp
// O(log n) - Binary Search
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
\`\`\``;
  }

  // 6. OOP 4 Pillars
  if (query.includes('oop') || query.includes('object oriented') || query.includes('pillar') || query.includes('inheritance')) {
    return `### 🧱 The 4 Pillars of Object-Oriented Programming (OOP)

OOP organizes code around **classes** (blueprints) and **objects** (instances).

#### 1. Encapsulation
Bundling data (attributes) and methods that operate on that data into a single unit, while restricting direct access using access specifiers (\`private\`, \`protected\`, \`public\`).
\`\`\`cpp
class BankAccount {
private:
    double balance; // Hidden from outside world
public:
    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    double getBalance() { return balance; }
};
\`\`\`

#### 2. Abstraction
Hiding complex internal implementation details and exposing only essential interfaces.
*(e.g., using pure virtual functions in C++ or abstract classes/interfaces in Java).*

#### 3. Inheritance
Mechanism where a child class derives attributes and behaviors from an existing parent class, promoting code reuse.
\`\`\`cpp
class Vehicle {
public:
    int speed;
    void drive() { cout << "Moving..."; }
};
class Car : public Vehicle { // Inherits speed and drive()
public:
    int numDoors;
};
\`\`\`

#### 4. Polymorphism ("Many Forms")
Ability of an entity to take different forms:
- **Compile-time (Static):** Method overloading & operator overloading.
- **Run-time (Dynamic):** Virtual functions & method overriding.`;
  }

  // 7. Interview Prep for 2nd Year CSE
  if (query.includes('interview') || query.includes('question') || query.includes('prep')) {
    return `### 🎯 5 Core Technical Interview Questions for CSE Students

Here are five standard interview questions asked during campus placements and technical rounds:

#### Q1. What is the difference between an Array and a Linked List?
- **Array:** Contiguous memory allocation, O(1) random access by index, but fixed size and O(n) insertions/deletions.
- **Linked List:** Non-contiguous memory (nodes linked via pointers), dynamic sizing, O(1) insertions/deletions at known positions, but O(n) sequential access.

#### Q2. Explain the difference between Stack and Heap memory.
- **Stack:** Fast, contiguous memory automatically managed by CPU. Stores function frames, local variables, and return addresses.
- **Heap:** Dynamic memory allocated manually at runtime (via \`malloc\`/\`new\`). Requires manual deallocation (\`free\`/\`delete\`) or garbage collection; prone to memory leaks.

#### Q3. How does Hashing work and what is collision resolution?
A hash function maps keys to indices in an array table (O(1) average lookup). Collisions occur when two distinct keys yield the same index. Handled via:
1. **Separate Chaining:** Storing collided elements in a linked list at that bucket.
2. **Open Addressing:** Probing next available slots (Linear Probing, Quadratic Probing, Double Hashing).

#### Q4. What is the difference between TCP and UDP?
- **TCP (Transmission Control Protocol):** Connection-oriented, reliable, guarantees packet ordering and delivery (via 3-way handshake and ACKs). Used for HTTP, HTTPS, SSH, FTP.
- **UDP (User Datagram Protocol):** Connectionless, lightweight, low-latency, no guarantee of delivery or ordering. Used for live video streaming, DNS, gaming.

#### Q5. What is the difference between Primary Key, Unique Key, and Foreign Key?
- **Primary Key:** Uniquely identifies each record in a table; cannot contain NULL values.
- **Unique Key:** Ensures column uniqueness; permits one NULL value.
- **Foreign Key:** References the Primary Key of another table, enforcing referential integrity.`;
  }

  // 8. Process vs Thread
  if (query.includes('process') && query.includes('thread')) {
    return `### ⚙️ Process vs Thread in Operating Systems

| Feature | Process | Thread |
| :--- | :--- | :--- |
| **Definition** | An independent executing program | A lightweight unit of execution within a process |
| **Memory** | Own isolated address space, heap, and file descriptors | Shares address space, heap, and code segment with sibling threads |
| **Context Switching** | Expensive (flushes CPU caches, updates MMU page tables) | Inexpensive (switches only registers and stack pointer) |
| **Communication** | Inter-Process Communication (IPC: pipes, sockets, shared memory) | Direct memory access via shared variables (needs mutex/locks) |
| **Fault Isolation** | If one process crashes, others continue unaffected | If one thread crashes (e.g., segfault), entire process can terminate |`;
  }

  // 9. DBMS Normalization
  if (query.includes('normalization') || query.includes('1nf') || query.includes('2nf') || query.includes('3nf')) {
    return `### 📑 Database Normalization (1NF to BCNF)

Normalization organizes database tables to minimize **data redundancy** and avoid insertion, deletion, and update anomalies.

#### 1. First Normal Form (1NF)
- Each column must contain atomic (indivisible) values.
- No repeating groups or arrays stored in a single attribute.
- Each row must have a unique identifier (Primary Key).

#### 2. Second Normal Form (2NF)
- Table must already be in 1NF.
- **No Partial Dependencies:** Every non-prime attribute must depend on the *entire* candidate key, not just a portion of a composite key.

#### 3. Third Normal Form (3NF)
- Table must already be in 2NF.
- **No Transitive Dependencies:** Non-prime attributes must not depend on other non-prime attributes (\`A → B\` and \`B → C\`).

#### 4. Boyce-Codd Normal Form (BCNF)
- A stricter version of 3NF.
- For every non-trivial functional dependency \`X → Y\`, \`X\` must be a **Super Key**.`;
  }

  // General helpful conversational fallback
  return `### 💻 DevPilot CS Assistant

You asked: **"${prompt}"**

Here is a structured explanation:

1. **Concept Overview:**
   In Computer Science and software engineering, understanding the underlying data flow and architecture is essential. When designing systems, always consider:
   - **Time Complexity:** How the execution time scales with input size.
   - **Space Complexity:** How much auxiliary memory is required.
   - **Edge Cases:** Handling empty inputs, null pointers, and boundary conditions.

2. **Best Practices:**
   - Keep functions focused on a single responsibility (SRP).
   - Write defensive code that validates inputs before processing.
   - Use meaningful variable names and document non-obvious algorithms.

*(Tip: You can ask specific questions about Data Structures, Algorithms, REST APIs, DBMS, or Operating Systems, or click any topic in the sidebar!)*`;
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

    // If live Claude API key is configured, use Claude
    if (anthropic) {
      try {
        const response = await anthropic.messages.create({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 1024,
          system: "You are DevPilot, a technical Computer Science assistant built by Piyush Raj, a 2nd-year CSE student. Provide clear, accurate, and concise technical answers with code snippets and bullet points.",
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
