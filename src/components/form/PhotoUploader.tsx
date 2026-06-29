/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Subida de fotos (drag&drop + grilla de miniaturas) compartida por ambos forms.
 */
import React, { useRef } from 'react';
import { Upload, X, User } from 'lucide-react';

export type Photo = { file: File; url: string };

const ACCENTS = {
  rose: {
    zoneEmpty: 'border-slate-300 bg-transparent hover:border-blue-400 hover:bg-slate-50',
    zoneFilled: 'border-blue-300 bg-blue-50/10',
    iconWrap: 'bg-slate-100 text-slate-500',
    add: 'border-slate-300 text-slate-500 hover:border-slate-500 hover:bg-slate-50',
  },
  blue: {
    zoneEmpty: 'border-slate-300 bg-transparent hover:border-blue-400 hover:bg-slate-50',
    zoneFilled: 'border-blue-300 bg-blue-50/10',
    iconWrap: 'bg-slate-100 text-slate-500',
    add: 'border-slate-300 text-slate-500 hover:border-slate-500 hover:bg-slate-50',
  },
};

interface Props {
  photos: Photo[];
  max: number;
  accent: keyof typeof ACCENTS;
  error?: boolean;
  disabled?: boolean;
  onAdd: (files: FileList | File[]) => void;
  onRemove: (idx: number) => void;
}

export default function PhotoUploader({ photos, max, accent, error, disabled, onAdd, onRemove }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const a = ACCENTS[accent];
  const zone = error ? 'border-red-400 bg-red-50/30' : photos.length ? a.zoneFilled : a.zoneEmpty;

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => { if (e.target.files) onAdd(e.target.files); e.target.value = ''; }}
        accept="image/*,.heic,.heif"
        multiple={max > 1}
        className="hidden"
      />
      <div
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDrop={(e) => { e.preventDefault(); e.stopPropagation(); if (e.dataTransfer.files) onAdd(e.dataTransfer.files); }}
        className={`border-2 border-dashed rounded-xl p-4 transition-all ${zone} ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
        id="image-dropzone"
      >
        {photos.length === 0 ? (
          <button type="button" onClick={() => inputRef.current?.click()} className="w-full text-center py-5 cursor-pointer">
            <div className={`w-11 h-11 rounded-full ${a.iconWrap} flex items-center justify-center mx-auto mb-2`}>
              <Upload size={20} />
            </div>
            <p className="text-sm font-semibold text-slate-700">Toca para elegir una foto</p>
            <p className="text-xs text-slate-400 mt-0.5">Sube una imagen clara del rostro</p>
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            {photos.map((p, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="relative w-20 h-20 shrink-0 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200 overflow-hidden" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)' }}>
                  <User size={32} className="text-slate-400" />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onRemove(idx); }}
                    className="absolute top-1 right-1 bg-white text-slate-500 p-1 rounded-full shadow-md border border-slate-200 hover:text-rose-600 transition-all z-10"
                    aria-label="Quitar foto"
                  >
                    <X size={12} strokeWidth={3} />
                  </button>
                </div>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="font-bold text-slate-800 truncate text-sm">
                    {p.file.name.length > 20 ? p.file.name.substring(0, 20) + '...' : p.file.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    Lista para analizar • {p.file.type.split('/')[1]?.toUpperCase() || 'IMG'}
                  </span>
                </div>
              </div>
            ))}
            {photos.length < max && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                className={`h-12 w-full rounded-xl border-2 border-dashed ${a.add} flex items-center justify-center gap-2 transition-all`}
              >
                <Upload size={18} />
                <span className="text-xs font-bold">Agregar otra foto</span>
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
