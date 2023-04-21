"use client";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { defaultStyles, useTooltip, TooltipWithBounds } from "@visx/tooltip";
import useMeasure from "react-use-measure";
import { extent } from "d3-array";
import { scaleTime } from "@visx/scale";
import { getPrices } from "@/app/utils/gets";

type DataPoint = [number, number];

const getXValue = (d: DataPoint) => new Date(d[0]);
const getYValue = (d: DataPoint) => d[1];

const tooltipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  background: "#161434",
  color: "#ADADD3",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
};

export default function XYChartClient() {
  // data: any
  // console.log("XYChartClient has been mounted");
  // console.log(data);

  // const { data, error, isLoading } = useQuery<DataPoint>("prices", getPrices);
  // console.log(data);
  // const [ref, bounds] = useMeasure();
  const queryClient = new QueryClient();
  // const {
  //   showTooltip,
  //   hideTooltip,
  //   tooltipData,
  //   tooltipLeft = 0,
  //   tooltipTop = 0,
  // } = useTooltip<DataPoint>();

  // const width = bounds.width || 100;
  // const height = bounds.height || 100;

  // const xScale = scaleTime({
  //   range: [0, width],
  //   domain: extent(data, getXValue) as [Date, Date],
  // });
  //
  //
  //
  //
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center items-center h-full w-full p-4 bg-[#2c2b5a]">
        <div className="w-[600px] min-w-[300px] h-[300px] rounded-md overflow-hidden bg-[#201d47">
          {/* INNER CHART */}
          <InnerChart />
          {/* INNER CHART */}
        </div>
      </div>
    </QueryClientProvider>
  );
}

function InnerChart() {
  const { data, error, isLoading } = useQuery<DataPoint>("prices", getPrices);
  console.log(data);
  const [ref, bounds] = useMeasure();

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<DataPoint>();

  const width = bounds.width || 100;
  const height = bounds.height || 100;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}></svg>
  );
}

// const width = "100%";
// const height = "100%";
// console.log(`0 0 ${width} ${height}`);
