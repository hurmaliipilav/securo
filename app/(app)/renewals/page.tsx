'use client';
import { useState, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Toast from '@/components/Toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { policies, getCustomer, getPolicyTypeLabel, getDaysUntilExpiry } from '@/lib/demo/data';

type FilterKey = 'all' | 'overdue' | '7' | '30';

export default function RenewalsPage() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<FilterKey>('all');
  const [toast, setToast] = useState<string | null>(null);

  const withDays = useMemo(() => policies.map(p => ({ ...p, days: getDaysUntilExpiry(p.endDate) })), []);
  const filtered = useMemo(() => {
    if (filter === 'overdue') return withDays.filter(p => p.days < 0).sort((a, b) => a.days - b.days);
    if (filter === '7') return withDays.filter(p => p.days >= 0 && p.days <= 7).sort((a, b) => a.days - b.days);
    if (filter === '30') return withDays.filter(p => p.days >= 0 && p.days <= 30).sort((a, b) => a.days - b.days);
    return withDays.filter(p => p.days <= 30).sort((a, b) => a.days - b.days);
  }, [filter, withDays]);

  const overdueCount = withDays.filter(p => p.days < 0).length;
  const rowBg = (days: number) => days < 0 ? 'bg-red-50' : days <= 7 ? 'bg-amber-50' : '';

  const filterLabels: Record<FilterKey, string> = { all: t('ren.all'), overdue: t('ren.overdue'), '7': t('ren.within7'), '30': t('ren.within30') };

  return (
    <div>
      <Header title={t('ren.title')} />
      {overdueCount > 0 && (
        <div className="flex items-center gap-3 bg-red-600 text-white px-5 py-3.5 rounded-xl mb-6">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium"><strong>{overdueCount}</strong> {t('ren.overdueAlert')}</span>
        </div>
      )}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(['all', 'overdue', '7', '30'] as FilterKey[]).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{filterLabels[f]}</button>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-slate-500 text-xs border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-medium">{t('pol.customer')}</th>
              <th className="px-4 py-3 font-medium">{t('pol.policyNo')}</th>
              <th className="px-4 py-3 font-medium">{t('pol.type')}</th>
              <th className="px-4 py-3 font-medium">{t('ren.endDate')}</th>
              <th className="px-4 py-3 font-medium">{t('ren.daysLeft')}</th>
              <th className="px-4 py-3 font-medium">{t('ren.action')}</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(pol => {
                const cust = getCustomer(pol.customerId);
                return (
                  <tr key={pol.id} className={`${rowBg(pol.days)} transition-colors`}>
                    <td className="px-4 py-3 font-medium text-slate-900">{cust?.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{pol.policyNo}</td>
                    <td className="px-4 py-3 text-slate-700">{getPolicyTypeLabel(pol.type, lang)}</td>
                    <td className="px-4 py-3 text-slate-700">{pol.endDate}</td>
                    <td className="px-4 py-3"><span className={`font-semibold text-sm ${pol.days < 0 ? 'text-red-700' : pol.days <= 7 ? 'text-amber-700' : 'text-slate-700'}`}>{pol.days < 0 ? `${Math.abs(pol.days)} gün geçti` : `${pol.days} gün`}</span></td>
                    <td className="px-4 py-3"><button onClick={() => setToast(t('ren.reminderSent'))} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">{t('ren.remind')}</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-slate-400">{t('common.noData')}</div>}
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
