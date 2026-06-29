import { AlertCircle, ArrowRight, MapPin, RefreshCw, User, ChevronRight, Clock } from 'lucide-react';

import { MatchResult } from '../../types';

interface SearchResultsListProps {
  results: MatchResult[];
  page: number;
  pageSize: number;
  reportedIds: string[];
  confirmingId: string | null;
  resultsError: string | null;
  onResetSearch: () => void;
  onOpenCandidate: (personId: string) => void;
  onConfirmReport: (personId: string | null) => void;
  onReportPublication: (personId: string) => void;
  onPageChange: (nextPage: number) => void;
  onBack: () => void;
}

export default function SearchResultsList({
  results,
  page,
  pageSize,
  reportedIds,
  confirmingId,
  resultsError,
  onResetSearch,
  onOpenCandidate,
  onConfirmReport,
  onReportPublication,
  onPageChange,
  onBack,
}: SearchResultsListProps) {
  const totalPages = Math.ceil(results.length / pageSize);
  const pageItems = results.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className="w-full flex flex-col items-center" id="search-results-section">
      <div className="w-full max-w-lg pb-4 mb-4">
        {/* Volver Button */}
        <button 
          type="button" 
          onClick={onBack}
          className="flex items-center gap-2 text-rose-600 font-bold mb-6 hover:text-rose-700 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Volver
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-[1.35rem] font-bold text-slate-800 leading-tight">Coincidencias encontradas</h2>
          <p className="text-sm font-semibold text-slate-500">
            <span className="text-emerald-600">{results.length} posibles coincidencias</span> • ordenadas por similitud
          </p>
        </div>

        {/* Warning Alert */}
        <div className="w-full bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5 shadow-sm mb-6">
          <AlertCircle size={18} className="text-slate-400 shrink-0" />
          <span className="text-xs font-semibold text-slate-600">Confirma la identidad solo contactando al refugio.</span>
        </div>

        {resultsError && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-2.5 text-sm mb-4">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
            <span>{resultsError}</span>
          </div>
        )}

        {/* List of cards */}
        <div className="flex flex-col gap-3">
          {pageItems.map((result, index) => {
            const person = result.foundPerson;
            const hasCi = !!person.ci && !/desconocido|no aplica/i.test(person.ci);
            const isReported = reportedIds.includes(person.id);
            const isConfirming = confirmingId === person.id;

            return (
              <div
                key={person.id}
                role="button"
                tabIndex={isReported ? -1 : 0}
                onClick={() => !isReported && onOpenCandidate(person.id)}
                onKeyDown={(event) => {
                  if (!isReported && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault();
                    onOpenCandidate(person.id);
                  }
                }}
                className={`group flex items-center bg-white rounded-2xl border p-4 transition-all shadow-sm ${
                  isReported ? 'border-slate-200 opacity-60 cursor-default' : 'border-slate-100 hover:border-blue-300 hover:shadow-md cursor-pointer'
                }`}
                id={`match-card-${index}`}
              >
                {/* Photo Placeholder */}
                <div className="relative w-16 h-16 shrink-0 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 overflow-hidden mr-4" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)' }}>
                  <User size={24} className="text-slate-400" />
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="text-base font-bold text-slate-800 leading-tight truncate">{person.name}</h4>
                  <p className="text-[13px] text-slate-500 mt-0.5 truncate">
                    Hombre • ~34 años
                  </p>
                  <p className="text-[12px] font-semibold text-slate-600 flex items-center gap-1 mt-1 truncate">
                    <MapPin size={12} className="shrink-0 text-slate-400" />
                    <span className="truncate">{person.hospitalName || 'Ubicación desconocida'}</span>
                  </p>
                </div>

                {/* Caret Badge */}
                <div className="flex flex-col items-end justify-center shrink-0">
                  <ChevronRight size={24} className="text-slate-300" strokeWidth={2.5} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(0, page - 1))}
              disabled={page === 0}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ArrowRight size={15} className="rotate-180" /> Anterior
            </button>
            <span className="text-xs font-semibold text-slate-500 tabular-nums">Página {page + 1} de {totalPages}</span>
            <button
              type="button"
              onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Siguiente <ArrowRight size={15} />
            </button>
          </div>
        )}
        <div className="mt-8">
          <button
            onClick={onResetSearch}
            className="w-full py-3.5 bg-white border-2 border-rose-600 hover:bg-rose-50 text-rose-600 font-bold text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            Nueva búsqueda
          </button>
        </div>

      </div>
    </div>
  );
}
