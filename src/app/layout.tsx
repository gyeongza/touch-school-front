import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ReactQueryProvider from '@/shared/components/ReactQueryProvider';
import { Toaster } from '@/shared/ui/sonner';

const pretendard = localFont({
  preload: true,
  src: [
    {
      path: './fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'woff2',
    },
    {
      path: './fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'woff2',
    },
    {
      path: './fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'woff2',
    },
    {
      path: './fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'woff2',
    },
    {
      path: './fonts/Pretendard-ExtraBold.woff2',
      weight: '800',
      style: 'woff2',
    },
  ],
  display: 'swap',
  fallback: [
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
});

export const metadata: Metadata = {
  title: 'Touch School',
  description: 'Touch School',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} bg-white`}>
        <Toaster richColors />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'light',
  height: 'device-height',
  interactiveWidget: 'resizes-visual',
};
