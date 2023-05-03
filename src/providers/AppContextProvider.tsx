import React, { useState } from 'react';

import { IChat } from '@/interfaces/Chat';

import Context, { AppContextType, AppStateType } from './AppContext';


type AppContextProviderProps = {
  children: React.ReactNode;
  initChats: IChat[];
};

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children, initChats }) => {
  const [state, setState] = useState<AppStateType>({ id: null });
  const [chats, setChats] = useState<IChat[]>(initChats);
  const [showOnlySynchronizableChats, setShowOnlySynchronizableChats] = useState<boolean>(true);

  const updateChat = (updatedChat: IChat) : void => {
    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat))
    );
  }

  const contextValue: AppContextType = {
    state,
    setState,
    showOnlySynchronizableChats,
    setShowOnlySynchronizableChats,
    chats,
    updateChat,
    setChats
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default AppContextProvider;