import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import './password-field.css';

const PasswordField = () => {

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

  return(
    <React.Fragment>
      <Form.Item name='password' rules={[{ validator: passwordValidator }]}>
        <Input.Password placeholder="Type your password" />
      </Form.Item>
      <Form.Item noStyle shouldUpdate={(preValue, curValue) => preValue.password !== curValue.password}>
      {({ getFieldValue }) => {
        return (
          <ul class='password'>
            <Row>
              <Col span={12}>
                <li className={!upperCaseRegex.test(getFieldValue('password')) ? 'invalid' : 'valid'}> One uppercase character</li>
                <li className={!lowerCaseRegex.test(getFieldValue('password') ? getFieldValue('password') : '') ? 'invalid' : 'valid'}> One lowercase character</li>
                <li className={!digitCaseRegex.test(getFieldValue('password')) ? 'invalid' : 'valid'}> One digit</li>
              </Col>
              <Col span={12}>
                <li className={!specialCharRegex.test(getFieldValue('password')) ? 'invalid' : 'valid'}> One special character</li>
                <li className={!lengthRegex.test(getFieldValue('password') ? getFieldValue('password') : '') ? 'invalid' : 'valid'}> 8 characters minimum</li>
              </Col>
            </Row>
          </ul>
        );
      }}
      </Form.Item> 
    </React.Fragment>
  );
}

export default PasswordField;