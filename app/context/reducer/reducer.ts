export const initialState = {};

export function reducer(state: any, action: { type: string; payload?: any }) {
  switch (action.type) {
    case "TEST":
      return {
        ...state,
      };

    default: {
      return state;
    }
  }
}
