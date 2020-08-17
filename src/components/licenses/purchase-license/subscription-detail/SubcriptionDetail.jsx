import React from 'react';
import { Card, Button, Form, Checkbox, Select } from 'antd';
import ApplyCouponForm from "../promo-code/ApplyCouponForm";
import ConditionalFormBlock from "../../../conditional-form-block/ConditionalFormBlock";
import { capitalizeFirstCharacter } from '../../../../utils';
import { loadStripe } from '@stripe/stripe-js';
import { stripeKey } from '../../../../constant';
import { useStripe, Elements } from '@stripe/react-stripe-js';
const { Option } = Select;
const stripePromise = loadStripe(stripeKey);


const SubscriptionDetail = ({ handleSuccess, creditCards = [], planDetails = { meta: {} } }) => {
  const [form] = Form.useForm()
  const stripe = useStripe()
  const handleSubmitClick = (values) => {
    handleSuccess(stripe, values.creditCard)
  }

  return (
    <Card style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px', padding: '24px' }}>
      <p><b>Subscription details</b></p>
      <Card title={`${planDetails.name} Plan`} extra={<p style={{ margin: 0 }}><span style={{ color: "#34A853" }}>{planDetails.currency}{planDetails.amount}</span>/month</p>}>
        <p><b>Total Licenses</b>: {planDetails.licenses_count}</p>
        <p><b>Max Projects</b>: {planDetails.meta.maxProjects}</p>
        <p><b>Max Databases</b>: {planDetails.meta.maxDatabases}</p>
        <p><b>Integration Level</b>: {planDetails.meta.integrationLevel}</p>
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

const SubscriptionDetailWrapped = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <SubscriptionDetail {...props} />
    </Elements>
  )
}

export default SubscriptionDetailWrapped;