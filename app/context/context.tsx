"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
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
import { getItem, setItem } from "../utils/storage/localstorage";
import { redirectToLoginPage } from "../utils/generics";

interface ContextProps {
  state: Object;
  dispatch: Dispatch<any>;
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  badgeModalIsOpen: boolean;
  setBadgeModalIsOpen: Dispatch<SetStateAction<boolean>>;
  groupModalIsOpen: boolean;
  setGroupModalIsOpen: Dispatch<SetStateAction<boolean>>;
  editFlag: boolean;
  setEditFlag: Dispatch<SetStateAction<boolean>>;
  editItem: {
    id: number;
    name: string;
    category: string;
    color: string;
    kwh: number;
  };
  setEditItem: Dispatch<
    SetStateAction<{
      id: number;
      name: string;
      category: string;
      color: string;
      kwh: number;
    }>
  >;

  windowWidth: number;
  setWindowWidth: Dispatch<SetStateAction<number>>;
}

export const GlobalContext = createContext<ContextProps>({
  state: {},
  dispatch: (): [] => [],
  menuIsOpen: false,
  setMenuIsOpen: () => false,
  modalIsOpen: false,
  setModalIsOpen: () => false,
  badgeModalIsOpen: false,
  setBadgeModalIsOpen: () => false,
  groupModalIsOpen: false,
  setGroupModalIsOpen: () => false,
  editFlag: false,
  setEditFlag: () => false,
  editItem: {
    id: 0,
    name: "",
    category: "",
    color: "",
    kwh: 0,
  },
  setEditItem: () => {},
  windowWidth: 0,
  setWindowWidth: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [badgeModalIsOpen, setBadgeModalIsOpen] = useState(false);
  const [groupModalIsOpen, setGroupModalIsOpen] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [editItem, setEditItem] = useState({
    id: 0,
    name: "",
    category: "",
    color: "",
    kwh: 0,
  });
  const [state, dispatch] = useReducer(reducer, initialState);

  // resize
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

  // redirection
  const pathname = usePathname();
  useEffect(() => {
    redirectToLoginPage(pathname);
  }, [pathname]);

  // useEffect(() => {
  //   console.log("STATE FROM CONTEXT:: ", state);
  // }, [state]);

  // TESTING DOUBLE QUOTES
  return (
    <GlobalContext.Provider
      value={{
        menuIsOpen,
        setMenuIsOpen,
        modalIsOpen,
        setModalIsOpen,
        badgeModalIsOpen,
        setBadgeModalIsOpen,
        groupModalIsOpen,
        setGroupModalIsOpen,
        editFlag,
        setEditFlag,
        editItem,
        setEditItem,
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
