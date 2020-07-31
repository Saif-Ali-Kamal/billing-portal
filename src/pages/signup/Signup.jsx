import React from 'react';
import { useHistory } from 'react-router';
import SignupForm from '../../components/signup-form/SignupForm';
import './signup.css';
import { signup } from '../../operations/userManagement';
import { Row, Col } from "antd"
import { notify, incrementPendingRequests, decrementPendingRequests } from '../../utils';


const Signup = () => {
  const history = useHistory()
  const handleSignup = (name, organizationName, email, password) => {
    incrementPendingRequests()
    signup(name, organizationName, email, password)
      .then(() => {
        notify('success', 'Success', 'Signup successful')
        history.push("/enable-billing")
      })
      .catch(ex => notify('error', 'Error in signup', ex))
      .finally(() => decrementPendingRequests())
  }

  return (
    <React.Fragment>
      <div className='signup-background'>
        <Row align="middle" style={{ height: "100%" }}>
          <Col xl={{ span: 10, offset: 7 }} lg={{ span: 12, offset: 6 }} md={{ span: 18, offset: 3 }} sm={{ span: 21, offset: 1 }}>
            <SignupForm handleSubmit={handleSignup} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Signup;