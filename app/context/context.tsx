"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useReducer,
  useEffect,
} from "react";
import { reducer, initialState } from "./reducer/reducer";

interface ContextProps {
  state: Object;
  dispatch: Dispatch<any>;
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  windowWidth: number;
  setWindowWidth: Dispatch<SetStateAction<number>>;
}

export const GlobalContext = createContext<ContextProps>({
  state: {},
  dispatch: (): [] => [],
  menuIsOpen: false,
  setMenuIsOpen: () => false,
  windowWidth: 0,
  setWindowWidth: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    } else {
      return 0;
    }
  });
  function handleResize() {
    setWindowWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  return (
    <GlobalContext.Provider
      value={{
        menuIsOpen,
        setMenuIsOpen,
        state,
        dispatch,
        windowWidth,
        setWindowWidth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
