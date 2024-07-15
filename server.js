const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let sessions = {};

// Обработка POST-запроса для добавления сообщения
app.post('/addMessage', (req, res) => {
    const { sessionId, message } = req.body;
    if (!sessions[sessionId]) {
        sessions[sessionId] = { messages: [] };
    }
    sessions[sessionId].messages.push({ message, likes: 0 });
    res.status(200).json({ success: true });
});

// Обработка POST-запроса для лайка сообщения
app.post('/likeMessage', (req, res) => {
    const { sessionId, messageIndex } = req.body;
    if (sessions[sessionId] && sessions[sessionId].messages[messageIndex]) {
        sessions[sessionId].messages[messageIndex].likes += 1;
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ error: 'Message not found' });
    }
});

// Обработка GET-запроса для получения сообщений
app.get('/getMessages', (req, res) => {
    const { sessionId } = req.query;
    if (sessions[sessionId]) {
        res.status(200).json({ messages: sessions[sessionId].messages });
    } else {
        res.status(404).json({ error: 'Session not found' });
    }
});

// Обработка POST-запроса для создания новой сессии
app.post('/submit', (req, res) => {
    const { message } = req.body;
    const sessionId = new Date().getTime().toString();
    sessions[sessionId] = { messages: [{ message, likes: 0 }] };
    res.status(200).json({ sessionId });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
// Обработка POST-запроса для отмены лайка сообщения
app.post('/unlikeMessage', (req, res) => {
  const { sessionId, messageIndex } = req.body;
  if (sessions[sessionId] && sessions[sessionId].messages[messageIndex]) {
      sessions[sessionId].messages[messageIndex].likes -= 1;
      res.status(200).json({ success: true });
  } else {
      res.status(400).json({ error: 'Message not found' });
  }
});


