import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Input, Button } from 'antd';

function AddRecord() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (values) => {
    setSubmitting(true);
    axios.post('http://localhost:5000/records/add_record', values)
      .then((response) => {
        console.log(response.data);
        alert("Record added successfully");
        form.resetFields();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="add-record-container" >
      <Card title="Add Record" className="add-record-card">
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="enrollmentNumber" label="Enrollment Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>Add Record</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default AddRecord;
