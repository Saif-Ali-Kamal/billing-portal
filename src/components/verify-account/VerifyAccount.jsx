import React, { useState } from 'react';
import { Card, Button } from 'antd';
import emailSvg from '../../assets/email.svg';
import OTPInput from 'otp-input-react';
import './verify-account.css';

const VerifyAccount = ({ email = "", handleSubmit, handleResendVerificationCode }) => {

  const emailToShow = `${email.slice(0, 2)}${"*".repeat(email.length > 2 ? email.length - 2 : 0)}`
  const canShowEmail = email ? true : false
  const [otp, setOtp] = useState('')

  const handleSubmitClick = (otp) => {
    if (otp.length === 6) {
      handleSubmit(otp)
    }
  }

  return (
    <React.Fragment>
      <Card style={{ textAlign: 'center' }}>
        <img src={emailSvg} />
        <h3 style={{ marginBottom: 0 }}>Verification</h3>
        {canShowEmail && <React.Fragment>
          <p style={{ marginBottom: 0 }}>We have sent you a verification code on your email at</p>
          <p style={{ marginBottom: '48px' }}>{emailToShow}</p>
        </React.Fragment>}
        {!canShowEmail && <p style={{ marginBottom: '48px' }}>We have sent you a verification code on your email</p>}
        <OTPInput
          value={otp}
          onChange={(code) => setOtp(code)}
          autofocus
          OTPLength={6}
          otpType='number'
          className='otp-input'
          inputStyles={{ width: '28px', height: '28px', marginRight: '8px' }}
        />
        {otp.length > 0 && otp.length < 6 && <p style={{ color: '#FF4D4F', marginTop: '8px' }}>Please input 6 digit verification code</p>}
        <Button type="primary" block disabled={otp.length !== 6} size="large" style={{ marginBottom: '16px', marginTop: '32px' }} onClick={() => handleSubmitClick(otp)}>Verify</Button>
        <a onClick={handleResendVerificationCode}>Resend verification code</a>
      </Card>
    </React.Fragment>
  );
}

export default VerifyAccount;