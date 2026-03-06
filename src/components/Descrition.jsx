import React from 'react';
import { useNavigate } from 'react-router-dom';
// IMPORTANDO OS ÍCONES
import { Sun, Coins, Leaf, Bot, ArrowRight } from 'lucide-react';

function Description({ darkMode = true }) {
    const navigate = useNavigate();

    return (
        <section className={`py-24 px-4 overflow-hidden border-t-[1px] transition-colors duration-500 ${darkMode ? 'bg-[#0a0a0a] text-white border-amber-500/30' : 'bg-slate-100 text-slate-900 border-slate-200'}`}>
            <div className="max-w-6xl mx-auto">
                <h2 className={`text-4xl md:text-5xl font-extrabold text-center mb-6 tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Por que escolher o
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent italic pr-2 ml-2">
                        sol
                        <span className="ml-2 not-italic inline-block">?</span>
                    </span>
                </h2>
                <p className={`text-lg md:text-xl text-center mb-16 max-w-2xl mx-auto leading-relaxed font-medium ${darkMode ? 'text-gray-500' : 'text-slate-600'}`}>
                    A energia solar não é apenas uma tendência — é a melhor decisão financeira e ambiental que você pode tomar hoje.
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Item 1 - Energia Limpa */}
                    <li className={`group flex flex-col items-start rounded-3xl p-8 transition-all duration-700 ${darkMode ? 'bg-[#0a0a0a] border border-white/10 hover:border-amber-500/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]' : 'bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:shadow-xl'}`}>
                        <Sun className="w-10 h-10 mb-4 text-amber-600 group-hover:rotate-12 transition-transform duration-700" />
                        <span className={`text-xl font-bold mb-3 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Energia Limpa</span>
                        <span className={`text-sm leading-relaxed transition-colors duration-700 ${darkMode ? 'text-gray-500 group-hover:text-gray-400' : 'text-slate-600 group-hover:text-slate-700'}`}>
                            Gere sua própria eletricidade sem impacto ambiental, direto do sol.
                        </span>
                    </li>

                    {/* Item 2 - Economia */}
                    <li className={`group flex flex-col items-start rounded-3xl p-8 transition-all duration-700 ${darkMode ? 'bg-[#0a0a0a] border border-white/10 hover:border-amber-500/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]' : 'bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:shadow-xl'}`}>
                        <Coins className="w-10 h-10 mb-4 text-amber-600 group-hover:scale-110 transition-transform duration-700" />
                        <span className={`text-xl font-bold mb-3 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Economia Real</span>
                        <span className={`text-sm leading-relaxed transition-colors duration-700 ${darkMode ? 'text-gray-500 group-hover:text-gray-400' : 'text-slate-600 group-hover:text-slate-700'}`}>
                            Reduza até 95% da sua conta de energia elétrica todo mês.
                        </span>
                    </li>

                    {/* Item 3 - Sustentabilidade */}
                    <li className={`group flex flex-col items-start rounded-3xl p-8 transition-all duration-700 ${darkMode ? 'bg-[#0a0a0a] border border-white/10 hover:border-amber-500/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]' : 'bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:shadow-xl'}`}>
                        <Leaf className="w-10 h-10 mb-4 text-amber-600 group-hover:-translate-y-1 transition-transform duration-700" />
                        <span className={`text-xl font-bold mb-3 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Sustentabilidade</span>
                        <span className={`text-sm leading-relaxed transition-colors duration-700 ${darkMode ? 'text-gray-500 group-hover:text-gray-400' : 'text-slate-600 group-hover:text-slate-700'}`}>
                            Contribua ativamente para um planeta mais verde e um futuro melhor.
                        </span>
                    </li>

                    {/* CARD CONVITE SolarAI */}
                    <li className={`group flex flex-col items-start rounded-3xl p-8 transition-all duration-700 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30 hover:border-amber-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]' : 'bg-slate-100 border border-slate-200 hover:bg-slate-50 hover:shadow-xl'}`}>
                        <Bot className={`absolute -right-2 -top-2 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-700 ${darkMode ? 'text-amber-500' : 'text-amber-600'}`} />

                        <Bot className={`w-10 h-10 mb-4 group-hover:scale-110 transition-transform duration-700 ${darkMode ? 'text-amber-500' : 'text-amber-600'}`} />
                        <span className={`text-xl font-bold mb-3 tracking-tight ${darkMode ? 'text-amber-500' : 'text-amber-700'}`}>Dúvidas?</span>
                        <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                            Fale com nossa inteligência artificial e planeje seu projeto agora.
                        </p>

                        <button
                            onClick={() => navigate('/solarai')}
                            className={`mt-auto w-full py-3 font-bold text-base rounded-xl transition-all flex items-center justify-center gap-2 group/btn shadow-lg active:scale-95 ${darkMode ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-amber-600 text-white hover:bg-amber-700'}`}
                        >
                            Usar SolarAI
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Description;