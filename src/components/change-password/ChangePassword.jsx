import React from 'react';
import { Modal, Form, Input } from 'antd';

const ChangePassword = (props) => {
  return(
    <Modal
      title='Change password'
      visible={true}
      okText='Save'
      onOk={props.handleChangePassword}
      onCancel={props.handleCancel}>
      <Form>
        <p><b>Current password</b></p>
        <Form.Item name='currentPassword' rules={[{ required:true, message:'Please input your current password!'}]}>
          <Input.Password placeholder='Current password' />
        </Form.Item>
        <p><b>New password</b></p>
        <Form.Item name='newPassword' rules={[{ required:true, message:'Please input new password!'}]}>
          <Input.Password placeholder='New password' />
        </Form.Item>
        <p><b>Confirm password</b></p>
        <Form.Item name='confirmPassword' rules={[{ required:true, message:'Please input confirm password!'}]}>
          <Input.Password placeholder='Confirm password' />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ChangePassword;