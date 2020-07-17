import React from 'react';
import { useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import CardSection from './card-section/CardSection';
import { Button, Card } from 'antd';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_86Z4cMrqx8qC7bHLa0nLeQYs00D1MqsudX");

const AddCardForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <div>
      <p><b>Add your card</b></p>
      <CardSection />
      <Button type='primary' block size="large" htmlType="submit" style={{ marginTop: 24 }}>Save your card details</Button>
    </div>
  );
}

export default function AddCardDetails({ handleSuccess }) {

  return (
    <Card style={{ padding: '24px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px' }}>
      <Elements stripe={stripePromise}>
        <AddCardForm handleSuccess={handleSuccess} />
      </Elements>
    </Card>
  );
}