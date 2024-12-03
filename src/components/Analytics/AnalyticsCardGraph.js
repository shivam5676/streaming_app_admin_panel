import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationDataLabel,
  PieSeries,
  Inject,
  AccumulationAnnotation,
  AccumulationAnnotationsDirective,
  AccumulationAnnotationDirective,
  AccumulationTooltip,
  IAccLoadedEventArgs,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
const AnalyticsCardGraph = ({id}) => {
    const data = [
        { x: "Category A", y: 35, text: "Category A<br>35%", color: "#FF5733" }, // Custom red
        { x: "Category B", y: 25, text: "Category B<br>25%", color: "#33FF57" }, // Custom green
      ];

  // Annotation content for the center
  const content = Browser.isDevice
    ? "<div style='font-weight:700; font-size:11px;'>Category<br>Stats</div>"
    : "<div style='font-weight:600; font-size:14px;'>Category<br>Stats</div>";

  // On Chart Load Event
  //   const onChartLoad = (args: IAccLoadedEventArgs): void => {
  //     document.getElementById("analytics-card-chart")?.setAttribute("title", "");
  //   };

  return (
    <AccumulationChartComponent
    id={`chart-${id}`} // Use unique ID for each chart
      legendSettings={{ visible: false }}
      enableBorderOnMouseMove={false}
      width="100%"
      height="180px"
      center={{ x: "50%", y: "25%" }}
      tooltip={{
        enable: false,
        format:
          "<b>${point.x}</b><br>Share: <b>${point.tooltipMappingName}</b>",
        header: "",
      }}
      // loaded={onChartLoad}
    >
      <Inject
        services={[
          AccumulationDataLabel,
          PieSeries,
          AccumulationTooltip,
          AccumulationAnnotation,
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          dataSource={data}
          xName="x"
          yName="y"
          startAngle={270}
          endAngle={90}
          radius={Browser.isDevice ? "100%" : "100%"}
          innerRadius="70%"
          pointColorMapping="color"
          // dataLabel={{
          //   visible: true,
          //   position: "Inside",
          //   enableRotation: true,
          //   connectorStyle: { length: "10%" },
          //   name: "text",
          //   font: {
          //     fontWeight: "600",
          //     size: Browser.isDevice ? "8px" : "11px",
          //     color: "#ffffff",
          //   },
          // }}
        />
      </AccumulationSeriesCollectionDirective>
      {/* <AccumulationAnnotationsDirective>
        <AccumulationAnnotationDirective
          content={content}
          region="Series"
          x={Browser.isDevice ? "52%" : "50%"}
          y={Browser.isDevice ? "82%" : "85%"}
        />
      </AccumulationAnnotationsDirective> */}
    </AccumulationChartComponent>
  );
};

export default AnalyticsCardGraph;
