import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { MainContent } from '@/components/MainContent';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { Toast } from '@/components/Toast';

export const metadata: Metadata = {
  metadataBase: new URL('https://avocadojuiceksa.com'),
  title: 'فن الأفوكادو للعصير والآيس كريم | Avocado Juice KSA - Official Website',
  description:
    'ينفرد فن الأفوكادو بطريقة خاصة في صناعة الآيس كريم والعصائر الطبيعية والكريب والوافل وسلطات الفواكه الفاخرة بالرياض. اطلب الآن واستمتع بالطعم الطازج مع التوصيل السريع.',
  keywords: [
    'فن الأفوكادو',
    'عصيرات الرياض',
    'أفوكادو عصير',
    'آيس كريم أفوكادو',
    'عصائر طبيعية',
    'وافل وكريب',
    'سلطات فواكه',
    'Avocado Juice KSA',
    'Avocado Art',
  ],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'فن الأفوكادو للعصير والآيس كريم | Avocado Juice KSA',
    description:
      'الطعم الطازج يبدأ من هنا. اكتشفوا نكهات الأفوكادو المميزة، والعصائر الطازجة، والآيس كريم اللذيذ.',
    url: 'https://avocadojuiceksa.com',
    siteName: 'فن الأفوكادو للعصير والآيس كريم',
    images: [
      {
        url: '/logo.png',
        width: 600,
        height: 600,
        alt: 'فن الأفوكادو - Avocado Art Logo',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF9F2] text-[#183C2A] antialiased selection:bg-[#A8D957] selection:text-[#163D29]">
        <LanguageProvider>
          <CartProvider>
            <Header />
            <MainContent>{children}</MainContent>
            <Footer />
            <CartDrawer />
            <QuickViewModal />
            <Toast />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
