import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Input, Button } from 'antd';

const AddStock = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = values => {
    setSubmitting(true);
    axios.post('http://localhost:5000/stock/add_stock', values)
      .then(response => {
        console.log(response.data);
        alert("Stock added successfully");
        form.resetFields();
      })
      .catch(error => console.log(error))
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="add-record-container">
      <Card title="Add Stock" className="add-record-card">
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="medicineName" label="Medicine Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="inStock" label="In Stock" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button style= {{backgroundColor: "#81181d"}} type="primary" htmlType="submit" loading={submitting}>Add Stock</Button>
        </Form.Item>
      </Form>
    </Card>
    </div>
    
  );
};

export default AddStock;