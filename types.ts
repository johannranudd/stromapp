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
export interface IGroup {
  color: string;
  id: number;
  name: string;
  kwh: number;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

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

export interface ICustomToolTip {
  active: boolean;
  payload: Array<ITooltipPayload>;
  label: string;
}
export interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: Array<ITooltipPayload>;
}
