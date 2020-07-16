import React from 'react';
import { Row, Col, Card, Form, Input, Button } from 'antd';

const ContactForm = ({ email, subject, handleSendMessage }) => {
  const handleSubmit = ({ email, subject, message }) => handleSendMessage(email, subject, message)
  return (
    <Row>
      <Col xl={{ span: 10, offset: 7 }} lg={{ span: 18, offset: 3 }}>
        <Card style={{ borderRadius: '10px', padding: '24px' }}>
          <Form initialValues={{ subject }} onFinish={handleSubmit}>
            <p><b>Subject</b></p>
            <Form.Item name="subject" rules={[{ required: true, message: 'Please provide a subject' }]}>
              <Input placeholder="What is this about?" />
            </Form.Item>
            <p><b>Message</b></p>
            <Form.Item name="message" rules={[{ required: true, message: 'Please provide a message' }]}>
              <Input.TextArea rows={4} placeholder="" />
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '24px' }} >Send message</Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default ContactForm;