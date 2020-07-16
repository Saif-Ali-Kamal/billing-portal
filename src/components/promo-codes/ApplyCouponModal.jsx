import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Input } from 'antd';
import { increment, decrement } from 'automate-redux';

function ApplyCouponModal(props) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  
  return (
    <Modal
      title="Apply coupon"
      okText="Apply"
      visible={true}
      onOk={props.handleSubmit}
      onCancel={props.handleCancel}
    >
      <Form form={form}>
      <p style={{ marginBottom: 0}}><b>Promo code</b></p>
      <p style={{ marginTop: 0, fontSize: '14px', fontWeight: 300 }}>Apply a promo code to get free credits to your billing account</p>
      <Form.Item name="couponCode" rules={[{ required: true, message: 'Please provide a coupon code' }]}>
          <Input placeholder="Coupon code" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ApplyCouponModal