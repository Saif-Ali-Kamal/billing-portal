import React from 'react';
import { Card, Input, Button, Form } from 'antd';
import emailSvg from '../../assets/email.svg';

const VerifyAccount = ({ email = "", handleSubmit, handleResendVerificationCode }) => {

  const emailToShow = `${email.slice(0, 2)}${"*".repeat(email.length > 2 ? email.length - 2 : 0)}`

  const handleSubmitClick = (values) => {
    handleSubmit(values.code)
  }
  return (
    <React.Fragment>
      <Card style={{ textAlign: 'center' }}>
        <img src={emailSvg} />
        <h3 style={{ marginBottom: 0 }}>Verification</h3>
        <p style={{ marginBottom: 0 }}>We have sent you a verification code on your email at</p>
        <p style={{ marginBottom: '48px' }}>{emailToShow}</p>
        <Form onFinish={handleSubmitClick}>
          <Form.Item name="code" rules={[{ required: true, message: 'Please provide six digit verification code' }]}>
            <Input placeholder="Enter 6 digit verification code" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block size="large" style={{ marginBottom: '16px' }} htmlType="submit">Verify</Button>
          </Form.Item>
        </Form>
        <a onClick={handleResendVerificationCode}>Resend verification code</a>
      </Card>
    </React.Fragment>
  );
}

export default VerifyAccount;