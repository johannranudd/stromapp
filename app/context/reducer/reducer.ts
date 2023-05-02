import { Dispatch, SetStateAction } from "react";

interface IBadge {
  id: number;
  attributes: {
    name: string;
    kwh: number;
  };
}
interface ICategories {
  id: number;
  attributes: {
    name: string;
    kwh: number;
    badges: Array<IBadge>;
  };
}

export interface IState {
  date: string;
  location: number;
  selectedHours: Array<number>;
  startFetch: boolean;
  badges: Array<IBadge>;
  categories: Array<ICategories>;
  // totalNumber: number;
  // setTotalNumber: Dispatch<SetStateAction<number>>;
  totalNumber: Array<{ value: number }>;
  // setTotalNumber: Dispatch<SetStateAction<Array<{ value: number }>>>;
  totalKWHArray: Array<{ name: string; value: number }>;
}

export const initialState: IState = {
  // TODO: get location from user by
  date: new Date().toISOString().slice(0, 10),
  location: 1,
  selectedHours: [0, 24],
  startFetch: false,
  badges: [],
  categories: [],
  // totalNumber: [{ value: 100 }],
  // totalNumber: 0,
  // setTotalNumber: () => 0,
  totalNumber: [],
  // setTotalNumber: () => {},
  totalKWHArray: [],
  // totalKWHArray: [
  //   { name: "placeholder badge", value: 3.3 },
  //   { name: "placeholder badge 2", value: 1.2 },
  // ],
};

export function reducer(state: any, action: { type: string; payload?: any }) {
  switch (action.type) {
    case "LOCATION_AND_DATE":
      const { location, date } = action.payload;
      return {
        ...state,
        date,
        location,
      };
    case "CHANGE_KWH":
      return {
        ...state,
        totalNumber: [{ ...action.payload }],
      };
    case "SET_SELECTED_HOURS":
      return {
        ...state,
        selectedHours: action.payload,
      };
    case "START_FETCH":
      return {
        ...state,
        startFetch: action.payload,
      };
    case "ADD_TO_ARRAY":
      // check if already has
      const hasDuplicate = state.totalKWHArray.some(
        (item: any) =>
          item.id === action.payload.id && item.name === action.payload.name
      );
      if (!hasDuplicate) {
        return {
          ...state,
          totalKWHArray: [...state.totalKWHArray, action.payload],
        };
      } else {
        return { ...state };
      }
    case "REMOVE_FROM_ARRAY":
      const filter = state.totalKWHArray.filter((item: any) => {
        return item.name !== action.payload.name;
      });
      return {
        ...state,
        totalKWHArray: filter,
      };
    case "ALLOW_EDITING":
      console.log(action.payload);
      return {
        ...state,
      };

    default: {
      return state;
    }
  }
}

// "attributes": {
//     "name": "testCategory by Ola",
//     "badges": {
//         "data": [
//             {
//                 "id": 53,
//                 "attributes": {
//                     "name": "Tørketrommel",
//                     "kwh": 3.5,
//                     "createdAt": "2023-04-23T23:58:46.325Z",
//                     "updatedAt": "2023-04-23T23:58:46.325Z",
//                     "publishedAt": "2023-04-23T23:58:46.323Z"
//                 }
//             },
//         ]
//     }
// }
