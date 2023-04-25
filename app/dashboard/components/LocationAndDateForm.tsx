"use client";
import { useState } from "react";
import { useGlobalContext } from "@/app/context/context";

export default function LocationAndDateForm() {
  const { state, dispatch } = useGlobalContext();
  const [location, setLocation] = useState("1");
  const [warning, setWarning] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e: any) => {
    e.preventDefault();
    vaidateDashboardForm(location, date, setWarning, dispatch, state);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="location">Location:</label>
        <select
          id="location"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        >
          <option value="1" selected>
            Oslo / Øst-Norge
          </option>
          <option value="2">Kristiansand / Sør-Norge</option>
          <option value="3">Trondheim / Midt-Norge</option>
          <option value="4">Tromsø / Nord-Norge</option>
          <option value="5">Bergen / Vest-Norge</option>
        </select>
      </div>
      <div>
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
      <button type="submit">Submit</button>
    </form>
  );
}

//
//
//
function vaidateDashboardForm(
  location: any,
  date: any,
  setWarning: any,
  dispatch: any,
  state: any
) {
  const currentDate = new Date().getTime();
  const selectedDate = new Date(date).getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (selectedDate - currentDate >= oneDay * 2) {
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
      //   console.log(formData);
      //   console.log(Number(location));
      dispatch({ type: "LOCATION_AND_DATE", payload: formData });
      //   console.log("STATE:: ", state);
    }
  }
}
//
//
//
//
//
//
// function getTimeOslo(date: any) {
//   const osloTimezone = "Europe/Oslo";
//   const dateInOslo = new Date(date)
//     .toLocaleString("en-UK", {
//       timeZone: osloTimezone,
//     })
//     .slice(0, 10);
//   const officialOsloDate = dateInOslo.split("/").reverse().join("-");

//   return officialOsloDate;
// }
