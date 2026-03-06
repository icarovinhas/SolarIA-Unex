import React from 'react';
import { Gavel, Scale, Sun, CheckCircle2, HelpCircle, FileText, Landmark, Percent, Info, ArrowRight } from 'lucide-react';

function BrLegislation({ darkMode = true }) {
    return (
        <div className={`min-h-screen font-sans pb-20 transition-colors duration-500 ${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-slate-100 text-slate-900'}`}>

            {/* HEADER */}
            <section className="max-w-6xl mx-auto px-6 py-24 text-center flex flex-col items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full mb-8 transition-all duration-700 hover:border-amber-500/40 ${darkMode
                    ? 'bg-amber-500/10 border border-amber-500/20'
                    : 'bg-amber-100 border border-amber-200'
                    }`}>
                    <Scale className={`w-4 h-4 ${darkMode ? 'text-amber-500' : 'text-amber-600'}`} />
                    <span className={`text-xs md:text-sm font-bold tracking-wide ${darkMode ? 'text-amber-400' : 'text-amber-700'
                        }`}>
                        Direitos e deveres
                    </span>
                </div>

                <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent italic pr-4 py-2 inline-block tracking-normal md:tracking-wider">
                        Legislação
                    </span>
                    <span className="inline-block not-italic ml-2">
                        Brasileira
                    </span>
                </h1>
                <p className={`max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium ${darkMode ? 'text-gray-500' : 'text-slate-600'
                    }`}>
                    Conheça as leis e normas que regulam a energia solar no Brasil e entenda seus direitos como futuro gerador de energia limpa.
                </p>
            </section>

            {/* SECTION IMPACTO: Brasil na vanguarda */}
            <section className="max-w-5xl mx-auto px-6 py-8">
                <div className={`group flex flex-col md:flex-row items-center gap-6 p-10 rounded-[32px] transition-all duration-1000 shadow-[0_0_40_rgba(245,158,11,0.05)] ${darkMode
                    ? 'bg-amber-500/5 border-2 border-amber-500/20 hover:bg-amber-500/10 hover:border-amber-500/40'
                    : 'bg-orange-50 border-2 border-amber-200 hover:bg-amber-100 hover:border-amber-400'
                    }`}>
                    <div className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:rotate-12 transition-transform duration-1000 ${darkMode
                        ? 'bg-amber-500/10 border-2 border-amber-500 text-amber-500'
                        : 'bg-amber-200 border-2 border-amber-600 text-amber-700'
                        }`}>
                        <Sun className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className={`text-2xl font-black mb-2 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Brasil na vanguarda</h2>
                        <p className={`text-lg leading-relaxed group-hover:transition-colors group-hover:duration-1000 ${darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-slate-600 group-hover:text-slate-800'
                            }`}>
                            Com o Marco Legal da Microgeração, o Brasil deu um passo decisivo para democratizar o acesso à energia solar, garantindo segurança para quem gera sua própria energia.
                        </p>
                    </div>
                </div>
            </section>

            {/* CARDS DE LEIS */}
            <section className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10">
                {[
                    {
                        lei: "Lei nº 14.300/2022",
                        data: "Janeiro de 2022",
                        status: "veridico",
                        icon: <Gavel className="w-6 h-6" />,
                        titulo: "Marco Legal da Microgeração",
                        desc: "Principal lei da energia solar no Brasil. Garante o sistema de compensação de créditos e traz segurança jurídica para o consumidor.",
                        itens: [
                            "Microgeração: até 75 kW de potência",
                            "Minigeração: de 75 kW até 5 MW",
                            "Compensação por créditos de energia",
                            "Prazo de 60 meses para uso dos créditos"
                        ]
                    },
                    {
                        lei: "Resolução ANEEL nº 1000/2021",
                        data: "Dezembro de 2021",
                        status: "veridico",
                        icon: <FileText className="w-6 h-6" />,
                        titulo: "Regulamentação Técnica ANEEL",
                        desc: "Define os prazos para conexão e os padrões técnicos de segurança que as distribuidoras devem seguir obrigatoriamente.",
                        itens: [
                            "Análise de projetos em até 30 dias",
                            "Padrões técnicos de segurança",
                            "Obrigação de medidor bidirecional",
                            "Regras para conexão à rede"
                        ]
                    },
                    {
                        lei: "ICMS e Isenção Fiscal",
                        data: "Varia por estado",
                        status: "veridico",
                        icon: <Percent className="w-6 h-6" />,
                        titulo: "Benefícios Fiscais Estaduais",
                        desc: "Isenções de impostos como IPI e ICMS que tornam a instalação de painéis solares muito mais barata para o cidadão.",
                        itens: [
                            "Isenção de IPI em equipamentos",
                            "Isenção de ICMS (Convênio 16/15)",
                            "Redução de PIS/COFINS solar",
                            "Linhas de crédito BNDES"
                        ]
                    }
                ].map((item, index) => (
                    <div key={index} className={`group relative p-8 md:p-10 rounded-[40px] transition-all duration-700 ${darkMode
                        ? 'bg-[#0d0d0d] border border-white/10 hover:border-amber-500/50 hover:shadow-[0_0_50px_rgba(245,158,11,0.05)]'
                        : 'bg-slate-100 border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-300'
                        }`}>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 mb-6">
                            <span className={`px-4 py-1.5 rounded-full font-bold text-[11px] tracking-widest uppercase shrink-0 ${darkMode
                                ? 'bg-amber-500/10 border border-amber-500/40 text-amber-400'
                                : 'bg-amber-100 border border-amber-400 text-amber-700'
                                }`}>
                                {item.lei}
                            </span>
                            <span className={`font-bold text-xs md:ml-0 ${darkMode ? 'text-gray-600' : 'text-slate-500'}`}>
                                {item.data}
                            </span>
                        </div>

                        <div className="absolute top-8 right-8 md:top-10 md:right-10">
                            {item.status === "veridico" ? (
                                <CheckCircle2 className="w-10 h-10 text-green-500/80 shadow-[0_0_20px_rgba(34,197,94,0.1)]" />
                            ) : (
                                <HelpCircle className="w-10 h-10 text-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.1)]" />
                            )}
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-amber-500 group-hover:scale-110 transition-transform duration-500">
                                {item.icon}
                            </div>
                            <h2 className={`text-2xl md:text-3xl font-black tracking-tight pr-14 leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                {item.titulo}
                            </h2>
                        </div>

                        <p className={`text-base md:text-lg mb-8 leading-relaxed max-w-3xl transition-colors duration-700 ${darkMode ? 'text-gray-500 group-hover:text-gray-300' : 'text-slate-600 group-hover:text-slate-700'
                            }`}>
                            {item.desc}
                        </p>

                        <ul className="grid md:grid-cols-2 gap-4">
                            {item.itens.map((li, i) => (
                                <li key={i} className={`flex items-center gap-3 font-medium text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'
                                    }`}>
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.4)] shrink-0"></span>
                                    {li}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            {/* FLUXO DE HOMOLOGAÇÃO */}
            <section className={`max-w-5xl mx-auto px-6 py-20 border-t ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
                <h3 className={`text-3xl font-black mb-12 text-center tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                    O Caminho da <span className={`italic ${darkMode ? 'text-amber-500' : 'text-amber-700'}`}>Legalização</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                    {[
                        { passo: "01", titulo: "Projeto", desc: "Engenheiro assina a ART e envia à concessionária." },
                        { passo: "02", titulo: "Parecer", desc: "Distribuidora aprova a conexão em até 15 dias." },
                        { passo: "03", titulo: "Vistoria", desc: "Após instalar, o técnico vem conferir o sistema." },
                        { passo: "04", titulo: "Troca", desc: "O seu medidor antigo vira um bidirecional." }
                    ].map((item, i) => (
                        <div key={i} className={`relative z-10 p-8 rounded-[32px] flex flex-col items-center text-center group transition-all duration-500 ${darkMode
                            ? 'bg-[#0d0d0d] border border-white/10 hover:border-amber-500/50'
                            : 'bg-slate-100 border border-slate-200 hover:shadow-xl hover:border-amber-300'
                            }`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm mb-4 shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform ${darkMode
                                ? 'bg-amber-500 text-black'
                                : 'bg-amber-600 text-white'
                                }`}>
                                {item.passo}
                            </div>
                            <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.titulo}</h4>
                            <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-500' : 'text-slate-600'}`}>{item.desc}</p>
                            {i < 3 && <ArrowRight className={`hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-8 ${darkMode ? 'text-white/10' : 'text-slate-300'}`} />}
                        </div>
                    ))}
                </div>

                {/* DICA JURÍDICA */}
                <div className={`mt-20 p-8 rounded-[40px] flex flex-col md:flex-row items-center gap-8 group transition-all ${darkMode
                    ? 'bg-blue-500/5 border border-blue-500/20 hover:bg-blue-500/10'
                    : 'bg-blue-100 border border-blue-300 hover:bg-blue-200'
                    }`}>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${darkMode
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-blue-200 text-blue-700'
                        }`}>
                        <Info className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className={`text-xl font-black mb-2 tracking-tight uppercase text-xs ${darkMode ? 'text-blue-400' : 'text-blue-700'
                            }`}>Atenção Técnica</h4>
                        <p className={`text-lg leading-relaxed font-medium ${darkMode ? 'text-gray-400' : 'text-slate-700'
                            }`}>
                            A legislação brasileira exige que tanto os <strong>módulos</strong> quanto os <strong>inversores</strong> possuam selo do INMETRO. Equipamentos sem certificação não podem ser homologados.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BrLegislation;