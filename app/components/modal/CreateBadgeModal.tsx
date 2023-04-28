"use client";
import { useGlobalContext } from "@/app/context/context";
import { useState } from "react";
import {
  SketchPicker,
  AlphaPicker,
  BlockPicker,
  ChromePicker,
  CirclePicker,
  CompactPicker,
  GithubPicker,
  HuePicker,
  MaterialPicker,
  PhotoshopPicker,
  SliderPicker,
  SwatchesPicker,
  TwitterPicker,
} from "react-color";
//
//
//
export default function CreateBadgeModal() {
  const { badgeModalIsOpen, setBadgeModalIsOpen } = useGlobalContext();
  if (!badgeModalIsOpen) return null;
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a7] z-50">
      <div className="w-[95%] h-[95vh] mt-[2.5vh] mx-auto max-w-screen-md flex flex-col justify-between rounded-[35px] bg-secondary dark:bg-primary">
        <div className="p-4 flex rounded-full justify-between bg-secondary text-primary">
          <h2>Create Badge</h2>
          <button onClick={() => setBadgeModalIsOpen(false)}>X</button>
        </div>
        <CreateGroupForm />
      </div>
    </div>
  );
}

function CreateGroupForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("#000000");
  const [number, setNumber] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = {
      name,
      category,
      color,
      number,
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
      className="h-full flex flex-col justify-between p-6 text-primary"
    >
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={category}
        onChange={(e: any) => setCategory(e.target.value)}
      >
        <option value="">Choose a category</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      <label htmlFor="color">Color:</label>
      {/* <div className="grid grid-cols-6"> */}
      <CirclePicker
        color={color}
        onChange={handleColorChange}
        // style={{ marginLeft: 20 }}
      />
      {/* </div> */}

      <label htmlFor="number">Number:</label>
      <input
        type="number"
        id="number"
        value={number}
        onChange={(e: any) => setNumber(parseInt(e.target.value, 10))}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
