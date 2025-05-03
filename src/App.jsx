import { useState } from 'react';
import ChatBubble from './components/ChatBubble';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', message: 'Ask me anything. I’m Jason and I have no filter.' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', message: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('https://kitgpt-backend.onrender.com/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();
      const replyText = data.text || "Jason didn’t answer.";
      const botMsg = { sender: 'bot', message: replyText };
      setMessages((prev) => [...prev, botMsg]);

      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);
        audio.play();
      }
    } catch (err) {
      console.error('Error:', err);
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
          placeholder="Ask Jason something..."
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