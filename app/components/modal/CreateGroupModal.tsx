"use client";
import { useGlobalContext } from "@/app/context/context";
import { useState } from "react";
import { CirclePicker } from "react-color";

export default function CreateGroupModal() {
  const { groupModalIsOpen, setGroupModalIsOpen } = useGlobalContext();
  if (!groupModalIsOpen) return null;
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000e2] z-50">
      <div className="w-[95%] h-[95vh] mt-[2.5vh] mx-auto max-w-[400px] flex flex-col justify-between rounded-[35px] bg-secondary dark:bg-primary">
        <div className="p-4 flex rounded-full justify-between bg-secondary text-primary">
          <h2>Create Group</h2>
          <button onClick={() => setGroupModalIsOpen(false)}>X</button>
        </div>
        <CreateGroupForm />
      </div>
    </div>
  );
}

function CreateGroupForm() {
  const [badgeName, setBadgeName] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("#000000");
  const [kwh, setKwh] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = {
      badgeName,
      category,
      color,
      kwh,
    };
    console.log("Form data:", formData);
  };

  const handleColorChange = (color: any) => {
    // console.log(color.hex);
    setColor(color.hex);
  };

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
          className="text-secondary"
        />
      </div>
      <div className="flex flex-col">
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
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
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
          onChange={(e: any) => setKwh(parseInt(e.target.value, 10))}
          className="text-secondary"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
