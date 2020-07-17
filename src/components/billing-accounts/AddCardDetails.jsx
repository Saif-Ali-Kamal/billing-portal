import React from 'react';
import { useStripe, useElements, Elements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './card-section/CardSection';
import { Button, Card } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { stripeKey } from '../../constant';

const stripePromise = loadStripe(stripeKey);

const AddCardForm = ({ handleSubmit }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitClick = () => {
    if (!stripe || !elements) {
      return;
    }

    handleSubmit(stripe, CardElement)
  };
  return (
    <div>
      <p><b>Add your card</b></p>
      <CardSection />
      <Button type='primary' block size="large" onClick={handleSubmitClick} style={{ marginTop: 24 }}>Save your card details</Button>
    </div>
  );
}

export default function AddCardDetails({ handleSubmit }) {

  return (
    <Card style={{ padding: '24px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px' }}>
      <Elements stripe={stripePromise}>
        <AddCardForm handleSubmit={handleSubmit} />
      </Elements>
    </Card>
  );
}