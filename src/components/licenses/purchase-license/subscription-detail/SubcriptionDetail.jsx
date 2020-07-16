import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Row, Col, Card, Button } from 'antd';
import ApplyCouponForm from "../promo-code/ApplyCouponForm";
import { increment, decrement } from 'automate-redux';

const SubscriptionDetail = ({ plan, countryCode, handleSuccess }) => {
  const dispatch = useDispatch()
  
  return (
    <Row>
      <Col xl={{ span: 12, offset: 6 }} lg={{ span: 20, offset: 2 }}>
        <Card style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px', padding: '24px' }}>
          <p><b>Subscription details</b></p>
          <Card title={<p style={{ fontSize: "18px" }}>Pro Plan</p>} extra={<p style={{ fontSize: "18px" }}><span style={{ color: "#34A853" }}>$25</span>/month</p>}>
            <p><b>Total Projects</b>: 1</p>
            <p><b>Total Databases</b>: 3 per project</p>
          </Card>
          <ApplyCouponForm />
          <Button type="primary" style={{ width: '100%', marginTop: '24px' }} onClick={handleSuccess}>Start subscription</Button>
        </Card>
      </Col>
    </Row>
  );
}

export default SubscriptionDetail;