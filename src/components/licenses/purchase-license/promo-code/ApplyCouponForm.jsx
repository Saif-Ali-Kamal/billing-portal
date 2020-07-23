import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { incrementPendingRequests, decrementPendingRequests, notify } from '../../../../utils';
import { applyPromoCode } from "../../../../operations/promoCodes"
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getBillingAccountCountry } from '../../../../operations/billingAccount';

function ApplyCouponForm() {
  const { billingId } = useParams()
  const [form] = Form.useForm()

  const billingCountry = useSelector(state => getBillingAccountCountry(state, billingId))
  const [appliedOnce, setAppliedOnce] = useState(false)

  const handleSubmit = ({ couponCode }) => {
    incrementPendingRequests()
    applyPromoCode(billingId, couponCode)
      .then((amount) => {
        const currencyNotation = billingCountry === "IN" ? "₹" : "$"
        notify("success", "Success", `Applied promo code successfully. ${currencyNotation}${amount / 100} credited to your billing account`)
        setAppliedOnce(true)
        form.resetFields(["couponCode"])
      })
      .catch((ex) => notify("error", "Error applying promo codes", ex))
      .finally(() => decrementPendingRequests())
  }
  return (
    <Form form={form} onFinish={handleSubmit} layout="horizontal">
      <p style={{ marginBottom: 0, marginTop: '32px' }}><b>Coupon code</b> (Optional)</p>
      <p style={{ marginTop: 0, fontSize: '14px', fontWeight: 300 }}>Apply a coupon code to get free credits to your billing account</p>
      <div style={{ display: "flex", width: "100%" }}>
        <Form.Item name="couponCode" style={{ flexGrow: 1 }} rules={[{ required: true, message: 'Please input coupon code' }]}>
          <Input placeholder="Coupon code" />
        </Form.Item>
        <Form.Item style={{ marginLeft: 16 }}>
          <Button htmlType="submit">Apply{appliedOnce ? " another" : ""}</Button>
        </Form.Item>
      </div>
    </Form>
  )
}
export default ApplyCouponForm
