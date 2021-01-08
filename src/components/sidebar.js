import React, { useState } from "react";

const Sidebar = ({items,currActiveItem,setCurrActiveItem}) => {
   
  const handleItemClick = (item) => {
    setCurrActiveItem(item.id)
  }

  const listItems = items.map((item)=>
      <li key={item.id} className={currActiveItem===item.id?'active':''} onClick={()=>handleItemClick(item)}>{item.desc}</li>
  )
  return (
    <div>
        <div className="left-side-menu-dark">
            <div className="sidebar-content">
                <ul>
                    {listItems}
                </ul>
            </div>
        </div>
    </div>                                     
  );
};

export default Sidebar;
