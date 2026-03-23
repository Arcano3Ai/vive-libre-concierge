const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

const { unifiedSystemInstruction } = require('./agents/orchestrator');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) return res.status(400).send('Incompleto.');

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", 
      systemInstruction: unifiedSystemInstruction 
    });
    const chat = model.startChat({
      history: (history || []).map(h => ({
        role: h.role === 'bot' ? 'model' : 'user',
        parts: [{ text: h.text }],
      })),
    });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    res.send(response.text());
  } catch (error) {
    console.error('GENAI ERROR DETAILS:', error);
    res.status(500).send(`Error de conexión: ${error.message}`);
  }
});

// Fix for Express 5 wildcard
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => console.log(`[Vive Libre] Butler active on ${port}`));
