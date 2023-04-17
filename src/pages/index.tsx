import Head from 'next/head'
import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import styles from '@/styles/Home.module.scss'
import Chats from '@/components/chats/Chats'
import { IChat } from '@/components/chats/components/ChatItem'
import Messages from '@/components/messages/Messages'
import Header from '@/components/messages/Header'

interface HomeProps {
  chats: IChat[];
}

const Home: FC<HomeProps> = ({chats}) => {
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {

    const lhash = window.location.hash
    const id = parseInt(lhash.slice(1), 10) || null;

    setId(id);
  }, []);

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
      <div className={styles.header}>
        { id !== null
            && <Header chat={chats.find(chat => chat.id = id)} />
        }
      </div>
      <div className={styles.messages}>
        { id === null
            &&  <div className={styles.empty}>Select a chat for start view</div>
        }
        {
          id !== null
            && <Messages id={id} />
        }
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_BACKEND_URL}/chats`);
  const chats = res.data; //.slice(0, 100);
  return { props: {chats} }
}

export default Home
