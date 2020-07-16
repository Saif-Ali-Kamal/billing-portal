import React, { useState } from 'react';
import { Form, Input, Card, Checkbox, Button } from 'antd';
import { useHistory } from 'react-router';

const SignupForm = (props) => {

  const history = useHistory();
  const [checked, setChecked] = useState(false)
  const [privacyPolicy, setPrivacyPolicy] = useState(false)
  const [termsServices, setTermsServices] = useState(false)

  const handleSubmit = (values) => {
    props.handleSignup(values.name, values.organizationName, values.email, values.password)
  }

  return(
    <React.Fragment>
      <Card style={{ marginBottom:'16px' }}>
        <Form onFinish={handleSubmit}>
          <p><b>Full name</b></p>
          <Form.Item name='name' rules={[{ required: true, message: 'Please input your full name'}]}>
            <Input placeholder="e.g John Doe" />
          </Form.Item>
          <p><b>Organization name</b></p>
          <Form.Item name='org-name' rules={[{ required: true, message: 'Please input your Organization name'}]}>
            <Input placeholder="Your organization name" />
          </Form.Item>
          <p><b>Email</b></p>
          <Form.Item name='email' rules={[{ required: true, message: 'Please input your professional email address'}]}>
            <Input type='email' placeholder="Your professional email address" />
          </Form.Item>
          <p><b>Password</b></p>
          <Form.Item name='password' rules={[{ required: true, message: 'Please input a password'}]}>
            <Input.Password placeholder="Type your password" />
          </Form.Item>
        </Form>
        <Checkbox disabled={!termsServices || !privacyPolicy} onChange={() => setChecked(!checked) } />
          <span style={{ marginLeft:'8px' }}>I have read and agreed to the <a onClick={() => setTermsServices(true)}>Terms of Service</a> and <a onClick={() => setPrivacyPolicy(true)}>Privacy Policy</a></span>
        <Button type='primary' style={{ width:'100%', marginTop:'16px' }} disabled={!checked} onClick={handleSubmit}>Create account</Button>
      </Card>
      <center><p style={{ color:'rgba(255, 255, 255, 0.6)' }}>Already have an account? <a style={{ color: '#ffffff' }} onClick={() => history.push('/login')}>Signin</a></p></center>
    </React.Fragment>
  );
}

export default SignupForm;