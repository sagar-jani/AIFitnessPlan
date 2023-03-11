import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
import SEO from '../components/SEO'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Learn about the latest research and developments in AI-driven fitness, diet, and exercise. Get personalized recommendations and achieve your health goals with cutting-edge technology." />
        <meta name="keywords" content="fitness, diet, exercise, AI, health, technology, personalized recommendations" />
        <meta property="og:title" content="Fitness, Diet, and Exercise on AI" />
        <meta name="robots" content="index, follow" />
        <meta property="og:description" content="Learn about the latest research and developments in AI-driven fitness, diet, and exercise. Get personalized recommendations and achieve your health goals with cutting-edge technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aifitnessplanner.com/" />
        <meta property="og:image" content="https://aifitnessplanner.com/images/ai-fitness-og-1.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Fitness, Diet, and Exercise on AI" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Revolutionise Fitness Using AI" />
        <meta name="twitter:description" content="Learn about the latest research and developments in AI-driven fitness, diet, and exercise. Get personalized recommendations and achieve your health goals with cutting-edge technology." />
        <meta name="twitter:image" content="https://www.aifitnessplanner.com/images/ai-fitness-og-1.png" />
        <meta name="twitter:creator" content="@sagarjani" />
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
