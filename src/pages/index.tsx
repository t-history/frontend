import Head from 'next/head'
import { FC } from 'react'

import MainLayout from '@/components/layouts/MainLayout'

const Home: FC = () => {
  return (
    <div>
      <Head>
        <title>THistory</title>
        <meta name="description" content="App for store telegram message history" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout />
    </div>
  )
}

export default Home
