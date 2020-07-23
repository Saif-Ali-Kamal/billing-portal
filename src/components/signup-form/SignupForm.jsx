import React, { useState } from 'react';
import { Form, Input, Card, Checkbox, Button } from 'antd';

const SignupForm = (props) => {
  const [form] = Form.useForm()
  const [checked, setChecked] = useState(false)
  const [privacyPolicy, setPrivacyPolicy] = useState(false)
  const [termsServices, setTermsServices] = useState(false)

  const handleSubmitClick = (values) => {
    props.handleSubmit(values.name, values.organizationName, values.email, values.password)
  }

  return (
    <React.Fragment>
      <Card style={{ marginBottom: '16px', padding: 24 }}>
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
          <Form.Item name='email' rules={[{ required: true, message: 'Please input your professional email address' }]}>
            <Input type='email' placeholder="Your professional email address" />
          </Form.Item>
          <p><b>Password</b></p>
          <Form.Item name='password' rules={[{ required: true, message: 'Please input a password' }]}>
            <Input.Password placeholder="Type your password" />
          </Form.Item>
          <Checkbox disabled={!termsServices || !privacyPolicy} onChange={(e) => setChecked(e.target.checked)} style={{ marginTop: 16 }} checked={checked}>
            <span style={{ marginLeft: '8px' }}>I have read and agreed to the <a href="https://spaceuptech.com" target="_blank" onClick={() => setTermsServices(true)}>Terms of Service</a> and <a href="https://spaceuptech.com" target="_blank" onClick={() => setPrivacyPolicy(true)}>Privacy Policy</a></span>
          </Checkbox>
          <Form.Item noStyle>
            <Button type='primary' block size="large" htmlType="submit" disabled={!checked} style={{ marginTop: 16 }}>Create account</Button>
          </Form.Item>
        </Form>
      </Card>
      <center><p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Already have an account? <a style={{ color: '#ffffff' }} href="/login">Login</a></p></center>
    </React.Fragment>
  );
}

export default SignupForm;