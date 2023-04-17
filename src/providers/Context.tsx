import { createContext, useContext } from 'react';

export type AppStateType = { id: number | null }

export type AppContextType = {
  state: AppStateType,
  setState: React.Dispatch<React.SetStateAction<AppStateType>>
}

const AppContext = createContext<AppContextType | undefined>(undefined); 

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }

  return context;
}

export default AppContext