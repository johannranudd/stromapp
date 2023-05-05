"use client";
import { useGlobalContext } from "@/app/context/context";
import { getUniqueBadgeArray, validateBadgeForm } from "@/app/utils/generics";
import { fetchUser } from "@/app/utils/gets";
import { createBadge } from "@/app/utils/posts";
import { editBadge } from "@/app/utils/puts";
import { IBadge, IUser, TDispatch } from "@/types";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { CirclePicker } from "react-color";
import { AiOutlineClose } from "react-icons/ai";
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
    editItem,
  } = useGlobalContext();
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    if (badgeModalIsOpen) {
      fetchUser(setUser);
    }
  }, [badgeModalIsOpen]);

  useEffect(() => {
    fetchUser(setUser);
  }, [state]);

  if (!badgeModalIsOpen) return null;
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000e2] z-[52]">
      <div className="w-[95%] h-[calc(100vh-2rem)] mt-[1rem] mx-auto max-w-[400px] flex flex-col justify-between rounded-[35px] bg-secondary text-primary">
        <div className="p-4 flex rounded-full justify-between text-xl">
          {editFlag ? <h2>Edit Badge</h2> : <h2>Create Badge</h2>}
          <button
            onClick={() => setBadgeModalIsOpen(false)}
            className="text-3xl"
          >
            <AiOutlineClose />
          </button>
        </div>
        <CreateBadgeForm
          {...user}
          setBadgeModalIsOpen={setBadgeModalIsOpen}
          dispatch={dispatch}
          editFlag={editFlag}
          setEditFlag={setEditFlag}
          editItem={editItem}
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
  editItem,
  setEditFlag,
}: {
  id?: number;
  badges?: Array<IBadge>;
  setBadgeModalIsOpen: Dispatch<SetStateAction<boolean>>;
  dispatch: Dispatch<any>;
  editFlag: boolean;
  editItem: any;
  setEditFlag: Dispatch<SetStateAction<boolean>>;
}) {
  const [badgeName, setBadgeName] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [kwh, setKwh] = useState<number>();
  const [uniqueArrayOfBadges, setUniqueArrayOfBadges] = useState([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: {
      badgeName: string;
      category: string;
      color: string;
      kwh: undefined | number;
      user: undefined | number;
    } = {
      badgeName,
      category,
      color,
      kwh,
      user: id,
    };
    const isValid = validateBadgeForm(formData);
    if (!isValid) {
      setErrors(["All fields must be filled out"]);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    } else if (isValid && !editFlag) {
      const res = await createBadge(formData);
      if (res.error) {
        const allErrors = res.error.details.errors.map(
          (error: any) => error.message
        );
        setErrors(allErrors);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      } else {
        setBadgeModalIsOpen(false);
        dispatch({ type: "START_FETCH", payload: true });
      }
    } else if (isValid && editFlag) {
      const { name, kwh, category, color } = editItem;
      dispatch({
        type: "REMOVE_FROM_ARRAY",
        payload: { name, value: kwh, color, category, id: editItem.id },
      });
      await editBadge(formData, editItem);
      dispatch({ type: "START_FETCH", payload: true });
      setEditFlag(false);
      setBadgeModalIsOpen(false);
    }
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
        (badge: IBadge) => badge.category === category && setColor(badge.color)
      );
    }
  }, [category]);

  return (
    <>
      {errors.length > 0 && (
        <div className="absolute top-[10%]  w-full max-w-[400px] z-[52] flex flex-col items-center py-6 bg-red-500">
          {errors.map((item: any) => {
            return <p>{item}</p>;
          })}
        </div>
      )}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBadgeName(e.target.value)
            }
            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
              setBadgeName(e.target.value)
            }
            placeholder={editFlag && editItem.name}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCategory(e.target.value)
            }
            placeholder={editFlag && editItem.category}
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
                {uniqueArrayOfBadges?.map((badge: IBadge) => {
                  const { category } = badge;
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
            onChange={(color) => setColor(color.hex)}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                setKwh(value);
              }
            }}
            step="0.1"
            placeholder={editFlag && editItem.kwh}
            className="text-secondary"
          />
        </div>
        <button type="submit" className="btnCtaWide2">
          Submit
        </button>
      </form>
    </>
  );
}
