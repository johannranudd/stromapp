import XYChartClient from "./XYChartClient";
import InnerChartServerComponent from "./InnerChartServerComponent";
import { use, Suspense } from "react";
import { getPrices } from "@/app/utils/gets";

export default function OuterChartComponent() {
  //   const data: any = use(getPrices());
  //   if (!data) {
  //     return <div>No data</div>;
  //   } else if (data) {
  //     return <XYChartClient {...data} />;
  //   }
  return <XYChartClient />;
}
