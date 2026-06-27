export type CustomerType = 'individual' | 'corporate';
export type PolicyType = 'kasko' | 'trafik' | 'konut' | 'saglik' | 'dask';
export type PolicyStatus = 'active' | 'expired' | 'cancelled' | 'pending';
export type ClaimStatus = 'reported' | 'reviewing' | 'approved' | 'paid';

export interface Customer { id: string; name: string; phone: string; email: string; type: CustomerType; city: string; }
export interface Policy { id: string; policyNo: string; customerId: string; type: PolicyType; premium: number; startDate: string; endDate: string; status: PolicyStatus; insurer: string; commissionRate: number; paymentPlan: string; }
export interface Claim { id: string; policyId: string; customerId: string; claimDate: string; description: string; amount: number; status: ClaimStatus; }

export const customers: Customer[] = [
  { id: 'c1', name: 'Ahmet Yılmaz', phone: '0532 111 2233', email: 'ahmet.yilmaz@email.com', type: 'individual', city: 'İstanbul' },
  { id: 'c2', name: 'Fatma Kaya', phone: '0533 222 3344', email: 'fatma.kaya@email.com', type: 'individual', city: 'Ankara' },
  { id: 'c3', name: 'Mehmet Demir', phone: '0534 333 4455', email: 'mehmet.demir@email.com', type: 'individual', city: 'İzmir' },
  { id: 'c4', name: 'Zeynep Şahin', phone: '0535 444 5566', email: 'zeynep.sahin@email.com', type: 'individual', city: 'Bursa' },
  { id: 'c5', name: 'Mustafa Öztürk', phone: '0536 555 6677', email: 'mustafa.ozturk@email.com', type: 'individual', city: 'Antalya' },
  { id: 'c6', name: 'Ayşe Çelik', phone: '0537 666 7788', email: 'ayse.celik@email.com', type: 'individual', city: 'İstanbul' },
  { id: 'c7', name: 'Hüseyin Arslan', phone: '0538 777 8899', email: 'huseyin.arslan@email.com', type: 'individual', city: 'Konya' },
  { id: 'c8', name: 'Elif Doğan', phone: '0539 888 9900', email: 'elif.dogan@email.com', type: 'individual', city: 'Gaziantep' },
  { id: 'c9', name: 'Arçelik A.Ş.', phone: '0212 100 2000', email: 'sigorta@arcelik.com.tr', type: 'corporate', city: 'İstanbul' },
  { id: 'c10', name: 'Koçtaş Yapı Market', phone: '0216 200 3000', email: 'risk@koctas.com.tr', type: 'corporate', city: 'İstanbul' },
  { id: 'c11', name: 'Anadolu Lojistik Ltd.', phone: '0312 300 4000', email: 'finans@anadolulojistik.com.tr', type: 'corporate', city: 'Ankara' },
  { id: 'c12', name: 'Ege Tarım Kooperatifi', phone: '0232 400 5000', email: 'muhasebe@egetarim.com.tr', type: 'corporate', city: 'İzmir' },
  { id: 'c13', name: 'Can Güneş', phone: '0541 000 1111', email: 'can.gunes@email.com', type: 'individual', city: 'İstanbul' },
  { id: 'c14', name: 'Seda Yıldız', phone: '0542 000 2222', email: 'seda.yildiz@email.com', type: 'individual', city: 'Ankara' },
  { id: 'c15', name: 'Marmara İnşaat A.Ş.', phone: '0216 500 6000', email: 'sigorta@marmarainsaat.com.tr', type: 'corporate', city: 'İstanbul' },
];

