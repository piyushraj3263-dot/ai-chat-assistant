// ==============================================================================
// 🛠️ DevPilot - Computer Science Study & Revision Engine
// Developed by Piyush Raj (B.Tech CSE)
// ==============================================================================

// Session memory state
let conversationHistory = [];
let isWaitingForResponse = false;

// DOM references
const messagesContainer = document.getElementById('messagesContainer');
const welcomeScreen = document.getElementById('welcomeScreen');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearChatBtn = document.getElementById('clearChatBtn');
const newChatBtn = document.getElementById('newChatBtn');
const promptChips = document.querySelectorAll('.prompt-chip');
const topicBoxes = document.querySelectorAll('.topic-box');
const pills = document.querySelectorAll('.pill');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Auto-expand input textarea
userInput.addEventListener('input', () => {
  userInput.style.height = 'auto';
  userInput.style.height = Math.min(userInput.scrollHeight, 160) + 'px';
  sendBtn.disabled = userInput.value.trim().length === 0 || isWaitingForResponse;
});

// Enter key sends, Shift+Enter adds newline
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
});

// Click send
sendBtn.addEventListener('click', handleSendMessage);

// Subject Filter Pills
pills.forEach((pill) => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const filter = pill.getAttribute('data-filter');

    if (filter === 'dsa') {
      triggerPrompt('Give me complete revision notes for Data Structures & Algorithms with Time Complexities.');
    } else if (filter === 'os') {
      triggerPrompt('Give me comprehensive exam revision notes for Operating Systems: CPU Scheduling, Deadlocks, Paging, and Semaphores.');
    } else if (filter === 'dbms') {
      triggerPrompt('Give me complete revision notes for DBMS: Normalization (1NF to BCNF), ACID, and SQL Joins.');
    } else if (filter === 'cn') {
      triggerPrompt('Explain Computer Networks: OSI 7-Layer Model, TCP 3-Way Handshake, DNS, and Subnetting.');
    } else if (filter === 'all') {
      resetSession();
    }
  });
});

// Sidebar quick prompts
promptChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const promptText = chip.getAttribute('data-prompt');
    if (promptText && !isWaitingForResponse) {
      triggerPrompt(promptText);
    }
  });
});

// Welcome screen topic boxes
topicBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    const promptText = box.getAttribute('data-prompt');
    if (promptText && !isWaitingForResponse) {
      triggerPrompt(promptText);
    }
  });
});

function triggerPrompt(text) {
  userInput.value = text;
  userInput.style.height = 'auto';
  userInput.style.height = Math.min(userInput.scrollHeight, 160) + 'px';
  sendBtn.disabled = false;
  handleSendMessage();
}

// Clear / New Session
clearChatBtn.addEventListener('click', resetSession);
newChatBtn.addEventListener('click', resetSession);

// Mobile navigation toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

function resetSession() {
  if (isWaitingForResponse) return;
  conversationHistory = [];
  messagesContainer.innerHTML = '';
  if (welcomeScreen) {
    messagesContainer.appendChild(welcomeScreen);
    // Re-bind topic box listeners
    document.querySelectorAll('.topic-box').forEach((box) => {
      box.addEventListener('click', () => {
        const promptText = box.getAttribute('data-prompt');
        if (promptText && !isWaitingForResponse) {
          triggerPrompt(promptText);
        }
      });
    });
  }
  userInput.value = '';
  userInput.style.height = 'auto';
  sendBtn.disabled = true;
  userInput.focus();
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==============================================================================
// 📨 Message Dispatch
// ==============================================================================
async function handleSendMessage() {
  const text = userInput.value.trim();
  if (!text || isWaitingForResponse) return;

  // Hide welcome banner if visible
  if (welcomeScreen && welcomeScreen.parentNode === messagesContainer) {
    messagesContainer.removeChild(welcomeScreen);
  }

  // Append user message
  appendMessage('user', text);
  conversationHistory.push({ role: 'user', content: text });

  // Reset input box
  userInput.value = '';
  userInput.style.height = 'auto';
  sendBtn.disabled = true;
  isWaitingForResponse = true;

  // Show live typing dots
  const typingElement = showTypingIndicator();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: conversationHistory })
    });

    const data = await response.json();
    typingElement.remove();

    if (!response.ok) {
      throw new Error(data.error || 'Server returned an error.');
    }

    const reply = data.reply || 'No response returned.';
    appendMessage('bot', reply);
    conversationHistory.push({ role: 'assistant', content: reply });

  } catch (err) {
    typingElement.remove();
    console.error('Request error:', err);
    appendMessage(
      'bot',
      `⚠️ **Connection Notice:** Could not reach the service (${err.message}). Please check your connection.`
    );
  } finally {
    isWaitingForResponse = false;
    sendBtn.disabled = userInput.value.trim().length === 0;
    userInput.focus();
  }
}

// ==============================================================================
// 🎨 UI Rendering Helpers
// ==============================================================================
function appendMessage(sender, text) {
  const row = document.createElement('div');
  row.className = `message-row ${sender}`;

  const avatar = document.createElement('div');
  avatar.className = `avatar ${sender}-avatar`;
  avatar.innerHTML = sender === 'user'
    ? 'PR'
    : '<i data-lucide="book-open"></i>';

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';

  if (sender === 'bot') {
    bubble.innerHTML = formatMarkdown(text);
  } else {
    bubble.textContent = text;
  }

  row.appendChild(avatar);
  row.appendChild(bubble);
  messagesContainer.appendChild(row);

  if (window.lucide) {
    lucide.createIcons();
  }

  scrollToBottom();
}

function showTypingIndicator() {
  const row = document.createElement('div');
  row.className = 'message-row bot typing';

  const avatar = document.createElement('div');
  avatar.className = 'avatar bot-avatar';
  avatar.innerHTML = '<i data-lucide="book-open"></i>';

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.innerHTML = `
    <div class="typing-dots">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;

  row.appendChild(avatar);
  row.appendChild(bubble);
  messagesContainer.appendChild(row);

  if (window.lucide) {
    lucide.createIcons();
  }

  scrollToBottom();
  return row;
}

function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Markdown formatting for tables, headers, code, bold, lists
function formatMarkdown(text) {
  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Fenced code blocks
  escaped = escaped.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });

  // Inline code
  escaped = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headings
  escaped = escaped.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  escaped = escaped.replace(/^#### (.*$)/gm, '<h4>$1</h4>');

  // Markdown Tables (| a | b |)
  escaped = escaped.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (match) => {
    const lines = match.trim().split('\n');
    if (lines.length < 2) return match;

    let html = '<table>';
    lines.forEach((line, index) => {
      // Skip delimiter row like |---|---|
      if (line.includes('---')) return;

      const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      html += '<tr>';
      cells.forEach(cell => {
        const tag = index === 0 ? 'th' : 'td';
        html += `<${tag}>${cell.trim()}</${tag}>`;
      });
      html += '</tr>';
    });
    html += '</table>';
    return html;
  });

  // Bold
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Bullet points
  escaped = escaped.replace(/^\s*[-*]\s+(.*)$/gm, '&bull; $1');

  // Newlines (except after block elements)
  escaped = escaped.replace(/\n/g, '<br>');

  return escaped;
}
