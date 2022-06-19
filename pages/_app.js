import Head from 'next/head'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'noty/src/noty.scss'
import 'noty/src/themes/metroui.scss'
import '../styles/App.css';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000e0d" />
        <link rel="apple-touch-icon" href="/images/logo192.png" />

        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
