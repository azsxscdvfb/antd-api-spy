import React, { Component } from 'react';
import { Collapse,Card} from 'antd';
import ReactEcharts from 'echarts-for-react';
import BtnList from "@/pages/simple/BtnList";

//定义一个React组件
class MyEcharts extends Component {
  constructor(props) {
    super(props);
    console.log("123");
    const tmp=this.props.url;
    setInterval(()=>{
      fetch('http://39.106.105.240:8077/devices',{
        method:'POST',
        headers:{
          'Content-Type':'application/json;charset=UTF-8'
        },
        body: JSON.stringify({url:tmp}),
        cache:'default'})
        .then(res =>res.json())
        .then(data=>{
            this.setState({timeData:data})

            console.log(data);
          }
        )
      // this.setState(
      //   {
      //     timeData:[Math.random(),Math.random(),Math.random(),Math.random()],
      //     dateData:[Math.random(),Math.random(),Math.random(),Math.random()]
      //   }
      // )
    },3000)
    console.log(this.state)
  }
  state={
    timeData:[],
    dateData:[]
  }
  getOption = (time,date) =>{
    return {

      title: {
        text: 'api数据监控'
      },
      tooltip: {},
      legend: {
        data:['延时']
      },
      xAxis: {
        boundaryGap: false,
        data:date},
      yAxis: {
        name:"微秒",
        type: "value",
        scale:"true"
      },
      series: [{
        name: '延时',
        type: 'line',
        data: time
      }]
    };
  }
  render(){
    return(
      <ReactEcharts option={this.getOption(this.state.timeData,this.state.dateData)}/>
    );

  }
}

export default MyEcharts;
