import React from 'react';
import { Form, Input, Card, Button } from 'antd';
import { useHistory } from 'react-router';

const SigninForm = (props) => {

  const history = useHistory();

  const handleSubmit = (values) => {
    props.handleSignin(values.email, values.password);
  }

  return(
    <React.Fragment>
      <Card style={{ marginBottom:'16px' }}>
        <Form onFinish={handleSubmit}>
          <p><b>Email</b></p>
          <Form.Item name='email' rules={[{ required: true, message: 'Please input your professional email address'}]}>
            <Input type='email' placeholder="Your professional email address" />
          </Form.Item>
          <p><b>Password</b></p>
          <Form.Item name='password' rules={[{ required: true, message: 'Please input a password'}]}>
            <Input.Password placeholder="Type your password" />
          </Form.Item>
        </Form>
        <Button type='primary' style={{ width:'100%' }} onClick={handleSubmit}>Signin</Button>
      </Card>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Need an account? 
          <a style={{ color: '#ffffff' }} onClick={() => history.push('/signup')}>Signup</a>
        </p>
        <a style={{ color: '#ffffff' }} onClick={() => history.push('/forget-password')}>Forget password?</a>
      </div>
    </React.Fragment>
  );
}

export default SigninForm;