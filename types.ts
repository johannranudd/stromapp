// interface ICategories {
//   id: number;
//   attributes: {
//     name: string;
//     kwh: number;
//     badges: Array<IBadge>;
//   };
// }

export interface IBadge {
  category: string;
  color: string;
  createdAt: string;
  id: number;
  kwh: number;
  name: string;
  publishedAt: string;
  updatedAt: string;
}

export interface IBadgeSimple {
  id: number;
  name: string;
  category: string;
  color: string;
  kwh: number;
}

export interface IGroup {
  color: string;
  id: number;
  name: string;
  kwh: number;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}
export interface IUser {
  id: number;
  username: string;
  email: string;
  address: string;
  phoneNumber: string;
  allowNotifications: boolean;
  notificationLimit: number;
  groups: Array<IGroup>;
  badges: Array<IBadge>;
}
export interface ITotalKWHProps {
  name: string;
  value: number;
  color: string;
  id: number;
}

interface Action {
  type: string;
  payload?: any;
}

export type TDispatch = (action: Action) => void;

export interface IState {
  date: string;
  location: number;
  selectedHours: Array<number>;
  startFetch: boolean;
  badges: Array<IBadge>;
  totalNumber: Array<{ value: number }>;
  totalKWHArray: Array<DonutDataItem>;
}
export interface IGroupEdit {
  amountOfGroups: number;
  color: string;
  id: number;
  kwh: number;
  name: string;
}
// export interface IGlobalContext extends IState {}

// export type TSetBadgeModalIsOpen = (isOpen: boolean) => void;
// export type TSetGroupModalIsOpen = (isOpen: boolean) => void;
// export type TSetEditItem = (isOpen: boolean) => void;

// export interface AppState {
//   badgeModalIsOpen: boolean;
//   dispatch: () => void;
//   editFlag: boolean;
//   editItem: {
//     category: string;
//     color: string;
//     id: number;
//     kwh: number;
//     name: string;
//   };
//   groupModalIsOpen: boolean;
//   menuIsOpen: boolean;
//   modalIsOpen: boolean;
//   setBadgeModalIsOpen: (isOpen: boolean) => void;
//   setEditFlag: (flag: boolean) => void;
//   setEditItem: (item: any) => void;
//   setGroupModalIsOpen: (isOpen: boolean) => void;
//   setMenuIsOpen: (isOpen: boolean) => void;
//   setModalIsOpen: (isOpen: boolean) => void;
//   setWindowWidth: (width: number) => void;
//   state: {
//     badges: any[];
//     date: string;
//     location: number;
//     selectedHours: number[];
//     startFetch: boolean;
//     totalKWHArray: any[];
//     totalNumber: any[];
//   };
//   windowWidth: number;
// }

// export interface DataWrapper {
//   [key: number]: IDataFromAPI;
// }

export interface IDataFromAPI {
  0: {
    averagePriceMonthlyToDate: number;
    dailyPriceArray: number[];
    dailyPriceAverage: number;
    dailyPriceMax: number;
    dailyPriceMin: number;
    date: string;
    estimatedPowerSupportToDate: number;
    region: number;
    __v: number;
    _id: string;
  };
}

export interface DateTimeFormatOptions {
  timeZone: string;
  hour12: boolean;
  hour: "numeric" | "2-digit";
  minute: "numeric" | "2-digit";
  second: "numeric" | "2-digit";
}
export interface DonutDataItem {
  name: string;
  value: number;
}

export interface IPriceAndTime {
  priceInOre: number;
  hour: string;
}

interface ITooltipPayload {
  chartType?: undefined;
  color: string;
  dataKey: string;
  fill?: string;
  fillOpacity: number;
  formatter?: undefined;
  name: string;
  payload: {
    hour: string;
    PriceInOre: number;
  };
  stroke: string;
  type?: undefined;
  unit?: undefined;
  value?: number;
}

export interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: Array<ITooltipPayload>;
}

export interface ICustomToolTip {
  active: boolean;
  payload: Array<ITooltipPayload>;
  label: string;
}

export interface IActiveToggle {
  groups: boolean;
  badges: boolean;
  [key: string]: boolean;
}

export interface IToggleProps {
  activeToggle: {
    groups: boolean;
    badges: boolean;
  };
  handleToggleChange: (toggleName: string) => void;
}
