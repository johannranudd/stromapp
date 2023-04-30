"use client";
import { useGlobalContext } from "@/app/context/context";
import { validateBadgeForm } from "@/app/utils/generics";
import { fetchUser } from "@/app/utils/gets";
import { createGroup } from "@/app/utils/posts";
import { editGroup } from "@/app/utils/puts";
import { useEffect, useState } from "react";
import { CirclePicker } from "react-color";

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
  const [user, setUser]: any = useState();
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
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000e2] z-50">
      <div className="w-[95%] h-[95vh] mt-[2.5vh] mx-auto max-w-[400px] flex flex-col justify-between rounded-[35px] bg-secondary dark:bg-primary">
        <div className="p-4 flex rounded-full justify-between bg-secondary text-primary">
          {editFlag ? <h2>Edit Group</h2> : <h2>Create Group</h2>}
          <button onClick={() => setGroupModalIsOpen(false)}>X</button>
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
}: any) {
  const [groupName, setGroupName] = useState("");
  const [color, setColor] = useState("");
  const [kwh, setKwh] = useState<number>(0);
  const [selectedBadges, setSelectedBadges] = useState([]);

  const handleBadgeSelection = (e: any) => {
    const options = e.target.options;
    const selected: any = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        const badgeIndex = parseInt(options[i].value);
        selected.push(badges[badgeIndex]);
      }
    }

    setSelectedBadges(selected);
  };

  useEffect(() => {
    const totalKwhOfSelectedBadges = selectedBadges.reduce(
      (total: any, current: any) => (total += current.kwh),
      0
    );
    setKwh(totalKwhOfSelectedBadges);
  }, [selectedBadges]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData: any = {
      groupName,
      selectedBadges,
      color,
      kwh,
      // user: id,
    };
    const isValid = validateBadgeForm(formData);

    if (isValid && !editFlag) {
      await createGroup(formData);
      await setGroupModalIsOpen(false);
      await dispatch({ type: "START_FETCH", payload: true });
    } else if (isValid && editFlag) {
      const { name, kwh, category, color } = editItem;
      await dispatch({
        type: "REMOVE_FROM_ARRAY",
        payload: { name, value: kwh, color, category, id: editItem.id },
      });
      await editGroup(formData, editItem);
      await dispatch({ type: "START_FETCH", payload: true });
      await setEditFlag(false);
      await setGroupModalIsOpen(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full py-20 mx-auto flex flex-col justify-between  text-primary"
    >
      <div className="flex flex-col">
        <label htmlFor="groupName" className="text-primary">
          Group Name:
        </label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e: any) => setGroupName(e.target.value)}
          onBlur={(e: any) => setGroupName(e.target.value)}
          placeholder={editFlag && editItem.name}
          className="text-secondary"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="badgeList" className="text-primary">
          Select Badges:
        </label>
        <select
          id="badgeList"
          multiple
          value={selectedBadges.map((badge) => badges.indexOf(badge))}
          onChange={handleBadgeSelection}
          className="text-secondary"
        >
          {badges?.map((badge: any, index: number) => {
            const { name } = badge;
            return (
              <option key={name} value={index}>
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
        <p>{kwh} kwh</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
