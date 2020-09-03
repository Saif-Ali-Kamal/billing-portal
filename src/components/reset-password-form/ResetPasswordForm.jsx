import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import PasswordField from '../password-field/PasswordField';
import OtpInputField from '../otp-input-field/OtpInputField';

const ResetPasswordForm = (props) => {

  const handleSubmitClick = (values) => {
    props.handleSubmit(values.otp, values.password);
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
          <Form.Item name='otp' noStyle rules={[{ required: true, message: 'Please input six digit verification code!', len:6 }]}>
            <OtpInputField />
          </Form.Item>
          <div style={{ marginTop: 8, color: "rgba(0,0,0,0.45)" }}>Did not recieve any verification code? <a onClick={props.handleResendVerificationCode}>Resend code</a></div>
          <br/>
          <p><b>New password</b></p>
          <PasswordField fieldName="password" />
          <Form.Item style={{ marginTop: 16 }} noStyle>
            <Button type='primary' block size="large" style={{ marginTop:'32px' }} htmlType="submit">Reset password</Button>
          </Form.Item>
        </Form>
      </Card>
      <center><p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Back to <a style={{ color: '#ffffff' }} href="/login">Login</a></p></center>
    </React.Fragment>
  );
}

export default ResetPasswordForm;