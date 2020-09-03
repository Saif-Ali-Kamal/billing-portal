import React, { useState } from 'react';
import OTPInput from 'otp-input-react';
import './otp-field.css';

const OtpInputField = (props) => {

  const [otp, setOtp] = useState('')

  const handleOtpChange = (otp) => {
    setOtp(otp);
    props.onChange(otp)
  }

  return (
    <React.Fragment>
      <OTPInput
        value={otp}
        onChange={(code) => handleOtpChange(code)}
        autofocus
        OTPLength={6}
        otpType='number'
        className={`otp-input-container ${props.center ? "justify-center" : ""}`}
        inputClassName='otp-input'
        inputStyles={{ width: '28px', height: '28px', marginRight: '8px' }}
      />
    </React.Fragment>
  );
}

export default OtpInputField;