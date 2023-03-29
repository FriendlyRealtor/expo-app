import React, { ReactNode, useState, createContext } from 'react';

export const AuthenticatedUserContext = createContext({});

export type User = {

}

export const AuthenticatedUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
