import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const ResetPasswordForm = (props) => {

  const upperCaseRegex = new RegExp("(?=.*[A-Z])")
  const lowerCaseRegex = new RegExp("(?=.*[a-z])")
  const digitCaseRegex = new RegExp("(?=.*[0-9])")
  const specialCharRegex = new RegExp("(?=.*[!@#\$%\^&\*])")
  const lengthRegex = new RegExp("(?=.{8,})")

  const passwordValidator = (_, value, cb) => {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!value) {
      cb("Please input a new password!")
    }
    if (!regex.test(value)) {
      cb("Please fulfill below requirement for a strong password.")
      return
    }
    cb()
  }
  
  const handleSubmitClick = (values) => {
    props.handleSubmit(values.verificationCode, values.password);
  }

  return (
    <React.Fragment>
      <Card style={{ marginBottom: '16px', padding: 24 }}>
        <center>
          <h3><b>Reset your password</b></h3>
          <p>Enter the new password along with the verification code that we emailed  you to reset your password.</p>
        </center>
        <Form style={{ marginTop: 24 }} onFinish={handleSubmitClick}>
          <p><b>Verification code</b></p>
          <Form.Item>
            <Form.Item name='verificationCode' noStyle rules={[{ required: true, message: 'Please input verification code!' }]}>
              <Input.Password placeholder="6 digit verfication code" />
            </Form.Item>
            <div style={{ marginTop: 8, color: "rgba(0,0,0,0.45)" }}>Did not recieve any verification code? <a onClick={props.handleResendVerificationCode}>Resend code</a></div>
          </Form.Item>
          <p><b>New password</b></p>
          <Form.Item name='password' rules={[{ validator: passwordValidator }]}>
            <Input.Password placeholder="Your new password" />
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(preValue, curValue) => preValue.password !== curValue.password}>
            {({ getFieldValue }) => {
            return(
               <ul style={{ listStyleType:'none', paddingLeft:0 }}>
                  <li>{!upperCaseRegex.test(getFieldValue('password')) ? <CloseCircleFilled style={{color:'#FF4D4F', marginRight:'4px'}}/> : <CheckCircleFilled style={{color:'#34A853', marginRight:'4px'}}/>} Atleast one uppercase character</li>
                  <li>{!lowerCaseRegex.test(getFieldValue('password') ? getFieldValue('password') : '') ? <CloseCircleFilled style={{color:'#FF4D4F', marginRight:'4px'}}/> : <CheckCircleFilled style={{color:'#34A853', marginRight:'4px'}}/>} Atleast one lowercase character</li>
                  <li>{!digitCaseRegex.test(getFieldValue('password')) ? <CloseCircleFilled style={{color:'#FF4D4F', marginRight:'4px'}}/> : <CheckCircleFilled style={{color:'#34A853', marginRight:'4px'}}/>} Atleast one digit</li>
                  <li>{!specialCharRegex.test(getFieldValue('password')) ? <CloseCircleFilled style={{color:'#FF4D4F', marginRight:'4px'}}/> : <CheckCircleFilled style={{color:'#34A853', marginRight:'4px'}}/>} Atleast one special character</li>
                  <li>{!lengthRegex.test(getFieldValue('password') ? getFieldValue('password') : '') ? <CloseCircleFilled style={{color:'#FF4D4F', marginRight:'4px'}}/> : <CheckCircleFilled style={{color:'#34A853', marginRight:'4px'}}/>} 8 characters minimum</li>
                </ul>
                );
            }}
          </Form.Item>
          <Form.Item style={{ marginTop: 16 }} noStyle>
            <Button type='primary' block size="large" htmlType="submit">Reset password</Button>
          </Form.Item>
        </Form>
      </Card>
      <center><p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Back to <a style={{ color: '#ffffff' }} href="/login">Login</a></p></center>
    </React.Fragment>
  );
}

export default ResetPasswordForm;