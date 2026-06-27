'use client';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { policies, customers, claims, monthlyPremiumTrend, renewalRateTrend, commissionByType, getCustomerPolicies, getTotalPremium, formatCurrency } from '@/lib/demo/data';

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

const premiumByType = [
  { type: 'Kasko', amount: policies.filter(p => p.type === 'kasko').reduce((s, p) => s + p.premium, 0) },
  { type: 'Trafik', amount: policies.filter(p => p.type === 'trafik').reduce((s, p) => s + p.premium, 0) },
  { type: 'Konut', amount: policies.filter(p => p.type === 'konut').reduce((s, p) => s + p.premium, 0) },
  { type: 'Sağlık', amount: policies.filter(p => p.type === 'saglik').reduce((s, p) => s + p.premium, 0) },
  { type: 'DASK', amount: policies.filter(p => p.type === 'dask').reduce((s, p) => s + p.premium, 0) },
];

const claimsByStatus = [
  { status: 'Bildirildi', count: claims.filter(c => c.status === 'reported').length },
  { status: 'İncelemede', count: claims.filter(c => c.status === 'reviewing').length },
  { status: 'Onaylandı', count: claims.filter(c => c.status === 'approved').length },
  { status: 'Ödendi', count: claims.filter(c => c.status === 'paid').length },
];

const top5Customers = [...customers].map(c => ({ ...c, total: getTotalPremium(c.id), count: getCustomerPolicies(c.id).length })).sort((a, b) => b.total - a.total).slice(0, 5);

export default function ReportsPage() {
  const { t } = useLanguage();
  const totalPremium = policies.reduce((s, p) => s + p.premium, 0);
  const activeClients = customers.filter(c => getCustomerPolicies(c.id).some(p => p.status === 'active')).length;
  const avgPremium = Math.round(totalPremium / policies.length);
  const renewalRate = renewalRateTrend[renewalRateTrend.length - 1].rate;

  const kpis = [
    { label: t('rep.totalPremium'), value: formatCurrency(totalPremium) },
    { label: t('rep.renewalRate'), value: `%${renewalRate}` },
    { label: t('rep.avgPremium'), value: formatCurrency(avgPremium) },
    { label: t('rep.activeClients'), value: activeClients },
  ];

  return (
    <div>
      <Header title={t('rep.title')} />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <h3 className="font-semibold text-slate-900 mb-5">{t('rep.premiumTrend')}</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthlyPremiumTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₺${(Number(v) / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} name="Prim" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid xl:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5">{t('rep.premiumByType')}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={premiumByType} dataKey="amount" nameKey="type" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} %${((percent ?? 0) * 100).toFixed(0)}`} labelLine={false}>
                {premiumByType.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5">{t('rep.renewalTrend')}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={renewalRateTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} tickFormatter={v => `%${v}`} />
              <Tooltip formatter={(v) => `%${v}`} />
              <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} name="Yenileme Oranı" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid xl:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5">{t('rep.commByType')}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={commissionByType}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="type" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₺${(Number(v) / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="amount" name="Komisyon" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5">{t('rep.claimsByStatus')}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={claimsByStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="status" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" name="Hasar" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-semibold text-slate-900">{t('rep.top5Clients')}</h3></div>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-slate-500 text-xs border-b border-slate-200 bg-slate-50">
            <th className="px-6 py-3 font-medium">#</th><th className="px-6 py-3 font-medium">{t('cli.name')}</th>
            <th className="px-6 py-3 font-medium">{t('cli.type')}</th><th className="px-6 py-3 font-medium">{t('cli.policyCount')}</th>
            <th className="px-6 py-3 font-medium">{t('cli.totalPremium')}</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-50">
            {top5Customers.map((c, i) => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3 text-slate-400 font-medium">{i + 1}</td>
                <td className="px-6 py-3 font-medium text-slate-900">{c.name}</td>
                <td className="px-6 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${c.type === 'corporate' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{c.type === 'corporate' ? 'Kurumsal' : 'Bireysel'}</span></td>
                <td className="px-6 py-3 text-slate-700">{c.count}</td>
                <td className="px-6 py-3 font-semibold text-slate-900">{formatCurrency(c.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
