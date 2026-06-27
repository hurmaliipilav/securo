'use client';
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Drawer from '@/components/Drawer';
import { useLanguage } from '@/contexts/LanguageContext';
import { claims as initialClaims, Claim, ClaimStatus, getCustomer, getPolicy, getPolicyTypeLabel, getClaimStatusLabel, formatCurrency } from '@/lib/demo/data';

const STATUS_ORDER: ClaimStatus[] = ['reported', 'reviewing', 'approved', 'paid'];
const STATUS_COLORS: Record<ClaimStatus, string> = {
  reported: 'bg-red-100 text-red-700', reviewing: 'bg-amber-100 text-amber-700',
  approved: 'bg-blue-100 text-blue-700', paid: 'bg-emerald-100 text-emerald-700',
};

function InfoItem({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs text-slate-500 mb-1">{label}</p><p className="text-sm font-medium text-slate-900">{value}</p></div>;
}

export default function ClaimsPage() {
  const { t, lang } = useLanguage();
  const [claimsState, setClaimsState] = useState<Claim[]>(initialClaims);
  const [filter, setFilter] = useState<'all' | ClaimStatus>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => filter === 'all' ? claimsState : claimsState.filter(c => c.status === filter), [filter, claimsState]);

  const openCount = claimsState.filter(c => c.status === 'reported').length;
  const reviewingCount = claimsState.filter(c => c.status === 'reviewing').length;
  const highRiskCount = claimsState.filter(c => c.amount >= 50000).length;

  const selected = selectedId ? claimsState.find(c => c.id === selectedId) : null;
  const selCustomer = selected ? getCustomer(selected.customerId) : null;
  const selPolicy = selected ? getPolicy(selected.policyId) : null;

  const advanceStatus = (id: string) => {
    setClaimsState(prev => prev.map(c => {
      if (c.id !== id) return c;
      const idx = STATUS_ORDER.indexOf(c.status);
      return idx < STATUS_ORDER.length - 1 ? { ...c, status: STATUS_ORDER[idx + 1] } : c;
    }));
  };

  const filterOptions: { key: 'all' | ClaimStatus; label: string }[] = [
    { key: 'all', label: t('clm.all') }, { key: 'reported', label: t('clm.reported') },
    { key: 'reviewing', label: t('clm.reviewing') }, { key: 'approved', label: t('clm.approved') }, { key: 'paid', label: t('clm.paid') },
  ];

  return (
    <div>
      <Header title={t('clm.title')} />
      <div className="grid grid-cols-3 gap-5 mb-6">
        {[{ label: t('clm.openClaims'), value: openCount, color: 'bg-red-500' }, { label: t('clm.reviewing'), value: reviewingCount, color: 'bg-amber-500' }, { label: t('clm.highRisk'), value: highRiskCount, color: 'bg-purple-500' }].map(card => (
          <div key={card.label} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}><span className="text-white font-bold text-lg">{card.value}</span></div>
            <p className="text-sm font-medium text-slate-700">{card.label}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-5 flex-wrap">
        {filterOptions.map(opt => (
          <button key={opt.key} onClick={() => setFilter(opt.key)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === opt.key ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{opt.label}</button>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-slate-500 text-xs border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-medium">{t('pol.customer')}</th><th className="px-4 py-3 font-medium">{t('pol.policyNo')}</th>
              <th className="px-4 py-3 font-medium">{t('clm.claimDate')}</th><th className="px-4 py-3 font-medium">{t('clm.description')}</th>
              <th className="px-4 py-3 font-medium">{t('clm.amount')}</th><th className="px-4 py-3 font-medium">{t('clm.status')}</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(cl => {
                const cust = getCustomer(cl.customerId);
                const pol = getPolicy(cl.policyId);
                return (
                  <tr key={cl.id} onClick={() => setSelectedId(cl.id)} className="hover:bg-slate-50 cursor-pointer transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900">{cust?.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{pol?.policyNo}</td>
                    <td className="px-4 py-3 text-slate-600">{cl.claimDate}</td>
                    <td className="px-4 py-3 text-slate-700 max-w-xs truncate">{cl.description}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{formatCurrency(cl.amount)}</td>
                    <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[cl.status]}`}>{getClaimStatusLabel(cl.status, lang)}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-slate-400">{t('common.noData')}</div>}
      </div>
      <Drawer open={!!selectedId} onClose={() => setSelectedId(null)} title={t('clm.detail')}>
        {selected && selCustomer && selPolicy && (
          <div className="space-y-5">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Müşteri</p>
              <p className="font-semibold text-slate-900">{selCustomer.name}</p>
              <p className="text-sm text-slate-500">{selCustomer.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Poliçe No" value={selPolicy.policyNo} />
              <InfoItem label="Poliçe Türü" value={getPolicyTypeLabel(selPolicy.type, lang)} />
              <InfoItem label={t('clm.claimDate')} value={selected.claimDate} />
              <InfoItem label={t('clm.amount')} value={formatCurrency(selected.amount)} />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">{t('clm.description')}</p>
              <p className="text-sm text-slate-900 bg-slate-50 rounded-lg p-3">{selected.description}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">Durum Akışı</p>
              <div className="flex gap-2 flex-wrap">
                {STATUS_ORDER.map(s => (
                  <span key={s} className={`px-3 py-1 rounded-full text-xs font-medium border-2 ${s === selected.status ? `${STATUS_COLORS[s]} border-current` : 'text-slate-400 border-slate-200'}`}>{getClaimStatusLabel(s, lang)}</span>
                ))}
              </div>
            </div>
            {selected.status !== 'paid' && (
              <button onClick={() => advanceStatus(selected.id)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">{t('clm.advance')}</button>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
