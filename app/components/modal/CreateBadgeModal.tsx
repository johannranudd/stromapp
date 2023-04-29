"use client";
import { useGlobalContext } from "@/app/context/context";
import { getUniqueBadgeArray, validateBadgeForm } from "@/app/utils/generics";
import { fetchUser } from "@/app/utils/gets";
import { createBadge } from "@/app/utils/posts";
import { editBadge } from "@/app/utils/puts";
import { useState, useEffect } from "react";
import { CirclePicker } from "react-color";
//
//
//
export default function CreateBadgeModal() {
  const {
    badgeModalIsOpen,
    setBadgeModalIsOpen,
    dispatch,
    state,
    editFlag,
    setEditFlag,
    editId,
  } = useGlobalContext();
  const [user, setUser]: any = useState();
  useEffect(() => {
    if (badgeModalIsOpen) {
      fetchUser(setUser);
    }
  }, [badgeModalIsOpen]);

  useEffect(() => {
    // const { startFetch }: any = state;
    // if (startFetch)
    fetchUser(setUser);
  }, [state]);

  //   console.log(user);

  if (!badgeModalIsOpen) return null;
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000e2] z-50">
      <div className="w-[95%] h-[95vh] mt-[2.5vh] mx-auto max-w-[400px] flex flex-col justify-between rounded-[35px] bg-secondary dark:bg-primary">
        <div className="p-4 flex rounded-full justify-between bg-secondary text-primary">
          {editFlag ? <h2>Edit Badge</h2> : <h2>Create Badge</h2>}
          <button onClick={() => setBadgeModalIsOpen(false)}>X</button>
        </div>
        <CreateBadgeForm
          {...user}
          setBadgeModalIsOpen={setBadgeModalIsOpen}
          dispatch={dispatch}
          editFlag={editFlag}
          setEditFlag={setEditFlag}
          editId={editId}
        />
      </div>
    </div>
  );
}

function CreateBadgeForm({
  id,
  badges,
  setBadgeModalIsOpen,
  dispatch,
  editFlag,
  editId,
  setEditFlag,
}: any) {
  const [badgeName, setBadgeName] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [kwh, setKwh] = useState(0);
  const [uniqueArrayOfBadges, setUniqueArrayOfBadges]: any = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData: any = {
      badgeName,
      category,
      color,
      kwh,
      user: id,
    };
    const isValid = validateBadgeForm(formData);
    if (isValid && !editFlag) {
      await createBadge(formData);
      await setBadgeModalIsOpen(false);
      await dispatch({ type: "START_FETCH", payload: true });
    } else if (isValid && editFlag) {
      //   console.log(editId);
      await editBadge(formData, editId);
      await dispatch({ type: "START_FETCH", payload: true });
      await setEditFlag(false);
      await setBadgeModalIsOpen(false);
      //   setBadgeModalIsOpen(false);
      //   console.log("EDITING");
    }
    // dispatch({ type: "START_FETCH", payload: true });
  };

  const handleColorChange = (color: any) => {
    setColor(color.hex);
  };

  useEffect(() => {
    if (!badges || badges.length === 0) {
    } else {
      const uniqueArray = getUniqueBadgeArray(badges);
      setUniqueArrayOfBadges(uniqueArray);
    }
  }, [badges]);

  useEffect(() => {
    if (uniqueArrayOfBadges) {
      uniqueArrayOfBadges.findIndex(
        (badge: any) => badge.category === category && setColor(badge.color)
      );
    }
  }, [category]);

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full py-20 mx-auto flex flex-col justify-between  text-primary"
    >
      <div className="flex flex-col">
        <label htmlFor="badgeName" className="text-primary">
          Badge Name:
        </label>
        <input
          type="text"
          id="badgeName"
          value={badgeName}
          onChange={(e: any) => setBadgeName(e.target.value)}
          onBlur={(e: any) => setBadgeName(e.target.value)}
          className="text-secondary"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="category" className="text-primary">
          Category:
        </label>
        <input
          list="categories"
          id="category"
          value={category}
          onChange={(e: any) => setCategory(e.target.value)}
          className="text-secondary"
        />
        <datalist id="categories">
          {!uniqueArrayOfBadges || uniqueArrayOfBadges.length === 0 ? (
            <>
              <option value="Appliances">Appliances</option>
              <option value="Heating">Heating</option>
              <option value="Lighting">Lighting</option>
            </>
          ) : (
            <>
              <option value="Appliances">Appliances</option>
              <option value="Heating">Heating</option>
              <option value="Lighting">Lighting</option>
              {uniqueArrayOfBadges?.map((badge: any) => {
                const { category, color } = badge;
                return <option value={category}>{category}</option>;
              })}
            </>
          )}
        </datalist>
      </div>

      <div className="flex flex-col">
        <label htmlFor="color" className="text-primary">
          Color:
        </label>
        <CirclePicker
          className="colorpicker"
          color={color}
          onChange={handleColorChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="kwh" className="text-primary">
          kwh:
        </label>
        <input
          type="number"
          id="kwh"
          value={kwh}
          onChange={(e: any) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
              setKwh(value);
            }
          }}
          step="0.1"
          className="text-secondary"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

// !OLD
{
  /* <div className="flex flex-col">
        <label htmlFor="category" className="text-primary">
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e: any) => setCategory(e.target.value)}
          className="text-secondary"
        >
          <option value="">Choose a category</option>
          {uniqueArrayOfBadges.length >= 1 ? (
            uniqueArrayOfBadges?.map((badge: any) => {
              const { category, color } = badge;
              return <option value={category}>{category}</option>;
            })
          ) : (
            <>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </>
          )}
        </select>
      </div> */
}
