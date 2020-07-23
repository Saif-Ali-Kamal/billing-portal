import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useStripe } from '@stripe/react-stripe-js'
import { Row, Col, Steps } from 'antd';
import { useHistory, useParams } from 'react-router';
import Sidenav from '../../components/sidenav/Sidenav';
import Topbar from '../../components/topbar/Topbar';
import ProjectPageLayout, { InnerTopBar, Content } from '../../components/project-page-layout/ProjectPageLayout';
import SelectPlan from '../../components/licenses/purchase-license/select-plan/SelectPlan';
import SubscriptionDetail from '../../components/licenses/purchase-license/subscription-detail/SubcriptionDetail';
import ApplyLicenseKey from '../../components/licenses/purchase-license/apply-license-key/ApplyLicenseKey';
import { getCards } from "../../operations/billingAccount"
import { createSubscription } from "../../operations/licenses";
import { notify, incrementPendingRequests, decrementPendingRequests } from '../../utils';
import { useSelector } from 'react-redux';
import { loadPlans, getPlans } from '../../operations/plans';

const { Step } = Steps;

const PurchaseLicense = () => {
  useEffect(() => {
    ReactGA.pageview("/billing/licenses/purchase-license");
  }, [])

  useEffect(() => {
    incrementPendingRequests()
    loadPlans()
      .catch((ex) => notify("error", "Error fetching plans", ex))
      .finally(() => decrementPendingRequests())
  }, [])

  const history = useHistory();
  const { billingId } = useParams();
  const stripe = useStripe();

  // Component state
  const [current, setCurrent] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState("")
  const [purchasedLicenseId, setPurchasedLicenseId] = useState("1b6b8a79-d4c6-45c8-a4a9-84ff6ec6036d")

  // Global state
  const cards = useSelector(state => getCards(state, billingId))
  const plans = useSelector(state => getPlans(state, billingId))

  // Derived state
  const selectedPlanDetails = plans.find(obj => obj.id === selectedPlanId)

  // Handlers
  const handleContactUs = (subject) => history.push(`/billing/${billingId}/contact-us`, { subject })

  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId)
    setCurrent(current + 1)
  }

  const handlePurchaseLicense = (cardId) => {
    incrementPendingRequests()
    createSubscription(stripe, billingId, selectedPlanId, cardId)
      .then((licenseId) => {
        notify("success", "Success", "Purchased license successfully")
        setPurchasedLicenseId(licenseId)
        setCurrent(current + 1)
      })
      .catch(ex => notify("error", "Error purchasing license", ex))
      .finally(() => decrementPendingRequests())
  }
  const steps = [{
    title: 'Select license',
    content: <React.Fragment>
      <Row>
        <Col lg={{ span: 18, offset: 3 }}>
          <SelectPlan handleContactUs={handleContactUs} handleSelectPlan={handleSelectPlan} plans={plans} />
        </Col>
      </Row>
    </React.Fragment>
  },
  {
    title: 'Start subscription',
    content: <Row>
      <Col lg={{ span: 12, offset: 6 }}>
        <SubscriptionDetail handleSuccess={handlePurchaseLicense} planDetails={selectedPlanDetails} creditCards={cards} />
      </Col>
    </Row>
  },
  {
    title: 'Apply license key',
    content: <Row>
      <Col lg={{ span: 18, offset: 3 }}>
        <ApplyLicenseKey licenseId={purchasedLicenseId} />
      </Col>
    </Row>
  }]

  return (
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem='licenses' />
      <ProjectPageLayout>
        <InnerTopBar title='Purchase license' />
        <Content>
          <Row>
            <Col xl={{ span: 14, offset: 5 }} lg={{ span: 20, offset: 2 }} xs={{ span: 24 }} >
              <Steps current={current} className="upgrade-steps" size="small">
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps><br />
            </Col>
          </Row>
          {steps[current].content}
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default PurchaseLicense;