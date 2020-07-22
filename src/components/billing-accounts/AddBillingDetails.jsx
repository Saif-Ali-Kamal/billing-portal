import React from 'react';
import { useStripe, useElements, Elements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './card-section/CardSection';
import { Form, Button, Input, Select, Card } from 'antd';
import countries from "./countries.json"
import { loadStripe } from '@stripe/stripe-js';
import { stripeKey } from '../../constant';

const stripePromise = loadStripe(stripeKey);
const countriesOptions = countries.map(obj => <Select.Option key={obj.code} value={obj.code}>{obj.name}</Select.Option>)

const BillingDetailsForm = ({ handleSubmit }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitClick = ({ cardDetails, name, ...address }) => {
    if (!stripe || !elements) {
      return;
    }

    handleSubmit(stripe, elements.getElement(CardElement) , name, address)
  };
  return (
    <div>
      <Form onFinish={handleSubmitClick} initialValues={{ name: "My Billing Account 1" }}>
        <p><b>Billing account name</b></p>
        <Form.Item name="name">
          <Input placeholder="Please input a billing account name!" />
        </Form.Item>
        <p><b>Add your card</b></p>
        <Form.Item name="cardSection">
          <CardSection />
        </Form.Item>
        <p style={{ marginTop: 24 }}><b>Billing address</b></p>
        <Form.Item name="country" rules={[{ required: true, message: 'Please select your country' }]}>
          <Select placeholder="Select your country"
            showSearch
            optionFilterProp="children"
          >
            {countriesOptions}
          </Select>
        </Form.Item>
        <Form.Item name="line1" rules={[{ required: true, message: 'Please input your street' }]} >
          <Input placeholder="Street" />
        </Form.Item>
        <Form.Item noStyle>
          <Button type='primary' block size="large" htmlType="submit" style={{ marginTop: 16 }}>Save your billing details</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default function AddBillingDetails({ handleSubmit }) {

  return (
    <Card style={{ padding: '24px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px' }}>
      <Elements stripe={stripePromise}>
        <BillingDetailsForm handleSubmit={handleSubmit} />
      </Elements>
    </Card>
  );
}