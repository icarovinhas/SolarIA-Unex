import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { FiSun, FiMoon } from 'react-icons/fi'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SolarPainel from './pages/SolarPainel'
import CalculatorPage from './pages/CalculatorPage'
import Legislation from './pages/Legislation'
import AboutUsPage from './pages/AboutUsPage'
import SolarAI from './pages/SolarAI'

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();
  const isChatPage = location.pathname === '/solarai';

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-slate-100 text-slate-900'}`}>

      {/* Passamos o estado e a função para a Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className={`w-full ${isChatPage ? 'h-[calc(100vh-80px)] mt-20' : 'flex-grow pt-28'}`}>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/placa-solar" element={<SolarPainel darkMode={darkMode} />} />
          <Route path="/calculadora" element={<CalculatorPage darkMode={darkMode} />} />
          <Route path="/legislacao" element={<Legislation darkMode={darkMode} />} />
          <Route path="/sobre" element={<AboutUsPage darkMode={darkMode} />} />
          <Route path="/solarai" element={<SolarAI darkMode={darkMode} />} />
        </Routes>
      </main>

      {!isChatPage && <Footer darkMode={darkMode} />}
    </div>
  )
}

export default App