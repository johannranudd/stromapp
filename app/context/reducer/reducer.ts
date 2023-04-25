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

interface IState {
  date: string;
  location: number;
  kwh: number;
  badges: Array<IBadge>;
  categories: Array<ICategories>;
}

export const initialState: IState = {
  // TODO: get location from user by default
  date: new Date().toISOString().slice(0, 10),
  location: 1,
  kwh: 0,
  badges: [],
  categories: [],
};

export function reducer(state: any, action: { type: string; payload?: any }) {
  switch (action.type) {
    case "LOCATION_AND_DATE":
      const { location, date } = action.payload;
      // console.log("ACTION.PAYLOAD:: ", action.payload);
      // console.log(location);
      // console.log(date);
      return {
        ...state,
        date,
        location,
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
