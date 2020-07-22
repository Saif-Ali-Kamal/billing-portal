import React from 'react';
import { Card, Form, Input, Button } from 'antd';

const ResetPasswordForm = (props) => {

  const handleSubmitClick = (values) => {
    props.handleSubmit(values.verificationCode, values.password);
  }

  return (
    <React.Fragment>
      <Card style={{ marginBottom: '16px', padding: 24 }}>
        <center>
          <h3><b>Reset your password</b></h3>
          <p>Enter the new password along with the verification code that we emailed  you to reset your password.</p>
        </center>
        <Form style={{ marginTop: 24 }} onFinish={handleSubmitClick}>
          <p><b>Verification code</b></p>
          <Form.Item>
            <Form.Item name='verificationCode' noStyle rules={[{ required: true, message: 'Please input verification code!' }]}>
              <Input.Password placeholder="6 digit verfication code" />
            </Form.Item>
            <div style={{ marginTop: 8, color: "rgba(0,0,0,0.45)" }}>Did not recieve any verification code? <a onClick={props.handleResendVerificationCode}>Resend code</a></div>
          </Form.Item>
          <p><b>New password</b></p>
          <Form.Item name='password' rules={[{ required: true, message: 'Please input new password code!' }]}>
            <Input.Password placeholder="Your new password" />
          </Form.Item>
          <Form.Item style={{ marginTop: 16 }} noStyle>
            <Button type='primary' block size="large" htmlType="submit">Reset password</Button>
          </Form.Item>
        </Form>
      </Card>
      <center><p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Back to <a style={{ color: '#ffffff' }} href="/login">Login</a></p></center>
    </React.Fragment>
  );
}

export default ResetPasswordForm;