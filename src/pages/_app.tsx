import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import { IChat } from '@/interfaces/Chat'
import AppContextProvider from '@/providers/AppContextProvider'

interface AppPropsWithInitialChats extends AppProps {
  initChats: IChat[];
}

export default function App({ Component, pageProps }: AppPropsWithInitialChats) {
  return <AppContextProvider initChats={pageProps.chats }>
    <Component {...pageProps} />
  </AppContextProvider>
}
