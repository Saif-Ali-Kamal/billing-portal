import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Row, Col, Steps } from 'antd';
import { useHistory, useParams } from 'react-router';
import Sidenav from '../../components/sidenav/Sidenav';
import Topbar from '../../components/topbar/Topbar';
import ProjectPageLayout, { InnerTopBar, Content } from '../../components/project-page-layout/ProjectPageLayout';
import SelectPlan from '../../components/licenses/purchase-license/select-plan/SelectPlan';
import SubscriptionDetail from '../../components/licenses/purchase-license/subscription-detail/SubcriptionDetail';
import ApplyLicenseKey from '../../components/licenses/purchase-license/apply-license-key/ApplyLicenseKey';
const { Step } = Steps;

const Licenses = () => {
  useEffect(() => {
    ReactGA.pageview("/billing/licenses/purchase-license");
  }, [])

  const history = useHistory();
  const { billingId } = useParams();

  const [current, setCurrent] = useState(0);

  const handleContactUs = () => history.push(`/billing/${billingId}/contact-us`)

  const steps = [{
    title: 'Select license',
    content: <React.Fragment>
      <Row>
        <Col lg={{ span: 18, offset: 3 }}>
          <SelectPlan selectedPlan='space-cloud-open' handleContactUs={handleContactUs} handleSelectPlan={() => setCurrent(current + 1)} />
        </Col>
      </Row>
    </React.Fragment>
  },
  {
    title: 'Start subscription',
    content: <Row>
      <Col lg={{ span: 18, offset: 3 }}>
        <SubscriptionDetail handleSuccess={() => setCurrent(current + 1)} />
      </Col>
    </Row>
  },
  {
    title: 'Apply license key',
    content: <Row>
      <Col lg={{ span: 18, offset: 3 }}>
        <ApplyLicenseKey />
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

export default Licenses;