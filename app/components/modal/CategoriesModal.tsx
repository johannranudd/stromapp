"use client";
import { useGlobalContext } from "@/app/context/context";
import { getURL } from "@/app/utils/environment/environment";
import { getItem } from "@/app/utils/storage/localstorage";
import { useState, useEffect } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlusCircle,
} from "react-icons/ai";
export default function CategoriesModal() {
  const { modalIsOpen, setModalIsOpen, dispatch } = useGlobalContext();
  const [user, setUser] = useState();
  async function fetchUser() {
    const baseURL = getURL();
    const { id } = getItem("user");
    try {
      const res = await fetch(
        // `${baseURL}/users/${id}?populate=groups&populate=badges`
        `${baseURL}/users/${id}?populate=groups&populate=badges`
      );
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        console.log(
          res.status,
          "an error occured in CategoriesModal - fetchUser() res not ok"
        );
      }
    } catch (error) {
      console.log(
        error,
        "an error occured in CategoriesModal - fetchUser() catch block"
      );
    }
  }

  useEffect(() => {
    if (modalIsOpen) fetchUser();
  }, [modalIsOpen]);

  // let isEmpty = true;
  // if (badges.length === 0 && groups.length === 0) {
  //   isEmpty = true;
  // } else {
  //   isEmpty = false;
  // }
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
            <ListOfGroupsAndBadges user={user} dispatch={dispatch} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="p-3 flex rounded-full justify-between bg-secondary text-primary">
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-green-500 p-2 mx-2"
          >
            Create Badge +
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-green-500 p-2 mx-2"
          >
            Create Group +
          </button>
        </div>
      </div>
    </div>
  );
}

function ListOfGroupsAndBadges({ user, dispatch }: any) {
  const { groups, badges } = user;

  if (badges.length === 0 && groups.length === 0)
    return (
      <div>You have 0 badges, create badges and organize them into groups</div>
    );
  // if (!categories) return <div>Loading...</div>;
  return (
    <div>
      <Badges badges={badges} dispatch={dispatch} />
      <Groups groups={groups} />
    </div>
  );
}

function Badges({ badges, dispatch }: any) {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {badges.map((badge: any) => {
        const { id, name, kwh, categories, color, category } = badge;
        return (
          <li key={id} style={{ backgroundColor: `${color}` }} className="p-2">
            <div>
              <p>{name}</p>
              <p>{kwh} kwh</p>
            </div>
            <p>{category}</p>
            <div className="flex justify-between">
              <button
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_ARRAY",
                    payload: { name, value: kwh, color, category },
                  })
                }
              >
                <AiOutlinePlusCircle />
              </button>
              <button>
                <AiOutlineEdit />
              </button>
              <button>
                <AiOutlineDelete />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Groups({ groups }: any) {
  // console.log(groups);
  return (
    <ul>
      {/* {groups.map((group: any) => {
        const { id } = group;
        return <li key={id}>{group.name}</li>;
      })} */}
    </ul>
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
