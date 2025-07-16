import './globals.css';

import Script from 'next/script';
import React from 'react';

import {
  InitialNickname,
  ShootingStars,
  StarsBackground,
  Toaster,
} from '@/components';
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
          rel="shortcut icon"
          href="/favicon.ico"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/icons/icon.svg"
          sizes="any"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/apple-icon.png"
        />
      </head>
      <body
        className={`${pretendard.variable} ${notoSans.variable} font-sans antialiased text relative min-h-screen bg-gradient-purple`}
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
          <div className="absolute inset-0 w-full h-screen -z-10">
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
