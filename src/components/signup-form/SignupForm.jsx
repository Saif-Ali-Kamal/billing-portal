import React, { useState } from 'react';
import { Form, Input, Card, Checkbox, Button, Tooltip } from 'antd';
import spaceUpLogo from '../../assets/logo-black.svg';
import PasswordField from '../password-field/PasswordField';
import "./signup-form.css";

const SignupForm = (props) => {
  const [form] = Form.useForm()
  const [checked, setChecked] = useState(false)
  const [termsServices, setTermsServices] = useState(false)

  const handleSubmitClick = (values) => {
    props.handleSubmit(values.name, values.organizationName, values.email, values.password)
  }

  return (
    <div className="signup-form">
      <Card style={{ marginBottom: '16px', padding: 24 }}>
        <center><img src={spaceUpLogo} style={{ marginBottom: '16px' }} /></center>
        <Form form={form} onFinish={handleSubmitClick} >
          <p><b>Full name</b></p>
          <Form.Item name='name' rules={[{ required: true, message: 'Please input your full name' }]}>
            <Input placeholder="e.g John Doe" />
          </Form.Item>
          <p><b>Organization name</b></p>
          <Form.Item name='organizationName' rules={[{ required: true, message: 'Please input your Organization name' }]}>
            <Input placeholder="Your organization name" />
          </Form.Item>
          <p><b>Email</b></p>
          <Form.Item name='email' rules={[{ type: 'email', required: true, message: 'Please input your professional email address' }]}>
            <Input type='email' placeholder="Your professional email address" />
          </Form.Item>
          <p><b>Password</b></p>
          <PasswordField fieldName="password" />
          <div style={{ paddingTop: "16px" }}>
            <Tooltip title={!termsServices ? "Click on terms of service" : ""}>
              <Checkbox disabled={!termsServices} onChange={(e) => setChecked(e.target.checked)} style={{ marginTop: 16 }} checked={checked}>
                <span style={{ marginLeft: '8px' }}>I have read and agreed to the</span>
              </Checkbox>
            </Tooltip>
            <a href="https://storage.googleapis.com/space-cloud/documents/space-cloud-terms-of-service-agreement.pdf" target="_blank" onClick={() => setTermsServices(true)}>Terms of Service</a>
          </div>
          <Tooltip title={!checked ? "Click on terms of service" : ""}>
            <Button disabled={!checked} type='primary' block size="large" htmlType="submit" style={{ marginTop: 16 }}>Create account</Button>
          </Tooltip>
        </Form>
      </Card>
      <center><p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Already have an account? <a style={{ color: '#ffffff' }} href="/login">Login</a></p></center>
    </div>
  );
}

export default SignupForm;