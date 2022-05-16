
import React, { useEffect, useState, useRef } from 'react'
import * as d3 from 'd3'
import styles from '../scss/Chart.module.scss';

// const sty = {
//   .bar:hover:{

//   }
// }
let datas = [100, 300, 400, 200]
// [10, 40, 30, 20, 50, 10],
// [60, 30, 40, 20, 30]
// ]
var i = 0;
const barWidth = 80;
const D3_BarChart = ({ width, height }) => {
  const [data, setData] = useState(datas);
  const ref = useRef();

  const changeData = () => {
    datas = datas.map((d) => {
      return (
        d = Math.floor(Math.random() * 400) + 1
      )
    })
    setData(datas)
  }

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .style("margin", "15px")
  }, [])

  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {

    const svg = d3.select(ref.current);
    var selection = svg.selectAll("rect").data(data)

    var xScale = d3.scaleBand()
      .domain(data.map((val, i) => i))
      .range([0, width])
      .padding(0.5)

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, d3.max(data)])

    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)

    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0,${height})`)
    svg.append('g')
      .call(yAxis)

    selection
      .transition().duration(300)
      .attr("height", (d) => yScale(d))
      .attr("y", (d) => height - yScale(d))

    selection
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * barWidth)
      .attr("y", d => height - yScale(d))
      .attr("width", barWidth - 12)
      .attr("height", d => d)
      .attr("fill", "white")
      .transition().duration(300)
      .attr("height", (d) => yScale(d))
      .attr("y", (d) => height - yScale(d))

    selection
      .exit()
      .transition().duration(300)
      .attr("y", (d) => height)
      .attr("height", 0)
      .remove()
  }


  return (
    <div className={styles.Chart} onClick={changeData} >
      <h1>Click on chart to change data</h1>
      <svg ref={ref}>
      </svg>
    </div>
  )
}

export default D3_BarChart