export const policies: Policy[] = [
  { id: 'p1', policyNo: 'KSK-2024-001', customerId: 'c1', type: 'kasko', premium: 18500, startDate: '2024-01-15', endDate: '2025-01-15', status: 'expired', insurer: 'Anadolu Sigorta', commissionRate: 12, paymentPlan: 'Peşin' },
  { id: 'p2', policyNo: 'TRF-2024-002', customerId: 'c1', type: 'trafik', premium: 2800, startDate: '2024-01-15', endDate: '2025-01-15', status: 'expired', insurer: 'Güneş Sigorta', commissionRate: 8, paymentPlan: 'Peşin' },
  { id: 'p3', policyNo: 'KNT-2025-003', customerId: 'c2', type: 'konut', premium: 4200, startDate: '2025-03-01', endDate: '2026-03-01', status: 'active', insurer: 'Allianz Sigorta', commissionRate: 15, paymentPlan: '4 Taksit' },
  { id: 'p4', policyNo: 'SAG-2025-004', customerId: 'c2', type: 'saglik', premium: 12000, startDate: '2025-01-01', endDate: '2026-01-01', status: 'active', insurer: 'Acıbadem Sigorta', commissionRate: 10, paymentPlan: '12 Taksit' },
  { id: 'p5', policyNo: 'KSK-2025-005', customerId: 'c3', type: 'kasko', premium: 22000, startDate: '2025-06-20', endDate: '2026-06-20', status: 'active', insurer: 'Anadolu Sigorta', commissionRate: 12, paymentPlan: 'Peşin' },
  { id: 'p6', policyNo: 'TRF-2025-006', customerId: 'c3', type: 'trafik', premium: 3200, startDate: '2025-06-20', endDate: '2026-06-20', status: 'active', insurer: 'Güneş Sigorta', commissionRate: 8, paymentPlan: 'Peşin' },
  { id: 'p7', policyNo: 'DSK-2025-007', customerId: 'c4', type: 'dask', premium: 1800, startDate: '2025-06-01', endDate: '2026-06-01', status: 'active', insurer: 'DASK', commissionRate: 5, paymentPlan: 'Peşin' },
  { id: 'p8', policyNo: 'KNT-2024-008', customerId: 'c5', type: 'konut', premium: 5500, startDate: '2024-06-28', endDate: '2025-06-28', status: 'expired', insurer: 'Allianz Sigorta', commissionRate: 15, paymentPlan: '2 Taksit' },
  { id: 'p9', policyNo: 'SAG-2025-009', customerId: 'c6', type: 'saglik', premium: 9500, startDate: '2025-02-15', endDate: '2026-02-15', status: 'active', insurer: 'Acıbadem Sigorta', commissionRate: 10, paymentPlan: '12 Taksit' },
  { id: 'p10', policyNo: 'KSK-2025-010', customerId: 'c7', type: 'kasko', premium: 15000, startDate: '2025-06-24', endDate: '2026-06-24', status: 'active', insurer: 'Anadolu Sigorta', commissionRate: 12, paymentPlan: 'Peşin' },
  { id: 'p11', policyNo: 'TRF-2025-011', customerId: 'c8', type: 'trafik', premium: 2600, startDate: '2025-06-27', endDate: '2026-06-27', status: 'active', insurer: 'Güneş Sigorta', commissionRate: 8, paymentPlan: 'Peşin' },
  { id: 'p12', policyNo: 'KNT-2025-012', customerId: 'c9', type: 'konut', premium: 28000, startDate: '2025-04-01', endDate: '2026-04-01', status: 'active', insurer: 'Allianz Sigorta', commissionRate: 15, paymentPlan: '4 Taksit' },
  { id: 'p13', policyNo: 'SAG-2025-013', customerId: 'c10', type: 'saglik', premium: 45000, startDate: '2025-01-15', endDate: '2026-01-15', status: 'active', insurer: 'Acıbadem Sigorta', commissionRate: 10, paymentPlan: '12 Taksit' },
  { id: 'p14', policyNo: 'KSK-2025-014', customerId: 'c11', type: 'kasko', premium: 62000, startDate: '2025-07-01', endDate: '2026-07-01', status: 'active', insurer: 'Anadolu Sigorta', commissionRate: 12, paymentPlan: '2 Taksit' },
  { id: 'p15', policyNo: 'DSK-2025-015', customerId: 'c12', type: 'dask', premium: 8500, startDate: '2025-05-10', endDate: '2026-05-10', status: 'active', insurer: 'DASK', commissionRate: 5, paymentPlan: 'Peşin' },
  { id: 'p16', policyNo: 'TRF-2024-016', customerId: 'c13', type: 'trafik', premium: 2900, startDate: '2024-06-15', endDate: '2025-06-15', status: 'expired', insurer: 'Güneş Sigorta', commissionRate: 8, paymentPlan: 'Peşin' },
  { id: 'p17', policyNo: 'KNT-2025-017', customerId: 'c14', type: 'konut', premium: 3800, startDate: '2025-07-01', endDate: '2026-07-01', status: 'active', insurer: 'Allianz Sigorta', commissionRate: 15, paymentPlan: 'Peşin' },
  { id: 'p18', policyNo: 'KSK-2025-018', customerId: 'c15', type: 'kasko', premium: 95000, startDate: '2025-03-15', endDate: '2026-03-15', status: 'active', insurer: 'Anadolu Sigorta', commissionRate: 12, paymentPlan: '4 Taksit' },
  { id: 'p19', policyNo: 'SAG-2024-019', customerId: 'c4', type: 'saglik', premium: 7800, startDate: '2024-06-30', endDate: '2025-06-30', status: 'expired', insurer: 'Acıbadem Sigorta', commissionRate: 10, paymentPlan: '12 Taksit' },
  { id: 'p20', policyNo: 'DSK-2024-020', customerId: 'c5', type: 'dask', premium: 1500, startDate: '2024-07-01', endDate: '2025-07-01', status: 'active', insurer: 'DASK', commissionRate: 5, paymentPlan: 'Peşin' },
  { id: 'p21', policyNo: 'KSK-2025-021', customerId: 'c6', type: 'kasko', premium: 19500, startDate: '2025-06-22', endDate: '2026-06-22', status: 'active', insurer: 'Anadolu Sigorta', commissionRate: 12, paymentPlan: 'Peşin' },
  { id: 'p22', policyNo: 'TRF-2025-022', customerId: 'c7', type: 'trafik', premium: 3100, startDate: '2025-06-25', endDate: '2026-06-25', status: 'active', insurer: 'Güneş Sigorta', commissionRate: 8, paymentPlan: 'Peşin' },
  { id: 'p23', policyNo: 'KNT-2024-023', customerId: 'c8', type: 'konut', premium: 4600, startDate: '2024-07-05', endDate: '2025-07-05', status: 'active', insurer: 'Allianz Sigorta', commissionRate: 15, paymentPlan: '2 Taksit' },
  { id: 'p24', policyNo: 'SAG-2025-024', customerId: 'c13', type: 'saglik', premium: 11000, startDate: '2025-05-20', endDate: '2026-05-20', status: 'active', insurer: 'Acıbadem Sigorta', commissionRate: 10, paymentPlan: '12 Taksit' },
  { id: 'p25', policyNo: 'DSK-2025-025', customerId: 'c14', type: 'dask', premium: 2100, startDate: '2025-06-29', endDate: '2026-06-29', status: 'active', insurer: 'DASK', commissionRate: 5, paymentPlan: 'Peşin' },
];

