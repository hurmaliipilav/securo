'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div>
          <span className="font-bold text-2xl text-slate-900">Renewly</span>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Giriş Yap</h1>
          <p className="text-slate-500 text-sm mb-8">Hesabınıza giriş yapın</p>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">E-posta</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="acente@email.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Şifre</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
          <button onClick={() => router.push('/dashboard')} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mb-4">Giriş Yap</button>
          <button onClick={() => router.push('/dashboard')} className="w-full border-2 border-dashed border-blue-300 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors mb-6">🚀 Demo olarak giriş yap</button>
          <p className="text-center text-sm text-slate-500">Hesabınız yok mu? <Link href="#" className="text-blue-600 font-medium hover:underline">Kayıt Ol</Link></p>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6"><Link href="/" className="hover:text-slate-600">← Ana sayfaya dön</Link></p>
      </div>
    </div>
  );
}
