import React from "react";

import ChartBar from './ChartBar'

import "./Chart.css"

const Chart = props => {
  const allMonthsValuesArray = props.dataPoints.map(dataPoint => dataPoint.value);
  // this spread operator returns the array to list of stand along arguments.
  const maxAmountAmongAllMonths = Math.max(...allMonthsValuesArray);

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar 
          key={dataPoint.label}
          value={dataPoint.value} 
          maxValue={maxAmountAmongAllMonths} 
          label={dataPoint.label}
        />
      ))}
    </div>
  )
};

export default Chart;