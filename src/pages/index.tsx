import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Chats from '@/components/chats/Chats'
import Messages from '@/components/messages/Messages'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.layout}>
      <Head>
        <title>THistory</title>
        <meta name="description" content="App for store telegram message history" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Chats className={styles.sidebar} />
      <Messages className={styles.messages} />
    </div>
  )
}
