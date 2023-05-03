import { createContext, useContext } from 'react';

export type AppStateType = { id: number | null }

import { IChat } from '@/interfaces/Chat';

export type AppContextType = {
  state: AppStateType
  setState: React.Dispatch<React.SetStateAction<AppStateType>>
  showOnlySynchronizableChats: boolean
  setShowOnlySynchronizableChats: React.Dispatch<React.SetStateAction<boolean>>
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