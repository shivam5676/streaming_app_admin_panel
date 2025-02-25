import { useState } from "react";
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

// Sample CSS for the chart styling
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .pie-chart {
        align: center;
    }
`;

// Dynamic Doughnut Chart Component
const DoughnutData = (props) => {
  console.log(props,"props");
  // State to hold chart data
  const moviesViews = props?.views?.movies?.totalViews || 0;
  const webSeriesViews = props?.views?.webShows?.totalViews || 0;
  const totalViews = +moviesViews + webSeriesViews;
  console.log(totalViews,"total views");
  // const [chartData, setChartData] = useState([
  //   { x: "Movies", y: 30, text: "30%" },
  //   { x: "Miscellaneous", y: 10, text: "10%" },

  // ]);
  const chartData = [
    {
      x: "Movies",
      text: `${Math.round((moviesViews / totalViews) * 100)}%`,
      y: moviesViews,
    },
    {
      x: "Miscellaneous",
      text: `${Math.round((webSeriesViews / totalViews) * 100)}%`,
      y: webSeriesViews
    },
  ];

  // Method to load the chart
  const onChartLoad = (args) => {
    document.getElementById("pie-chart").setAttribute("title", "");
  };

  // Dynamic theme loading
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

  // Function to render points with custom border based on theme
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

  return (
    <div className="h-[100%] w-[100%] flex items-center justify-center">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section h-[100%] w-[100%] flex items-center justify-center">
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
          width="100%" // Takes full width of parent
          height="100%" // Takes full height of parent
          tooltip={{
            enable: true,
            header: "<b>Content Views</b>",
            format: "${point.x}: <b>${point.y}</b>",
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
          {/* Dynamic Pie Series */}
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={chartData} // Dynamic data
              name="Company Budget"
              xName="x"
              yName="y"
              type="Pie"
              innerRadius="70%"
              dataLabel={{
                position: "Inside",
                name: "x",
                connectorStyle: { width: 0 },
              }}
              borderRadius={8}
              border={{ width: 3 }}
            />
          </AccumulationSeriesCollectionDirective>

          {/* Dynamic Annotations */}
          <AccumulationAnnotationsDirective>
            {chartData.map((data, index) => (
              <AccumulationAnnotationDirective
                key={index}
                content={`<div style="padding: 5px 5px 5px 5px; font-size: ${
                  Browser.isDevice ? "10px" : "14px"
                }">${data.text}</div>`}
                region="Series"
                coordinateUnits="Point"
                x={data.x}
                y={data.y}
              />
            ))}
          </AccumulationAnnotationsDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};

export default DoughnutData;
