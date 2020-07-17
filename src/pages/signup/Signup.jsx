import React from 'react';
import { useHistory } from 'react-router';
import SignupForm from '../../components/signup-form/SignupForm';
import './signup.css';
import { signup } from '../../operations/userManagement';
import { notify, incrementPendingRequests, decrementPendingRequests } from '../../utils';


const Signup = () => {
  const history = useHistory()
  const handleSignup = (name, organizationName, email, password) => {
    incrementPendingRequests()
    signup(name, organizationName, email, password)
      .then(() => {
        notify('sucess', 'Sucess', 'Signup successful')
        history.push("/enable-billing")
      })
      .catch(ex => notify('error', 'Error in signup', ex))
      .finally(() => decrementPendingRequests())
  }

  return (
    <React.Fragment>
      <div className='signup-background'>
        <div className='signup-card'>
          <SignupForm handleSubmit={handleSignup} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signup;