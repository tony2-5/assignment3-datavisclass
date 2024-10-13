import React, {Component} from 'react';
import * as d3 from 'd3'

class Child1 extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidUpdate() {
    let data = this.props.data1

    let margin = {top:50,right:10,bottom:50,left:30},
      w=500-margin.left-margin.right,
      h=300-margin.top-margin.bottom
    
    let container = d3.select(".child1_svg")
    .attr("width", w+margin.left+margin.right)
    .attr("height", h+margin.top+margin.bottom)
    .select(".g_1")
    .attr("transform",`translate(${margin.left}, ${margin.top})`)

    let x_data=data.map(item=>item.total_bill)
    const x_scale = d3.scaleLinear().domain([0,d3.max(x_data)]).range([margin.left, w])
    container.selectAll(".x_axis_g").data([0]).join('g').attr("class","x_axis_g")
    .attr("transform",`translate(0, ${h})`).call(d3.axisBottom(x_scale))

    let y_data=data.map(item=>item.tip)
    const y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h, 0])
    container.selectAll(".y_axis_g").data([0]).join('g').attr("class","x_axis_g")
    .attr("transform",`translate(${margin.left},0)`).call(d3.axisLeft(y_scale))

    container.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx",d=>x_scale(d.total_bill))
    .attr("cy",d=>y_scale(d.tip))
    .attr("r",3)
    .style("fill", "#69b3a2")

    d3.select(".child1_svg").selectAll('.title').data([0])
    .join('text').attr('class','my_title')
    .attr("x",(w+margin.left+margin.right)/2).attr("y",20)
    .attr("text-anchor","middle").text("Total Bill vs Tips")

    d3.select(".child1_svg").selectAll('.x_axis_title').data([0])
    .join('text').attr('class','x_axis_title')
    .attr("x",(w)/2).attr("y",h+margin.top+35).text("Total Bill")

    d3.select(".child1_svg").selectAll('.y_axis_title').data([0])
    .join('text').attr('class','y_axis_title')
    .attr("x",15)
    .attr("y",(h+margin.top+margin.bottom)/2).text("Tips")
    .attr("text-anchor","middle")
    .attr("transform", `rotate(270,15,${(h+margin.top+margin.bottom)/2})`)
  }
  render() {
    return (
      <svg className='child1_svg'>
        <g className='g_1'></g>
      </svg>
    )
  }
}

export default Child1;