export const claims: Claim[] = [
  { id: 'cl1', policyId: 'p1', customerId: 'c1', claimDate: '2024-08-15', description: 'Araç çarpışma hasarı', amount: 8500, status: 'paid' },
  { id: 'cl2', policyId: 'p5', customerId: 'c3', claimDate: '2025-05-20', description: 'Cam kırılması', amount: 1200, status: 'approved' },
  { id: 'cl3', policyId: 'p9', customerId: 'c6', claimDate: '2025-06-01', description: 'Hastane tedavi gideri', amount: 4500, status: 'reviewing' },
  { id: 'cl4', policyId: 'p12', customerId: 'c9', claimDate: '2025-06-10', description: 'Su baskını hasarı', amount: 15000, status: 'reviewing' },
  { id: 'cl5', policyId: 'p13', customerId: 'c10', claimDate: '2025-04-05', description: 'Çalışan sağlık giderleri', amount: 22000, status: 'paid' },
  { id: 'cl6', policyId: 'p18', customerId: 'c15', claimDate: '2025-06-18', description: 'Araç filosu hasarı', amount: 45000, status: 'reported' },
  { id: 'cl7', policyId: 'p3', customerId: 'c2', claimDate: '2025-05-12', description: 'Yangın hasarı - kısmı', amount: 9800, status: 'approved' },
  { id: 'cl8', policyId: 'p21', customerId: 'c6', claimDate: '2025-06-20', description: 'Park hasarı', amount: 3200, status: 'reported' },
  { id: 'cl9', policyId: 'p24', customerId: 'c13', claimDate: '2025-06-15', description: 'Ameliyat gideri', amount: 18000, status: 'reviewing' },
  { id: 'cl10', policyId: 'p14', customerId: 'c11', claimDate: '2025-06-22', description: 'Trafik kazası - yük aracı', amount: 67000, status: 'reported' },
];

