import React, { useState } from 'react';
import Topbar from '../../components/topbar/Topbar';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
import { Steps, Row, Col } from 'antd';
import VerifyAccount from '../../components/verify-account/VerifyAccount';
import AddBillingDetails from '../../components/billing-accounts/AddBillingDetails';

const AddAccount = () => {

  const { Step } = Steps;
  const [current, SetCurrent] = useState(0)

  const steps = [{
    title: 'Verify email',
    content: <React.Fragment>
      <Row>
        <Col lg={{ span: 8, offset: 8 }}>
          <VerifyAccount handleSubmit={() => SetCurrent(current + 1)} />
        </Col>
      </Row>
    </React.Fragment>
  },
  {
    title: 'Setup billing',
    content: <Row>
      <Col lg={{ span: 8, offset: 8 }}>
        <AddBillingDetails handleSuccess={() => SetCurrent(current + 1)}/>
      </Col>
    </Row>
  }]

  return(
    <React.Fragment>
      <Topbar  />
      <Content>
      <Row>
        <Col lg={{ span: 8, offset: 8 }} xs={{ span: 24 }} >
          <Steps current={current} style={{ margin:'82px 0 16px 0' }} className="upgrade-steps" size="small">
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

export default AddAccount;