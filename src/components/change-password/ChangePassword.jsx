import React from 'react';
import { Modal, Form, Input } from 'antd';

const ChangePassword = ({ handleSubmit, handleCancel }) => {
  const [form] = Form.useForm()
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
        <Form.Item name='newPassword' rules={[{ required: true, message: 'Please input new password!' }]}>
          <Input.Password placeholder='New password' />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ChangePassword;