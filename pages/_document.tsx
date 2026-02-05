import { Html, Head, Main, NextScript } from 'next/document'

export default function DaikinDocument() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#0066B3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
