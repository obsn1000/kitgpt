import { useState } from 'react';
import ChatBubble from './components/ChatBubble';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', message: 'Hi, ask me anything about Jason!' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', message: input };
    const botMsg = { sender: 'bot', message: 'Processing... (Jason is thinking)' }; // Placeholder

    setMessages([...messages, userMsg, botMsg]);
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