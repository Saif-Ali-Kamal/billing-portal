import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const ForgetPasswordForm = () => {

  const history = useHistory();
  
  return(
    <React.Fragment>
      <Card style={{ marginBottom:'16px' }}>
        <center>
          <h3><b>Did you forget your password?</b></h3>
          <p>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
        </center>
        <Form>
          <p><b>Email</b></p>
          <Form.Item name='email' rules={[{ required: true, message: 'Please input your professional email address'}]}>
            <Input type='email' placeholder="Your professional email address" />
          </Form.Item>
        </Form>
        <Button type='primary' style={{ width:'100%', marginTop:'16px' }} >Send email</Button>
      </Card>
      <center><p style={{ color:'rgba(255, 255, 255, 0.6)' }}>Back to <a style={{ color: '#ffffff' }} onClick={() => history.push('/signin')}>Signin</a></p></center>
    </React.Fragment>
  );
}

export default ForgetPasswordForm;