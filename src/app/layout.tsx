import './globals.css';

import { Viewport } from 'next';
import Script from 'next/script';
import React from 'react';

import {
  InitialNickname,
  ModalRenderer,
  ShootingStars,
  StarsBackground,
  Toaster,
} from '@/components';
import { METADATA } from '@/constants/metadata';
import Providers from '@/utils/providers';

import { notoSans, pretendard } from './fonts/fonts';

export const metadata = METADATA;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${notoSans.variable}`}
    >
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
      <body className="font-sans antialiased text-sm 2xl:text-base text relative min-h-screen bg-gradient-purple">
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
