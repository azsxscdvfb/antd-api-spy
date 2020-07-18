import React from 'react';
import logo from './logo.svg';
import { Table, Tag, Space,Descriptions,Form, Input } from 'antd';
import { Button,Result, Badge,Modal } from 'antd';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';

const   Component = React.Component


const MyForm = ()=>{
  const [form] = Form.useForm();
  const onFinish = values=>{
    console.log(values)
    fetch('http://39.106.105.240:8077/surl/surl',{
              method:'POST',
              headers:{
                'Content-Type':'application/json;charset=UTF-8'
              },
              body: JSON.stringify(values),
              cache:'default'
            })
   // this.props.setParent;
  }
  return (
    <Form form={form} onFinish={onFinish}>
            <Form.Item
            label="接口地址"
            name="url"
            rules={[{ required: true, message: '请输入要监控的接口地址及参数' }]}>
            <Input />
            </Form.Item>
             <Form.Item
             label="监视字段"
              name="kkey"
              rules={[{ required: true, message: '请输入要监控的返回数据字段名' }]}>
             <Input />
             </Form.Item>
             <Form.Item
             label="正确返回值"
              name="code"
              rules={[{ required: true, message: '请输入要对比的返回值' }]}>
             <Input />
             </Form.Item>
             <Form.Item
             label="管理员邮箱"
              name="mail"
              rules={[{ required:false, message: '请输接口负责人的邮箱' }]}>
             <Input />
             </Form.Item>
             <Form.Item >
              <Button type="primary" htmlType="submit">
                提交
              </Button>
             </Form.Item>
          </Form>
    )
}
export default MyForm
