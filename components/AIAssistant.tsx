
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';
import { chatWithGemini } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
    { role: 'ai', text: 'Hi! I am your BusGo Travel Assistant. Need help picking a destination or route?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    setIsTyping(true);
    const aiResponse = await chatWithGemini(userMsg, []);
    setIsTyping(false);
    
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 p-5 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <Bot className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold leading-tight">BusGo AI</h3>
                <span className="text-red-100 text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Powered by Gemini
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 p-1.5 rounded-full transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                  ${msg.role === 'user' ? 'bg-red-600 text-white rounded-br-none' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 rounded-bl-none flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask travel advice..."
                className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-4 pr-12 focus:ring-2 focus:ring-red-500 text-sm"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 transition transform hover:scale-110 flex items-center justify-center"
        >
          <MessageSquare className="w-8 h-8" />
          <div className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
