import React from "react";
import Chart from "react-apexcharts";

const chartOptions = {
  plotOptions: {
    pie: {
      expandOnClick: false,
    },
  },
  responsive: [
    {
      breakpoint: 1090,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: "bottom",
        },
      },
    },
    {
      breakpoint: 890,
      options: {
        chart: {
          width: 250,
        },
        legend: {
          position: "bottom",
        },
      },
    },
    {
      breakpoint: 570,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};
const DonutChartCard = ({ values, labels, name, chartClick }) => {
  const handleChartClick = (dataPointIndex) => {
    chartClick(name === "Roles" ? "role" : "level", dataPointIndex);
  };
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5>{name}</h5>
        <Chart
          options={{
            labels,
            chart: {
              events: {
                dataPointSelection: function (event, chartContext, config) {
                  handleChartClick(config.dataPointIndex)
                },
              },
            },
            ...chartOptions,
          }}
          series={values}
          type="donut"
          width="380"
        />
      </div>
    </div>
  );
};

export default DonutChartCard;
