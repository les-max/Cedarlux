
import React, { useState, useRef, useEffect } from 'react';
import { getDesignAdvice } from '../services/geminiService';
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
      {/* Floating Action Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-luxury-gold text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-all animate-bounce"
        >
          <Sparkles size={24} />
          <span className="font-bold pr-2">Design Consultant</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-100 animate-in fade-in slide-in-from-bottom-8 duration-300">
          <div className="bg-lake p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold">Design Consultant</h3>
                <p className="text-[10px] text-neutral-300 uppercase tracking-widest">AI Concierge</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-neutral-200' : 'bg-luxury-gold'}`}>
                    {m.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-white" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' ? 'bg-lake text-white rounded-tr-none' : 'bg-white shadow-sm border border-neutral-100 rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-neutral-100 p-4 rounded-2xl animate-pulse flex gap-2">
                  <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
                  <div className="w-2 h-2 bg-luxury-gold rounded-full delay-100"></div>
                  <div className="w-2 h-2 bg-luxury-gold rounded-full delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-neutral-100 bg-white">
            <div className="relative">
              <input 
                type="text"
                placeholder="Ask about architectural styles..."
                className="w-full pl-4 pr-12 py-3 bg-neutral-100 rounded-full focus:ring-2 focus:ring-luxury-gold outline-none text-sm"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1.5 p-1.5 bg-lake text-white rounded-full hover:bg-neutral-800 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
