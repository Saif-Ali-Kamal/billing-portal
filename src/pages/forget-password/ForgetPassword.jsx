import React from 'react';
import ForgetPasswordForm from '../../components/forget-password-form/ForgetPasswordForm';
import './forget-password.css';

const ForgetPassword = () => {
  return (
    <React.Fragment>
      <div className='forget-password-background'>
        <div className='forget-password-card'>
          <ForgetPasswordForm />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ForgetPassword;