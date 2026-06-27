'use client';
import Link from 'next/link';
import { Shield, Bell, BarChart3, FileText, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const features = [
  { icon: Bell, title: 'Otomatik Hatırlatma', desc: 'Müşterilerinize poliçe yenileme tarihlerinden önce SMS ve e-posta ile otomatik hatırlatma gönderin. Asla bir yenileme kaçırmayın.' },
  { icon: BarChart3, title: 'Komisyon Takibi', desc: 'Hangi sigortacıdan ne kadar komisyon kazandığınızı ve ne kadarının beklemede olduğunu anlık olarak izleyin.' },
  { icon: FileText, title: 'Hasar Yönetimi', desc: 'Müşteri hasarlarını kolayca kaydedin, takip edin ve durumlarını güncelleyin. Tek ekrandan tam kontrol.' },
];

const plans = [
  { name: 'Starter', price: '₺299', period: '/ay', desc: 'Küçük acenteler için', features: ['50 poliçeye kadar', 'SMS hatırlatma', 'Temel raporlar', 'E-posta destek'], cta: 'Ücretsiz Dene', highlight: false },
  { name: 'Pro', price: '₺699', period: '/ay', desc: 'Büyüyen acenteler için', features: ['Sınırsız poliçe', 'SMS + e-posta hatırlatma', 'Gelişmiş raporlar', 'Komisyon takibi', 'Hasar yönetimi', 'Öncelikli destek'], cta: 'Hemen Başla', highlight: true },
  { name: 'Enterprise', price: 'Özel Fiyat', period: '', desc: 'Büyük acente grupları için', features: ['Çoklu acente', 'API entegrasyonu', 'Özel raporlar', 'SLA garantisi', '7/24 destek'], cta: 'İletişime Geç', highlight: false },
];

const faqs = [
  { q: 'Kurulum gerekiyor mu?', a: 'Hayır, Renewly tamamen bulut tabanlıdır. Tarayıcınızdan hemen kullanmaya başlayabilirsiniz.' },
  { q: 'Verilerim güvende mi?', a: 'Tüm veriler SSL ile şifrelenir ve Türkiye\'deki sunucularda KVKK uyumlu şekilde saklanır.' },
  { q: 'Mevcut poliçelerimi aktarabilir miyim?', a: 'Evet, Excel veya CSV formatındaki poliçelerinizi tek tıkla içe aktarabilirsiniz.' },
  { q: 'Ücretsiz deneme var mı?', a: 'Starter ve Pro planları için 14 günlük ücretsiz deneme sunuyoruz. Kredi kartı gerekmez.' },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="border-b border-slate-100 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Shield className="w-4 h-4 text-white" /></div>
          <span className="font-bold text-xl text-slate-900">Renewly</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-slate-600 hover:text-slate-900 text-sm font-medium">Giriş Yap</Link>
          <Link href="/login" className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Ücretsiz Başla</Link>
        </div>
      </nav>
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />Sigorta acenteleri için #1 platform
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight max-w-3xl mx-auto">
          Poliçe takibini otomatikleştir, <span className="text-blue-600">müşterini asla kaybetme</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">Renewly ile yenileme hatırlatmaları, komisyon takibi ve hasar yönetimini tek platformdan yönetin.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/login" className="bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors text-lg">Demo ile Giriş Yap</Link>
          <Link href="#features" className="text-slate-700 font-semibold px-8 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-lg">Nasıl Çalışır?</Link>
        </div>
      </section>
      <section id="features" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Her şey tek platformda</h2>
          <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">Acente operasyonlarınızı dijitalleştirin, zamandan ve paradan tasarruf edin.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5"><f.icon className="w-6 h-6 text-blue-600" /></div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Şeffaf fiyatlandırma</h2>
        <p className="text-slate-600 text-center mb-12">Gizli ücret yok. Her plan için 14 gün ücretsiz deneme.</p>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map(plan => (
            <div key={plan.name} className={`rounded-2xl p-8 border ${plan.highlight ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-105' : 'bg-white border-slate-200'}`}>
              <p className={`text-sm font-medium mb-1 ${plan.highlight ? 'text-blue-200' : 'text-slate-500'}`}>{plan.desc}</p>
              <h3 className={`text-2xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                <span className={plan.highlight ? 'text-blue-200' : 'text-slate-500'}>{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-center gap-3">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? 'text-blue-200' : 'text-blue-600'}`} />
                    <span className={`text-sm ${plan.highlight ? 'text-blue-100' : 'text-slate-600'}`}>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login" className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${plan.highlight ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>{plan.cta}</Link>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-slate-50 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Sık Sorulan Sorular</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <span className="font-medium text-slate-900">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Hemen başlayın</h2>
          <p className="text-slate-600 mb-8">14 gün ücretsiz deneyin. Kredi kartı gerekmez.</p>
          <Link href="/login" className="inline-block bg-blue-600 text-white font-semibold px-10 py-4 rounded-xl hover:bg-blue-700 transition-colors text-lg">Demo ile Giriş Yap →</Link>
        </div>
      </section>
      <footer className="border-t border-slate-100 py-8 text-center text-slate-400 text-sm">© 2025 Renewly. Tüm hakları saklıdır.</footer>
    </div>
  );
}
