import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { InnerTopBar, Content } from '../../components/project-page-layout/ProjectPageLayout';
import AddCardDetails from "../../components/billing-accounts/AddCardDetails";
import { Row, Col } from 'antd';
import { incrementPendingRequests, decrementPendingRequests, notify } from '../../utils';
import { useHistory, useParams } from 'react-router';
import { addCard } from '../../operations/billingAccount';

const AddCard = () => {
  const history = useHistory()
  const { billingId } = useParams()

  useEffect(() => {
    ReactGA.pageview('/billing/billing-accounts/add-card');
  }, [])

  const handleAddCardDetails = (stripeClient, cardElement) => {
    incrementPendingRequests()
    addCard(billingId, stripeClient, cardElement)
      .then(() => {
        notify("success", "Success", "Added card successfully")
        history.goBack()
      })
      .catch((ex) => notify("error", "Error adding card details", ex))
      .finally(() => decrementPendingRequests())
  }

  return (
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem='billing-accounts' />
      <ProjectPageLayout>
        <InnerTopBar title="Add a card" />
        <Content>
          <Row>
            <Col lg={{ span: 8, offset: 8 }}>
              <AddCardDetails handleSubmit={handleAddCardDetails} />
            </Col>
          </Row>
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default AddCard;