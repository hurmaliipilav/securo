'use client';
import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { policies, getCustomer, formatCurrency, commissionByInsurer, commissionByType } from '@/lib/demo/data';

type Period = 'thisMonth' | 'lastMonth' | 'thisYear';
const MULTIPLIERS: Record<Period, number> = { thisMonth: 1, lastMonth: 0.85, thisYear: 8.5 };

export default function CommissionsPage() {
  const { t } = useLanguage();
  const [period, setPeriod] = useState<Period>('thisMonth');
  const m = MULTIPLIERS[period];

  const totalEarned = commissionByInsurer.reduce((s, i) => s + i.earned, 0) * m;
  const totalPending = commissionByInsurer.reduce((s, i) => s + i.pending, 0) * m;

  const scaledByInsurer = commissionByInsurer.map(i => ({ ...i, earned: Math.round(i.earned * m), pending: Math.round(i.pending * m) }));
  const scaledByType = commissionByType.map(i => ({ ...i, amount: Math.round(i.amount * m) }));

  const policyRows = useMemo(() => policies.map(p => ({
    ...p, customerName: getCustomer(p.customerId)?.name ?? '',
    commAmount: Math.round(p.premium * p.commissionRate / 100 * m),
  })), [m]);

  const periodOptions: { key: Period; label: string }[] = [
    { key: 'thisMonth', label: t('com.thisMonth') }, { key: 'lastMonth', label: t('com.lastMonth') }, { key: 'thisYear', label: t('com.thisYear') },
  ];

  return (
    <div>
      <Header title={t('com.title')} />
      <div className="flex gap-2 mb-6">
        {periodOptions.map(opt => (
          <button key={opt.key} onClick={() => setPeriod(opt.key)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${period === opt.key ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{opt.label}</button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-5 mb-6">
        {[{ label: t('com.earned'), value: formatCurrency(totalEarned), color: 'text-emerald-600' }, { label: t('com.pending'), value: formatCurrency(totalPending), color: 'text-amber-600' }, { label: t('com.total'), value: formatCurrency(totalEarned + totalPending), color: 'text-blue-600' }].map(card => (
          <div key={card.label} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 mb-1">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>
      <div className="grid xl:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5">{t('com.byInsurer')}</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={scaledByInsurer}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="insurer" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₺${(Number(v) / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Legend />
              <Bar dataKey="earned" name={t('com.earned')} fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" name={t('com.pending')} fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5">{t('com.byType')}</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={scaledByType}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="type" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₺${(Number(v) / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="amount" name="Komisyon" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-semibold text-slate-900">Poliçe Bazlı Komisyonlar</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-slate-500 text-xs border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-medium">Poliçe No</th><th className="px-4 py-3 font-medium">Müşteri</th>
              <th className="px-4 py-3 font-medium">Sigortacı</th><th className="px-4 py-3 font-medium">Prim</th>
              <th className="px-4 py-3 font-medium">{t('com.rate')}</th><th className="px-4 py-3 font-medium">{t('com.commAmount')}</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {policyRows.map(pol => (
                <tr key={pol.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{pol.policyNo}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{pol.customerName}</td>
                  <td className="px-4 py-3 text-slate-700">{pol.insurer}</td>
                  <td className="px-4 py-3 text-slate-900">{formatCurrency(pol.premium)}</td>
                  <td className="px-4 py-3 text-slate-700">%{pol.commissionRate}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-700">{formatCurrency(pol.commAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
