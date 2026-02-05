import type { AppProps } from 'next/app'
import '@/styles/globals.css'

export default function DaikinTucsonApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
