import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Calculator, ArrowRight } from 'lucide-react';

function Hero({ darkMode = true }) {
    const navigate = useNavigate();

    return (
        <section className={`relative py-24 px-4 text-center min-h-[95vh] flex flex-col justify-center items-center overflow-x-hidden transition-colors duration-500 ${
            darkMode 
            ? 'bg-[#0a0a0a] text-white' 
            : 'bg-slate-100 text-slate-900'
        }`}>
            
            {/* --- O SOL (ESTILO SOLARAI) --- */}
            <div className="relative mb-12 flex items-center justify-center">
                {/* Raios Giratórios */}
                <div className="absolute inset-[-50px] w-[260px] h-[260px] opacity-20 animate-[spin_20s_linear_infinite] z-0 pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path 
                            fill="#FF8C00" 
                            d="M100 15 L107 85 L100 100 L93 85Z M100 185 L107 115 L100 100 L93 115Z M15 100 L85 107 L100 100 L85 93Z M185 100 L115 107 L100 100 L115 93Z M33 33 L83 83 L100 100 L83 83Z M167 167 L117 117 L100 100 L117 117Z M33 167 L83 117 L100 100 L83 117Z M167 33 L117 83 L100 100 L117 83Z"
                        />
                    </svg>
                </div>

                {/* Núcleo do Sol Pulsante */}
                <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full z-10 animate-[hero-pulse_4s_ease-in-out_infinite] ${
                    darkMode 
                    ? 'shadow-[0_0_60px_#FF8C00,0_0_120px_rgba(255,140,0,0.4)]' 
                    : 'shadow-[0_0_50px_rgba(255,140,0,0.3)]'
                }`}
                     style={{
                         background: darkMode 
                            ? 'radial-gradient(circle, #fff5c0 0%, #FFB830 40%, #FF8C00 70%, #E55A00 100%)'
                            : 'radial-gradient(circle, #fff 0%, #FFB830 40%, #FF8C00 100%)'
                     }}>
                </div>
            </div>

            {/* BADGE */}
            <div className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-sm ${
                darkMode 
                ? 'bg-amber-500/10 border border-amber-500/20' 
                : 'bg-orange-100 border border-orange-300'
            }`}>
                <Sun className={`w-4 h-4 ${
                    darkMode ? 'text-amber-500' : 'text-orange-600'
                }`} />
                <span className={`text-xs md:text-sm font-bold tracking-wide ${
                    darkMode ? 'text-amber-400' : 'text-orange-600'
                }`}>
                    O futuro da energia é solar
                </span>
            </div>

            {/* TÍTULO PRINCIPAL */}
            <h1 className={`relative z-10 text-6xl md:text-8xl font-extrabold mb-6 tracking-tight leading-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
            }`}>
                Bem-vindo ao <br className="md:hidden" />
                <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent italic pr-4 py-2 inline-block tracking-wider">
                    Solar
                </span>
            </h1>
            
            {/* DESCRIÇÃO */}
            <p className={`relative z-10 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium ${
                darkMode 
                ? 'text-gray-500' 
                : 'text-slate-600'
            }`}>
                Descubra como a energia solar pode transformar sua casa e reduzir seus gastos. <br/>
                <span className={`font-semibold ${
                    darkMode ? 'text-gray-400' : 'text-slate-500'
                }`}>Explore, calcule e entenda tudo aqui.</span>
            </p>

            {/* BOTÕES */}
            <div className="relative z-10 flex flex-col md:flex-row gap-6 text-center justify-center mb-20 w-full md:w-auto px-6">
                <button 
                    onClick={() => navigate('/calculadora')}
                    className="group flex items-center justify-center gap-2 bg-gradient-to-br from-amber-600 to-amber-500 text-black px-10 py-4 rounded-xl text-lg font-bold hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-95"
                >
                    <Calculator className="w-5 h-5" />
                    Calcular economia
                </button>

                <button 
                    onClick={() => navigate('/placa-solar')}
                    className={`group flex items-center justify-center gap-2 bg-transparent border-2 px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 active:scale-95 ${
                        darkMode 
                        ? 'text-white border-white/10 hover:bg-white hover:text-black' 
                        : 'text-slate-700 border-slate-200 hover:bg-slate-900 hover:text-white'
                    }`}
                >
                    Aprender mais
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* LINHA FINA */}
            <div className={`w-screen h-[1px] my-20 ${
                darkMode ? 'bg-amber-500/20' : 'bg-orange-300/30'
            }`}></div>

            {/* LISTA DE NÚMEROS */}
            <div className="relative z-10 max-w-6xl mx-auto w-full">
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4 px-4">
                    {[
                        { val: "90%", label: "Redução na conta de luz" },
                        { val: "25+", label: "Anos de vida útil" },
                        { val: "350M", label: "Casas no mundo" },
                        { val: "0", label: "Emissões de CO₂" }
                    ].map((stat, idx) => (
                        <li key={idx} className="flex flex-col items-center text-center">
                            <span className="text-4xl md:text-6xl font-black tabular-nums bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                                {stat.val}
                            </span>
                            <span className={`text-[10px] md:text-xs mt-4 uppercase tracking-[0.2em] font-black leading-tight ${
                                darkMode ? 'text-gray-600' : 'text-slate-500'
                            }`}>
                                {stat.label.split(' ').slice(0, -2).join(' ')} <br/> {stat.label.split(' ').slice(-2).join(' ')}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* KEYFRAMES CUSTOMIZADOS */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes hero-pulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 60px #FF8C00, 0 0 120px rgba(255,140,0,0.4); }
                    50% { transform: scale(1.05); box-shadow: 0 0 80px #FF8C00, 0 0 160px rgba(255,140,0,0.6); }
                }
            `}} />
        </section>
    );
}

export default Hero;