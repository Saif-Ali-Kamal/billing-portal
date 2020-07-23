import React, { useState } from 'react';
import Topbar from '../../components/topbar/Topbar';
import { Content } from '../../components/project-page-layout/ProjectPageLayout';
import { Steps, Row, Col } from 'antd';
import VerifyAccount from '../../components/verify-account/VerifyAccount';
import AddBillingDetails from '../../components/billing-accounts/AddBillingDetails';
import { useSelector } from 'react-redux';
import { isEmailVerified, isBillingEnabled, verifyEmail, resendEmailVerificationCode, getProfile } from '../../operations/userManagement';
import { openBillingAccount, incrementPendingRequests, notify, decrementPendingRequests } from '../../utils';
import { addBillingAccount } from '../../operations/billingAccount';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
const { Step } = Steps;

const EnableBilling = () => {

  const history = useHistory();

  // Global state
  const { email } = useSelector(state => getProfile(state))
  const emailVerified = useSelector(state => isEmailVerified(state))
  const billingEnabled = useSelector(state => isBillingEnabled(state))
  const initialStep = emailVerified ? 1 : 0
  const [current, setCurrent] = useState(initialStep)

  useEffect(() => {
    setCurrent(initialStep)
  }, [initialStep])

  // Handlers
  const handleVerify = (code) => {
    incrementPendingRequests()
    verifyEmail(code)
      .then(() => {
        notify("success", "Success", "Verified email successfully")
        setCurrent(current + 1)
      })
      .catch(ex => notify("error", "Error verifying email", ex))
      .finally(() => decrementPendingRequests())
  }

  const handleResendVerificationCode = () => {
    incrementPendingRequests()
    resendEmailVerificationCode()
      .then(() => notify("success", "Success", "Sent email verification code again successfully"))
      .catch(ex => notify("error", "Error verifying email", ex))
      .finally(() => decrementPendingRequests())
  }

  const handleAddBillingDetails = (stripeClient, cardElement, billingAccountName, address) => {
    incrementPendingRequests()
    addBillingAccount(stripeClient, cardElement, billingAccountName, address)
      .then(({ billingId, cardConfirmed, error }) => {
        notify("success", "Success", "Added billing account successfully")
        if (!cardConfirmed) {
          notify("error", "Error attaching card to your billing account", error, 15)
        }

        openBillingAccount(billingId)
      })
      .catch((ex) => notify("error", "Error adding billing account", ex))
      .finally(() => decrementPendingRequests())
  }

  const steps = [
    {
      title: 'Verify email',
      content: <React.Fragment>
        <Row>
          <Col lg={{ span: 8, offset: 8 }}>
            <VerifyAccount email={email} handleSubmit={handleVerify} handleResendVerificationCode={handleResendVerificationCode} />
          </Col>
        </Row>
      </React.Fragment>
    },
    {
      title: 'Setup billing',
      content: <Row>
        <Col lg={{ span: 8, offset: 8 }}>
          <AddBillingDetails handleSubmit={handleAddBillingDetails} />
        </Col>
      </Row>
    }
  ]

  if (emailVerified && billingEnabled) {
    openBillingAccount()
  }

  return (
    <React.Fragment>
      <Topbar />
      <Content>
        <Row>
          <Col lg={{ span: 8, offset: 8 }} xs={{ span: 24 }} >
            <Steps current={current} style={{ margin: '82px 0 16px 0' }} className="upgrade-steps" size="small">
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps><br />
          </Col>
        </Row>
        {steps[current].content}
      </Content>
    </React.Fragment>
  );
}

export default EnableBilling;