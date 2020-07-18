import React, { Component } from 'react';
import { Collapse,Card,Row, Col} from 'antd';
import ReactEcharts from 'echarts-for-react';
const { Panel } = Collapse;
import { connect } from 'dva';
function callback(key) {
  console.log(key);
}

const keys = ["https://api.apiopen.top/getJoke?page=1&count=2&type=video","https://api.apiopen.top/getSingleJoke?sid=28654780",3,4,5];
@connect(({ test,loading}) => ({
  test,
  loading: loading.models.test,
}))
class JsxStyleApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales:[
        {
          time: [1, 2, 3, 1, 2, 3],
          date: ['2020-07-15 10:00:00', '2020-07-15 10:00:00', '2020-07-15 10:00:00', '2020-07-15 10:00:00', '2020-07-15 10:00:00', '2020-07-15 10:00:00']
        }
      ]
    }
  }
  componentDidMount() {
    //注意务必先使用dva中的connect建立连接，否则是无法调用props中的dispatch法的
    // this.props.dispatch({
    //   //调用model中的方法发起请求，（model的命名空间+方法名）
    //   type: 'test/fetch',
    //   //设置参数
    //   payload:{}
    // });
    const {dispatch} = this.props;
    const later = dispatch({ //这里开始调接口啦，封装成一个函数
      type: 'test/fetch',// 这里就是 命名空间/*后面的名字
      payload: {},
    });
    later.then(() => {//因为调用了数据接口，数据货地了，页面数据更新
      const { test,loading} = this.props; //data是获取的数据，后台返回的，数据获取到了，更新页面
      console.log(test);
      this.setState({
          data: test.data,
        }
      )
      console.log(this.state);
      const urlLength=this.state.data.length;
      console.log(urlLength);
      for(const i=0;i<urlLength;i++){

      }
    });
  }
  getOption = (time,date) =>{
    return {

      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data:['延时']
      },
      xAxis: {
        boundaryGap: false,
        data:date},
      yAxis: {},
      series: [{
        name: '延时',
        type: 'line',
        data: time
      }
      ]
    };
  }
  render() {
    const aaa = this.state.sales.slice();
    const timeData =aaa[0]['time'];
    const dateData=aaa[0]['date'];
    return (

      <Collapse defaultActiveKey={['1']} onChange={callback}>
        {keys.map((k, index) => {
          return (
            <Panel header={k} key={index}>
              <div>
                <Card>
                  <ReactEcharts option={this.getOption(timeData,dateData)} />
                </Card>
              </div>
            </Panel>
          );
        })}
      </Collapse>
    )
  }
}
export default JsxStyleApi;
