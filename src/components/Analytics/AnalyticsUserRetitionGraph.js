/**
 * Sample for Line series
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
  LineSeries,
  DataLabel,
  Highlight,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
import { useLocation } from "react-router-dom";

export let data1 = [
  { x: "1 days", y: 27, toolTipMappingName: "1 days" },
  { x: "7 days", y: 26, toolTipMappingName: "7 days" },
  { x: "30 days", y: 48, toolTipMappingName: "30 days" },
  { x: "60 days", y: 38, toolTipMappingName: "60 days" },
  { x: "90 days", y: 27, toolTipMappingName: "90 days" },
  { x: "180 days", y: 26, toolTipMappingName: "180 days" },
  { x: "1 year", y: 68, toolTipMappingName: "1 year" },
  { x: "2 year", y: 88, toolTipMappingName: "2 year" },
];

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
    }
  };
  return (
    <div className="h-[calc(100%-28px)] w-[100%] text-white">
      <ChartComponent
        height="100%"
        id="charts"
        style={{ textAlign: "center", width: "100%" }}
        legendSettings={{ enableHighlight: true ,textStyle: { color: "white" },}}
        primaryXAxis={{
          labelIntersectAction: Browser.isDevice ? "None" : "Trim",
          labelRotation: Browser.isDevice ? -45 : 0,
          valueType: "Category",
          interval: 1,
          majorGridLines: { width: 0 },
          majorTickLines: { width: 0 },
          labelStyle: { color: "white" },
        }}
        primaryYAxis={{
          title: "User Retention Graph",
          majorTickLines: { width: 0 },
          lineStyle: { width: 0 },
          maximum: 100,
          interval: 20,
          labelStyle: { color: "white" }, // Y-axis label color
          titleStyle: { color: "white" }, // Y-axis title color
        }}
        chartArea={{ border: { width: 0 } }}
        load={load.bind(this)}
        tooltip={{
          enable: true,
          header: "<b>${point.tooltip}</b>",
          shared: true,
          textStyle: { color: "white" }, // Text color
          fill: "black", // Background color
          border: { width: 1, color: "white" }, // Border color
        }}
        width={Browser.isDevice ? "100%" : "100%"}
        title="User Retention Line Chart (%)"
        loaded={loaded.bind(this)}
        titleStyle={{ color: "white" }} 
      >
        <Inject
          services={[
            LineSeries,
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
            yName="y"
            name="Retention Streak (%)"
            type="Line"
            marker={{ visible: true, width: 10, height: 10 }}
             fill="yellow"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default AnalyticsUserRetitionGraph;
