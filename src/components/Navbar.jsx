import React, { useEffect } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi'; // Ícones modernos

export const AcmeLogo = () => (
  <svg className="text-orange-500" fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default function NavbarApp({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const menuItems = [
    { name: "Início", path: "/" },
    { name: "Energia Solar", path: "/placa-solar" },
    { name: "Calculadora", path: "/calculadora" },
    { name: "Legislação", path: "/legislacao" },
    { name: "SolarAI", path: "/solarai" },
    { name: "Sobre Nós", path: "/sobre" },
  ];

  return (
    <nav className={`w-full h-20 border-b fixed top-0 left-0 z-[100] px-6 transition-all duration-500 ${darkMode ? 'bg-[#0a0a0a]/80 border-white/10 text-white' : 'bg-white/80 border-gray-200 text-slate-900 backdrop-blur-md shadow-sm'}`}>
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <AcmeLogo />
          <p className="font-bold text-3xl bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Solar
          </p>
        </div>

        {/* RIGHT SECTION: LINKS + TOGGLE */}
        <div className="flex items-center gap-8">
          {/* DESKTOP LINKS */}
          <div className="hidden md:flex gap-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative transition-colors duration-300 text-lg font-medium
                  ${darkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}
                  after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                  after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full
                  ${isActive ? (darkMode ? 'text-white after:w-full' : 'text-slate-900 after:w-full') : ''}
                `}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* DARK MODE TOGGLE BUTTON */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center
              ${darkMode
                ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
            title={darkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* MOBILE HAMBURGER */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group p-2 flex flex-col gap-1.5 items-end relative focus:outline-none"
            >
              <span className={`h-0.5 transition-all duration-300 ${isMenuOpen ? 'w-8 rotate-45 translate-y-2 bg-orange-500' : `w-8 ${darkMode ? 'bg-gray-400' : 'bg-slate-600'}`}`}></span>
              <span className={`h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0 bg-orange-500' : `w-6 ${darkMode ? 'bg-gray-400' : 'bg-slate-600'}`}`}></span>
              <span className={`h-0.5 transition-all duration-300 ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-2 bg-orange-500' : `w-4 ${darkMode ? 'bg-gray-400' : 'bg-slate-600'}`}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`
        fixed inset-0 transition-all duration-500 ease-in-out md:hidden
        ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        ${darkMode ? 'bg-[#0a0a0a]/98 backdrop-blur-xl' : 'bg-white/98 backdrop-blur-xl'}
      `}>
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                text-3xl font-black transition-all duration-300
                ${isActive ? 'text-orange-500 scale-110' : (darkMode ? 'text-gray-500 hover:text-white' : 'text-slate-400 hover:text-slate-900')}
              `}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
} 