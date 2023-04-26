import React, { useState } from 'react';

import Context, { AppContextType, AppStateType } from './Context';

type AppContextProviderProps = {
  children: React.ReactNode;
};

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppStateType>({ id: null });

  const contextValue: AppContextType = {
    state,
    setState,
  };

  return (
    <
    Context.Provider value={contextValue}>
      {children}
    </
  Context.Provider>
  );
};

export default AppContextProvider;