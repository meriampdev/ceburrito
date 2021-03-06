import Head from 'next/head'
import MainBanner from '../components/home/main-banner'
import Marketing from '../components/home/marketing'

export default function Home() {
  return (
    <div className="landing-page">
      <Head><title>Home | Ceburrito</title></Head>
      <MainBanner />
      <Marketing />
    </div>
  )
}
