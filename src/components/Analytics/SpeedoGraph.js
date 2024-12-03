import { Gauge } from "@mui/x-charts";

import { useEffect, useState } from "react";
// import {
//   CircularGaugeComponent,
//   AxesDirective,
//   AxisDirective,
//   PointersDirective,
//   PointerDirective,
// } from "@syncfusion/ej2-react-circulargauge";
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
const Speedograph = ({ id }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (value < 60) {
      const interval = setInterval(() => {
        setValue((prev) => {
          const nextValue = prev + 5;
          if (nextValue >= 60) {
            clearInterval(interval); // Clear interval once target is reached
          }
          return nextValue;
        });
      }, 100); // Update every 200ms

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [value]);
  const load = (args) => {};
  return (
    // <CircularGaugeComponent
    // height="190px"

    //   animationDuration={2000}
    //   load={load.bind(this)}
    //   id={`gauge-${id}`}
    //   // background="transparent"
    // >
    //   <AxesDirective>
    //     <AxisDirective
    //       radius="80%"
    //       startAngle={230}
    //       endAngle={130}
    //       majorTicks={{ offset: 5 }}
    //       lineStyle={{ width: 8, color: "#E0E0E0" }}
    //       minorTicks={{ offset: 5 }}
    //       labelStyle={{ font: { fontFamily: "inherit" }, offset: -1 }}
    //     >
    //       <PointersDirective>
    //         <PointerDirective
    //           value={15}
    //           radius="60%"
    //           pointerWidth={7}
    //           color="#c06c84"
    //           animation={{ enable: true, duration: 500 }}
    //           cap={{ radius: 8, color: "#c06c84", border: { width: 0 } }}
    //           needleTail={{ length: "0%" }}
    //         />
    //       </PointersDirective>
    //     </AxisDirective>
    //   </AxesDirective>
    // </CircularGaugeComponent>
    <div className="w-[100%] h-[100%]">
      <Gauge
        sx={{ width: "100%", height: "110%" }}
       
        value={value}
        startAngle={-90}
        endAngle={90}
      />
    </div>
  );
};
export default Speedograph;
