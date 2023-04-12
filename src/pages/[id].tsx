import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Chats from '@/components/chats/Chats'
import { Chat } from '@/components/chats/components/Chat'
import Messages from '@/components/messages/Messages'
import { FC, useState, useEffect } from 'react'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

const Home: FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("/api/chats");
        console.log("response.data", response.data);
        setChats(response.data);
      } catch (error) {
        console.error("Error on receive data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className={styles.layout}>
      <Head>
        <title>ID</title>
        <meta name="description" content="App for store telegram message history" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.sidebar}>
        <Chats data={chats} loading={loading}/>
      </div>
      <Messages className={styles.messages} />
    </div>
  )
}

export default Home
