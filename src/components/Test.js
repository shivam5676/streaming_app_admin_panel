import React, { memo } from "react";

const Test = (props) => {
  console.log("recreation of test");
  {console.log("lazy")}
  return <div>Test</div>;
 
};

export default memo(Test);
