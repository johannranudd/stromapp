"use client";
import { useGlobalContext } from "@/app/context/context";
import { IBadgeSimple, IGroupEdit, ITotalKWHProps } from "@/types";
import { deleteItem } from "@/app/utils/delets";
import {
  isColorLight,
  sortByLocalCategory,
  sortByLocalName,
} from "@/app/utils/generics";
import { fetchGroups, fetchUser } from "@/app/utils/gets";
import {
  IActiveToggle,
  IBadge,
  IGroup,
  IToggleProps,
  IUser,
  TDispatch,
} from "@/types";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { HiPlusSm } from "react-icons/hi";
export default function CategoriesModal() {
  const {
    modalIsOpen,
    setModalIsOpen,
    setBadgeModalIsOpen,
    setGroupModalIsOpen,
    dispatch,
    state,
    setEditFlag,
    setEditItem,
  } = useGlobalContext();
  const [user, setUser] = useState();
  useEffect(() => {
    if (modalIsOpen) fetchUser(setUser);
  }, [modalIsOpen]);

  useEffect(() => {
    fetchUser(setUser);
  }, [state]);

  function handleCreateBadge() {
    setEditItem({
      id: 0,
      name: "",
      category: "",
      color: "",
      kwh: 0,
    });
    setEditFlag(false);
    setBadgeModalIsOpen(true);
  }
  function handleCreateGroup() {
    setEditItem({
      id: 0,
      name: "",
      category: "",
      color: "",
      kwh: 0,
    });
    setEditFlag(false);
    setGroupModalIsOpen(true);
  }

  const [activeToggle, setActiveToggle] = useState<IActiveToggle>({
    groups: true,
    badges: true,
  });
  const handleToggleChange = (toggleName: string) => {
    setActiveToggle((prevToggle) => {
      const otherToggle = toggleName === "groups" ? "badges" : "groups";
      const newToggleState = {
        ...prevToggle,
        [toggleName]: !prevToggle[toggleName],
        [otherToggle]: prevToggle[toggleName] ? true : prevToggle[otherToggle],
      };

      return newToggleState;
    });
  };

  if (!modalIsOpen) return null;

  return (
    <div className="fixed top-[0] left-0 right-0 bottom-0 h-full bg-[#000000a7] z-[51]">
      <div className="w-[95%] mx-auto max-w-screen-md h-[calc(100vh-4rem)] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-between rounded-md bg-primary text-secondary dark:bg-secondary dark:text-primary z-[51]">
        <div className="py-3 px-4 flex rounded-md justify-between">
          <h2 className="text-xl">Dine grupper og enheter</h2>
          <button
            onClick={() => setModalIsOpen(false)}
            className="hover:opacity-70 duration-300"
          >
            <AiOutlineCloseCircle className="text-3xl" />
          </button>
        </div>
        <ToggleButtons
          activeToggle={activeToggle}
          handleToggleChange={handleToggleChange}
        />
        <div className="h-full p-4 overflow-y-scroll shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] ">
          {user ? (
            <ListOfGroupsAndBadges
              user={user}
              dispatch={dispatch}
              state={state}
              setEditFlag={setEditFlag}
              setBadgeModalIsOpen={setBadgeModalIsOpen}
              setGroupModalIsOpen={setGroupModalIsOpen}
              setEditItem={setEditItem}
              activeToggle={activeToggle}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="p-3 flex rounded-b-md justify-between bg-secondary text-primary">
          <button
            onClick={handleCreateBadge}
            className="bg-fourthClr text-secondary p-2  rounded-md flex justify-center items-center w-32"
          >
            Lag enhet <HiPlusSm className="mt-1" />
          </button>
          <button
            onClick={handleCreateGroup}
            className="bg-fourthClr text-secondary p-2  rounded-md flex justify-center items-center w-32"
          >
            Lag Gruppe <HiPlusSm className="mt-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleButtons({ activeToggle, handleToggleChange }: IToggleProps) {
  return (
    <div className="flex justify-between pb-2 w-full px-4 max-w-[400px] mx-auto ">
      <div className="flex flex-col items-center">
        <h4 className="pb-2">Grupper</h4>
        <label className="switch">
          <input
            type="checkbox"
            checked={activeToggle.groups}
            onChange={() => handleToggleChange("groups")}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="flex flex-col items-center">
        <h4 className="pb-2">Enheter</h4>
        <label className="switch">
          <input
            type="checkbox"
            checked={activeToggle.badges}
            onChange={() => handleToggleChange("badges")}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

function ListOfGroupsAndBadges({
  user,
  dispatch,
  state,
  setEditFlag,
  setBadgeModalIsOpen,
  setGroupModalIsOpen,
  setEditItem,
  activeToggle,
}: {
  user: IUser;
  dispatch: TDispatch;
  state: any;
  setEditFlag: Dispatch<SetStateAction<boolean>>;
  setBadgeModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setGroupModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<any>>;
  activeToggle: IActiveToggle;
}) {
  const { groups, badges } = user;

  if (badges.length === 0 && groups.length === 0)
    return (
      <div>
        Du har ingen enheter eller grupper enda.
        <br />
        Trykk på "Lag enhet" knappen for å lage en enhet.
        <br />
        Når du har flere enheter kan du samle dem i grupper.
        <br />
        Husk å gi dine grupper og enheter en god beskrivelse. <br />
        <br />
        Eksempel på enheter: Bil, Kjøleskap, Vaskemaskin osv...
        <br />
        Eksempel på grupper: Stue, Hvitevarer, kjøkken, lys osv...
      </div>
    );
  return (
    <div>
      {activeToggle.groups && (
        <Groups
          {...user}
          dispatch={dispatch}
          state={state}
          setEditFlag={setEditFlag}
          setGroupModalIsOpen={setGroupModalIsOpen}
          setEditItem={setEditItem}
        />
      )}
      {activeToggle.badges && (
        <Badges
          {...user}
          dispatch={dispatch}
          state={state}
          setEditFlag={setEditFlag}
          setBadgeModalIsOpen={setBadgeModalIsOpen}
          setEditItem={setEditItem}
        />
      )}
    </div>
  );
}

function Badges({
  badges,
  dispatch,
  state,
  setEditFlag,
  setBadgeModalIsOpen,
  setEditItem,
}: {
  badges: Array<IBadge>;
  dispatch: TDispatch;
  state: any;
  setEditFlag: Dispatch<SetStateAction<boolean>>;
  setBadgeModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<any>>;
}) {
  async function deleteAndUpdate(badge: IBadgeSimple) {
    const { id, name, kwh, category, color } = badge;
    dispatch({
      type: "REMOVE_FROM_ARRAY",
      payload: { name, value: kwh, color, category, id },
    });
    await deleteItem("badges", id);
    dispatch({ type: "START_FETCH", payload: true });
  }
  function allowEditing(badge: IBadgeSimple) {
    setEditItem(badge);
    setEditFlag(true);
    setBadgeModalIsOpen(true);
  }
  const sortedBadges = sortByLocalCategory(badges);

  if (badges.length === 0)
    return (
      <div>
        <h2 className="text-center text-lg font-bold mb-4">Enheter</h2>
        <p>Du har 0 enheter, trykk på "Lag enhet" knappen for å lage enheter</p>
      </div>
    );
  return (
    <>
      <h2 className="text-center text-lg font-bold mb-4">Enheter</h2>
      <ul className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-3 md:grid-cols-4">
        {sortedBadges.map((badge: IBadge) => {
          const { id, name, kwh, color, category } = badge;
          const hasBadgeId = state.totalKWHArray.some(
            (item: ITotalKWHProps) => {
              return item.id === id && item.name === name;
            }
          );
          const hasGoodContrast = isColorLight(color);

          return (
            <li
              key={id}
              style={{ backgroundColor: `${color}` }}
              className={`p-2 flex flex-col justify-between rounded ${
                !hasGoodContrast ? "text-primary" : "text-secondary"
              }  ${
                hasBadgeId && "border-8 border-secondary dark:border-primary"
              }`}
            >
              <div className="space-y-2">
                <h5 className="font-bold capitalize truncate">{name}</h5>
                <p>{kwh.toFixed(1)} kwh</p>
                <p className="capitalize mt-3 truncate">{category}</p>
              </div>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() =>
                    dispatch({
                      type: `${
                        !hasBadgeId ? "ADD_TO_ARRAY" : "REMOVE_FROM_ARRAY"
                      }`,
                      payload: { name, value: kwh, color, category, id },
                    })
                  }
                  className="text-lg hover:opacity-50"
                >
                  {hasBadgeId ? (
                    <AiOutlineMinusCircle />
                  ) : (
                    <AiOutlinePlusCircle />
                  )}
                </button>
                <button
                  onClick={() =>
                    allowEditing({
                      id,
                      name,
                      category,
                      color,
                      kwh,
                    })
                  }
                  className="text-lg hover:opacity-50"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() => deleteAndUpdate(badge)}
                  className="text-lg hover:opacity-50"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
//
//
//
//
function Groups({
  groups,
  dispatch,
  state,
  setEditFlag,
  setGroupModalIsOpen,
  setEditItem,
}: {
  groups: Array<IGroup>;
  dispatch: TDispatch;
  state: any;
  setEditFlag: Dispatch<SetStateAction<boolean>>;
  setGroupModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<any>>;
}) {
  const [fetchedGroups, setFetchedGroups]: any = useState();

  useEffect(() => {
    fetchGroups(setFetchedGroups);
  }, [state]);

  async function deleteAndUpdate(group: IGroup) {
    const { id, name, kwh, color } = group;
    dispatch({
      type: "REMOVE_FROM_ARRAY",
      payload: { name, value: kwh, color, id },
    });
    await deleteItem("groups", id);
    dispatch({ type: "START_FETCH", payload: true });
  }

  async function allowEditing(group: IGroupEdit) {
    setEditItem(group);
    setEditFlag(true);
    setGroupModalIsOpen(true);
  }

  const sortedGroups = sortByLocalName(groups);
  if (groups.length === 0)
    return (
      <div>
        <h2 className="text-center text-lg font-bold mb-4">Grupper</h2>
        <p>
          Du har 0 grupper, trykk på "Lag gruppe" knappen for å lage grupper
        </p>
      </div>
    );

  return (
    <>
      <h2 className="text-center text-lg font-bold mb-4">Grupper</h2>
      <ul className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-3 md:grid-cols-4">
        {sortedGroups?.map((group: IGroup) => {
          const { id, name, kwh, color } = group;
          const hasGroupId = state.totalKWHArray.some(
            (item: IGroup) => item.id === id && item.name === name
          );
          // to find out how many badges are in a group
          const filterGroups =
            fetchedGroups?.data?.filter?.((item: any) => item.id === id) || [];

          const amountOfGroups =
            filterGroups[0]?.attributes?.badges?.data?.length || 0;

          const hasGoodContrast = isColorLight(color);

          return (
            <li
              key={id}
              style={{ backgroundColor: `${color}` }}
              className={`p-2 flex flex-col justify-between rounded ${
                !hasGoodContrast ? "text-primary" : "text-secondary"
              } ${
                hasGroupId && "border-8 border-secondary dark:border-primary"
              }`}
            >
              <div className="space-y-2">
                <h5 className="font-bold capitalize truncate">{name}</h5>
                <p>{kwh.toFixed(1)} kwh</p>
                <p>
                  {amountOfGroups === 1
                    ? `${amountOfGroups} enhet`
                    : `${amountOfGroups} enheter`}
                </p>
              </div>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() =>
                    dispatch({
                      type: `${
                        !hasGroupId ? "ADD_TO_ARRAY" : "REMOVE_FROM_ARRAY"
                      }`,
                      payload: { name, value: kwh, color, id },
                    })
                  }
                  className="text-lg hover:opacity-50"
                >
                  {hasGroupId ? (
                    <AiOutlineMinusCircle />
                  ) : (
                    <AiOutlinePlusCircle />
                  )}
                </button>
                <button
                  onClick={() =>
                    allowEditing({
                      id,
                      name,
                      color,
                      amountOfGroups,
                      kwh,
                    })
                  }
                  className="text-lg hover:opacity-50"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() => deleteAndUpdate(group)}
                  className="text-lg hover:opacity-50"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
