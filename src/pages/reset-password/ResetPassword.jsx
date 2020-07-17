import React from 'react';
import ResetPasswordForm from '../../components/reset-password-form/ResetPasswordForm';
import './reset-password.css';

const ResetPassword = () => {
  return (
    <React.Fragment>
      <div className='reset-password-background'>
        <div className='reset-password-card'>
          <ResetPasswordForm />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ResetPassword;