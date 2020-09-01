import React from 'react';
import { Form, Input, Card, Button } from 'antd';
import spaceUpLogo from '../../assets/logo-black.svg';

const SigninForm = (props) => {

  const handleSubmitClick = (values) => {
    props.handleSubmit(values.email, values.password);
  }

  return (
    <React.Fragment>
      <Card style={{ marginBottom: '16px', padding: 24 }}>
        <center><img src={spaceUpLogo} style={{ marginBottom: '16px' }} /></center>
        <Form onFinish={handleSubmitClick}>
          <p><b>Email</b></p>
          <Form.Item name='email' rules={[{ required: true, message: 'Please input your professional email address' }]}>
            <Input type='email' placeholder="Your professional email address" />
          </Form.Item>
          <p><b>Password</b></p>
          <Form.Item name='password' rules={[{ required: true, message: 'Please input a password' }]}>
            <Input.Password placeholder="Type your password" />
          </Form.Item>
          <Form.Item style={{ marginTop: 16 }} noStyle>
            <Button type='primary' block size="large" htmlType="submit">Signin</Button>
          </Form.Item>
        </Form>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Need an account?
          <a style={{ color: '#ffffff' }} href="/signup"> Signup</a>
        </p>
        <a style={{ color: '#ffffff' }} href="/forget-password" >Forget password?</a>
      </div>
    </React.Fragment>
  );
}

export default SigninForm;