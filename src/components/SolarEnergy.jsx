import React, { useState, useEffect } from 'react';
import { Sun, Lightbulb, Zap, TrendingDown, Leaf, Globe, Home, Factory, Tractor, Info } from 'lucide-react';

function SolarEnergy({ darkMode = true }) {
  const [activeCell, setActiveCell] = useState(null);
  const [energy, setEnergy] = useState(0);

  // Efeito opcional: a energia dissipa-se lentamente se não houver interação (opcional)
  useEffect(() => {
    const timer = setInterval(() => {
      setEnergy(prev => (prev > 0 ? +(prev - 0.1).toFixed(1) : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`solar-energy min-h-screen font-sans pb-20 transition-colors duration-500 ${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-slate-100 text-slate-900'}`}>

      {/* SECTION 1: HERO */}
      <section className="py-24 px-6 text-center flex flex-col items-center">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${darkMode ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-orange-100 border border-orange-300'
          }`}>
          <Sun className={`w-4 h-4 ${darkMode ? 'text-amber-500' : 'text-orange-600'}`} />
          <span className={`text-xs md:text-sm font-bold tracking-wide ${darkMode ? 'text-amber-400' : 'text-orange-600'
            }`}>
            Entenda tudo sobre
          </span>
        </div>

        <h1 className={`text-6xl md:text-8xl font-extrabold mb-6 tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-slate-900'
          }`}>
          Energia <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent italic pr-6 pb-2 inline-block">Solar</span>
        </h1>
        <p className={`max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed font-medium ${darkMode ? 'text-gray-500' : 'text-slate-600'
          }`}>
          Do conceito básico ao impacto real na sua vida — tudo o que precisa saber sobre energia fotovoltaica.
        </p>
      </section>

      {/* SECTION 2: EXPLICAÇÕES + SIMULADOR INTERATIVO */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <ul className="grid grid-cols-1 gap-10">

            {/* O QUE É ENERGIA SOLAR */}
            <li className={`group flex flex-col md:flex-row items-start gap-8 p-10 rounded-[32px] transition-all duration-700 ${darkMode
              ? 'bg-[#0a0a0a] border border-white/10 hover:border-amber-500/50'
              : 'bg-slate-100 border border-slate-200 hover:shadow-xl hover:border-amber-600/30'
              }`}>
              <div className={`w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-2xl group-hover:rotate-12 transition-transform duration-700 ${darkMode
                ? 'bg-amber-500/10 border border-amber-500/40 text-amber-500'
                : 'bg-orange-100 border border-orange-300 text-amber-700'
                }`}>
                <Lightbulb className="w-7 h-7" />
              </div>
              <div>
                <h3 className={`text-3xl font-black mb-4 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>O que é energia solar?</h3>
                <p className={`text-lg leading-relaxed group-hover:transition-colors group-hover:duration-700 ${darkMode ? 'text-gray-500 group-hover:text-gray-300' : 'text-slate-600 group-hover:text-slate-700'
                  }`}>
                  Energia solar é a conversão da luz emitida pelo sol em eletricidade utilizável. Isso é feito através de painéis fotovoltaicos — dispositivos compostos por células semicondutoras que, ao receberem fótons da luz solar, libertam eletrões e geram cor rente elétrica.
                </p>
              </div>
            </li>

            {/* COMO FUNCIONA + SIMULADOR (OPÇÃO 3) */}
            <li className={`group flex flex-col gap-8 p-10 rounded-[32px] transition-all duration-700 ${darkMode
              ? 'bg-[#0a0a0a] border border-white/10 hover:border-amber-500/50'
              : 'bg-slate-100 border border-slate-200 hover:shadow-xl hover:border-amber-600/30'
              }`}>
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className={`w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-2xl text-amber-500 group-hover:rotate-12 transition-transform duration-700 ${darkMode
                  ? 'bg-amber-500/10 border border-amber-500/40'
                  : 'bg-orange-100 border border-orange-300 text-amber-700'
                  }`}>
                  <Zap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className={`text-3xl font-black mb-4 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Como funciona um painel solar?</h3>
                  <p className={`text-lg leading-relaxed mb-8 group-hover:transition-colors group-hover:duration-700 ${darkMode ? 'text-gray-500 group-hover:text-gray-300' : 'text-slate-600 group-hover:text-slate-700'
                    }`}>
                    Um painel solar é composto por diversas células fotovoltaicas. Experimente <strong>passar o cursor sobre as células</strong> abaixo para simular a captação de luz e veja a geração de energia subir em tempo real:
                  </p>

                  {/* --- SIMULADOR DE GERAÇÃO (OPÇÃO 3) --- */}
                  <div className={`flex flex-col lg:flex-row gap-8 items-center p-8 rounded-[40px] relative overflow-hidden ${darkMode
                    ? 'bg-white/5 border border-white/10'
                    : 'bg-slate-100 border border-slate-200'
                    }`}>

                    {/* PLACA COM CÉLULAS */}
                    <div className={`grid grid-cols-4 gap-2 p-4 rounded-2xl border shadow-2xl relative ${darkMode
                      ? 'bg-[#111] border-white/5'
                      : 'bg-slate-800 border-slate-700'
                      }`}>
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          onMouseEnter={() => {
                            setActiveCell(i);
                            setEnergy(prev => +(Math.min(prev + 1.5, 100)).toFixed(1));
                          }}
                          onMouseLeave={() => setActiveCell(null)}
                          className={`w-12 h-12 md:w-16 md:h-16 rounded-sm transition-all duration-300 cursor-pointer flex items-center justify-center
                            ${activeCell === i
                              ? 'bg-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.6)] scale-110 z-10'
                              : darkMode ? 'bg-blue-900/10 border border-blue-500/5 hover:border-amber-500/30' : 'bg-blue-950 border border-blue-700/30 hover:border-amber-600/50'}`}
                          style={{
                            backgroundImage: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.4) 100%)'
                          }}
                        >
                          {activeCell === i && <Zap className="w-4 h-4 text-black animate-pulse" />}
                        </div>
                      ))}
                    </div>

                    {/* DISPLAY DE PERFORMANCE */}
                    <div className="flex-1 w-full flex flex-col items-center lg:items-start">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className={`font-black text-6xl tabular-nums tracking-tighter ${darkMode ? 'text-amber-500' : 'text-amber-600'
                          }`}>
                          {energy}
                        </span>
                        <span className={`text-2xl font-bold italic ${darkMode ? 'text-gray-600' : 'text-slate-400'
                          }`}>Wh</span>
                      </div>
                      <p className={`text-xs font-bold uppercase tracking-[0.3em] mb-6 ${darkMode ? 'text-amber-500/60' : 'text-amber-700/60'
                        }`}>Geração Ativa</p>

                      {/* Barra de progresso */}
                      <div className={`w-full h-3 rounded-full overflow-hidden border mb-6 ${darkMode
                        ? 'bg-white/5 border-white/10'
                        : 'bg-slate-300 border-slate-400'
                        }`}>
                        <div
                          className="h-full bg-gradient-to-r from-orange-600 to-amber-400 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                          style={{ width: `${energy}%` }}
                        />
                      </div>

                      <button
                        onClick={() => setEnergy(0)}
                        className={`px-6 py-2 rounded-full border text-[10px] uppercase font-bold transition-all ${darkMode
                          ? 'border-white/10 text-gray-500 hover:text-amber-500 hover:border-amber-500/50'
                          : 'border-slate-300 text-slate-600 hover:text-amber-700 hover:border-amber-600'
                          }`}
                      >
                        Reiniciar Sistema
                      </button>
                    </div>
                  </div>
                  {/* -------------------------------------- */}
                </div>
              </div>
            </li>

            {/* RESTANTE DOS ITENS (ECONOMIA, IMPACTO, BRASIL) */}
            {[
              {
                title: "Capacidade de geração e economia",
                icon: <TrendingDown className="w-7 h-7" />,
                text: "Um sistema residencial típico pode eliminar até 95% da sua conta de luz. O retorno do investimento ocorre geralmente entre 4 e 7 anos."
              },
              {
                title: "Impacto ambiental positivo",
                icon: <Leaf className="w-7 h-7" />,
                text: "A energia solar não produz resíduos, não consome água e não emite poluentes. É a forma mais limpa de alimentar o nosso futuro."
              }
            ].map((item, index) => (
              <li key={index} className={`group flex flex-col md:flex-row items-start gap-8 p-10 rounded-[32px] transition-all duration-700 ${darkMode
                  ? 'bg-[#0a0a0a] border border-white/10 hover:border-amber-500/50'
                  : 'bg-slate-100 border border-slate-200 hover:shadow-xl hover:border-amber-600/30'
                }`}>
                <div className={`w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-2xl group-hover:rotate-12 transition-transform duration-700 ${darkMode
                    ? 'bg-amber-500/10 border border-amber-500/40 text-amber-500'
                    : 'bg-orange-100 border border-orange-300 text-amber-700'
                  }`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className={`text-3xl font-black mb-4 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`text-lg leading-relaxed group-hover:transition-colors group-hover:duration-700 ${darkMode ? 'text-gray-500 group-hover:text-gray-300' : 'text-slate-600 group-hover:text-slate-700'
                    }`}>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 3: APLICAÇÕES */}
      <section className={`py-24 px-6 border-t ${darkMode ? 'border-white/5' : 'border-slate-200'
        }`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-16 text-center tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-slate-900'
            }`}>
            Onde pode ser <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent italic pr-2 inline-block">aplicada<span className="ml-2 not-italic inline-block">?</span></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              { label: "Residencial", desc: "Casas e apartamentos", icon: <Home className="w-8 h-8" /> },
              { label: "Industrial", desc: "Fábricas e galpões", icon: <Factory className="w-8 h-8" /> },
              { label: "Rural", desc: "Fazendas e agronegócio", icon: <Tractor className="w-8 h-8" /> }
            ].map((beneficio, index) => (
              <div
                key={index}
                className={`group flex flex-col items-center text-center p-10 rounded-3xl transition-all duration-700 ${darkMode
                  ? 'bg-[#0a0a0a] border border-white/10 hover:border-amber-500/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]'
                  : 'bg-slate-100 border border-slate-200 hover:shadow-xl hover:border-amber-600/30'
                  }`}
              >
                <div className={`w-20 h-20 flex items-center justify-center rounded-2xl mb-6 group-hover:rotate-12 transition-transform duration-700 ${darkMode
                  ? 'bg-amber-500/10 border-2 border-amber-500 text-amber-500'
                  : 'bg-orange-100 border-2 border-amber-600 text-amber-700'
                  }`}>
                  {beneficio.icon}
                </div>
                <span className={`text-2xl font-black mb-3 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{beneficio.label}</span>
                <span className={`text-lg font-medium group-hover:transition-colors ${darkMode ? 'text-gray-500 group-hover:text-gray-400' : 'text-slate-600 group-hover:text-slate-700'
                  }`}>{beneficio.desc}</span>
              </div>
            ))}
          </div>

          <div className={`max-w-4xl mx-auto p-12 rounded-[40px] flex flex-col items-center text-center group relative overflow-hidden ${darkMode
            ? 'bg-amber-500/5 border border-amber-500/20'
            : 'bg-orange-100 border border-orange-300'
            }`}>
            <Info className={`absolute -right-10 -top-10 w-40 h-40 opacity-[0.03] ${darkMode ? 'text-amber-500' : 'text-amber-700'
              }`} />
            <div className={`p-4 rounded-2xl mb-6 shadow-lg ${darkMode
              ? 'bg-amber-500 shadow-amber-500/20'
              : 'bg-amber-600 shadow-amber-600/20'
              }`}>
              <Sun className={`w-8 h-8 ${darkMode ? 'text-black' : 'text-white'}`} />
            </div>
            <h4 className={`text-3xl font-black mb-4 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Sabia que...</h4>
            <p className={`text-xl font-medium leading-relaxed max-w-2xl ${darkMode ? 'text-gray-400' : 'text-slate-700'
              }`}>
              Em apenas 1 hora, o sol emite energia suficiente para suprir todo o consumo elétrico da humanidade por um ano inteiro. <span className={`font-bold ${darkMode ? 'text-amber-500' : 'text-amber-700'}`}>O desafio está em capturá-la.</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SolarEnergy;