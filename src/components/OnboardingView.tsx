import React from 'react';
import { Search, Megaphone } from 'lucide-react';

interface Props {
  onSelect: (option: 'buscar' | 'reportar') => void;
}

export default function OnboardingView({ onSelect }: Props) {
  return (
    <div className="w-full flex flex-col bg-slate-100 animate-[fadeIn_0.2s_ease-out]">
      {/* Header Section with Image Background */}
      <div className="w-full px-6 sm:px-8 pt-16 pb-32 sm:pb-40 relative overflow-hidden flex-shrink-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: 'url("/fondo.png")' }}
        ></div>
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90"></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center sm:text-left sm:items-start">
          <div className="w-full max-w-2xl sm:pl-8">
            <h2 className="text-[2.5rem] sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-3 tracking-tight">Reuniendo<br/>Familias</h2>
            <p className="text-lg sm:text-xl font-medium text-white/90">Una búsqueda a la vez</p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full px-4 sm:px-8 -mt-20 sm:-mt-24 relative z-20 pb-8 flex-grow">
        <div className="max-w-lg mx-auto flex flex-col gap-5 sm:gap-6">
          {/* Card 1 - Buscar */}
          <div className="bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <Search size={24} className="text-slate-800" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Busco a alguien</h3>
            </div>
            <p className="text-slate-500 text-sm sm:text-base mb-6 sm:mb-8">
              Reconocimiento facial en segundos. Sube una foto y buscamos coincidencias.
            </p>
            <button 
              onClick={() => onSelect('buscar')}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 px-4 rounded-[16px] font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Search size={20} />
              Iniciar búsqueda
            </button>
          </div>

          {/* Card 2 - Reportar */}
          <div className="bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <Megaphone size={24} className="text-slate-800" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Encontré a alguien</h3>
            </div>
            <p className="text-slate-500 text-sm sm:text-base mb-6 sm:mb-8">
              Comparte dónde y cuándo la viste para ayudar a su familia a encontrarla.
            </p>
            <button 
              onClick={() => onSelect('reportar')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-[16px] font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Megaphone size={20} />
              Reportar persona
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
