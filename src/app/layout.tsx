import './globals.css';

import Script from 'next/script';
import React from 'react';

import { InitialNickname, Toaster } from '@/components';
import { ShootingStars, StarsBackground } from '@/components';
import { ModalRenderer } from '@/components/Modal';
import { METADATA } from '@/constants/metadata';
import Providers from '@/utils/providers';

import { notoSans, pretendard } from './fonts/fonts';

export const metadata = METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
  return (
    <html lang="ko">
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="32x32"
        />
      </head>
      <body
        className={`${pretendard.variable} ${notoSans.variable} font-sans antialiased text min-h-screen bg-gradient-purple`}
      >
        {GA4_ID && process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-setup"
              strategy="afterInteractive"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}');
              `}
            </Script>
          </>
        )}
        <Providers>
          <div className="fixed w-full h-screen -z-10">
            <StarsBackground />
            <ShootingStars />
          </div>
          <InitialNickname>{children}</InitialNickname>
          <Toaster />
          <ModalRenderer />
        </Providers>
      </body>
    </html>
  );
}
