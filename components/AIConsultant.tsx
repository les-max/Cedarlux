
import React, { useState, useRef, useEffect } from 'react';
import { getDesignAdvice } from '../services/geminiService.ts';
import { Send, Sparkles, User, Bot, X } from 'lucide-react';

export const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Welcome to Cedar Lux Properties. I am your personal design consultant. How can I help you envision your perfect Cedar Creek Lake estate today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: m.content }]
    }));

    const response = await getDesignAdvice(userMsg, history);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-luxury-gold text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-all"
        >
          <Sparkles size={24} />
          <span className="font-bold pr-2">Design Consultant</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-100">
          <div className="bg-lake p-6 text-white flex justify-between items-center">
            <h3 className="font-bold">Design Consultant</h3>
            <button onClick={() => setIsOpen(false)}><X size={24} /></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-lake text-white' : 'bg-white shadow-sm'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t bg-white flex gap-2">
            <input type="text" className="flex-1 p-2 border rounded-full outline-none" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} />
            <button onClick={handleSend} className="p-2 bg-lake text-white rounded-full"><Send size={18}/></button>
          </div>
        </div>
      )}
    </>
  );
};
