import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { InnerTopBar, Content } from '../../components/project-page-layout/ProjectPageLayout';
import AddCardDetails from "../../components/billing-accounts/AddCardDetails";
import { Row, Col } from 'antd';
import { incrementPendingRequests, decrementPendingRequests, notify } from '../../utils';
import { useHistory, useParams, useLocation } from 'react-router';
import { addCard } from '../../operations/billingAccount';

const AddCard = () => {
  const history = useHistory()
  const { billingId } = useParams()
  const { state } = useLocation()
  const previousPath = state && state.from ? state.from : undefined

  useEffect(() => {
    ReactGA.pageview('/billing/billing-accounts/add-card');
  }, [])

  const handleAddCardDetails = (stripeClient, cardElement) => {
    incrementPendingRequests()
    addCard(billingId, stripeClient, cardElement)
      .then(() => {
        notify("success", "Success", "Added card successfully")
        if (previousPath) {
          history.push(previousPath)
        }
      })
      .catch((ex) => notify("error", "Error adding card details", ex))
      .finally(() => decrementPendingRequests())
  }

  return (
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem='billing-accounts' />
      <ProjectPageLayout>
        <InnerTopBar title="Add a card" previousPath={previousPath} />
        <Content>
          <Row>
            <Col lg={{ span: 12, offset: 6 }}>
              <AddCardDetails handleSubmit={handleAddCardDetails} />
            </Col>
          </Row>
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default AddCard;