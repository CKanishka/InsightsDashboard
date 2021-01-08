import React, { useState,useEffect } from "react";
import {Table} from 'antd';

const DataPage = (props) => {
  
  const {activeFilter, tableData} = props
 
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
                  Data
                </li>
              </ol>
            </nav>
            <h4 className="mb-1 mt-0">Data</h4>
          </div>
        </div>
        <div className="mt-4 row">
          <div class="col">
            <div class="card">
              <div class="card-body">
              {tableData && <React.Fragment>
                  {activeFilter && <div className="badge-info p-3 font-weight-bold text-capitalize">{activeFilter}</div>}
                  <Table
                    dataSource={tableData.rows}
                    columns={tableData.columns}
                  />
                </React.Fragment>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>                                   
  );
};

export default DataPage;
