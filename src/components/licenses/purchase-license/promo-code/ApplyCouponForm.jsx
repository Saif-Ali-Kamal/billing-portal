import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Input, Button } from 'antd';
import { increment, decrement } from 'automate-redux';

function ApplyCouponForm() {
  const dispatch = useDispatch()
  
  return (
    <Form>
      <p style={{ marginBottom: 0, marginTop: '32px' }}><b>Coupon code</b> (Optional)</p>
      <p style={{ marginTop: 0, fontSize: '14px', fontWeight: 300 }}>Apply a coupon code to get free credits to your billing account</p>
      <Row>
        <Col xs={{ span: 18 }}>
          <Form.Item name="couponCode" rules={[{ required: true, message: 'Please input coupon code' }]}>
            <Input placeholder="Coupon code" />
          </Form.Item>
        </Col>
        <Col xs={{ span: 5, offset: 1 }}>
          <Button htmlType="submit">Apply</Button>
        </Col>
      </Row>
    </Form>
  )
}
export default ApplyCouponForm
