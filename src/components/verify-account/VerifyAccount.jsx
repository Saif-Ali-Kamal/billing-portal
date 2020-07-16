import React from 'react';
import { Card, Input, Button, Form } from 'antd';
import emailSvg from '../../assets/email.svg';

const VerifyAccount = (props) => {

  return (
    <React.Fragment>
      <Card style={{ textAlign:'center' }}>
        <img src={emailSvg} />
        <h3 style={{ marginBottom:0 }}>Verification</h3>
        <p style={{ marginBottom:0 }}>We have sent you a verification code on your email at</p>
        <p style={{ marginBottom:'48px' }}>ja***********</p>
        <Form>
          <Form.Item name="code" rules={[{ required: true, message: 'Please provide six digit verification code' }]}>
            <Input placeholder="Enter 6 digit verification code" />
          </Form.Item>
        </Form>
        <Button type="primary" style={{ width:'100%', marginBottom:'16px' }} onClick={props.handleSubmit}>Verify</Button>
        <a>Resend verification code</a>
      </Card>
    </React.Fragment>
  );
}

export default VerifyAccount;