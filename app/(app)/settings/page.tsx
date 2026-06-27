'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Toast from '@/components/Toast';
import { useLanguage } from '@/contexts/LanguageContext';

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>{children}</div>;
}

function Toggle({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-slate-100 last:border-0">
      <div><p className="text-sm font-medium text-slate-900">{label}</p><p className="text-xs text-slate-500 mt-0.5">{desc}</p></div>
      <button onClick={() => onChange(!checked)} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ml-4 ${checked ? 'bg-blue-600' : 'bg-slate-200'}`}>
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { t } = useLanguage();
  const [toast, setToast] = useState<string | null>(null);
  const [name, setName] = useState('Demo Acente');
  const [email, setEmail] = useState('demo@renewly.com');
  const [phone, setPhone] = useState('0212 000 0000');
  const [smsNotif, setSmsNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  return (
    <div>
      <Header title={t('set.title')} />
      <div className="max-w-2xl space-y-6">
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">{t('set.profile')}</h2>
          <div className="space-y-4">
            <FormField label={t('set.name')}><input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></FormField>
            <FormField label={t('set.email')}><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></FormField>
            <FormField label={t('set.phone')}><input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></FormField>
            <button onClick={() => setToast(t('set.saved'))} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">{t('set.save')}</button>
          </div>
        </section>
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">{t('set.notifications')}</h2>
          <Toggle label={t('set.smsNotif')} desc="Poliçe yenileme ve hasar bildirimleri için SMS alın" checked={smsNotif} onChange={setSmsNotif} />
          <Toggle label={t('set.emailNotif')} desc="Haftalık özet ve hatırlatmalar için e-posta alın" checked={emailNotif} onChange={setEmailNotif} />
        </section>
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">{t('set.changePassword')}</h2>
          <div className="space-y-4">
            <FormField label={t('set.currentPassword')}><input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></FormField>
            <FormField label={t('set.newPassword')}><input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></FormField>
            <FormField label={t('set.confirmPassword')}><input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></FormField>
            <button onClick={() => setToast(t('set.saved'))} className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors">{t('set.changePassword')}</button>
          </div>
        </section>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
