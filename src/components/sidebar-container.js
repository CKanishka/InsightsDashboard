import React, { useState,useEffect } from "react";
import DataPage from "./data-page";
import InsightsPage from "./insights-page";
import Sidebar from "./sidebar";
import {getColumns,getFilteredRows} from '../utils/data-manipulation';

const sideNavItems = [
    {id:"insightsItem",desc:"Insights"},
    {id:"dataItem",desc:"Data"}
]
const SidebarContainer = () => {
  
  const [tableData, setTableData] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    setTableData({rows:getFilteredRows(),columns:getColumns()})
  }, []);


  const applyFilter = (key,value) => {
    setCurrActiveItem("dataItem")
    setActiveFilter(`${key}: ${value}`)
    setTableData({rows:getFilteredRows(key,value),columns:getColumns(key)})
  }

  const [currActiveItem, setCurrActiveItem] = useState(sideNavItems[0].id);

  return (
    <div>
        <Sidebar items={sideNavItems} currActiveItem={currActiveItem} setCurrActiveItem={setCurrActiveItem}/>
        {currActiveItem === "insightsItem" ? <InsightsPage applyFilter={applyFilter}/> : <DataPage tableData={tableData} activeFilter={activeFilter}/>}
    </div>                                     
  );
};

export default SidebarContainer;
