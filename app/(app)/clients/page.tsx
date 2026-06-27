'use client';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import Drawer from '@/components/Drawer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { customers, CustomerType, getCustomerPolicies, getCustomerClaims, getPolicyTypeLabel, getClaimStatusLabel, formatCurrency, getTotalPremium } from '@/lib/demo/data';

function InfoItem({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs text-slate-500 mb-1">{label}</p><p className="text-sm font-medium text-slate-900">{value}</p></div>;
}

export default function ClientsPage() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | CustomerType>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...customers];
    if (typeFilter !== 'all') list = list.filter(c => c.type === typeFilter);
    if (search) { const s = search.toLowerCase(); list = list.filter(c => c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s) || c.phone.includes(s)); }
    return list;
  }, [search, typeFilter]);

  const selected = selectedId ? customers.find(c => c.id === selectedId) : null;
  const selPolicies = selected ? getCustomerPolicies(selected.id) : [];
  const selClaims = selected ? getCustomerClaims(selected.id) : [];

  return (
    <div>
      <Header title={t('cli.title')} />
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-5 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('cli.search')} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex gap-2">
          {(['all', 'individual', 'corporate'] as const).map(f => {
            const labels = { all: t('cli.all'), individual: t('cli.individual'), corporate: t('cli.corporate') };
            return <button key={f} onClick={() => setTypeFilter(f)} className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${typeFilter === f ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{labels[f]}</button>;
          })}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-slate-500 text-xs border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-medium">{t('cli.name')}</th><th className="px-4 py-3 font-medium">{t('cli.phone')}</th>
              <th className="px-4 py-3 font-medium">{t('cli.email')}</th><th className="px-4 py-3 font-medium">{t('cli.policyCount')}</th>
              <th className="px-4 py-3 font-medium">{t('cli.totalPremium')}</th><th className="px-4 py-3 font-medium">{t('cli.type')}</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(c => (
                <tr key={c.id} onClick={() => setSelectedId(c.id)} className="hover:bg-slate-50 cursor-pointer transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                  <td className="px-4 py-3 text-slate-600">{c.phone}</td>
                  <td className="px-4 py-3 text-slate-600">{c.email}</td>
                  <td className="px-4 py-3 text-slate-700">{getCustomerPolicies(c.id).length}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{formatCurrency(getTotalPremium(c.id))}</td>
                  <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${c.type === 'corporate' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{c.type === 'corporate' ? t('cli.corporate') : t('cli.individual')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-slate-400">{t('common.noData')}</div>}
      </div>
      <Drawer open={!!selectedId} onClose={() => setSelectedId(null)} title={t('cli.profile')}>
        {selected && (
          <div className="space-y-5">
            <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">{selected.name[0]}</div>
              <div>
                <p className="font-semibold text-slate-900">{selected.name}</p>
                <p className="text-sm text-slate-500">{selected.city}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selected.type === 'corporate' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{selected.type === 'corporate' ? t('cli.corporate') : t('cli.individual')}</span>
              </div>
            </div>
            <div className="space-y-3">
              <InfoItem label={t('cli.phone')} value={selected.phone} />
              <InfoItem label={t('cli.email')} value={selected.email} />
              <InfoItem label={t('cli.totalPremium')} value={formatCurrency(getTotalPremium(selected.id))} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">{t('cli.policies')} ({selPolicies.length})</p>
              {selPolicies.map(p => (
                <div key={p.id} className="flex items-center justify-between bg-slate-50 rounded-lg p-3 mb-2">
                  <div><p className="text-sm font-medium text-slate-900">{p.policyNo}</p><p className="text-xs text-slate-500">{getPolicyTypeLabel(p.type, lang)} · {p.endDate}</p></div>
                  <span className="text-sm font-medium text-slate-900">{formatCurrency(p.premium)}</span>
                </div>
              ))}
            </div>
            {selClaims.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">{t('cli.claims')} ({selClaims.length})</p>
                {selClaims.map(cl => (
                  <div key={cl.id} className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-2">
                    <p className="text-sm font-medium text-slate-900">{cl.description}</p>
                    <p className="text-xs text-slate-500">{formatCurrency(cl.amount)} · {getClaimStatusLabel(cl.status, lang)}</p>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setToast(t('cli.reminderSent'))} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">{t('cli.sendReminder')}</button>
          </div>
        )}
      </Drawer>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
