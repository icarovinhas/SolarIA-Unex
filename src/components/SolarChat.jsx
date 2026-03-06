import { useState, useEffect, useRef } from 'react';
// IMPORTANDO ÍCONES LUCIDE
import { Sun, User, SendHorizontal, Sparkles, Bot, Zap } from 'lucide-react';

export default function SolarAI({ darkMode = true }) {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Olá! Sou o SolarAI. Como posso ajudar seu projeto de energia solar hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) throw new Error('Falha na resposta');
      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'ai',
        content: data.response || data.message || "Não entendi, pode repetir?"
      }]);

    } catch (error) {
      console.error("Erro na SolarAI:", error);
      setMessages(prev => [...prev, {
        role: 'ai',
        content: 'Ops! Tive um problema técnico. O servidor está ligado?'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full w-full font-sans overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-[#0a0a0a] text-gray-100' : 'bg-slate-100 text-slate-900'
      }`}>

      {/* HEADER FIXO */}
      <header className={`flex-none border-b px-6 py-4 z-20 transition-colors duration-500 ${darkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-slate-100 border-slate-200'
        }`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border transition-colors duration-500 ${darkMode
              ? 'bg-amber-500/10 border-amber-500/20'
              : 'bg-amber-100 border-amber-300'
              }`}>
              <Sun className={`w-5 h-5 animate-spin-slow ${darkMode ? 'text-amber-500' : 'text-amber-700'
                }`} />
            </div>
            <div>
              <h1 className={`text-xl font-bold leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Solar<span className="text-amber-500">AI</span>
              </h1>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-slate-400'
                  }`}>Online</span>
              </div>
            </div>
          </div>
          <Sparkles className={`w-5 h-5 ${darkMode ? 'text-amber-500/40' : 'text-amber-600/40'}`} />
        </div>
      </header>

      {/* ÁREA DE MENSAGENS */}
      <main ref={scrollRef} className={`flex-1 overflow-y-auto px-4 py-8 space-y-6 scrollbar-thin transition-colors duration-500 ${darkMode
        ? 'bg-[#0a0a0a] scrollbar-thumb-white/10'
        : 'bg-slate-100 scrollbar-thumb-slate-300'
        }`}>
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                {/* Avatares Lucide */}
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border transition-all
                  ${msg.role === 'user'
                    ? darkMode ? 'bg-amber-500 border-amber-600 text-black' : 'bg-amber-600 border-amber-700 text-white'
                    : darkMode ? 'bg-white/5 border-white/10 text-amber-500' : 'bg-slate-100 border-slate-300 text-amber-700'
                  }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
                </div>

                {/* Balões de Chat */}
                <div className={`p-5 rounded-2xl leading-relaxed shadow-sm border transition-colors duration-500
                  ${msg.role === 'user'
                    ? darkMode ? 'bg-amber-500 text-black font-medium rounded-tr-none border-amber-600' : 'bg-amber-600 text-white font-medium rounded-tr-none border-amber-700 shadow-amber-200'
                    : darkMode ? 'bg-[#111111] text-gray-200 border-white/5 rounded-tl-none' : 'bg-slate-100 text-slate-800 border-slate-200 rounded-tl-none shadow-slate-200'
                  }`}>
                  <p className="text-sm md:text-base whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}

          {/* INDICADOR DE CARREGAMENTO (IA PENSANDO) */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-4 items-center">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-300'
                  }`}>
                  <Zap className={`w-5 h-5 animate-pulse ${darkMode ? 'text-amber-500' : 'text-amber-700'}`} />
                </div>
                <div className={`p-4 rounded-2xl flex gap-1.5 items-center transition-colors duration-500 ${darkMode ? 'bg-[#111111] border border-white/5' : 'bg-slate-100 border border-slate-300'
                  }`}>
                  <div className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s] ${darkMode ? 'bg-amber-500/50' : 'bg-amber-600/50'
                    }`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s] ${darkMode ? 'bg-amber-500/50' : 'bg-amber-600/50'
                    }`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${darkMode ? 'bg-amber-500/50' : 'bg-amber-600/50'
                    }`}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* RODAPÉ / INPUT */}
      <footer className={`flex-none p-6 transition-colors duration-500 ${darkMode ? 'bg-[#0a0a0a]' : 'bg-slate-100 border-t border-slate-200'}`}>
        <div className="max-w-4xl mx-auto relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isLoading ? "SolarAI está processando..." : "Pergunte sobre economia, placas ou legislação..."}
            disabled={isLoading}
            className={`w-full p-5 pr-16 rounded-2xl focus:outline-none focus:ring-1 transition-all disabled:opacity-50 ${darkMode
              ? 'bg-[#111111] border border-white/10 text-white focus:ring-amber-500/50 placeholder:text-gray-600'
              : 'bg-slate-100 border border-slate-200 text-slate-900 focus:ring-amber-500/30 placeholder:text-slate-400'
              }`}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`absolute right-3 p-3 rounded-xl transition-all disabled:opacity-30 disabled:grayscale shadow-lg ${darkMode
              ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-amber-500/10'
              : 'bg-amber-600 text-white hover:bg-amber-700 shadow-amber-600/10'
              }`}
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </div>
        <p className={`text-center text-[10px] mt-4 uppercase tracking-[0.2em] font-bold transition-colors duration-500 ${darkMode ? 'text-gray-600' : 'text-slate-400'
          }`}>
          Powered by SolarAI Intelligence
        </p>
      </footer>
    </div>
  );
}