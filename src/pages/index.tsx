import Head from 'next/head'
import { FC } from 'react'
import axios from 'axios'
import styles from '@/styles/Home.module.scss'
import Chats from '@/components/chats/Chats'
import { TChat } from '@/components/chats/components/Chat'

interface HomeProps {
  chats: TChat[];
}

const Home: FC<HomeProps> = ({chats}) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>THistory</title>
        <meta name="description" content="App for store telegram message history" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.sidebar}>
        <Chats chats={chats}/>
      </div>
      <div className={styles.messages}>
        <div className={styles.empty}>Select a chat for start view</div>
        {/* {children} */}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_BACKEND_URL}/chats`);
  const chats = res.data.slice(0, 100);
  return { props: {chats} }
}

export default Home
