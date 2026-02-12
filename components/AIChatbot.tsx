
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Search, ArrowRight } from './Icons';
import { ChatMessage, Product } from '../types';
import { getGeminiResponse } from '../services/geminiService';
import { PRODUCTS } from '../constants';

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I am Lumina, your AI shopping concierge. Looking for something specific or need a recommendation?', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userText, timestamp: Date.now() }]);
    setInputValue('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const response = await getGeminiResponse(userText, history);

    setMessages(prev => [...prev, { 
      role: 'model', 
      text: response.text, 
      timestamp: Date.now(),
      suggestedProducts: response.suggestedProductIds
    }]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={onClose}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all z-40 animate-bounce"
      >
        <Bot className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-slate-200 transition-all transform animate-in slide-in-from-bottom-10">
      {/* Header */}
      <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Lumina AI</h3>
            <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">Online</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none'
            }`}>
              <p className="leading-relaxed">{msg.text}</p>
              
              {/* Product Suggestions */}
              {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                <div className="mt-4 space-y-2 pt-3 border-t border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Recommended for you</p>
                  {msg.suggestedProducts.map(id => {
                    const product = PRODUCTS.find(p => p.id === id);
                    if (!product) return null;
                    return (
                      <button 
                        key={id}
                        onClick={() => onSelectProduct(product)}
                        className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200 w-full text-left hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      >
                        <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <div className="flex-1 overflow-hidden">
                          <p className="text-xs font-semibold truncate text-slate-800">{product.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold">${product.price}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="relative flex items-center">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Lumina anything..."
            className="w-full bg-slate-100 border-none rounded-2xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:bg-slate-400 transition-all"
          >
            <Search className="w-4 h-4 transform rotate-90" />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2 italic">
          AI may provide helpful suggestions. Always verify specs.
        </p>
      </div>
    </div>
  );
};

export default AIChatbot;
