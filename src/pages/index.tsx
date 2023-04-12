import Head from 'next/head'
import { FC } from 'react'
import styles from '@/styles/Home.module.scss'

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>THistory</title>
        <meta name="description" content="App for store telegram message history" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.empty}>Select a chat for start view</div>
    </>
  )
}

export default Home
