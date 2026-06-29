import React from 'react';
import { User, Loader2 } from 'lucide-react';

interface AnalysisProgressProps {
  step: string;
  progress: number;
}

export default function AnalysisProgress({ step, progress }: AnalysisProgressProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 w-full animate-[fadeIn_0.3s_ease-out]" id="analysis-status">
      
      {/* Scanner Box */}
      <div className="relative w-48 h-48 bg-slate-50 border border-blue-200 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center mb-12" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(0,0,0,0.02) 15px, rgba(0,0,0,0.02) 30px)' }}>
        
        {/* User Outline */}
        <User size={80} className="text-slate-300" strokeWidth={1.5} />
        
        {/* Scanning Laser Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-600 shadow-[0_0_15px_3px_rgba(37,99,235,0.6)] animate-[scan_2s_ease-in-out_infinite]"></div>
        
        {/* Light Blue overlay scanning effect */}
        <div className="absolute top-0 left-0 w-full bg-blue-500/10 animate-[scanOverlay_2s_ease-in-out_infinite]"></div>
      </div>
      
      {/* Spinner */}
      <Loader2 size={40} className="text-blue-700 animate-spin mb-6" strokeWidth={2.5} />

      <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Analizando rostro...</h3>
      <p className="text-sm font-semibold text-slate-500 mb-6">Comparando con <span className="text-blue-700">6,614</span> personas registradas</p>

      {/* Loading Dots */}
      <div className="flex items-center gap-2 mt-2">
        <div className="w-2 h-2 rounded-full bg-blue-700 animate-[bounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.32s]"></div>
        <div className="w-2 h-2 rounded-full bg-blue-700 animate-[bounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.16s]"></div>
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-[bounce_1.4s_infinite_ease-in-out_both]"></div>
      </div>

    </div>
  );
}
