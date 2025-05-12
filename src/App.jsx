import { useState, useRef, useEffect } from 'react';
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
      const res = await fetch('http://localhost:5000/api/speak', {
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
    <div className="h-screen w-screen flex flex-col bg-black text-green-400 font-mono relative">
      {/* Scan line effect */}
      <div className="scan-line"></div>
      {/* Header with tech-style title */}
      <div className="bg-gray-900 p-3 border-b border-green-500 flex items-center">
        <div className="text-xl font-bold tracking-wider matrix-glow">KIT<span className="text-green-500">GPT</span> v1.0</div>
        <div className="ml-auto text-xs text-green-300 animate-pulse">SYSTEM ONLINE</div>
      </div>
      
      {/* Chat area with tech styling */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} sender={msg.sender} message={msg.message} />
          ))}
        </div>
      </div>
      
      {/* Input area with tech styling */}
      <div className="p-4 flex border-t border-green-900 bg-gray-900">
        <div className="flex-1 flex items-center relative">
          <span className="absolute left-3 text-green-500">&gt;</span>
          <input
            className="flex-1 bg-gray-800 border border-green-700 rounded-md px-8 py-2 text-green-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Enter command..."
          />
        </div>
        <button
          className="ml-2 bg-green-800 hover:bg-green-700 text-green-300 rounded-md px-4 py-2 transition-colors duration-200 flex items-center"
          onClick={handleSend}
        >
          <span>EXECUTE</span>
        </button>
      </div>
      
      {/* Status bar */}
      <div className="bg-gray-900 text-xs text-green-500 p-1 flex justify-between border-t border-green-900">
        <span>AI: JASON v3.5</span>
        <span className="animate-pulse">CONNECTION SECURE</span>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}

export default App;