import React, { useState } from 'react';
import OTPInput from 'otp-input-react';
import './otp-field.css';

const OtpInputField = (props) => {

  const [otp, setOtp] = useState('')

  const handleOtpChange = (otp) => {
    setOtp(otp);
    props.onChange(otp)
  } 

  return(
    <React.Fragment>
      <OTPInput
        value={otp}
        onChange={(code) => handleOtpChange(code)}
        autofocus
        OTPLength={6}
        otpType='number'
        className='otp-input-container'
        inputClassName='otp-input'
        inputStyles={{ width: '28px', height: '28px', marginRight: '8px' }}
      />
      {/* {otp.length > 0 && otp.length < 6 && <p style={{ color: '#FF4D4F', marginTop: '8px' }}>Please input 6 digit verification code</p>} */}
    </React.Fragment>
  );
} 

export default OtpInputField;