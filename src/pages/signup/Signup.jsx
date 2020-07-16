import React from 'react';
import SignupForm from '../../components/signup-form/SignupForm';
import './signup.css';
import { signup } from '../../operations/userManagement';
import { increment, decrement } from 'automate-redux';
import { useDispatch } from 'react-redux';
import { notify } from '../../utils';


const Signup = () => {

  const dispatch = useDispatch();
  
  const handleSignup = (name, organizationName, email, password) => {
    dispatch(increment("pendingRequests"));
    signup(name, organizationName, email, password).then(() => {
      notify('sucess', 'Sucess', 'Sucessfully signup');
    }).catch(error => notify('error', 'Error', error.toString()))
    .finally(() => dispatch(decrement("pendingRequests")))
  }

  return(
    <React.Fragment>
      <div className='signup-background'>
        <div className='signup-card'>
            <SignupForm handleSignup={handleSignup} />
          </div>
      </div>
    </React.Fragment>
  );
}

export default Signup;