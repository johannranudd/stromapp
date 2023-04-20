"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface ContextProps {
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<ContextProps>({
  menuIsOpen: false,
  setMenuIsOpen: () => false,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value={{ menuIsOpen, setMenuIsOpen }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
