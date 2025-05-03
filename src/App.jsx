import { useState } from 'react';
import ChatBubble from './components/ChatBubble';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', message: 'Hi, ask me anything about Jason!' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    // Step 1: Add user message to screen
    const userMsg = { sender: 'user', message: input };
    setMessages((prev) => [...prev, userMsg]);

    // Step 2: Simulate GPT reply (real GPT comes later)
    const replyText = "Jason says: I love ramen and walking my dog KenKen.";
    const botMsg = { sender: 'bot', message: replyText };
    setMessages((prev) => [...prev, botMsg]);

    // Step 3: Send replyText to your Flask Resemble API
    try {
      const res = await fetch('http://localhost:5000/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: replyText }),
      });

      const data = await res.json();
      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);
        audio.play();
      }
    } catch (err) {
      console.error('Failed to get voice:', err);
    }

    setInput('');
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-white text-black">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} message={msg.message} />
        ))}
      </div>
      <div className="p-4 flex border-t">
        <input
          className="flex-1 border rounded-xl px-4 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Jason anything..."
        />
        <button
          className="ml-2 bg-blue-600 text-white rounded-xl px-4 py-2"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
