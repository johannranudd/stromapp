"use client";
import { useGlobalContext } from "@/app/context/context";
import { validateBadgeForm } from "@/app/utils/generics";
import { fetchUser } from "@/app/utils/gets";
import { createGroup } from "@/app/utils/posts";
import { editGroup } from "@/app/utils/puts";
import { IBadge, IUser } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CirclePicker } from "react-color";
import { AiOutlineClose } from "react-icons/ai";

export default function CreateBadgeModal() {
  const {
    groupModalIsOpen,
    setGroupModalIsOpen,
    dispatch,
    state,
    editFlag,
    setEditFlag,
    editItem,
  } = useGlobalContext();
  const [user, setUser] = useState<IUser | undefined>(undefined);
  useEffect(() => {
    if (groupModalIsOpen) {
      fetchUser(setUser);
    }
  }, [groupModalIsOpen]);

  useEffect(() => {
    fetchUser(setUser);
  }, [state]);

  if (!groupModalIsOpen) return null;
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000e2] z-[52]">
      <div className="w-[95%] h-[calc(100vh-2rem)] mt-[1rem] mx-auto max-w-[400px] flex flex-col justify-between rounded-[35px] bg-secondary text-primary">
        <div className="p-4 flex rounded-full justify-between text-xl">
          {editFlag ? <h2>Edit Group</h2> : <h2>Create Group</h2>}
          <button
            onClick={() => setGroupModalIsOpen(false)}
            className="text-3xl"
          >
            <AiOutlineClose />
          </button>
        </div>
        <CreateGroupForm
          {...user}
          setGroupModalIsOpen={setGroupModalIsOpen}
          dispatch={dispatch}
          editFlag={editFlag}
          setEditFlag={setEditFlag}
          editItem={editItem}
        />
      </div>
    </div>
  );
}

function CreateGroupForm({
  id,
  badges,
  setGroupModalIsOpen,
  dispatch,
  editFlag,
  editItem,
  setEditFlag,
}: {
  id?: number;
  badges?: Array<IBadge>;
  setGroupModalIsOpen: Dispatch<SetStateAction<boolean>>;
  dispatch: Dispatch<any>;
  editFlag: boolean;
  editItem: any;
  setEditFlag: Dispatch<SetStateAction<boolean>>;
}) {
  const [groupName, setGroupName] = useState("");
  const [color, setColor] = useState("");
  const [kwh, setKwh] = useState(0);
  const [selectedBadges, setSelectedBadges]: any = useState([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleBadgeSelection = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const badge = badges && badges[index];
    const badgeIndex = selectedBadges.findIndex((item: any) => item === badge);

    if (badgeIndex > -1) {
      setSelectedBadges((prevState: any) =>
        prevState.filter((item: any, idx: any) => idx !== badgeIndex)
      );
    } else {
      setSelectedBadges((prevState: any) => [...prevState, badge]);
    }
  };

  useEffect(() => {
    const totalKwhOfSelectedBadges = selectedBadges.reduce(
      (total: number, current: IBadge) => (total += current.kwh),
      0
    );
    setKwh(totalKwhOfSelectedBadges);
  }, [selectedBadges]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: {
      groupName: string;
      selectedBadges: Array<IBadge>;
      color: string;
      kwh: number;
    } = {
      groupName,
      selectedBadges,
      color,
      kwh,
    };
    const isValid = validateBadgeForm(formData);
    if (!isValid) {
      setErrors(["All fields must be filled out"]);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    } else if (isValid && !editFlag) {
      const res = await createGroup(formData);
      if (res.error) {
        const allErrors = res.error.details.errors.map(
          (error: any) => error.message
        );
        setErrors(allErrors);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      } else {
        setGroupModalIsOpen(false);
        dispatch({ type: "START_FETCH", payload: true });
      }
    } else if (isValid && editFlag) {
      const { name, kwh, category, color } = editItem;
      dispatch({
        type: "REMOVE_FROM_ARRAY",
        payload: { name, value: kwh, color, category, id: editItem.id },
      });
      await editGroup(formData, editItem);
      dispatch({ type: "START_FETCH", payload: true });
      setEditFlag(false);
      setGroupModalIsOpen(false);
    }
  };

  return (
    <>
      {errors.length > 0 && (
        <div className="absolute top-[10%]  w-full max-w-[400px] z-[52] flex flex-col items-center py-6 bg-red-500">
          {errors}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] h-full py-16 mx-auto flex flex-col justify-between  text-primary"
      >
        <div className="flex flex-col">
          <label htmlFor="groupName" className="text-primary">
            Group Name:
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGroupName(e.target.value)
            }
            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
              setGroupName(e.target.value)
            }
            placeholder={editFlag && editItem.name}
            className="text-secondary"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="badgeList">Select Badges:</label>
          <select
            id="badgeList"
            multiple
            value={selectedBadges.map((badge: IBadge) =>
              badges?.indexOf(badge)
            )}
            onChange={() => handleBadgeSelection}
            className="bg-primary text-secondary"
          >
            {badges?.map((badge: IBadge, index: number) => {
              const { name } = badge;
              return (
                <option
                  key={name}
                  value={index}
                  onClick={(e: any) => handleBadgeSelection(e, index)}
                >
                  <span>{name}</span>
                </option>
              );
            })}
          </select>
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
        <div className="flex flex-col text-primary">
          <p>{kwh.toFixed(1)} kwh</p>
        </div>

        <button type="submit" className="btnCtaWide2">
          Submit
        </button>
      </form>
    </>
  );
}
