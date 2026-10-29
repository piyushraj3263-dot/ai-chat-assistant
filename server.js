// ==============================================================================
// 🚀 AI Chat Assistant - Backend Server
// ==============================================================================
// What this file does:
// 1. Creates an Express web server
// 2. Serves the frontend (HTML, CSS, JS) to the browser
// 3. Receives messages from the user in the browser
// 4. Sends those messages to the Claude API
// 5. Returns Claude's response back to the browser
// ==============================================================================

// Load environment variables from .env file (keeps your API key safe!)
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (functions that run on every request)
app.use(cors());                      // Allows cross-origin requests
app.use(express.json());              // Allows the server to read JSON bodies in requests
app.use(express.static(path.join(__dirname, 'public')));    // Serves all static files inside 'public' folder

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==============================================================================
// 🔑 Initialize Anthropic Claude Client
// ==============================================================================
// Check if the API key is provided
if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('\n⚠️ WARNING: ANTHROPIC_API_KEY is not set in your .env file!');
  console.warn('The chatbot will respond with a friendly placeholder until you set it.\n');
}

// Create the Anthropic client instance
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_key',
});

// ==============================================================================
// 📨 API Route: /api/chat
// ==============================================================================
// This is where the frontend sends the user's message.
// Expected body: { messages: [ { role: 'user', content: 'hello' }, ... ] }
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    // Validate the input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'Invalid request: "messages" array is required.'
      });
    }

    // If no valid API key is configured yet, send a helpful mock response
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_api_key_here') {
      return res.json({
        reply: "👋 Hello! I am your AI Chat Assistant.\n\nTo enable live AI responses, add your Claude API key to the `.env` file in the project directory!\n\nGet your key here: https://console.anthropic.com",
        mock: true
      });
    }

    // ==========================================================================
    // 🧠 Calling the Claude API
    // ==========================================================================
    // anthropic.messages.create() is the method that contacts Anthropic's servers.
    // - model: which Claude brain to use (e.g. claude-sonnet-5-5, claude-3-5-sonnet-20241022, or claude-3-haiku-20240307)
    // - max_tokens: maximum length of the reply
    // - messages: full conversation history so Claude remembers what was said!
    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022', // Fast, cost-efficient model ideal for chat
      max_tokens: 1024,
      system: "You are a friendly, knowledgeable, and helpful AI assistant. You explain things clearly, use formatting like bullet points and code blocks when helpful, and always maintain an encouraging tone.",
      messages: messages,
    });

    // Extract the text content from the response
    const replyText = response.content[0].text;

    // Send the reply back to the frontend
    res.json({ reply: replyText });

  } catch (error) {
    console.error('Error calling Claude API:', error);

    // Provide friendly error messages
    let clientMessage = 'An error occurred while contacting the AI.';
    if (error.status === 401) {
      clientMessage = 'Invalid API key. Please check your ANTHROPIC_API_KEY in .env.';
    } else if (error.status === 429) {
      clientMessage = 'Rate limit exceeded or out of credits. Please check your Anthropic account.';
    }

    res.status(500).json({ error: clientMessage, details: error.message });
  }
});

// ==============================================================================
// 🚀 Start the Server
// ==============================================================================
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 AI Chat Assistant is running!`);
    console.log(`🌐 Open in your browser: http://localhost:${PORT}`);
    console.log(`======================================================\n`);
  });
}

module.exports = app;
