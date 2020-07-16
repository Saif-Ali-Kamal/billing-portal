import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { InnerTopBar, Content } from '../../components/project-page-layout/ProjectPageLayout';
import AddBillingDetails from '../../components/billing-accounts/AddBillingDetails';
import { Row, Col } from 'antd';

const AddBillingAccount = () => {
  useEffect(() =>{
    ReactGA.pageview('/billing/billing-accounts/add-account');
  }, [])

  return(
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem='billing-accounts' />
      <ProjectPageLayout>
        <InnerTopBar title="Add a billing account" />
        <Content>
          <Row>
            <Col lg={{ span:12, offset: 6 }}>
              <AddBillingDetails />
            </Col>
          </Row>
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default AddBillingAccount;