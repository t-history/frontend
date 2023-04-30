import { createContext, useContext } from 'react';


import { IChat } from '@/interfaces/Chat';

export type AppStateType = { chat: IChat | null }

export type AppContextType = {
  state: AppStateType
  setState: React.Dispatch<React.SetStateAction<AppStateType>>
  chats: IChat[]
  updateChat: (updatedChat: IChat) => void,
  setChats: React.Dispatch<React.SetStateAction<IChat[]>>
}

const AppContext = createContext<AppContextType | undefined>(undefined); 

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }

  return context;
}

export default AppContext