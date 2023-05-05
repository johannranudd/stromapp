import { IState } from "@/types";

export const initialState: IState = {
  // TODO: get location from user by
  date: new Date().toISOString().slice(0, 10),
  location: 1,
  selectedHours: [0, 24],
  startFetch: false,
  badges: [],
  totalNumber: [],
  totalKWHArray: [],
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
