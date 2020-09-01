import React, { useState } from 'react';
import { Form, Input, Card, Checkbox, Button, Tooltip } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import spaceUpLogo from '../../assets/logo-black.svg';
import "./signup-form.css";

const SignupForm = (props) => {
  const [form] = Form.useForm()
  const [checked, setChecked] = useState(false)
  const [termsServices, setTermsServices] = useState(false)
  const upperCaseRegex = new RegExp("(?=.*[A-Z])")
  const lowerCaseRegex = new RegExp("(?=.*[a-z])")
  const digitCaseRegex = new RegExp("(?=.*[0-9])")
  const specialCharRegex = new RegExp("(?=.*[!@#\$%\^&\*])")
  const lengthRegex = new RegExp("(?=.{8,})")

  const passwordValidator = (_, value, cb) => {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!value) {
      cb("Please input a password!")
    }
    if (!regex.test(value)) {
      cb("Please fulfill below requirement for a strong password.")
      return
    }
    cb()
  }

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
          <Form.Item name='email' rules={[{ required: true, message: 'Please input your professional email address' }]}>
            <Input type='email' placeholder="Your professional email address" />
          </Form.Item>
          <p><b>Password</b></p>
          <Form.Item name='password' rules={[{ validator: passwordValidator }]}>
            <Input.Password placeholder="Type your password" />
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(preValue, curValue) => preValue.password !== curValue.password}>
            {({ getFieldValue }) => {
              return (
                <ul style={{ listStyleType: 'none', marginBottom: 0, paddingLeft: 0 }}>
                  <li>{!upperCaseRegex.test(getFieldValue('password')) ? <CloseCircleFilled style={{ color: '#FF4D4F', marginRight: '4px' }} /> : <CheckCircleFilled style={{ color: '#34A853', marginRight: '4px' }} />} Atleast one uppercase character</li>
                  <li>{!lowerCaseRegex.test(getFieldValue('password') ? getFieldValue('password') : '') ? <CloseCircleFilled style={{ color: '#FF4D4F', marginRight: '4px' }} /> : <CheckCircleFilled style={{ color: '#34A853', marginRight: '4px' }} />} Atleast one lowercase character</li>
                  <li>{!digitCaseRegex.test(getFieldValue('password')) ? <CloseCircleFilled style={{ color: '#FF4D4F', marginRight: '4px' }} /> : <CheckCircleFilled style={{ color: '#34A853', marginRight: '4px' }} />} Atleast one digit</li>
                  <li>{!specialCharRegex.test(getFieldValue('password')) ? <CloseCircleFilled style={{ color: '#FF4D4F', marginRight: '4px' }} /> : <CheckCircleFilled style={{ color: '#34A853', marginRight: '4px' }} />} Atleast one special character</li>
                  <li>{!lengthRegex.test(getFieldValue('password') ? getFieldValue('password') : '') ? <CloseCircleFilled style={{ color: '#FF4D4F', marginRight: '4px' }} /> : <CheckCircleFilled style={{ color: '#34A853', marginRight: '4px' }} />} 8 characters minimum</li>
                </ul>
              );
            }}
          </Form.Item>
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