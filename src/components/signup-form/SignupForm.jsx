import React, { useState } from 'react';
import { Form, Input, Card, Checkbox, Button } from 'antd';

const SignupForm = (props) => {
  const [form] = Form.useForm()
  const [checked, setChecked] = useState(false)
  const [termsServices, setTermsServices] = useState(false)

  const passwordValidator = (_, value, cb) => {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!value) {
      cb("Please input a password!")
    }
    if (!regex.test(value)) {
      cb("Password must contain atleast 8 characters, one digit, one uppercase, one lowercase and one special character.")
      return
    }
    cb()
  }

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
          <Form.Item name='password' rules={[{ validator: passwordValidator }]}>
            <Input.Password placeholder="Type your password" />
          </Form.Item>
          <Checkbox disabled={!termsServices} onChange={(e) => setChecked(e.target.checked)} style={{ marginTop: 16 }} checked={checked}>
            <span style={{ marginLeft: '8px' }}>I have read and agreed to the <a href="https://storage.googleapis.com/space-cloud/documents/space-cloud-terms-of-service-agreement.pdf" target="_blank" onClick={() => setTermsServices(true)}>Terms of Service</a></span>
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