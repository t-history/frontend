import { FC } from 'react'
import Head from 'next/head'
import MainLayout from '@/components/layouts/MainLayout'
import Messages from '@/components/messages/Messages'

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>ID</title>
        <meta name="description" content="App for store telegram message history" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Messages />
      </MainLayout>
    </>
  )
}

export default Home
