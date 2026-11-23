# Renewly

**Sigorta acenteleri için poliçe yenileme takibi ve acente yönetimi.**

Türkiye'deki sigorta acenteleri yüzlerce müşterinin yıllık poliçe yenilemesini hâlâ Excel, masaüstündeki dosyalar ve hafıza ile takip ediyor. Kaçan her yenileme, kaybedilen bir müşteri ve komisyon demek. Renewly; poliçeleri, müşterileri, yenilemeleri ve hasarları tek bir panelde toplar ve süresi yaklaşan poliçeleri öne çıkarır.

> **Durum:** Örnek verilerle çalışan arayüz demosu. Veritabanı ve kimlik doğrulama entegrasyonu (Supabase) bir sonraki adım.

## Özellikler

- **Dashboard:** Toplam poliçe, bu ayki yenilemeler ve acentenin genel durumu tek bakışta
- **Yenilemeler:** Süresi geçmiş, 7 gün ve 30 gün içinde dolacak poliçeler; kalan gün sayısıyla
- **Poliçeler:** Kasko, trafik, konut, sağlık ve DASK branşlarına göre filtrelenebilir liste
- **Müşteriler:** Bireysel ve kurumsal müşteri kayıtları
- **Hasarlar:** İhbar edilen ve süren hasar dosyalarının takibi
- **Komisyonlar:** Aylık ve yıllık komisyon görünümü
- **Raporlar:** Toplam prim, yenileme oranı, ortalama prim, aktif müşteri sayısı ve grafikler
- **Türkçe / İngilizce** arayüz

## Teknoloji

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Recharts

## Çalıştırma

```bash
npm install
npm run dev
```

Ardından tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## Yol haritası

- Supabase ile veritabanı ve kullanıcı girişi
- Yenileme tarihi yaklaşan müşterilere otomatik e-posta / mesaj hatırlatması
- Müşteri belgelerinin (poliçe, ruhsat, kimlik) tek yerde saklanması
- Acente çalışanları için rol ve yetki yönetimi
