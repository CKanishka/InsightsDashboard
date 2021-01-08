import React, { useState, useEffect } from "react";
import DonutChartCard from "./donut-chart-card";
import DataTable from "react-data-table-component";
import loader from '../static/images/loader.svg';
import {getCount,getColumns,getFilteredRows} from '../utils/data-manipulation';
import { DataService } from "../data/data-service";

const ChartContainer = () => {
  const [countMap, setCountMap] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    DataService.getData().then(()=>{
      setCountMap(getCount())
    })
  }, []);
 
  // Handle Chart Click, sets the current filter state, filters table data and auto scrolls window
  const chartClick = (key,value) => {
    setActiveFilter(`${key}: ${value}`)
    setTableData({rows:getFilteredRows(key,value),columns:getColumns(key)})
    window.scrollTo({ top: document.getElementById('chart-container').scrollHeight, behavior: 'smooth' })
  }

  if (countMap == null) {
    return <div><img src={loader} alt="loader"></img></div>
  }

  else if (Object.keys(countMap).length === 0){
    return <div className="alert alert-info">No data available</div>
  }

  return (
    <React.Fragment>
      <div className="row justify-content-between" id="chart-container">
        <div className="col-md-6">
          <DonutChartCard
            values={Object.values(countMap.levelCountMap)}
            labels={Object.keys(countMap.levelCountMap)}
            hoverText={Object.entries(countMap.levelCountMap).map(([key,value])=>`${key}: ${value}`)}
            name={"Levels"}
            chartClick={chartClick}
          />
        </div>
        <div className="col-md-6">
          <DonutChartCard
            values={Object.values(countMap.roleCountMap)}
            labels={Object.keys(countMap.roleCountMap)}
            hoverText={Object.entries(countMap.roleCountMap).map(([key,value])=>`${key}: ${value}`)}
            name={"Roles"}
            chartClick={chartClick}
          />
        </div>
      </div>
      {tableData && <div className="card shadow-sm mt-5">
        <div className="badge-info p-3 font-weight-bold text-capitalize">{activeFilter}</div>
        <DataTable
          columns={tableData.columns}
          data={tableData.rows}
          pagination
        />
      </div>}
      
    </React.Fragment>
  );
};

export default ChartContainer;
