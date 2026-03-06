import React from 'react';
import { Users, History, Target, Lightbulb, Heart, Globe, Sun, Star } from 'lucide-react';

function AboutUs({ darkMode = true }) {
    return (
        <div className={`min-h-screen font-sans pb-24 transition-colors duration-500 ${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-slate-100 text-slate-900'}`}>

            {/* HEADER */}
            <section className="max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-colors duration-500 ${darkMode
                    ? 'bg-amber-500/10 border border-amber-500/20'
                    : 'bg-amber-100 border border-amber-200'
                    }`}>
                    <Users className={`w-4 h-4 ${darkMode ? 'text-amber-500' : 'text-amber-700'}`} />
                    <span className={`text-xs md:text-sm font-bold tracking-wide ${darkMode ? 'text-amber-400' : 'text-amber-800'
                        }`}>
                        Conheça o projeto
                    </span>
                </div>

                <h1 className={`text-5xl md:text-7xl font-black mb-4 tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Sobre
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent italic pr-2 py-2 inline-block tracking-wider ml-2">
                        nós?
                    </span>
                </h1>
                <p className={`max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium ${darkMode ? 'text-gray-500' : 'text-slate-600'
                    }`}>
                    Somos um projeto educacional apaixonado por energia solar e pelo futuro sustentável do Brasil.
                </p>
            </section>

            {/* SECTION 1: HISTÓRIA */}
            <section className="max-w-5xl mx-auto px-6 mb-16">
                <div className={`group rounded-[32px] p-8 md:p-12 flex flex-col items-start gap-6 transition-all duration-700 ${darkMode
                    ? 'border border-white/10 bg-[#0a0a0a] hover:border-amber-500/50 hover:bg-amber-500/[0.02]'
                    : 'border border-slate-200 bg-slate-100 hover:shadow-lg'
                    }`}>
                    <div className={`w-14 h-14 flex items-center justify-center rounded-2xl group-hover:rotate-12 transition-transform duration-700 ${darkMode
                        ? 'bg-amber-500/10 border border-amber-500/50 text-amber-500'
                        : 'bg-amber-100 border border-amber-300 text-amber-700'
                        }`}>
                        <History className="w-7 h-7" />
                    </div>
                    <h2 className={`text-3xl md:text-4xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Nossa <span className={`italic pr-4 py-1 inline-block tracking-wider ${darkMode ? 'text-amber-500' : 'text-amber-700'}`}>história</span>
                    </h2>
                    <div className={`flex flex-col gap-6 text-base md:text-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'
                        }`}>
                        <p>O SolarAI nasceu de uma pergunta simples: <span className={`italic font-medium ${darkMode ? 'text-amber-500/80' : 'text-amber-700'}`}>"Por que tão pouca gente sabe sobre os benefícios reais da energia solar?"</span></p>
                        <p>Vimos que a informação existia, mas estava espalhada e técnica. Decidimos criar uma plataforma que une educação e transparência para o cidadão brasileiro.</p>
                        <div className={`font-bold border-l-4 pl-6 py-2 rounded-r-xl transition-colors duration-500 ${darkMode
                            ? 'text-amber-500 border-amber-500 bg-amber-500/5'
                            : 'text-amber-700 border-amber-500 bg-amber-50'
                            }`}>
                            Nossa missão é fazer com que nenhum brasileiro deixe de aproveitar o sol por falta de informação.
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: MISSÃO/VISÃO/VALORES */}
            <section className="max-w-5xl mx-auto px-6 mb-20">
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <Target className="w-6 h-6" />, title: "Missão", desc: "Democratizar o acesso ao conhecimento sobre energia solar no Brasil." },
                        { icon: <Lightbulb className="w-6 h-6" />, title: "Visão", desc: "Ser a principal referência digital em educação solar no país." },
                        { icon: <Heart className="w-6 h-6" />, title: "Valores", desc: "Sustentabilidade, transparência e inovação constante." }
                    ].map((item, index) => (
                        <li
                            key={index}
                            className={`group rounded-3xl p-8 flex flex-col items-start gap-4 transition-all duration-700 ${darkMode
                                ? 'border border-white/10 bg-[#0a0a0a] hover:border-amber-500/50'
                                : 'border border-slate-200 bg-slate-100 hover:shadow-lg hover:border-amber-300'
                                }`}
                        >
                            <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform duration-500 ${darkMode
                                ? 'text-amber-500 bg-amber-500/10'
                                : 'text-amber-700 bg-amber-100'
                                }`}>
                                {item.icon}
                            </div>
                            <h3 className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                            <p className={`leading-relaxed text-base font-medium group-hover:transition-colors group-hover:duration-700 ${darkMode ? 'text-gray-500 group-hover:text-gray-300' : 'text-slate-600 group-hover:text-slate-700'
                                }`}>
                                {item.desc}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* SECTION 3: NÚMEROS (Sem Hover) */}
            <section className="max-w-5xl mx-auto px-6 mb-24">
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { val: "2024", label: "Fundação" },
                        { val: "100%", label: "Energia Limpa" },
                        { val: "6+", label: "Módulos" },
                        { val: "∞", label: "Impacto" }
                    ].map((stat, index) => (
                        <li key={index} className={`rounded-3xl p-8 text-center transition-colors duration-500 ${darkMode
                            ? 'border border-white/5 bg-[#111111]/30 backdrop-blur-sm'
                            : 'border border-slate-200 bg-slate-100 shadow-sm'
                            }`}>
                            <span className={`block text-4xl md:text-5xl font-black mb-2 py-1 ${darkMode
                                ? 'bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent'
                                : 'text-amber-600'
                                }`}>
                                {stat.val}
                            </span>
                            <span className={`text-[10px] uppercase tracking-[0.2em] font-black leading-tight ${darkMode ? 'text-gray-500' : 'text-slate-400'
                                }`}>{stat.label}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* SECTION 4: CARD FINAL (Estilo Amber com Globo) */}
            <section className="max-w-5xl mx-auto px-6">
                <div className={`relative rounded-[48px] py-20 px-10 text-center transition-all duration-700 flex flex-col items-center gap-8 overflow-hidden group ${darkMode
                    ? 'bg-amber-500 border border-amber-400 hover:shadow-[0_0_80px_rgba(245,158,11,0.25)] text-yellow-800'
                    : 'bg-amber-200 border border-amber-300 hover:shadow-xl text-amber-900'
                    }`}>

                    {/* Elemento Decorativo de Fundo */}
                    <Sun className={`absolute -right-10 -bottom-10 w-64 h-64 group-hover:rotate-45 transition-transform duration-1000 ${darkMode ? 'text-black/5' : 'text-black/10'
                        }`} />

                    <div className={`p-4 rounded-full shadow-xl group-hover:scale-110 transition-transform duration-700 ${darkMode
                        ? 'bg-yellow-800 text-amber-500'
                        : 'bg-amber-600 text-white'
                        }`}>
                        <Globe className="w-10 h-10" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter z-10 leading-tight">
                        Juntos por um Brasil <br /> mais verde
                    </h2>
                    <p className={`text-xl md:text-2xl leading-relaxed max-w-3xl font-medium z-10 ${darkMode ? 'text-yellow-800/80' : 'text-amber-900/80'
                        }`}>
                        Cada pessoa que aprende sobre energia solar contribui para um futuro melhor. Somos parte dessa transformação — e você também pode ser.
                    </p>

                    <div className="flex flex-col items-center gap-2 z-10">
                        <div className="flex items-center gap-2">
                            <Star className={`w-5 h-5 fill-current ${darkMode ? 'text-yellow-800' : 'text-amber-900'}`} />
                            <span className={`font-black text-lg uppercase tracking-[0.3em] ${darkMode ? 'text-yellow-800' : 'text-amber-900'}`}>
                                Made in Brazil
                            </span>
                            <Star className={`w-5 h-5 fill-current ${darkMode ? 'text-yellow-800' : 'text-amber-900'}`} />
                        </div>
                        <span className={`text-sm font-bold uppercase tracking-widest ${darkMode ? 'text-yellow-800/50' : 'text-amber-900/50'}`}>SolarAI Project © 2026</span>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;