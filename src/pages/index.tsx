import axios from 'axios'
import Head from 'next/head'
import { FC, useEffect, useState } from 'react'

import Chats from '@/components/chats/Chats'
import SidebarHeader from '@/components/chats/Header'
import Header from '@/components/messages/Header'
import Messages from '@/components/messages/Messages'
import { IQueueState } from '@/interfaces/QueueState';
import { useAppContext } from '@/providers/AppContext';
import styles from '@/styles/Home.module.scss'

const Home: FC = () => {
  const { state, setState, chats, setChats } = useAppContext();
  const [queueState, setQueueState] = useState<IQueueState | null>(null);

  useEffect(() => {
    const source = new EventSource('/api/queue/sse');

    source.onmessage = (event) => {
      console.log('sse');
      const newQueueState: IQueueState = JSON.parse(event.data);
      setQueueState(newQueueState);

      const chatStatus = newQueueState.chatsStatus;

      const existsChangedStatus = chats.some(chat => {
        const taskFinished = chatStatus[chat.id] === undefined && chat.status !== 'idle'
        const taskChangedStatus = chatStatus[chat.id] === 'in_progress' && chatStatus[chat.id] !== chat.status;
        return taskFinished || taskChangedStatus;
      });

      if (existsChangedStatus) {
        axios.get('/api/chats').then(({ data }) => {
          setChats(data);
        });
      }
    };
    return () => {
      source.close();
    };
  }, [chats, setChats]);    

  useEffect(() => {

    const lhash = window.location.hash
    const id = parseInt(lhash.slice(1), 10) || null;
    const chat = chats.find(c => c.id === id) || null

    setState({ chat });
  }, [setState, chats]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      event.code === 'Escape' && setState({ chat: null })
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [setState])

  return (
    <div className={styles.layout}>
      <Head>
        <title>THistory</title>
        <meta name="description" content="App for store telegram message history" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.hsidebar}>
        <SidebarHeader state={queueState} />
      </div>
      <div className={styles.sidebar}>
        <Chats chats={chats}/>
      </div>
      <div className={styles.header}>
        { state.chat !== null
            && <Header chat={chats.find(chat => chat.id === state.chat?.id)} />
        }
      </div>
      <div className={styles.messages}><Messages /></div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_BACKEND_URL}/chats`);
  const chats = res.data;
  return { props: { chats } }
}

export default Home
