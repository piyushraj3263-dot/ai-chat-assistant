// ==============================================================================
// 🛠️ DevPilot - Client Workspace Logic
// Built by Piyush Raj
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
    : '<i data-lucide="terminal"></i>';

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
  avatar.innerHTML = '<i data-lucide="terminal"></i>';

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

// Markdown formatting for code, bold, lists
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

  // Bold
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Bullet points
  escaped = escaped.replace(/^\s*[-*]\s+(.*)$/gm, '&bull; $1');

  // Newlines
  escaped = escaped.replace(/\n/g, '<br>');

  return escaped;
}
