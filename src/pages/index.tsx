import Head from 'next/head'
import { FC } from 'react'

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>THistory</title>
        <meta name="description" content="App for store telegram message history" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export default Home
