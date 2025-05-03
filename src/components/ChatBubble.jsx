export default function ChatBubble({ sender, message }) {
  return (
    <div className={`my-2 flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`rounded-xl p-3 max-w-xs ${sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        {message}
      </div>
    </div>
  );
}