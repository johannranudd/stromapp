"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/context";
import { TDispatch } from "@/types";

export default function LocationAndDateForm() {
  const { dispatch } = useGlobalContext();
  const [location, setLocation] = useState("1");
  const [warning, setWarning] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  useEffect(() => {
    validateDashboardForm(location, date, setWarning, dispatch);
  }, [date, location]);

  return (
    <form className="w-[95%] mx-auto max-w-screen-md pb-10 flex justify-center space-x-6">
      <div className="inputBox">
        <select
          required
          id="location"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          className="border border-secondary dark:border-thirdClr bg-primary text-secondary dark:bg-secondary dark:text-thirdClr cursor-pointer hover:opacity-80"
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
      <div className="inputBox">
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`border  border-secondary dark:border-thirdClr bg-primary text-secondary dark:bg-secondary dark:text-thirdClr cursor-pointer hover:opacity-80 ${
            warning ? "border-pink-900 dark:border-pink-900" : "border-black"
          }`}
        />
      </div>
    </form>
  );
}

// !works
function validateDashboardForm(
  location: string,
  date: string,
  setWarning: Dispatch<SetStateAction<boolean>>,
  dispatch: TDispatch
) {
  const norwayTimezone = "Europe/Oslo";

  const nowInOslo = new Date(
    new Date().toLocaleString("en-US", { timeZone: norwayTimezone })
  );

  let cutoff = new Date(nowInOslo.getTime());
  cutoff.setDate(cutoff.getDate() + 1);
  cutoff.setHours(14, 0, 0);

  const selectedDate = new Date(date);

  if (selectedDate > cutoff) {
    setWarning(true);
    alert(
      "You can select the next day only after 02:00pm (14:00) Norwegian time."
    );
    return;
  } else {
    setWarning(false);
    const formData = {
      location: Number(location),
      date: date,
    };
    dispatch({ type: "START_FETCH", payload: true });
    dispatch({ type: "LOCATION_AND_DATE", payload: formData });
  }
}
// !works
//
//
// !old
// function validateDashboardForm(
//   location: string,
//   date: string,
//   setWarning: Dispatch<SetStateAction<boolean>>,
//   dispatch: TDispatch
// ) {
//   const currentDate = new Date();
//   const selectedDate = new Date(date);

//   const norwayTimezone = "Europe/Oslo";
//   const currentNorwayDate = new Date(
//     currentDate.toLocaleString("nb-NO", { timeZone: norwayTimezone })
//   );
//   const selectedNorwayDate = new Date(
//     selectedDate.toLocaleString("nb-NO", { timeZone: norwayTimezone })
//   );

//   const nextDay = new Date(currentNorwayDate);
//   nextDay.setDate(nextDay.getDate() + 1);
//   nextDay.setHours(1, 0, 0, 0);

//   if (selectedNorwayDate >= nextDay) {
//     if (currentNorwayDate.getHours() < 14) {
//       setWarning(true);
//       console.log("unValid");
//       alert("You can select the next day only after 2 o'clock Norwegian time.");
//       return;
//     }
//   }
//   setWarning(false);
//   const formData = {
//     location: Number(location),
//     date: date,
//   };
//   console.log("Valid");
//   // dispatch({ type: "START_FETCH", payload: true });
//   // dispatch({ type: "LOCATION_AND_DATE", payload: formData });
// }
// !old
