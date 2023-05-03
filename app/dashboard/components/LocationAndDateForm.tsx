"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/context";
import { TDispatch } from "@/types";

export default function LocationAndDateForm() {
  const { state, dispatch } = useGlobalContext();
  const [location, setLocation] = useState("1");
  const [warning, setWarning] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    vaidateDashboardForm(location, date, setWarning, dispatch);
  }, [date, location]);

  return (
    <form className="w-[95%] mx-auto max-w-screen-md pb-16 flex justify-center space-x-6">
      <div className="flex flex-col">
        <label htmlFor="location">Location:</label>
        <select
          id="location"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        >
          <option value="1" defaultValue={"1"}>
            Oslo / Øst-Norge
          </option>
          <option value="2">Kristiansand / Sør-Norge</option>
          <option value="3">Trondheim / Midt-Norge</option>
          <option value="4">Tromsø / Nord-Norge</option>
          <option value="5">Bergen / Vest-Norge</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`border ${warning ? "border-red-500" : "border-black"}`}
        />
      </div>
    </form>
  );
}

//
//
//
function vaidateDashboardForm(
  location: string,
  date: string,
  setWarning: Dispatch<SetStateAction<boolean>>,
  dispatch: TDispatch
) {
  const currentDate = new Date().getTime();
  const selectedDate = new Date(date).getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (selectedDate - currentDate >= oneDay * 1) {
    setWarning(true);
    alert("Please select a date that is not more than one day ahead.");
    return;
  } else {
    setWarning(false);
    if (Number(location) > 0 && date) {
      const formData = {
        location: Number(location),
        date: date,
      };
      dispatch({ type: "START_FETCH", payload: true });
      dispatch({ type: "LOCATION_AND_DATE", payload: formData });
    }
  }
}
