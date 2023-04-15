import Head from 'next/head'
import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import styles from '@/styles/Home.module.scss'
import Chats from '@/components/chats/Chats'
import { TChat } from '@/components/chats/components/ChatItem'
import useHash from '@/hooks/useHash'

interface HomeProps {
  chats: TChat[];
}

const Home: FC<HomeProps> = ({chats}) => {
  const [id, setId] = useState<number | null>(null);
  const { hash } = useHash();

  const handleHashChange = () => {
    console.log('hash change');
    const hash = window.location.hash.slice(1);
    console.log(hash);
    setId(parseInt(hash, 10) || null);
  }

  useEffect(() => {
    console.log('useEffect', hash);

    // return () => {
    //   window.removeEventListener('hashchange', handleHashChange);
    // }
  }, [hash]);

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
        <div className={styles.empty}>Select a chat for start view {id}</div>
        {/* {children} */}
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
