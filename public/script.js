// ==============================================================================
// 💬 OmniChat AI - Client-Side Logic
// ==============================================================================

// State: maintains conversation history to send to Claude for context!
// Every time a new turn happens, we push { role: 'user' | 'assistant', content: text }
let conversationHistory = [];
let isWaitingForResponse = false;

// DOM Elements
const messagesContainer = document.getElementById('messagesContainer');
const welcomeScreen = document.getElementById('welcomeScreen');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearChatBtn = document.getElementById('clearChatBtn');
const newChatBtn = document.getElementById('newChatBtn');
const promptChips = document.querySelectorAll('.prompt-chip');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

// Initialize Lucide icons on load
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Auto-expand textarea as user types
userInput.addEventListener('input', () => {
  userInput.style.height = 'auto';
  userInput.style.height = Math.min(userInput.scrollHeight, 180) + 'px';
  // Enable or disable send button based on trimmed input
  sendBtn.disabled = userInput.value.trim().length === 0 || isWaitingForResponse;
});

// Handle Enter to send (Shift+Enter for newline)
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
});

// Send button click
sendBtn.addEventListener('click', handleSendMessage);

// Quick prompts in sidebar
promptChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const promptText = chip.getAttribute('data-prompt');
    if (promptText && !isWaitingForResponse) {
      userInput.value = promptText;
      userInput.style.height = 'auto';
      userInput.style.height = Math.min(userInput.scrollHeight, 180) + 'px';
      sendBtn.disabled = false;
      handleSendMessage();
    }
  });
});

// Clear chat button
clearChatBtn.addEventListener('click', resetChat);
newChatBtn.addEventListener('click', resetChat);

// Mobile sidebar toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

// Reset conversation
function resetChat() {
  if (isWaitingForResponse) return;
  conversationHistory = [];
  messagesContainer.innerHTML = '';
  if (welcomeScreen) {
    messagesContainer.appendChild(welcomeScreen);
  }
  userInput.value = '';
  userInput.style.height = 'auto';
  sendBtn.disabled = true;
  userInput.focus();
}

// ==============================================================================
// 🚀 Main Send Message Flow
// ==============================================================================
async function handleSendMessage() {
  const text = userInput.value.trim();
  if (!text || isWaitingForResponse) return;

  // 1. Hide welcome screen if it's visible
  if (welcomeScreen && welcomeScreen.parentNode === messagesContainer) {
    messagesContainer.removeChild(welcomeScreen);
  }

  // 2. Add user message to UI & history
  appendMessage('user', text);
  conversationHistory.push({ role: 'user', content: text });

  // 3. Clear the input
  userInput.value = '';
  userInput.style.height = 'auto';
  sendBtn.disabled = true;
  isWaitingForResponse = true;

  // 4. Show typing indicator
  const typingElement = showTypingIndicator();

  try {
    // 5. Send POST request to backend server
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: conversationHistory })
    });

    const data = await response.json();

    // Remove typing indicator
    typingElement.remove();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to get a response from the server.');
    }

    // 6. Display AI assistant response
    const botReply = data.reply || 'No response received.';
    appendMessage('bot', botReply);

    // Save assistant reply to memory so the AI remembers past conversation
    conversationHistory.push({ role: 'assistant', content: botReply });

  } catch (err) {
    typingElement.remove();
    console.error('Chat error:', err);
    appendMessage(
      'bot',
      `⚠️ **Error:** ${err.message || 'Something went wrong. Please check if your server is running and your API key is valid.'}`
    );
  } finally {
    isWaitingForResponse = false;
    sendBtn.disabled = userInput.value.trim().length === 0;
    userInput.focus();
  }
}

// ==============================================================================
// 🎨 UI Helpers: Render Messages
// ==============================================================================

function appendMessage(sender, text) {
  const row = document.createElement('div');
  row.className = `message-row ${sender}`;

  const avatar = document.createElement('div');
  avatar.className = `avatar ${sender}-avatar`;
  avatar.innerHTML = sender === 'user'
    ? '<i data-lucide="user"></i>'
    : '<i data-lucide="bot"></i>';

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
  avatar.innerHTML = '<i data-lucide="bot"></i>';

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

// Lightweight Markdown Formatter (code blocks, bold, lists, inline code)
function formatMarkdown(text) {
  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks: ```language ... ```
  escaped = escaped.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });

  // Inline code: `code`
  escaped = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold text: **bold**
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Line breaks to <br>
  escaped = escaped.replace(/\n/g, '<br>');

  return escaped;
}
