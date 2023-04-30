"use client";
import { useGlobalContext } from "@/app/context/context";
import { deleteItem } from "@/app/utils/delets";
import { getURL } from "@/app/utils/environment/environment";
import { fetchGroups, fetchUser, fetcherClient } from "@/app/utils/gets";
import { editBadge } from "@/app/utils/puts";
import { getItem } from "@/app/utils/storage/localstorage";
import { useState, useEffect } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
export default function CategoriesModal() {
  const {
    modalIsOpen,
    setModalIsOpen,
    setBadgeModalIsOpen,
    setGroupModalIsOpen,
    dispatch,
    state,
    editFlag,
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

  if (!modalIsOpen) return null;

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a7] z-50">
      <div className="w-[95%] h-[95vh] mt-[2.5vh] mx-auto max-w-screen-md flex flex-col justify-between rounded-[35px] bg-primary dark:bg-secondary">
        <div className="p-4 flex rounded-full justify-between bg-secondary text-primary">
          <h2>Your groups and badges</h2>
          <button onClick={() => setModalIsOpen(false)}>X</button>
        </div>
        <div className="h-full p-4 bg-[#def]">
          {user ? (
            <ListOfGroupsAndBadges
              user={user}
              dispatch={dispatch}
              state={state}
              setEditFlag={setEditFlag}
              setBadgeModalIsOpen={setBadgeModalIsOpen}
              setGroupModalIsOpen={setGroupModalIsOpen}
              setEditItem={setEditItem}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="p-3 flex rounded-full justify-between bg-secondary text-primary">
          <button onClick={handleCreateBadge} className="bg-green-500 p-2 mx-2">
            Create Badge +
          </button>
          <button onClick={handleCreateGroup} className="bg-green-500 p-2 mx-2">
            Create Group +
          </button>
        </div>
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
}: any) {
  const { groups, badges } = user;

  if (badges.length === 0 && groups.length === 0)
    return (
      <div>You have 0 badges, create badges and organize them into groups</div>
    );
  return (
    <div>
      <Badges
        {...user}
        dispatch={dispatch}
        state={state}
        setEditFlag={setEditFlag}
        setBadgeModalIsOpen={setBadgeModalIsOpen}
        setEditItem={setEditItem}
      />
      <Groups
        {...user}
        dispatch={dispatch}
        state={state}
        setEditFlag={setEditFlag}
        setGroupModalIsOpen={setGroupModalIsOpen}
        setEditItem={setEditItem}
      />
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
}: any) {
  async function deleteAndUpdate(badge: any) {
    const { id, name, kwh, category, color } = badge;
    await dispatch({
      type: "REMOVE_FROM_ARRAY",
      payload: { name, value: kwh, color, category, id },
    });
    await deleteItem("badges", id);
    await dispatch({ type: "START_FETCH", payload: true });
  }
  async function allowEditing(badge: any) {
    await setEditItem(badge);
    await setEditFlag(true);
    await setBadgeModalIsOpen(true);
  }

  return (
    <>
      <h2>Badges</h2>
      <ul className="grid grid-cols-2 gap-2 mb-2">
        {badges.map((badge: any) => {
          const { id, name, kwh, categories, color, category } = badge;
          const hasBadgeId = state.totalKWHArray.some(
            (item: any) => item.id === id
          );
          return (
            <li
              key={id}
              style={{ backgroundColor: `${color}` }}
              className={`p-2 ${hasBadgeId && "border-8 border-green-500"}`}
            >
              <div>
                <p>{name}</p>
                <p>{kwh} kwh</p>
              </div>
              <p>{category}</p>
              <div className="flex justify-between">
                <button
                  onClick={() =>
                    dispatch({
                      type: `${
                        !hasBadgeId ? "ADD_TO_ARRAY" : "REMOVE_FROM_ARRAY"
                      }`,
                      payload: { name, value: kwh, color, category, id },
                    })
                  }
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
                >
                  <AiOutlineEdit />
                </button>
                <button onClick={() => deleteAndUpdate(badge)}>
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

function Groups({
  badges,
  groups,
  dispatch,
  state,
  setEditFlag,
  setGroupModalIsOpen,
  setEditItem,
}: any) {
  const [fetchedGroups, setFetchedGroups]: any = useState();
  // console.log(badges);

  useEffect(() => {
    fetchGroups(setFetchedGroups);
  }, [state]);

  async function deleteAndUpdate(group: any) {
    const { id, name, kwh, category, color } = group;
    await dispatch({
      type: "REMOVE_FROM_ARRAY",
      payload: { name, value: kwh, color, category, id },
    });
    await deleteItem("groups", id);
    await dispatch({ type: "START_FETCH", payload: true });
  }

  async function allowEditing(group: any) {
    // console.log(group);
    await setEditItem(group);
    await setEditFlag(true);
    await setGroupModalIsOpen(true);
  }
  if (!groups) return null;
  if (groups && groups.length === 0) return null;
  return (
    <>
      <h2>Groups</h2>
      <ul className="grid grid-cols-2 gap-2 mb-2">
        {groups?.map((group: any) => {
          const { id, name, kwh, categories, color, category } = group;
          const hasGroupId = state.totalKWHArray.some(
            (item: any) => item.id === id
          );
          const filter = fetchedGroups?.data.filter(
            (item: any) => item.id === id
          );
          const amountOfGroups =
            filter && filter[0].attributes.badges.data.length + 1;

          return (
            <li
              key={id}
              style={{ backgroundColor: `${color}` }}
              className={`p-2 ${hasGroupId && "border-8 border-green-500"}`}
            >
              <div>
                <p>{name}</p>
                <p>{kwh} kwh</p>
                <p>
                  {amountOfGroups === 1
                    ? `${amountOfGroups} group`
                    : `${amountOfGroups} groups`}
                </p>
              </div>
              <p>{category}</p>
              <div className="flex justify-between">
                <button
                  onClick={() =>
                    dispatch({
                      type: `${
                        !hasGroupId ? "ADD_TO_ARRAY" : "REMOVE_FROM_ARRAY"
                      }`,
                      payload: { name, value: kwh, color, id },
                    })
                  }
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
                >
                  <AiOutlineEdit />
                </button>
                <button onClick={() => deleteAndUpdate(group)}>
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

// async function fetchGroupsAndBadges(
//   name: string,
//   id: string = "",
//   populate: string = ""
// ) {
//   const baseURL = getURL();
//   const res = await fetch(`${baseURL}/${name}/${id}${populate}`);
//   const data = await res.json();
// const newData: any = [];
// data.data.map((item: any) => {
//   const { id, attributes } = item;
//   newData.push({ id: id, ...attributes });
// });
//   // *artificially adjust
//   // if (name === "badges") setBadges(newData);
//   if (name === "badges") setBadges([]);
//   if (name === "groups") {
//     let finalArray: any = [];
//     newData.map((item: any) => {
//       let badgesArray: any = [];
//       item.badges.data.map((badge: any) => {
//         const { id, attributes } = badge;
//         badgesArray.push({ id: id, ...attributes });
//       });
//       finalArray.push({ ...item, badgesArray });
//     });
//     // setGroups(finalArray);
//     // *artificially adjust
//     setGroups([]);
//   }
// }
