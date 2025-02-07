'use client'
import React from "react";
import ReactEcharts from "echarts-for-react";

const MyEChartsComponent = () => {
  const option = {
    title: {
      text: "ECharts 示例",
    },
    tooltip: {},
    legend: {
      data: ["销量"],
    },
    xAxis: {
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ReactEcharts option={option} />
    </div>
  );
};

export default MyEChartsComponent;