import React from 'react';
import ForgetPasswordForm from '../../components/forget-password-form/ForgetPasswordForm';
import './forget-password.css';
import { incrementPendingRequests, decrementPendingRequests, notify } from '../../utils';
import { sendForgotPasswordEmail } from '../../operations/userManagement';
import { useHistory } from 'react-router';

const ForgetPassword = () => {
  const history = useHistory()

  const handleSendForgetPasswordEmail = (email) => {
    incrementPendingRequests()
    sendForgotPasswordEmail(email)
      .then(() => {
        notify("success", "Success", "Sent verification code to your email")
        history.push(`/reset-password?email=${email}`, { email })
      })
      .catch(ex => notify('error', 'Error sending verification code', ex))
      .finally(() => decrementPendingRequests())
  }
  return (
    <React.Fragment>
      <div className='forget-password-background'>
        <div className='forget-password-card'>
          <ForgetPasswordForm handleSubmit={handleSendForgetPasswordEmail} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ForgetPassword;