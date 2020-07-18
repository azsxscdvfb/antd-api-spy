import React from 'react';
import logo from './logo.svg';
import { Table, Tag, Space,Descriptions,Form, Input } from 'antd';
import { Button,Result, Badge,Modal } from 'antd';
import  MyEcharts  from './myEcharts';
const   Component = React.Component
class BtnList extends Component{
  constructor(props){
    super(props);

  }
  state={

  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  render(){
    const tmp=this.props.url;
    return(
      <div>
        <Button
          onClick={()=>{fetch('http://39.106.105.240:8077/surl/surl',{
            method:'DELETE',
            headers:{
              'Content-Type':'application/json;charset=UTF-8'
            },
            body: JSON.stringify({url:tmp}),
            cache:'default'})}
          }>删除</Button>
        {/*<Button type="primary" onClick={this.showModal}>*/}
        {/*  查看</Button>*/}
        {/*<Modal*/}
        {/*  title="监控数据"*/}
        {/*  onCancel={this.handleCancel}*/}
        {/*  visible={this.state.visible}*/}
        {/*  destroyOnClose={true}*/}
        {/*  footer={null}>*/}
        {/*  <MyEcharts />*/}
        {/*</Modal>*/}
      </div>
    )
  }

}
export default BtnList;
