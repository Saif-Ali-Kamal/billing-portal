import React from 'react';
import SigninForm from '../../components/signin-form/SigninForm';
import './signin.css'
import { login } from '../../operations/userManagement';
import { notify, incrementPendingRequests, decrementPendingRequests, performOnTokenActions } from '../../utils';

const Signin = () => {

  const handleSignin = (email, password) => {
    incrementPendingRequests()
    login(email, password)
      .then(() => {
        notify('sucess', 'Sucess', 'Login successful');
        performOnTokenActions()
      })
      .catch(ex => notify('error', 'Error in login', ex))
      .finally(() => decrementPendingRequests())
  }

  return (
    <React.Fragment>
      <div className='signin-background'>
        <div className='signin-card'>
          <SigninForm handleSubmit={handleSignin} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signin;