import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Table } from 'antd';

const IcepackRecord = () => {
  const [form] = Form.useForm();
  const [icePackRecords, setIcePackRecords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/icepack_record')
      .then(response => {
        console.log(response.data);
        setIcePackRecords(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const onFinish = (values) => {
    axios.post('http://localhost:5000/icepack_record', {
      ...values
    })
      .then(response => {
        console.log(response.data);
        setIcePackRecords([...icePackRecords, response.data]);
        form.resetFields();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ice Pack Count',
      dataIndex: 'icepackCount',
      key: 'icepackCount',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
  ];

  return (
    <div>
      <h1 style={{marginBottom:"22px"}}>Ice Pack Record</h1>
      <Form form={form} onFinish={onFinish} layout='coloumn'>
        <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Ice Pack Count' name='icepackCount' rules={[{ required: true, message: 'Please input ice pack count!' }]}>
          <Input type='number' />
        </Form.Item>

        <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input type='email' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>Add Record</Button>
        </Form.Item>
      </Form>

      <h2>Records</h2>
      <Table dataSource={icePackRecords} columns={columns} rowKey='_id' />
    </div>
  );
};

export default IcepackRecord;