export const monthlyPremiumTrend = [
  { month: 'Tem 24', amount: 85000 }, { month: 'Ağu 24', amount: 92000 }, { month: 'Eyl 24', amount: 78000 },
  { month: 'Eki 24', amount: 105000 }, { month: 'Kas 24', amount: 118000 }, { month: 'Ara 24', amount: 134000 },
  { month: 'Oca 25', amount: 98000 }, { month: 'Şub 25', amount: 110000 }, { month: 'Mar 25', amount: 125000 },
  { month: 'Nis 25', amount: 142000 }, { month: 'May 25', amount: 158000 }, { month: 'Haz 25', amount: 175000 },
];

export const renewalRateTrend = [
  { month: 'Tem 24', rate: 72 }, { month: 'Ağu 24', rate: 68 }, { month: 'Eyl 24', rate: 75 },
  { month: 'Eki 24', rate: 80 }, { month: 'Kas 24', rate: 78 }, { month: 'Ara 24', rate: 82 },
  { month: 'Oca 25', rate: 85 }, { month: 'Şub 25', rate: 83 }, { month: 'Mar 25', rate: 88 },
  { month: 'Nis 25', rate: 86 }, { month: 'May 25', rate: 91 }, { month: 'Haz 25', rate: 89 },
];

export const commissionByInsurer = [
  { insurer: 'Anadolu Sigorta', earned: 25800, pending: 7440 },
  { insurer: 'Güneş Sigorta', earned: 4664, pending: 496 },
  { insurer: 'Allianz Sigorta', earned: 8820, pending: 4200 },
  { insurer: 'Acıbadem Sigorta', earned: 10650, pending: 5350 },
  { insurer: 'DASK', earned: 697, pending: 105 },
];

export const commissionByType = [
  { type: 'Kasko', amount: 25800 }, { type: 'Trafik', amount: 4664 },
  { type: 'Konut', amount: 8820 }, { type: 'Sağlık', amount: 10650 }, { type: 'DASK', amount: 697 },
];

export function getDaysUntilExpiry(endDate: string): number {
  const end = new Date(endDate);
  const today = new Date('2026-06-24');
  return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}
export function getPolicyTypeLabel(type: PolicyType, lang: 'tr' | 'en' = 'tr'): string {
  const labels: Record<PolicyType, { tr: string; en: string }> = {
    kasko: { tr: 'Kasko', en: 'Comprehensive' }, trafik: { tr: 'Trafik', en: 'Traffic' },
    konut: { tr: 'Konut', en: 'Home' }, saglik: { tr: 'Sağlık', en: 'Health' }, dask: { tr: 'DASK', en: 'DASK' },
  };
  return labels[type][lang];
}
export function getClaimStatusLabel(status: ClaimStatus, lang: 'tr' | 'en' = 'tr'): string {
  const labels: Record<ClaimStatus, { tr: string; en: string }> = {
    reported: { tr: 'Bildirildi', en: 'Reported' }, reviewing: { tr: 'İncelemede', en: 'Reviewing' },
    approved: { tr: 'Onaylandı', en: 'Approved' }, paid: { tr: 'Ödendi', en: 'Paid' },
  };
  return labels[status][lang];
}
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(amount);
}
export function getCustomer(id: string) { return customers.find(c => c.id === id); }
export function getPolicy(id: string) { return policies.find(p => p.id === id); }
export function getCustomerPolicies(customerId: string) { return policies.filter(p => p.customerId === customerId); }
export function getCustomerClaims(customerId: string) { return claims.filter(cl => getCustomerPolicies(customerId).some(p => p.id === cl.policyId)); }
export function getPolicyClaims(policyId: string) { return claims.filter(cl => cl.policyId === policyId); }
export function getTotalPremium(customerId: string) { return getCustomerPolicies(customerId).reduce((s, p) => s + p.premium, 0); }
