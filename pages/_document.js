import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
import SEO from '../components/SEO'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <SEO />
      </Head>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
