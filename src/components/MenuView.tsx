import React, { useState } from 'react';
import { Home, Search, Megaphone, ClipboardList, AlertTriangle, Heart, ChevronRight } from 'lucide-react';

interface Props {
  activeTab: string;
  onSelect: (tab: 'inicio' | 'buscar' | 'reportar' | 'testimonios') => void;
  onOpenErrorReport: () => void;
}

export default function MenuView({ activeTab, onSelect, onOpenErrorReport }: Props) {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (option: string) => {
    setHasVoted(true);
  };

  return (
    <div className="w-full max-w-lg mx-auto py-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="mb-4">
        <h2 className="text-[1.35rem] font-bold text-slate-800">Menú principal</h2>
      </div>

      {/* Stats Card */}
      <div className="w-full bg-blue-600 text-white rounded-3xl p-6 mb-6 shadow-md relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white opacity-5 rounded-full blur-xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col gap-1">
          <h3 className="text-4xl font-black tracking-tight leading-none">6,614</h3>
          <p className="text-sm font-semibold opacity-90 mb-3">personas activas en búsqueda</p>
          <div className="self-start">
            <span className="inline-block px-3 py-1.5 bg-[#3b82f6]/40 backdrop-blur-sm border border-white/10 rounded-lg text-xs font-bold text-white shadow-sm">
              +128 reportes hoy
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button 
          onClick={() => onSelect('inicio')}
          className={`group flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all ${activeTab === 'inicio' ? 'bg-blue-50 font-bold text-blue-700 shadow-sm border border-blue-200' : 'bg-white shadow-sm hover:shadow-md hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-700 border border-slate-100'}`}
        >
          <div className="p-2 rounded-xl bg-blue-50 group-hover:bg-white transition-colors">
            <Home size={20} className={activeTab === 'inicio' ? 'text-blue-700' : 'text-blue-600 group-hover:text-blue-700'} />
          </div>
          <span className="text-base font-bold flex-1">Inicio</span>
          <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-400 transition-colors" strokeWidth={2.5} />
        </button>

        <button 
          onClick={() => onSelect('buscar')}
          className={`group flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all ${activeTab === 'buscar' ? 'bg-blue-50 font-bold text-blue-700 shadow-sm border border-blue-200' : 'bg-white shadow-sm hover:shadow-md hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-700 border border-slate-100'}`}
        >
          <div className="p-2 rounded-xl bg-blue-50 group-hover:bg-white transition-colors">
            <Search size={20} className={activeTab === 'buscar' ? 'text-blue-700' : 'text-blue-600 group-hover:text-blue-700'} />
          </div>
          <span className="text-base font-bold flex-1">Busco a alguien</span>
          <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-400 transition-colors" strokeWidth={2.5} />
        </button>

        <button 
          onClick={() => onSelect('reportar')}
          className={`group flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all ${activeTab === 'reportar' ? 'bg-blue-50 font-bold text-blue-700 shadow-sm border border-blue-200' : 'bg-white shadow-sm hover:shadow-md hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-700 border border-slate-100'}`}
        >
          <div className="p-2 rounded-xl bg-blue-50 group-hover:bg-white transition-colors">
            <Megaphone size={20} className={activeTab === 'reportar' ? 'text-blue-700' : 'text-blue-600 group-hover:text-blue-700'} />
          </div>
          <span className="text-base font-bold flex-1">Encontré a alguien</span>
          <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-400 transition-colors" strokeWidth={2.5} />
        </button>

        <button 
          onClick={() => onSelect('testimonios')}
          className={`group flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all ${activeTab === 'testimonios' ? 'bg-blue-50 font-bold text-blue-700 shadow-sm border border-blue-200' : 'bg-white shadow-sm hover:shadow-md hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-700 border border-slate-100'}`}
        >
          <div className="p-2 rounded-xl bg-blue-50 group-hover:bg-white transition-colors">
            <Heart size={20} className={activeTab === 'testimonios' ? 'text-blue-700' : 'text-blue-600 group-hover:text-blue-700'} />
          </div>
          <span className="text-base font-bold flex-1">Testimonios</span>
          <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-400 transition-colors" strokeWidth={2.5} />
        </button>
        
        <div className="h-px bg-slate-200 my-1 mx-2"></div>
        
        <button 
          onClick={() => setIsSurveyOpen(true)}
          className="group flex items-center gap-4 px-5 py-4 rounded-2xl text-left bg-white shadow-sm hover:shadow-md border border-slate-100 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-700 transition-all"
        >
          <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-white group-hover:text-blue-600 transition-colors">
            <ClipboardList size={20} className="text-slate-600 group-hover:text-blue-600" />
          </div>
          <span className="text-base font-bold flex-1">Responder Encuesta</span>
          <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-400 transition-colors" strokeWidth={2.5} />
        </button>
        
        <button 
          onClick={onOpenErrorReport}
          className="flex items-center gap-4 px-5 py-4 rounded-2xl text-left bg-amber-50 hover:bg-amber-100 border border-amber-100 hover:border-amber-200 text-amber-700 transition-all shadow-sm mt-1"
        >
          <div className="p-2 rounded-xl bg-amber-100/50">
            <AlertTriangle size={20} className="text-amber-600" />
          </div>
          <span className="text-base font-bold flex-1">Reportar un error</span>
        </button>
      </div>

      {/* Encuesta Modal */}
      {isSurveyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsSurveyOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-[fadeIn_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Ayúdanos a mejorar</h3>
            <p className="text-sm text-slate-600 mb-6">
              ¿Qué acción realizas con más frecuencia en nuestra plataforma?
            </p>
            
            {!hasVoted ? (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleVote('buscar')}
                  className="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl border border-rose-200 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Search size={18} />
                  Busco a personas
                </button>
                <button
                  onClick={() => handleVote('reportar')}
                  className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl border border-blue-200 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Megaphone size={18} />
                  Reporto personas
                </button>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-4 rounded-xl font-medium animate-[fadeIn_0.3s_ease-out]">
                ¡Gracias por tu voto! Esto nos ayuda a mejorar la experiencia.
              </div>
            )}
            
            <button
              type="button"
              onClick={() => setIsSurveyOpen(false)}
              className="mt-6 text-slate-500 hover:text-slate-700 text-sm font-semibold transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
