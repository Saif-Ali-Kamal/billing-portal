import React from 'react';
import { Card, Row, Col, Button, Typography } from 'antd';
import crownSvg from '../../../../assets/crown.svg';
import './select-plan.css';
import ReactMarkdown from "react-markdown"

function FlexContainer({ children }) {
  return (
    <div style={{ display: "flex", height: 300, flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
      {children}
    </div>
  )
}

export default function SelectPlan({ plans, handleSelectPlan, handleContactUs }) {
  return (
    <Row className="select-plan" gutter={[48, 48]} justify="center" >
      {plans.map(({ id, name, amount, currency, details }) => (
        <Col lg={{ span: 12 }} xl={{ span: 8 }}>
          <Card className="select-plan-card blue-card">
            <FlexContainer>
              <div>
                <h3 className="select-plan-plan blue">{name}</h3>
                <h1 className="select-plan-amount blue">{currency}{amount}</h1>
                <p className="select-plan-time blue">per month</p>
                <ReactMarkdown source={details} />
              </div>
              <Button size="large" className="select-plan-button blue-button" onClick={() => handleSelectPlan(id)}>Purchase</Button>
            </FlexContainer>
          </Card>
        </Col>
      ))}
      <Col lg={{ span: 12 }} xl={{ span: 8 }}>
        <Card className="select-plan-card purple-card">
          <FlexContainer>
            <div>
              <h3 className="select-plan-plan purple">BUSINESS</h3>
              <img src={crownSvg} height='48px' width='48px' style={{ marginBottom: '48px', marginTop: '24px' }} />
              <Typography.Paragraph style={{ marginBottom: 0 }} ellipsis>5 clusters</Typography.Paragraph>
              <Typography.Paragraph style={{ marginBottom: 0 }} ellipsis>5 projects</Typography.Paragraph>
              <Typography.Paragraph style={{ marginBottom: 0 }} ellipsis>Unlimited databases</Typography.Paragraph>
              <Typography.Paragraph style={{ marginBottom: 0 }} ellipsis>Email support (48 hrs response time)</Typography.Paragraph>
            </div>
            <Button size="large" className="select-plan-button purple-button" onClick={() => handleContactUs("Purchase Space Cloud Enterprise license")}>Contact us</Button>
          </FlexContainer>
        </Card>
      </Col>
      <Col lg={{ span: 24 }}>
        <Card className="select-plan-card" style={{ marginTop: "32px" }}>
          <span style={{ fontSize: "14px", marginRight: "24px" }}>Want to partner with us? Or want a premium support package to meet your uptime requirements?</span>
          <Button type="primary" ghost style={{ width: "188px" }} onClick={() => handleContactUs()}>Contact us</Button>
        </Card>
      </Col>
    </Row>
  );
}