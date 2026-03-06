import React from 'react';

function Footer({ darkMode }) {
    return (
        <footer className={`w-full h-32 flex flex-col items-center justify-center border-t transition-colors duration-500 ${darkMode ? 'bg-[#0a0a0a] border-white/5 text-gray-500' : 'bg-slate-100 border-gray-300 text-gray-600'
            }`}>
            <div className="w-24 h-[2px] bg-gradient-to-r from-orange-500 to-yellow-400 mb-6 rounded-full"></div>

            <div className="text-center">
                <p className={`text-sm tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    &copy; 2026 <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-bold italic`}>Solar</span>. Todos os direitos reservados.
                </p>
                <p className="text-[10px] mt-2 text-gray-400 uppercase tracking-[0.3em] font-medium">
                    Energia Limpa • Tecnologia • Sustentabilidade
                </p>
            </div>
        </footer>
    );
}

export default Footer;