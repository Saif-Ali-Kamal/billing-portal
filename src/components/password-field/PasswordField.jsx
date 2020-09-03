import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import './password-field.css';

const PasswordField = ({ fieldName = "password" }) => {

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
      cb("Please fulfill below requirements for a strong password.")
      return
    }
    cb()
  }

  return (
    <React.Fragment>
    <Form.Item name={fieldName} rules={[{ validator: passwordValidator, validateTrigger: "onBlur" }]}>
        <Input.Password placeholder="Type your password" />
      </Form.Item>
      <Form.Item noStyle shouldUpdate={(preValue, curValue) => preValue[fieldName] !== curValue[fieldName]}>
        {({ getFieldValue }) => {
          return (
            <ul class='password'>
              <Row>
                <Col span={12}>
                  <li className={!upperCaseRegex.test(getFieldValue(fieldName)) ? 'invalid' : 'valid'}> One uppercase character</li>
                  <li className={!lowerCaseRegex.test(getFieldValue(fieldName) ? getFieldValue(fieldName) : '') ? 'invalid' : 'valid'}> One lowercase character</li>
                  <li className={!digitCaseRegex.test(getFieldValue(fieldName)) ? 'invalid' : 'valid'}> One digit</li>
                </Col>
                <Col span={12}>
                  <li className={!specialCharRegex.test(getFieldValue(fieldName)) ? 'invalid' : 'valid'}> One special character</li>
                  <li className={!lengthRegex.test(getFieldValue(fieldName) ? getFieldValue(fieldName) : '') ? 'invalid' : 'valid'}> 8 characters minimum</li>
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