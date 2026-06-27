'use client';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header({ title }: { title: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-slate-100 rounded-lg p-1">
          <button onClick={() => setLang('tr')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${lang === 'tr' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>TR</button>
          <button onClick={() => setLang('en')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${lang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>EN</button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">DA</div>
          <span className="text-sm font-medium text-slate-700">Demo Acente</span>
        </div>
      </div>
    </div>
  );
}
