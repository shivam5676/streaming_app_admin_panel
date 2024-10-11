import * as React from "react";
import { useEffect } from "react";
import { Browser } from "@syncfusion/ej2-base";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  AccumulationAnnotation,
  AccumulationDataLabel,
  AccumulationAnnotationDirective,
  AccumulationAnnotationsDirective,
} from "@syncfusion/ej2-react-charts";
const chartData = [
  { x: "Operations", y: 30.0, text: "30.0%" },
  { x: "Miscellaneous", y: 10.0, text: "10.0%" },
  { x: "Human Resources", y: 15.0, text: "15.0%" },
  { x: "Research and Development", y: 20.0, text: "20.0%" },
  { x: "Marketing", y: 25.0, text: "25.0%" },
];
const onPointRender = (args) => {
  let selectedTheme = window.location.hash.split("/")[1];
  selectedTheme = selectedTheme ? selectedTheme : "Material";
  if (selectedTheme.indexOf("dark") > -1) {
    if (selectedTheme.indexOf("material") > -1) {
      args.border.color = "#303030";
    } else if (selectedTheme.indexOf("bootstrap5") > -1) {
      args.border.color = "#212529";
    } else if (selectedTheme.indexOf("bootstrap") > -1) {
      args.border.color = "#1A1A1A";
    } else if (selectedTheme.indexOf("fabric") > -1) {
      args.border.color = "#201f1f";
    } else if (selectedTheme.indexOf("fluent") > -1) {
      args.border.color = "#252423";
    } else if (selectedTheme.indexOf("bootstrap") > -1) {
      args.border.color = "#1A1A1A";
    } else if (selectedTheme.indexOf("tailwind") > -1) {
      args.border.color = "#1F2937";
    } else {
      args.border.color = "#222222";
    }
  } else if (selectedTheme.indexOf("highcontrast") > -1) {
    args.border.color = "#000000";
  } else {
    args.border.color = "#FFFFFF";
  }
};
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .pie-chart {
        align: center;
    }
`;
const DoughnutData = () => {
  const onChartLoad = (args) => {
    document.getElementById("pie-chart").setAttribute("title", "");
  };
  const load = (args) => {
    let selectedTheme = window.location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Fluent2";
    args.accumulation.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    )
      .replace(/-dark/i, "Dark")
      .replace(/light/i, "Light")
      .replace(/contrast/i, "Contrast")
      .replace(/-highContrast/i, "HighContrast");
  };
  return (
    <div className=" h-[100%]  w-[100%] flex items-center justify-center">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section  h-[100%] w-[100%] flex items-center justify-center">
        <AccumulationChartComponent
          id="pie-chart"
          title=""
          load={load.bind(this)}
          style={{ textAlign: "center" }}
          legendSettings={{ visible: false }}
          enableSmartLabels={true}
          enableAnimation={false}
          center={{ x: "50%", y: "50%" }}
          enableBorderOnMouseMove={false}
          width='100%'  // Takes full width of parent
          height='100%' // Takes full height of parent
          tooltip={{
            enable: true,
            header: "<b>Budget</b>",
            format: "${point.x}: <b>${point.y}%</b>",
          }}
          loaded={onChartLoad.bind(this)}
          pointRender={onPointRender}
        >
          <Inject
            services={[
              AccumulationLegend,
              PieSeries,
              AccumulationTooltip,
              AccumulationDataLabel,
              AccumulationAnnotation,
            ]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={chartData}
              name="Company Budget"
              xName="x"
              yName="y"
              type="Pie"
              innerRadius="70%"
              dataLabel={{
                // visible: true,
                position: "Inside",
                name: "x",
                connectorStyle: { width: 0 },
              }}
              borderRadius={8}
              border={{ width: 3 }}
            />
          </AccumulationSeriesCollectionDirective>
          <AccumulationAnnotationsDirective>
            <AccumulationAnnotationDirective
              content={`<div style="padding: 5px 5px 5px 5px; font-size: ${
                Browser.isDevice ? "10px" : "14px"
              }">30%</div>`}
              region="Series"
              coordinateUnits="Point"
              x="Operations"
              y={30.0}
            />
            <AccumulationAnnotationDirective
              content={`<div style="padding: 5px 5px 5px 5px; font-size: ${
                Browser.isDevice ? "10px" : "14px"
              }">10%</div>`}
              region="Series"
              coordinateUnits="Point"
              x="Miscellaneous"
              y={10.0}
            />
            <AccumulationAnnotationDirective
              content={`<div style="padding: 5px 5px 5px 5px; font-size: ${
                Browser.isDevice ? "10px" : "14px"
              }">15%</div>`}
              region="Series"
              coordinateUnits="Point"
              x="Human Resources"
              y={15.0}
            />
            <AccumulationAnnotationDirective
              content={`<div style="padding: 5px 5px 5px 5px; font-size: ${
                Browser.isDevice ? "10px" : "14px"
              }">20%</div>`}
              region="Series"
              coordinateUnits="Point"
              x="Research and Development"
              y={20.0}
            />
            <AccumulationAnnotationDirective
              content={`<div style="padding: 5px 5px 5px 5px; font-size: ${
                Browser.isDevice ? "10px" : "14px"
              }">25%</div>`}
              region="Series"
              coordinateUnits="Point"
              x="Marketing"
              y={25.0}
            />
          </AccumulationAnnotationsDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};
export default DoughnutData;
