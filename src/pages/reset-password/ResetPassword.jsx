import React from 'react';
import ResetPasswordForm from '../../components/reset-password-form/ResetPasswordForm';
import './reset-password.css';
import { resetPassword, sendForgotPasswordEmail } from '../../operations/userManagement';
import { useLocation, useHistory } from 'react-router';
import { notify, incrementPendingRequests, decrementPendingRequests } from '../../utils';

const ResetPassword = () => {
  const { state } = useLocation()
  const history = useHistory()

  const handleResetPassword = (verificationCode, password) => {
    incrementPendingRequests()
    resetPassword(verificationCode, password)
      .then(() => {
        notify("success", "Success", "Password resetted successfully. Login with the new password.")
        history.push('/login')
      }) 
      .catch(ex => notify('error', 'Error resetting password', ex))
      .finally(() => decrementPendingRequests())
  }

  const handleResendVerificationCode = () => {
    incrementPendingRequests()
    sendForgotPasswordEmail(state.email)
      .then(() => notify("success", "Success", "Sent verification code successfully"))
      .catch(ex => notify('error', 'Error sending verification code', ex))
      .finally(() => decrementPendingRequests())
  }
  return (
    <React.Fragment>
      <div className='reset-password-background'>
        <div className='reset-password-card'>
          <ResetPasswordForm handleSubmit={handleResetPassword} handleResendVerificationCode={handleResendVerificationCode} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ResetPassword;