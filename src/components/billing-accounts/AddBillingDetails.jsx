import React, { useState } from 'react';
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import CardSection from './card-section/CardSection';
import { Form, Button, Input, Select, Card } from 'antd';
import countries from "./countries.json"
import { increment, decrement } from 'automate-redux';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_86Z4cMrqx8qC7bHLa0nLeQYs00D1MqsudX");
const countriesOptions = countries.map(obj => <Select.Option key={obj.code} value={obj.code}>{obj.name}</Select.Option>)

const BillingDetailsForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [invoiceId, setInvoiceId] = useState(undefined)

  return (
    <div>
      <Form>
        <p><b>Billing account name</b></p>
        <Form.Item name="name">
          <Input placeholder="Please input a billing account name!" />
        </Form.Item>
        <p><b>Add your card</b></p>
        <Form.Item>
          <Form.Item name="cardDetails">
            <CardSection />
          </Form.Item>
        </Form.Item>
        <p style={{ marginTop: '-24px' }}><b>Billing address</b></p>
        <Form.Item name="country" rules={[{ required: true, message: 'Please select your country' }]}>
          <Select placeholder="Select your country"
            showSearch
            optionFilterProp="children"
          >
            {countriesOptions}
          </Select>
        </Form.Item>
        <Form.Item name="line1" style={{ marginTop: '-8px' }}>
          <Input placeholder="Street" />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '24px' }}>Save your billing details</Button>
      </Form>
    </div>
  );
}

export default function AddBillingDetails({ handleSuccess }) {

  return (
    <Card style={{ padding: '24px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px' }}>
      <Elements stripe={stripePromise}>
        <BillingDetailsForm handleSuccess={handleSuccess} />
      </Elements>
    </Card>
  );
}