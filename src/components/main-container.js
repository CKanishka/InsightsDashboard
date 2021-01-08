import React, { useState } from "react";
import ChartContainer from "./chart-container";

const MainContainer = () => {
  const [isShowInsights, setIsShowInsights] = useState(false);
 
  const handleShowInsightsClicked = () => {
      setIsShowInsights(true)
  }

  if(isShowInsights){
      return <ChartContainer />
  }
  return (
      <div>
        <button className="btn btn-info btn-animated" onClick={handleShowInsightsClicked}>Show Insights</button>
      </div> 
  );
};

export default MainContainer;
