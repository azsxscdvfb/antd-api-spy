import React from 'react';
import logo from './logo.svg';
import { Table, Tag, Space,Descriptions,Form, Input } from 'antd';
import { Button,Result, Badge,Modal } from 'antd';
import MyForm from './MyForm';
import {PageContainer} from "@ant-design/pro-layout";
import BtnList from './BtnList'
import  MyEcharts  from './myEcharts';
const   Component = React.Component



class App extends Component{
	constructor(props){
        super(props)//调用父类的构造
    this.getUrlData();
        // fetch('http://39.106.105.240:8077/urls',{
        //       method:'GET',
        //       headers:{
        //         'Content-Type':'application/json;charset=UTF-8'
        //       },
        //       cache:'default'
        //     })
        //      .then(res =>res.json())
        //      .then(data=>{
        //       for(var i in data){
        //         const tmp=data[i].url
        //         data[i].key=i;
        //         data[i].action=<BtnList url={tmp} />
        //         data[i].echarts=<MyEcharts url={data[i].url}/>
        //       }
        //       this.setState({data:data})
        //        console.log(data);
        //      })
    }
    state = {
      filteredInfo: null,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };
	getUrlData=()=>{
    fetch('http://39.106.105.240:8077/urls',{
      method:'GET',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      cache:'default'
    })
      .then(res =>res.json())
      .then(data=>{
        for(var i in data){
          const tmp=data[i].url
          data[i].key=i;
          data[i].action=
            <Button
              onClick={()=>{fetch('http://39.106.105.240:8077/surl/surl',{
                method:'DELETE',
                headers:{
                  'Content-Type':'application/json;charset=UTF-8'
                },
                body: JSON.stringify({url:tmp}),
                cache:'default'})
              this.getUrlData()}
              }>删除</Button>
          data[i].echarts=<MyEcharts url={data[i].url}/>
        }
        this.setState({data:data})
        console.log(data);
      })
  }
  handleChange = (pagination, filters) => {
    console.log('Various parameters', pagination, filters);
    this.setState({
      filteredInfo: filters,
    });
  };
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
    handleOk=()=>{
      this.setState({
        visible: false,
      });
      //this.getUrlData();
    }

    render(){
      let {filteredInfo } = this.state;
      filteredInfo = filteredInfo || {};
      const columns = [

        {
          title: '接口地址',
          dataIndex: 'url',
        },
        {
          title: '运行状态',
          dataIndex: 'errorCount',

          render: status =>
          {
            let color,text;
            if(status==0){
              color='default'
              text='未测试'
            }else if(status==1){
              color='success'
              text='正常'
            }else if(status==2){
              color='error'
              text='异常'
            }
            return (
              <Descriptions.Item label="Status" span={3}>
                <Badge status={color} text={text} />
              </Descriptions.Item>
            );
          },
          filters: [
            { text: '未测试', value: 0 },
            { text: '正常', value: 1},
            { text: '异常', value: 2},
          ],
          filterMultiple: false,
          //filteredValue: filteredInfo.errorCount || null,
          onFilter: (value, record) => record.errorCount===value,
        },
        {
          title: '负责人邮箱',
          dataIndex: 'mail',
        },
        {
          title:'动作',
          dataIndex:'action'
        }
      ];
     const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    console.log(this.state)
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <PageContainer>
        <div>
          <Button type="primary" onClick={this.showModal}>
            添加
          </Button>
          <Modal
          title="添加监控"
          onCancel={this.handleCancel}
          visible={this.state.visible}
          destroyOnClose={true}
          footer={null}
        >
        <MyForm //setParent={this.handleOk()}
        />
        </Modal>
        </div>
        <Table columns={columns}
               expandable={{
                  expandedRowRender: record => <p style={{ margin: 0 }}>{record.echarts}</p>,
                 rowExpandable: record => record.name !== 'Not Expandable',
                }} dataSource={this.state.data}
               onChange={this.handleChange}/>
      </PageContainer>
    );
	}
}

export default App;
