import React, { useState, useEffect, useRef } from 'react';
import { FiMapPin, FiZap, FiSun, FiCheckCircle, FiAlertTriangle, FiMaximize, FiDollarSign, FiBox } from 'react-icons/fi';

export default function Calculator({ darkMode }) {
  // --- ESTADOS DA INTERFACE ---
  const [endereco, setEndereco] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isManual, setIsManual] = useState(true);
  const [mapVisible, setMapVisible] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  const mapRef = useRef(null);
  const googleMap = useRef(null);

  // --- ESTADO DO FORMULÁRIO PRINCIPAL ---
  const [formData, setFormData] = useState({
    valorContaReais: 800,
    tarifa: 0.82,
    tipoRede: 30,
    taxaIluminacao: 30.00,
    hsp: 0,
    areaTelhado: 0,
    fatorEficiencia: 0.80
  });

  // --- ESTADO DO VERIFICADOR DE PRODUÇÃO ---
  const [prodExistente, setProdExistente] = useState({
    potenciaInstalada: '',
    qtdPlacas: '15',
    potenciaPlaca: '550'
  });

  const [resultadoProducao, setResultadoProducao] = useState(null);
  const [resultado, setResultado] = useState(null);

  // --- RECUPERAÇÃO DE DADOS (LOCALSTORAGE) ---
  useEffect(() => {
    const savedData = localStorage.getItem('solarFormData');
    if (savedData) setFormData(JSON.parse(savedData));
    
    const savedProd = localStorage.getItem('solarProdData');
    if (savedProd) setProdExistente(JSON.parse(savedProd));
  }, []);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleProdChange = (e) => {
    const { name, value } = e.target;
    setProdExistente(prev => ({ ...prev, [name]: value }));
  };

  // --- FUNÇÕES DE MAPA E API ---
  const inicializarMapa = (lat, lng) => {
    if (!window.google) {
      console.error("Aviso: window.google não encontrado. O script do Google Maps está no index.html?");
      setStatusMsg({ text: "Erro: API do Google Maps não carregada na página.", type: 'error' });
      return;
    }

    if (window.google && mapRef.current) {
      const coords = { lat, lng };
      googleMap.current = new window.google.maps.Map(mapRef.current, {
        center: coords,
        zoom: 19,
        mapTypeId: 'satellite',
        tilt: 45,
        disableDefaultUI: true,
      });

      // Restaurado o Mapa de Calor original
      if (window.google.maps.visualization) {
        const heatmapData = [];
        for (let i = 0; i < 45; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 0.00015;
          heatmapData.push({
            location: new window.google.maps.LatLng(lat + Math.cos(angle) * radius, lng + Math.sin(angle) * radius),
            weight: Math.random() * 10
          });
        }
        new window.google.maps.visualization.HeatmapLayer({
          data: heatmapData,
          map: googleMap.current,
          radius: 25,
          opacity: 0.8
        });
      }

      new window.google.maps.Marker({
        position: coords,
        map: googleMap.current,
        animation: window.google.maps.Animation.DROP
      });
    }
  };

  const buscarDadosGoogle = async () => {
    if (!endereco) {
      setStatusMsg({ text: "Digite um endereço primeiro.", type: 'error' });
      return;
    }
    setIsLoading(true);
    setStatusMsg({ text: "Consultando satélites...", type: 'info' });

    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
      const geoRes = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${API_KEY}`);
      const geoData = await geoRes.json();
      
      if (geoData.status !== "OK") throw new Error("Endereço não encontrado.");

      const { lat, lng } = geoData.results[0].geometry.location;
      
      // Força a exibição da div ANTES de inicializar o mapa
      setMapVisible(true);
      
      // Aumentei o tempo de 300 para 500ms para garantir que o React renderize a div antes do mapa desenhar
      setTimeout(() => inicializarMapa(lat, lng), 500);

      const solarRes = await fetch(`https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&requiredQuality=LOW&key=${API_KEY}`);
      const solarData = await solarRes.json();

      let hspEncontrado = 0;
      let areaEncontrada = 0;

      if (solarData.solarPotential) {
        if (solarData.solarPotential.maxSunshineHoursPerYear) {
          hspEncontrado = parseFloat((solarData.solarPotential.maxSunshineHoursPerYear / 365).toFixed(2));
        }
        if (solarData.solarPotential.wholeRoofSpatialStats) {
          areaEncontrada = parseFloat(solarData.solarPotential.wholeRoofSpatialStats.areaMeters2.toFixed(2));
        }
      }

      if (hspEncontrado > 0) {
        setFormData(prev => ({
          ...prev,
          hsp: hspEncontrado,
          areaTelhado: areaEncontrada > 0 ? areaEncontrada : prev.areaTelhado
        }));
        setIsManual(false);
        setStatusMsg({ 
          text: areaEncontrada > 0 ? "✓ Dados capturados com sucesso! Verifique a área." : "✓ Sol mapeado! Insira a área manualmente.", 
          type: 'success' 
        });
      } else {
        throw new Error("Dados indisponíveis para esta coordenada.");
      }
    } catch (error) {
      setIsManual(true);
      setStatusMsg({ text: `Aviso: ${error.message}. Modo manual ativado.`, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // --- LÓGICA DE CÁLCULO ---
  const definirInversor = (kwp) => {
    if (kwp <= 4) return "Growatt MIC 3000TL-X (3kW)";
    else if (kwp <= 6) return "Growatt MIN 5000TL-X (5kW)";
    else if (kwp <= 9) return "Growatt MIN 8000TL-X (8kW)";
    return "Growatt MAC 10KTL3-X (10kW)";
  };

  const calcularSolar = (e) => {
    e.preventDefault();
    if (formData.hsp <= 0) {
      setStatusMsg({ text: "O preenchimento do HSP é obrigatório.", type: 'error' });
      return;
    }

    localStorage.setItem('solarFormData', JSON.stringify(formData));

    const consumoKwh = (formData.valorContaReais - formData.taxaIluminacao) / formData.tarifa;
    const potenciaNecessariaKWp = consumoKwh / (formData.hsp * formData.fatorEficiencia * 30);
    const potenciaNecessariaW = potenciaNecessariaKWp * 1000;
    
    const quantidadePaineis = Math.ceil(potenciaNecessariaW / 550);
    const areaNecessaria = quantidadePaineis * 2.58; 
    
    const custoDisponibilidade = (formData.tipoRede * formData.tarifa);
    const contaMinimaObrigatoria = custoDisponibilidade + formData.taxaIluminacao;
    const economiaMensal = Math.max(0, formData.valorContaReais - contaMinimaObrigatoria);
    const custoTotalEstimado = potenciaNecessariaKWp * 3500; 
    const totalMesesPayback = economiaMensal > 0 ? custoTotalEstimado / economiaMensal : 0;

    const potenciaRealKWp = (quantidadePaineis * 550) / 1000;
    const producaoRealKwh = potenciaRealKWp * formData.hsp * formData.fatorEficiencia * 30;
    const excedenteKwh = Math.max(0, producaoRealKwh - consumoKwh);
    const valorExcedente = excedenteKwh * formData.tarifa;

    setResultado({
      consumoEstimadoKwh: consumoKwh.toFixed(0),
      potencia: potenciaNecessariaKWp.toFixed(2),
      paineis: quantidadePaineis,
      modeloPainel: "Canadian Solar 550W",
      modeloInversor: definirInversor(potenciaNecessariaKWp),
      contaNova: contaMinimaObrigatoria.toFixed(2),
      detalheContaNova: `(R$ ${custoDisponibilidade.toFixed(2)} Rede + R$ ${formData.taxaIluminacao.toFixed(2)} CIP)`,
      economia: economiaMensal.toFixed(2),
      custoTotal: custoTotalEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      payback: `${Math.floor(totalMesesPayback / 12)} anos e ${Math.round(totalMesesPayback % 12)} meses`,
      areaNecessaria: areaNecessaria.toFixed(2),
      areaDisponivel: formData.areaTelhado,
      espacoSuficiente: areaNecessaria <= formData.areaTelhado,
      sobraKwh: excedenteKwh.toFixed(0),
      sobraReais: valorExcedente.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    });
  };

  const calcularProducaoExistente = (e) => {
    e.preventDefault();
    if (formData.hsp <= 0) {
      setStatusMsg({ text: "Para verificar a produção, o HSP (em Dados Técnicos) precisa estar preenchido.", type: 'error' });
      return;
    }

    localStorage.setItem('solarProdData', JSON.stringify(prodExistente));

    let potFinal = parseFloat(prodExistente.potenciaInstalada) || 0;

    if (potFinal === 0 && prodExistente.qtdPlacas && prodExistente.potenciaPlaca) {
      const qtd = parseFloat(prodExistente.qtdPlacas);
      const watts = parseFloat(prodExistente.potenciaPlaca);
      potFinal = (qtd * watts) / 1000;
    }

    if (potFinal > 0) {
      const producaoMensal = potFinal * formData.hsp * formData.fatorEficiencia * 30;
      setResultadoProducao({
        potencia: potFinal.toFixed(2),
        geracao: producaoMensal.toFixed(0)
      });
      setStatusMsg({ text: "", type: "" });
    } else {
      setStatusMsg({ text: "Preencha a Potência Instalada ou a Quantidade/Potência das placas.", type: 'error' });
    }
  };

  // --- ESTILOS DINÂMICOS ---
  const cardClass = `p-6 rounded-3xl transition-all duration-500 border ${
    darkMode ? 'bg-[#121212] border-white/5 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'
  }`;

  const inputClass = `w-full p-4 rounded-xl outline-none border transition-all font-medium ${
    darkMode ? 'bg-white/5 border-white/10 focus:border-orange-500 text-white' : 'bg-slate-50 border-gray-200 focus:border-orange-500 text-slate-900'
  }`;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0a0a0a]' : 'bg-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        <header className="text-center space-y-4 mb-12">
  <div className={`inline-flex items-center gap-2 ${darkMode ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-100 text-orange-600'} px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider`}>
    <FiSun className="animate-spin-slow" /> Calculadora Solar
  </div>
  <h1 className={`text-5xl md:text-6xl font-black tracking-tight leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>
    Solar<span className="text-orange-500">Genius</span>
  </h1>
  <p className={`${darkMode ? 'text-gray-400' : 'text-slate-500'} text-xl font-medium italic`}>
    Seu projeto de energia com precisão de satélite.
  </p>
</header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- COLUNA ESQUERDA: INPUTS --- */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Localização */}
            <section className={cardClass}>
              <div className="flex items-center gap-3 mb-6 text-orange-500">
                <FiMapPin size={22} />
                <h2 className="text-lg font-bold">Onde é o projeto?</h2>
              </div>
              <div className="space-y-4">
                <input
                  className={inputClass}
                  placeholder="Endereço, Cidade - UF"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
                <button
                  onClick={buscarDadosGoogle}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-50"
                >
                  {isLoading ? "Escaneando..." : "Localizar Telhado"}
                </button>
              </div>
              
              {/* CORREÇÃO DO MAPA AQUI */}
              <div 
                ref={mapRef} 
                className="w-full mt-4 rounded-2xl overflow-hidden border-orange-500/30"
                style={{ 
                  display: mapVisible ? 'block' : 'none', 
                  height: '350px',
                  borderWidth: mapVisible ? '2px' : '0px',
                  borderStyle: 'solid'
                }}
              ></div>
              
            </section>

            {/* Consumo */}
            <section className={cardClass}>
              <div className="flex items-center gap-3 mb-6 text-orange-500">
                <FiZap size={22} />
                <h2 className="text-lg font-bold">Consumo e Energia</h2>
              </div>
              <form onSubmit={calcularSolar} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase opacity-50 ml-1 mb-1 block">Média da Conta (R$)</label>
                    <input type="number" name="valorContaReais" step="0.01" value={formData.valorContaReais} onChange={handleChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase opacity-50 ml-1 mb-1 block">Custo do kWh (R$)</label>
                    <input type="number" name="tarifa" step="0.01" value={formData.tarifa} onChange={handleChange} className={inputClass} required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase opacity-50 ml-1 mb-1 block">Padrão de Ligação</label>
                    <select name="tipoRede" value={formData.tipoRede} onChange={handleChange} className={inputClass}>
                      <option value="30">Monofásico</option>
                      <option value="50">Bifásico</option>
                      <option value="100">Trifásico</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase opacity-50 ml-1 mb-1 block">Taxa Iluminação (R$)</label>
                    <input type="number" name="taxaIluminacao" step="0.01" value={formData.taxaIluminacao} onChange={handleChange} className={inputClass} required />
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border flex gap-4 transition-colors ${isManual ? 'border-orange-500/30 bg-orange-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
                   <div className="flex-1">
                      <label className="text-[10px] font-bold uppercase opacity-40 block mb-1">
                         HSP (Sol) {isManual ? '⚠️' : '🔒'}
                      </label>
                      <input type="number" step="0.1" name="hsp" value={formData.hsp} readOnly={!isManual} onChange={handleChange} className="bg-transparent font-bold text-lg outline-none w-full" />
                   </div>
                   <div className="w-[1px] bg-gray-500/20"></div>
                   <div className="flex-1 pl-2">
                      <label className="text-[10px] font-bold uppercase opacity-40 block mb-1">Telhado (m²)</label>
                      <input type="number" name="areaTelhado" value={formData.areaTelhado} onChange={handleChange} className="bg-transparent font-bold text-lg outline-none w-full" />
                   </div>
                </div>

                <button type="submit" className="w-full bg-slate-800 text-white font-black py-4 rounded-xl hover:bg-orange-500 transition-all uppercase tracking-widest text-sm">
                  Gerar Simulação Completa
                </button>
              </form>
            </section>
          </div>

          {/* --- COLUNA DIREITA: RESULTADOS --- */}
          <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24">
            
            {statusMsg.text && (
              <div className={`p-4 rounded-2xl text-center text-sm font-bold border ${
                statusMsg.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' : 
                statusMsg.type === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-blue-500/10 border-blue-500/50 text-blue-500'
              }`}>
                {statusMsg.text}
              </div>
            )}

            {resultado ? (
              <div className={`${cardClass} border-orange-500/30 bg-gradient-to-br from-transparent to-orange-500/5`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black">Análise do Projeto</h2>
                  <div className="p-2 bg-orange-500 rounded-lg text-white"><FiSun size={24}/></div>
                </div>

                {/* Bloco 1: Destaques */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                    <p className="text-xs font-bold opacity-50 uppercase mb-1">Tamanho Ideal</p>
                    <p className="text-4xl font-black">{resultado.potencia} <span className="text-sm font-normal">kWp</span></p>
                    <p className="text-xs mt-2 opacity-60">Consumo: {resultado.consumoEstimadoKwh} kWh/mês</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20">
                    <p className="text-xs font-bold uppercase opacity-80 mb-1">Economia Estimada</p>
                    <p className="text-4xl font-black">R$ {resultado.economia} <span className="text-sm font-normal">/mês</span></p>
                    <p className="text-xs mt-2 opacity-80 font-medium">Nova conta: R$ {resultado.contaNova}</p>
                  </div>
                </div>

                {/* Bloco 2: Financeiro e Equipamentos */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5 col-span-2 md:col-span-1">
                      <div className="flex items-center gap-2 mb-2 opacity-60"><FiDollarSign/> <span className="text-xs font-bold uppercase">Investimento</span></div>
                      <p className="text-xl font-bold">R$ {resultado.custoTotal}</p>
                      <p className="text-[10px] mt-1 text-orange-500 font-bold uppercase">Payback: {resultado.payback}</p>
                   </div>
                   
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5 col-span-2 md:col-span-1">
                      <div className="flex items-center gap-2 mb-2 opacity-60"><FiBox/> <span className="text-xs font-bold uppercase">Equipamentos</span></div>
                      <p className="text-sm font-bold">{resultado.paineis}x {resultado.modeloPainel}</p>
                      <p className="text-sm font-bold text-blue-400 mt-1">1x {resultado.modeloInversor}</p>
                   </div>
                </div>

                {/* Bloco 3: Sobra e Espaço */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                    <p className="text-[10px] font-bold opacity-60 uppercase text-blue-400 mb-1">Excedente (Sobra)</p>
                    <p className="text-lg font-bold text-blue-400">{resultado.sobraKwh} kWh <span className="text-xs font-normal">/mês</span></p>
                    <p className="text-xs mt-1 opacity-70">~ R$ {resultado.sobraReais} em créditos</p>
                  </div>
                  <div className={`p-4 rounded-2xl border ${resultado.espacoSuficiente ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                    <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Área do Telhado</p>
                    <p className="text-lg font-bold">{resultado.areaNecessaria} m² <span className="text-xs font-normal opacity-60">ocupados</span></p>
                    <p className={`text-xs mt-1 font-bold flex items-center gap-1 ${resultado.espacoSuficiente ? 'text-emerald-500' : 'text-red-500'}`}>
                      {resultado.espacoSuficiente ? <><FiCheckCircle/> Cabe perfeitamente</> : <><FiAlertTriangle/> Espaço Insuficiente!</>}
                    </p>
                  </div>
                </div>
                
              </div>
            ) : (
              <div className={`${cardClass} h-[450px] flex flex-col items-center justify-center text-center border-dashed border-2 opacity-40`}>
                <FiMaximize size={48} className="mb-4 text-orange-500" />
                <p className="text-xl font-bold italic">Preencha os dados e gere a simulação...</p>
              </div>
            )}

            {/* Já possui solar? (Auditoria) */}
            <section className={`${cardClass} border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent`}>
               <h3 className="font-bold text-blue-500 mb-4 flex items-center gap-2"><FiCheckCircle/> Já possui energia solar?</h3>
               <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Informe a potência para descobrir quanto deveria estar gerando hoje.</p>
               
               <form onSubmit={calcularProducaoExistente}>
                 <div className="flex flex-col md:flex-row gap-4 mb-4">
                   <div className="flex-1">
                      <label className="text-[10px] font-bold uppercase opacity-50 ml-1 mb-1 block">Potência Total (kWp)</label>
                      <input type="number" step="0.01" name="potenciaInstalada" placeholder="Ex: 5.5" value={prodExistente.potenciaInstalada} onChange={handleProdChange} className={inputClass} />
                   </div>
                   
                   <div className="flex items-center justify-center opacity-30 font-bold text-xs">OU</div>
                   
                   <div className="flex-1 flex gap-2">
                      <div className="w-1/2">
                        <label className="text-[10px] font-bold uppercase opacity-50 ml-1 mb-1 block">Qtd Placas</label>
                        <input type="number" name="qtdPlacas" value={prodExistente.qtdPlacas} onChange={handleProdChange} className={inputClass} />
                      </div>
                      <div className="w-1/2">
                        <label className="text-[10px] font-bold uppercase opacity-50 ml-1 mb-1 block">Watts</label>
                        <input type="number" name="potenciaPlaca" value={prodExistente.potenciaPlaca} onChange={handleProdChange} className={inputClass} />
                      </div>
                   </div>
                 </div>
                 
                 <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all text-sm uppercase tracking-wider">
                   Verificar Produção Real
                 </button>
               </form>

               {resultadoProducao && (
                 <div className="mt-6 p-6 bg-blue-500/10 rounded-2xl border border-blue-500/30 text-center">
                    <p className="text-xs font-bold text-blue-500 uppercase mb-2">Sistema de {resultadoProducao.potencia} kWp</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-slate-600'} mb-1`}>Deveria estar gerando aproximadamente:</p>
                    <p className="text-3xl font-black text-blue-500">{resultadoProducao.geracao} <span className="text-lg font-bold">kWh/mês</span></p>
                 </div>
               )}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}