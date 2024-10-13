import React, {Component} from 'react';
import * as d3 from 'd3'

class Child2 extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidUpdate() {
    let data = this.props.data2
    console.log(data)
    let margin = {top:50, right:10,bottom:50,left:30},
      w=500-margin.left-margin.right,
      h=300-margin.top-margin.bottom
    
    let flat_data = d3.flatRollup(
      data,
      (v) => d3.mean(v, (d) => d.tip), 
      (d) => d.day
    );
    
    let container = d3.select(".child2_svg")
    .attr("width", w+margin.left+margin.right)
    .attr("height", h+margin.top+margin.bottom)
    .select(".g_2")
    .attr("transform",`translate(${margin.left}, ${margin.top})`)

    let x_data=flat_data.map(item=>item[0])
    const x_scale = d3.scaleBand().domain(x_data).range([margin.left, w])
    .padding(.2)

    container.selectAll(".x_axis_g").data([0]).join('g').attr("class","x_axis_g")
    .attr("transform",`translate(0, ${h})`).call(d3.axisBottom(x_scale))

    let y_data=flat_data.map(item=>item[1])
    const y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h, 0])
    
    container.selectAll(".y_axis_g").data([0]).join('g').attr("class","x_axis_g")
    .attr("transform",`translate(${margin.left},0)`).call(d3.axisLeft(y_scale))

    container.selectAll('rect').data(flat_data).join("rect")
    .attr("x", d=>x_scale(d[0]))
    .attr("y", d=>y_scale(d[1]))
    .attr('width',x_scale.bandwidth())
    .attr('height',d=>h-y_scale(d[1]))
    .attr("fill","#69b3a2")

    d3.select(".child2_svg").selectAll('.title').data([0])
    .join('text').attr('class','my_title')
    .attr("x",(w+margin.left+margin.right)/2).attr("y",20)
    .attr("text-anchor","middle").text("Average Tip By Day")

    d3.select(".child2_svg").selectAll('.x_axis_title').data([0])
    .join('text').attr('class','x_axis_title')
    .attr("x",(w)/2).attr("y",h+margin.top+35).text("Day")

    d3.select(".child2_svg").selectAll('.y_axis_title').data([0])
    .join('text').attr('class','y_axis_title')
    .attr("x",15)
    .attr("y",(h+margin.top+margin.bottom)/2).text("Average Tip")
    .attr("text-anchor","middle")
    .attr("transform", `rotate(270,15,${(h+margin.top+margin.bottom)/2})`)
  }
  render() {
    return (
      <svg className='child2_svg'>
        <g className='g_2'></g>
      </svg>
    )
  }
}

export default Child2;