import React, { useState, useEffect } from "react";
import DonutChartCard from "./donut-chart-card";
import { getCount } from "../utils/data-manipulation";
import { DataService } from "../data/data-service";
import loader from "../static/images/loader.svg";

const InsightsPage = (props) => {
  const [countMap, setCountMap] = useState(null);
 

  useEffect(() => {
    setCountMap(getCount());
  }, []);

 // Handle Chart Click, sets the current filter state
 const chartClick = (key,index) => {
  const labels = key === "role" ? Object.keys(countMap.roleCountMap) : Object.keys(countMap.levelCountMap)
  props.applyFilter(key,labels[index])
}
  return (
    <div className="content-page">
      <div className="container-fluid">
        <div className="page-title row">
          <div className="col-md-12">
            <nav
              className="float-right mt-1 font-size-14"
              aria-label="breadcrumb"
            >
              <ol className="breadcrumb bg-transparent">
                <li className="breadcrumb-item">
                  <a href="/">Dashboard</a>
                </li>
                <li className="active breadcrumb-item" aria-current="page">
                  Insights
                </li>
              </ol>
            </nav>
            <h4 className="mb-1 mt-0">Insights</h4>
          </div>
        </div>
        <div className="mt-4 row justify-content-between">
          {countMap == null ? (
            <div className="content-page mx-auto">
              <img src={loader} alt="loader"></img>
            </div>
          ) : Object.keys(countMap).length === 0 ? (
            <div className="alert alert-info p-5 mx-auto">No data available</div>
          ) : (
            <React.Fragment>
              <div className="col-md-6 ">
                <DonutChartCard
                  values={Object.values(countMap.levelCountMap)}
                  labels={Object.keys(countMap.levelCountMap)}
                  name={"Levels"}
                  chartClick={chartClick}
                />
              </div>
              <div className="col-md-6">
                <DonutChartCard
                  values={Object.values(countMap.roleCountMap)}
                  labels={Object.keys(countMap.roleCountMap)}
                  name={"Roles"}
                  chartClick={chartClick}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
