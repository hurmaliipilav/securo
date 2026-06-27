'use client';
import { useState } from 'react';
import { FileText, RefreshCw, AlertTriangle, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Drawer from '@/components/Drawer';
import { useLanguage } from '@/contexts/LanguageContext';
import { policies, claims, formatCurrency, getCustomer, getDaysUntilExpiry, getPolicyTypeLabel, getPolicyClaims } from '@/lib/demo/data';

function InfoItem({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs text-slate-500 mb-1">{label}</p><p className="text-sm font-medium text-slate-900">{value}</p></div>;
}

export default function DashboardPage() {
  const { t, lang } = useLanguage();
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  const today = new Date('2026-06-24');
  const thisMonthEnd = new Date('2026-07-31');
  const renewalsThisMonth = policies.filter(p => { const e = new Date(p.endDate); return e >= today && e <= thisMonthEnd; }).length;
  const openClaims = claims.filter(c => c.status === 'reported' || c.status === 'reviewing').length;
  const monthlyPremium = policies.filter(p => p.status === 'active').reduce((s, p) => s + p.premium, 0);

  const recentPolicies = [...policies].reverse().slice(0, 5);
  const upcomingRenewals = policies.map(p => ({ ...p, days: getDaysUntilExpiry(p.endDate) })).filter(p => p.days >= 0 && p.days <= 30).sort((a, b) => a.days - b.days).slice(0, 8);

  const pol = selectedPolicy ? policies.find(p => p.id === selectedPolicy) : null;
  const polCustomer = pol ? getCustomer(pol.customerId) : null;
  const polClaims = pol ? getPolicyClaims(pol.id) : [];

  const kpis = [
    { label: t('dash.totalPolicies'), value: policies.length, icon: FileText, color: 'bg-blue-500' },
    { label: t('dash.renewalsThisMonth'), value: renewalsThisMonth, icon: RefreshCw, color: 'bg-emerald-500' },
    { label: t('dash.openClaims'), value: openClaims, icon: AlertTriangle, color: 'bg-amber-500' },
    { label: t('dash.monthlyPremium'), value: formatCurrency(monthlyPremium), icon: TrendingUp, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <Header title={t('dash.title')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-500 font-medium">{kpi.label}</span>
              <div className={`w-9 h-9 ${kpi.color} rounded-lg flex items-center justify-center`}><kpi.icon className="w-4 h-4 text-white" /></div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
          </div>
        ))}
      </div>
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100"><h2 className="font-semibold text-slate-900">{t('dash.recentPolicies')}</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-slate-500 text-xs border-b border-slate-100">
                <th className="px-6 py-3 font-medium">Müşteri</th><th className="px-6 py-3 font-medium">Poliçe No</th>
                <th className="px-6 py-3 font-medium">Tür</th><th className="px-6 py-3 font-medium">Prim</th><th className="px-6 py-3 font-medium">Durum</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-50">
                {recentPolicies.map(pol => {
                  const cust = getCustomer(pol.customerId);
                  return (
                    <tr key={pol.id} onClick={() => setSelectedPolicy(pol.id)} className="hover:bg-slate-50 cursor-pointer transition-colors">
                      <td className="px-6 py-3 font-medium text-slate-900">{cust?.name}</td>
                      <td className="px-6 py-3 text-slate-600 font-mono text-xs">{pol.policyNo}</td>
                      <td className="px-6 py-3 text-slate-600">{getPolicyTypeLabel(pol.type, lang)}</td>
                      <td className="px-6 py-3 text-slate-900 font-medium">{formatCurrency(pol.premium)}</td>
                      <td className="px-6 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${pol.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{pol.status === 'active' ? t('pol.active') : t('pol.expired')}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100"><h2 className="font-semibold text-slate-900">{t('dash.upcomingRenewals')}</h2></div>
          <div className="divide-y divide-slate-50">
            {upcomingRenewals.map(pol => {
              const cust = getCustomer(pol.customerId);
              return (
                <div key={pol.id} onClick={() => setSelectedPolicy(pol.id)} className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
                  <div><p className="text-sm font-medium text-slate-900">{cust?.name}</p><p className="text-xs text-slate-500">{pol.policyNo}</p></div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${pol.days <= 7 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{pol.days} {t('dash.daysLeft')}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Drawer open={!!selectedPolicy} onClose={() => setSelectedPolicy(null)} title={t('pol.detail')}>
        {pol && polCustomer && (
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">{t('pol.customer')}</p>
              <p className="font-semibold text-slate-900">{polCustomer.name}</p>
              <p className="text-sm text-slate-500">{polCustomer.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Poliçe No" value={pol.policyNo} />
              <InfoItem label={t('pol.type')} value={getPolicyTypeLabel(pol.type, lang)} />
              <InfoItem label={t('pol.premium')} value={formatCurrency(pol.premium)} />
              <InfoItem label={t('pol.insurer')} value={pol.insurer} />
              <InfoItem label={t('pol.start')} value={pol.startDate} />
              <InfoItem label={t('pol.end')} value={pol.endDate} />
              <InfoItem label={t('pol.commRate')} value={`%${pol.commissionRate}`} />
              <InfoItem label={t('pol.paymentPlan')} value={pol.paymentPlan} />
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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
