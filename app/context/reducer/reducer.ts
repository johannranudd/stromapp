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
  badges: Array<IBadge>;
  categories: Array<ICategories>;
  totalNumber: Array<{ value: number }>;
  totalKWHArray: Array<{ name: string; value: number }>;
}

export const initialState: IState = {
  // TODO: get location from user by
  date: new Date().toISOString().slice(0, 10),
  location: 1,
  badges: [],
  categories: [],
  totalNumber: [{ value: 100 }],
  // totalNumber: [],
  totalKWHArray: [
    { name: "placeholder badge", value: 100 },
    { name: "placeholder badge 2", value: 56 },
  ],
  // totalKWHArray: [],
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
