"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useReducer,
} from "react";
import { reducer, initialState } from "./reducer/reducer";

interface ContextProps {
  state: Object;
  dispatch: Dispatch<any>;
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<ContextProps>({
  state: {},
  dispatch: (): [] => [],
  menuIsOpen: false,
  setMenuIsOpen: () => false,
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{ menuIsOpen, setMenuIsOpen, state, dispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
