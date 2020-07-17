import React from 'react';
import { Modal, Form, Input } from 'antd';

function ApplyCouponModal({ handleSubmit, handleCancel }) {
  const [form] = Form.useForm()

  const handleOk = () => {
    form.validateFields().then((values) => {
      handleSubmit(values.couponCode).then(() => handleCancel())
    })
  }
  return (
    <Modal
      title="Apply coupon"
      okText="Apply"
      visible={true}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form}>
        <p style={{ marginBottom: 0 }}><b>Promo code</b></p>
        <p style={{ marginTop: 0, fontSize: '14px', fontWeight: 300 }}>Apply a promo code to get free credits to your billing account</p>
        <Form.Item name="couponCode" rules={[{ required: true, message: 'Please provide a coupon code' }]}>
          <Input placeholder="Coupon code" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ApplyCouponModal