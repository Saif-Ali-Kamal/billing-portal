import React from 'react';
import SigninForm from '../../components/signin-form/SigninForm';
import './signin.css'
import { signin } from '../../operations/userManagement';
import { increment, decrement } from 'automate-redux';
import { useDispatch } from 'react-redux';
import { notify } from '../../utils';

const Signin = () => {

  const dispatch = useDispatch();
  
  const handleSignin = (email, password) => {
    dispatch(increment("pendingRequests"));
    signin(email, password).then(() => {
      notify('sucess', 'Sucess', 'Sucessfully signin');
    }).catch(error => notify('error', 'Error', error.toString()))
    .finally(() => dispatch(decrement("pendingRequests")))
  } 

  return(
    <React.Fragment>
      <div className='signin-background'>
        <div className='signin-card'>
          <SigninForm handleSignin={handleSignin} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signin;