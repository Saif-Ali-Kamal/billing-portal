import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { InnerTopBar, Content } from '../../components/project-page-layout/ProjectPageLayout';
import AddBillingDetails from '../../components/billing-accounts/AddBillingDetails';
import { Row, Col } from 'antd';
import { incrementPendingRequests, decrementPendingRequests, notify } from '../../utils';
import { addBillingAccount } from '../../operations/billingAccount';
import { useHistory, useLocation } from 'react-router';

const AddBillingAccount = () => {
  const history = useHistory()
  const { state } = useLocation()
  const previousPath = state && state.from ? state.from : undefined

  useEffect(() => {
    ReactGA.pageview('/billing/billing-accounts/add-account');
  }, [])

  const handleAddBillingDetails = (stripeClient, cardElement, billingAccountName, address) => {
    incrementPendingRequests()
    addBillingAccount(stripeClient, cardElement, billingAccountName, address)
      .then(({ cardConfirmed, error }) => {
        notify("success", "Success", "Added billing account successfully")
        if (!cardConfirmed) {
          notify("error", "Error attaching card to your billing account", error, 15)
        }
        if (previousPath) {
          history.push(previousPath)
        }
      })
      .catch((ex) => notify("error", "Error adding billing account", ex))
      .finally(() => decrementPendingRequests())
  }

  return (
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem='billing-accounts' />
      <ProjectPageLayout>
        <InnerTopBar title="Add a billing account" previousPath={previousPath} />
        <Content>
          <Row>
            <Col lg={{ span: 12, offset: 6 }}>
              <AddBillingDetails handleSubmit={handleAddBillingDetails} />
            </Col>
          </Row>
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default AddBillingAccount;