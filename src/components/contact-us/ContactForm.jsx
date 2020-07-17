import React from 'react';
import { Row, Col, Card, Form, Input, Button } from 'antd';

const ContactForm = ({ subject, handleSubmit }) => {
  const handleSubmitClick = ({ subject, message }) => handleSubmit(subject, message)
  return (
    <Row>
      <Col xl={{ span: 10, offset: 7 }} lg={{ span: 18, offset: 3 }}>
        <Card style={{ borderRadius: '10px', padding: '24px' }}>
          <Form initialValues={{ subject }} onFinish={handleSubmitClick}>
            <p><b>Subject</b></p>
            <Form.Item name="subject" rules={[{ required: true, message: 'Please provide a subject' }]}>
              <Input placeholder="What is this about?" />
            </Form.Item>
            <p><b>Message</b></p>
            <Form.Item name="message" rules={[{ required: true, message: 'Please provide a message' }]}>
              <Input.TextArea rows={4} placeholder="Type your message here" />
            </Form.Item>
            <Form.Item noStyle>
              <Button type='primary' block size="large" htmlType="submit" style={{ marginTop: 16 }}>Send message</Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default ContactForm;