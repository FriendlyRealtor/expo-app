import React, { ReactNode, useState, createContext } from 'react';
import { User } from './types';

export const AuthenticatedUserContext = createContext<User | undefined>({});

export const AuthenticatedUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
