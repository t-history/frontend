import { FC, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Messages from '@/components/messages/Messages'
import Header from '@/components/messages/Header'

const Home: FC = () => {
  const { push, query } = useRouter()

  const handleKeyDown = (event: KeyboardEvent) => {
    event.key === 'Escape' && push('/')
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <>
      <Head>
        <title>ID</title>
        <meta name="description" content="App for store telegram message history" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header id={Number(query.id)} />
      <Messages id={Number(query.id)} />
    </>
  )
}

export default Home
