/**
 * Sample for Column series
 */
import * as React from "react";
import { useEffect } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
  Highlight,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
import { useLocation } from "react-router-dom";
export let data1 = [
  { x: "1 days", y: 27, toolTipMappingName: "1 day" },
  { x: "7 days", y: 26, toolTipMappingName: "China" },
  { x: "30 days", y: 48, toolTipMappingName: "Australia" },
  { x: "60 days", y: 38, toolTipMappingName: "Australia" },
  { x: "90 days", y: 27, toolTipMappingName: "! day" },
  { x: "180 days", y: 26, toolTipMappingName: "China" },
  { x: "1 year", y: 68, toolTipMappingName: "Australia" },
  { x: "2 year", y: 88, toolTipMappingName: "Australia" },
];
// export let data2 = [
//   { x: "GBR", y: 23, toolTipMappingName: "Great Britain" },
//   { x: "CHN", y: 18, toolTipMappingName: "China" },
//   { x: "AUS", y: 11, toolTipMappingName: "Australia" },

// ];
// export let data3 = [
//   { x: "GBR", y: 17, toolTipMappingName: "Great Britain" },
//   { x: "CHN", y: 26, toolTipMappingName: "China" },
//   { x: "AUS", y: 10, toolTipMappingName: "Australia" },

// ];

const AnalyticsUserRetitionGraph = () => {
  const location = useLocation();
  const loaded = (args) => {
    let chart = document.getElementById("charts");
    chart.setAttribute("title", "");
  };
  const load = (args) => {
    let selectedTheme = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Fluent2";
    args.chart.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    )
      .replace(/-dark/i, "Dark")
      .replace(/contrast/i, "Contrast")
      .replace(/-highContrast/i, "HighContrast");
    if (selectedTheme === "highcontrast") {
      args.chart.series[0].marker.dataLabel.font.color = "#ffffff";
      args.chart.series[1].marker.dataLabel.font.color = "#000000";
      args.chart.series[2].marker.dataLabel.font.color = "#000000";
    }
  };
  return (
    <div className="h-[calc(100%-28px)]  w-[100%] text-white">
      <ChartComponent
        height="100%"
        id="charts"
        style={{ textAlign: "center", width: "100%" }}
        legendSettings={{ enableHighlight: true }}
        primaryXAxis={{
          labelIntersectAction: Browser.isDevice ? "None" : "Trim",
          labelRotation: Browser.isDevice ? -45 : 0,
          valueType: "Category",
          interval: 1,
          majorGridLines: { width: 0 },
          majorTickLines: { width: 0 },
        }}
        primaryYAxis={{
          title: "User Retetion Graph",
          majorTickLines: { width: 0 },
          lineStyle: { width: 0 },
          maximum: 100,
          interval: 20,
        }}
        chartArea={{ border: { width: 0 } }}
        load={load.bind(this)}
        tooltip={{
          enable: true,
          header: "<b>${point.tooltip}</b>",
          shared: true,
        }}
        width={Browser.isDevice ? "100%" : "100%"}
        title="Olympic Medal Counts - RIO"
        loaded={loaded.bind(this)}
      >
        <Inject
          services={[
            ColumnSeries,
            Legend,
            Tooltip,
            Category,
            DataLabel,
            Highlight,
          ]}
        />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={data1}
            tooltipMappingName="toolTipMappingName"
            xName="x"
            columnSpacing={0.1}
            yName="y"
            name="Retition Streak"
            type="Column"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};
export default AnalyticsUserRetitionGraph;
