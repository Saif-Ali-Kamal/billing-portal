import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { InnerTopBar, Content } from '../../components/project-page-layout/ProjectPageLayout';
import AddCardDetails from "../../components/billing-accounts/AddCardDetails";
import { Row, Col } from 'antd';

const AddCard = () => {
  useEffect(() => {
    ReactGA.pageview('/billing/billing-accounts/add-card');
  }, [])

  return (
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem='billing-accounts' />
      <ProjectPageLayout>
        <InnerTopBar title="Add a card" />
        <Content>
          <Row>
            <Col lg={{ span: 8, offset: 8 }}>
              <AddCardDetails />
            </Col>
          </Row>
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default AddCard;