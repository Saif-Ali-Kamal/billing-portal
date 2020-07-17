import React from 'react';
import { Card, Form, Input, Button } from 'antd';

const ForgetPasswordForm = (props) => {

  const handleSubmitClick = (values) => {
    props.handleSubmit(values.email);
  }

  return (
    <React.Fragment>
      <Card style={{ marginBottom: '16px', padding: 24 }}>
        <center>
          <h3><b>Did you forget your password?</b></h3>
          <p>Enter the email address you used when you joined and we’ll send you the verification code to reset your password.</p>
        </center>
        <Form style={{ marginTop: 24 }} onFinish={handleSubmitClick}>
          <p><b>Email</b></p>
          <Form.Item name='email' rules={[{ required: true, message: 'Please input your email address' }]}>
            <Input type='email' placeholder="Your email address" />
          </Form.Item>
          <Form.Item style={{ marginTop: 16 }} noStyle>
            <Button type='primary' block size="large" htmlType="submit">Send verification code</Button>
          </Form.Item>
        </Form>
      </Card>
      <center><p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Back to <a style={{ color: '#ffffff' }} href="/login" >Login</a></p></center>
    </React.Fragment>
  );
}

export default ForgetPasswordForm;