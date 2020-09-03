import React from 'react';
import { Card, Button, Form } from 'antd';
import emailSvg from '../../assets/email.svg';
import OtpInputField from '../otp-input-field/OtpInputField';

const VerifyAccount = ({ email = "", handleSubmit, handleResendVerificationCode }) => {

  const emailToShow = `${email.slice(0, 2)}${"*".repeat(email.length > 2 ? email.length - 2 : 0)}`
  const canShowEmail = email ? true : false

  const [form] = Form.useForm();

  const handleSubmitClick = () => {
    form.validateFields().then(values => {
      if (values.otp.length === 6) {
        handleSubmit(values.otp)
      }
    })
  }

  return (
    <React.Fragment>
      <Card style={{ textAlign: 'center' }}>
        <img src={emailSvg} />
        <h3 style={{ marginBottom: 0 }}>Verification</h3>
        {canShowEmail && <React.Fragment>
          <p style={{ marginBottom: 0 }}>We have sent you a verification code on your email at</p>
          <p style={{ marginBottom: '48px' }}>{emailToShow}</p>
        </React.Fragment>}
        {!canShowEmail && <p style={{ marginBottom: '48px' }}>We have sent you a verification code on your email</p>}
        <Form form={form} onFinish={handleSubmitClick}>
          <Form.Item name='otp' rules={[{ required: true, message: 'Please input six digit verification code!', len: 6 }]}>
            <OtpInputField center />
          </Form.Item>
        </Form>
        <Button type="primary" block size="large" style={{ marginBottom: '16px', marginTop: '32px' }} onClick={handleSubmitClick}>Verify</Button>
        <a onClick={handleResendVerificationCode}>Resend verification code</a>
      </Card>
    </React.Fragment>
  );
}

export default VerifyAccount;