import * as echarts from "echarts/core";

import {
  // BarChart,
  // PieChart,
  // MapChart,
  // PictorialBarChart,
  // RadarChart,
  // ScatterChart,
  LineChart,
  GraphChart
} from "echarts/charts";

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent
  // GraphicComponent
  // PolarComponent,
  // AriaComponent,
  // ParallelComponent,
  // RadarComponent,
  // DataZoomComponent,
  // VisualMapComponent,
  // TimelineComponent,
  // CalendarComponent,
} from "echarts/components";

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  GraphChart,
  ToolboxComponent
  // PolarComponent,
  // AriaComponent,
  // ParallelComponent,
  // BarChart,
  // PieChart,
  // MapChart,
  // RadarChart,
  // PictorialBarChart,
  // ScatterChart,
  // DataZoomComponent,
  // RadarComponent,
  // VisualMapComponent,
  // TimelineComponent,
  // CalendarComponent,
  // GraphicComponent
]);

export default echarts;
