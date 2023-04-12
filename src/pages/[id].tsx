import { FC } from 'react'
import Head from 'next/head'
import Messages from '@/components/messages/Messages'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Home: FC = () => {
  const { push } = useRouter()

  const handleKeyDown = (event: KeyboardEvent) => {
    event.key === 'Escape' && push('/')
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Head>
        <title>ID</title>
        <meta name="description" content="App for store telegram message history" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Messages />
    </>
  )
}

export default Home
