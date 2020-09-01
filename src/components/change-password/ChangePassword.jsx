import React from 'react';
import { Modal, Form, Input } from 'antd';
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons'

const ChangePassword = ({ handleSubmit, handleCancel }) => {
  const [form] = Form.useForm()

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

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        handleSubmit(values.currentPassword, values.newPassword)
          .then(() => handleCancel())
      })
  }
  return (
    <Modal
      title='Change password'
      visible={true}
      okText='Save'
      onOk={handleOk}
      onCancel={handleCancel}>
      <Form form={form}>
        <p><b>Current password</b></p>
        <Form.Item name='currentPassword' rules={[{ required: true, message: 'Please input your current password!' }]}>
          <Input.Password placeholder='Current password' />
        </Form.Item>
        <p><b>New password</b></p>
        <Form.Item name='newPassword' rules={[{ validator: passwordValidator }]}>
          <Input.Password placeholder='New password' />
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(preValue, curValue) => preValue.newPassword !== curValue.newPassword}>
            {({ getFieldValue }) => {
            return(
               <ul style={{ listStyleType:'none', marginBottom:0, paddingLeft:0 }}>
                  <li>{!upperCaseRegex.test(getFieldValue('newPassword')) ? <CloseCircleFilled style={{color:'#FF4D4F', marginRight:'4px'}}/> : <CheckCircleFilled style={{color:'#34A853', marginRight:'4px'}}/>} Atleast one uppercase character</li>
                  <li>{!lowerCaseRegex.test(getFieldValue('newPassword') ? getFieldValue('newPassword') : '') ? <CloseCircleFilled style={{color:'#FF4D4F', marginRight:'4px'}}/> : <CheckCircleFilled style={{color:'#34A853', marginRight:'4px'}}/>} Atleast one lowercase character</li>
                  <li>{!digitCaseRegex.test(getFieldValue('newPassword')) ? <CloseCircleFilled style={{color:'#FF4D4F', marginRight:'4px'}}/> : <CheckCircleFilled style={{color:'#34A853', marginRight:'4px'}}/>} Atleast one digit</li>
                  <li>{!specialCharRegex.test(getFieldValue('newPassword')) ? <CloseCircleFilled style={{color:'#FF4D4F', marginRight:'4px'}}/> : <CheckCircleFilled style={{color:'#34A853', marginRight:'4px'}}/>} Atleast one special character</li>
                  <li>{!lengthRegex.test(getFieldValue('newPassword') ? getFieldValue('newPassword') : '') ? <CloseCircleFilled style={{color:'#FF4D4F', marginRight:'4px'}}/> : <CheckCircleFilled style={{color:'#34A853', marginRight:'4px'}}/>} 8 characters minimum</li>
                </ul>
                );
            }}
          </Form.Item>
      </Form>
    </Modal>
  );
}

export default ChangePassword;