import React from 'react';
import { Card, Button, Form, Checkbox, Select } from 'antd';
import ApplyCouponForm from "../promo-code/ApplyCouponForm";
import ConditionalFormBlock from "../../../conditional-form-block/ConditionalFormBlock";
import { capitalizeFirstCharacter } from '../../../../utils';
const { Option } = Select;

const SubscriptionDetail = ({ handleSuccess, creditCards = [], planDetails = { quotas: {} } }) => {
  const [form] = Form.useForm()
  const handleSubmitClick = (values) => {
    handleSuccess(values.creditCard)
  }

  return (
    <Card style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px', padding: '24px' }}>
      <p><b>Subscription details</b></p>
      <Card title={<p style={{ fontSize: "18px" }}>{planDetails.name} Plan</p>} extra={<p style={{ fontSize: "18px" }}><span style={{ color: "#34A853" }}>{planDetails.currency}{planDetails.amount}</span>/month</p>}>
        <p><b>Total Clusters</b>: {planDetails.quotas.maxClusters}</p>
        <p><b>Total Projects</b>: {planDetails.quotas.maxProjects}</p>
        <p><b>Total Databases</b>: {planDetails.quotas.maxDatabases} per project</p>
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
                creditCards.map(({ id, brand, last4, expiry }) => <Option id={id} >{`${capitalizeFirstCharacter(brand)} card (xxxx xxxx xxxx ${last4}) expiring on ${expiry}`}</Option>)
              }
            </Select>
          </Form.Item>
        </ConditionalFormBlock>
        <Form.Item>
          <Button type="primary" block style={{ marginTop: 16 }} size="large" htmlType="submit" >Start subscription</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default SubscriptionDetail;