import React from 'react';
import { Row, Col, Card, Button, Form, Checkbox, Select } from 'antd';
import ApplyCouponForm from "../promo-code/ApplyCouponForm";
import ConditionalFormBlock from "../../../conditional-form-block/ConditionalFormBlock";
const { Option } = Select;

const SubscriptionDetail = ({ handleSuccess, creditCards = [] }) => {
  const [form] = Form.useForm()
  const handleSubmitClick = (values) => {
    handleSuccess(values.creditCard)
  }

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
          <Form form={form} onFinish={handleSubmitClick} initialValues={{ useDefaultCard: true }}>
            <p><b>Payment method</b></p>
            <Form.Item name="useDefaultCard" valuePropName="checked">
              <Checkbox>
                Use the default credit card of the billing account
              </Checkbox>
            </Form.Item>
            <ConditionalFormBlock dependency="useDefaultCard" condition={() => !form.getFieldValue("useDefaultCard")}>
              <Form.Item name="creditCard">
                <Select placeholder="Select a card">
                  {
                    creditCards.map(({ id, brand, last4, expiry }) => <Option id={id} >{`${brand} card (xxxx xxxx xxxx ${last4}) expiring on ${expiry}`}</Option>)
                  }
                </Select>
              </Form.Item>
            </ConditionalFormBlock>
            <Form.Item>
              <Button type="primary" block style={{ marginTop: 16 }} size="large" >Start subscription</Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default SubscriptionDetail;