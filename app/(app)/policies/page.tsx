'use client';
import { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Drawer from '@/components/Drawer';
import { useLanguage } from '@/contexts/LanguageContext';
import { policies, Policy, PolicyType, getCustomer, getPolicyTypeLabel, getPolicyClaims, formatCurrency } from '@/lib/demo/data';

type SortKey = 'customer' | 'premium' | 'endDate';
type SortDir = 'asc' | 'desc';

function InfoItem({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs text-slate-500 mb-1">{label}</p><p className="text-sm font-medium text-slate-900">{value}</p></div>;
}

export default function PoliciesPage() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | PolicyType>('all');
  const [sortKey, setSortKey] = useState<SortKey>('endDate');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const typeFilters: { key: 'all' | PolicyType; label: string }[] = [
    { key: 'all', label: t('pol.all') }, { key: 'kasko', label: 'Kasko' }, { key: 'trafik', label: 'Trafik' },
    { key: 'konut', label: 'Konut' }, { key: 'saglik', label: 'Sağlık' }, { key: 'dask', label: 'DASK' },
  ];

  const filtered = useMemo(() => {
    let list = [...policies];
    if (typeFilter !== 'all') list = list.filter(p => p.type === typeFilter);
    if (search) { const s = search.toLowerCase(); list = list.filter(p => { const c = getCustomer(p.customerId); return p.policyNo.toLowerCase().includes(s) || c?.name.toLowerCase().includes(s); }); }
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'customer') { const na = getCustomer(a.customerId)?.name ?? ''; const nb = getCustomer(b.customerId)?.name ?? ''; cmp = na.localeCompare(nb, 'tr'); }
      else if (sortKey === 'premium') cmp = a.premium - b.premium;
      else cmp = a.endDate.localeCompare(b.endDate);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [search, typeFilter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => { if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortKey(key); setSortDir('asc'); } };
  const SortIcon = ({ k }: { k: SortKey }) => sortKey === k ? (sortDir === 'asc' ? <ChevronUp className="w-3 h-3 inline ml-1" /> : <ChevronDown className="w-3 h-3 inline ml-1" />) : null;

  const pol = selectedId ? policies.find(p => p.id === selectedId) : null;
  const polCustomer = pol ? getCustomer(pol.customerId) : null;
  const polClaims = pol ? getPolicyClaims(pol.id) : [];

  return (
    <div>
      <Header title={t('pol.title')} />
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('pol.search')} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {typeFilters.map(f => (
              <button key={f.key} onClick={() => setTypeFilter(f.key)} className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${typeFilter === f.key ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{f.label}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-slate-500 text-xs border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort('customer')}>{t('pol.customer')} <SortIcon k="customer" /></th>
              <th className="px-4 py-3 font-medium">{t('pol.policyNo')}</th>
              <th className="px-4 py-3 font-medium">{t('pol.type')}</th>
              <th className="px-4 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort('premium')}>{t('pol.premium')} <SortIcon k="premium" /></th>
              <th className="px-4 py-3 font-medium">{t('pol.start')}</th>
              <th className="px-4 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort('endDate')}>{t('pol.end')} <SortIcon k="endDate" /></th>
              <th className="px-4 py-3 font-medium">{t('pol.status')}</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(pol => {
                const cust = getCustomer(pol.customerId);
                return (
                  <tr key={pol.id} onClick={() => setSelectedId(pol.id)} className="hover:bg-slate-50 cursor-pointer transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900">{cust?.name}</td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">{pol.policyNo}</td>
                    <td className="px-4 py-3 text-slate-700">{getPolicyTypeLabel(pol.type, lang)}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{formatCurrency(pol.premium)}</td>
                    <td className="px-4 py-3 text-slate-600">{pol.startDate}</td>
                    <td className="px-4 py-3 text-slate-600">{pol.endDate}</td>
                    <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${pol.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{pol.status === 'active' ? t('pol.active') : t('pol.expired')}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-slate-400">{t('common.noData')}</div>}
      </div>
      <Drawer open={!!selectedId} onClose={() => setSelectedId(null)} title={t('pol.detail')}>
        {pol && polCustomer && (
          <div className="space-y-5">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">{t('pol.customer')}</p>
              <p className="font-semibold text-slate-900">{polCustomer.name}</p>
              <p className="text-sm text-slate-500">{polCustomer.email} · {polCustomer.phone}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label={t('pol.policyNo')} value={pol.policyNo} />
              <InfoItem label={t('pol.type')} value={getPolicyTypeLabel(pol.type, lang)} />
              <InfoItem label={t('pol.premium')} value={formatCurrency(pol.premium)} />
              <InfoItem label={t('pol.insurer')} value={pol.insurer} />
              <InfoItem label={t('pol.start')} value={pol.startDate} />
              <InfoItem label={t('pol.end')} value={pol.endDate} />
              <InfoItem label={t('pol.commRate')} value={`%${pol.commissionRate}`} />
              <InfoItem label={t('pol.paymentPlan')} value={pol.paymentPlan} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">{t('pol.documents')}</p>
              {['Poliçe Belgesi.pdf', 'Hasar Formu.pdf', 'Kimlik Fotokopisi.jpg'].map(doc => (
                <div key={doc} className="flex items-center justify-between bg-slate-50 rounded-lg p-3 mb-2">
                  <span className="text-sm text-slate-700">{doc}</span>
                  <button className="text-xs text-blue-600 hover:underline">İndir</button>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">{t('pol.linkedClaims')}</p>
              {polClaims.length === 0 ? <p className="text-sm text-slate-400">Hasar kaydı yok</p> : polClaims.map(cl => (
                <div key={cl.id} className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-2">
                  <p className="text-sm font-medium text-slate-900">{cl.description}</p>
                  <p className="text-xs text-slate-500">{formatCurrency(cl.amount)} — {cl.claimDate}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-700 mb-2">{t('pol.commInfo')}</p>
              <p className="text-sm text-slate-700">Oran: <strong>%{pol.commissionRate}</strong></p>
              <p className="text-sm text-slate-700 mt-1">Kazanılan: <strong>{formatCurrency(pol.premium * pol.commissionRate / 100)}</strong></p>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
