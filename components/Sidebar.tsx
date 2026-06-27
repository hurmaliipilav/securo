'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, RefreshCw, Users, AlertTriangle, BarChart3, PieChart, Settings, LogOut, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, key: 'nav.dashboard' },
  { href: '/policies', icon: FileText, key: 'nav.policies' },
  { href: '/renewals', icon: RefreshCw, key: 'nav.renewals' },
  { href: '/clients', icon: Users, key: 'nav.clients' },
  { href: '/claims', icon: AlertTriangle, key: 'nav.claims' },
  { href: '/commissions', icon: BarChart3, key: 'nav.commissions' },
  { href: '/reports', icon: PieChart, key: 'nav.reports' },
  { href: '/settings', icon: Settings, key: 'nav.settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#0f172a] flex flex-col z-40">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-700">
        <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-white font-bold text-xl">Renewly</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, key }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {t(key)}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">DA</div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Demo Acente</p>
            <p className="text-slate-400 text-xs truncate">demo@renewly.com</p>
          </div>
        </div>
        <button onClick={() => router.push('/login')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <LogOut className="w-4 h-4" />
          {t('nav.logout')}
        </button>
      </div>
    </div>
  );
}
