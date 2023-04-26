import axios from 'axios'
import Head from 'next/head'
import { FC, useEffect, useState } from 'react'

import Chats from '@/components/chats/Chats'
import SidebarHeader from '@/components/chats/Header'
import Header from '@/components/messages/Header'
import Messages from '@/components/messages/Messages'
import { IChat } from '@/interfaces/Chat'
import { useAppContext } from '@/providers/Context';
import styles from '@/styles/Home.module.scss'

interface HomeProps {
  chats: IChat[];
}

const Home: FC<HomeProps> = ({ chats }) => {
  const { state, setState } = useAppContext();

  useEffect(() => {

    const lhash = window.location.hash
    const id = parseInt(lhash.slice(1), 10) || null;

    setState({ id });
  }, [setState]);

  return (
    <div className={styles.layout}>
      <Head>
        <title>THistory</title>
        <meta name="description" content="App for store telegram message history" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.hsidebar}>
        <SidebarHeader />
      </div>
      <div className={styles.sidebar}>
        <Chats chats={chats}/>
      </div>
      <div className={styles.header}>
        { state.id !== null
            && <Header chat={chats.find(chat => chat.id === state.id)} />
        }
      </div>
      <div className={styles.messages}>
        { state.id === null
            &&  <div className={styles.empty}>Select a chat for start view</div>
        }
        {
          state.id !== null
            && <Messages />
        }
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_BACKEND_URL}/chats`);
  const chats = res.data;
  return { props: { chats } }
}

export default Home
