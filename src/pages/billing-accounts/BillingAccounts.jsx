import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
import { useHistory } from 'react-router';
import ReactGA from 'react-ga';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
 
const BillingAccounts = () => {
  useEffect(() => {
    ReactGA.pageview("/billing/billing-accounts");
  }, [])

  const history = useHistory();

  const billingAccountColumn = [{
    title: 'ID', 
    key: 'id',
    dataIndex: 'id'
  },{
    title: 'Name',
    key: 'name',
    dataIndex: 'name'
  },{
    title: 'Card Number',
    key: 'cardNumber',
    dataIndex: 'cardNumber'
  },{
    title: 'Card expiry',
    key: 'cardExpiry',
    dataIndex: 'cardExpiry'
  },{
    title: 'Balance Credit',
    key: 'balance',
    dataIndex: 'balance'
  }]

  const data = [{
    id: 'lkjhg45678nb5678lknbnm9876fv234nb',
    name: 'My Billing Account 1',
    cardNumber: 'Visa card ending in 4078',
    cardExpiry: '02/25',
    balance: '$25'
  },{
    id: 'lkjhg45678nb5678lknbnm9876fv234nb',
    name: 'My Billing Account 1',
    cardNumber: 'Visa card ending in 4078',
    cardExpiry: '02/25',
    balance: '$25'
  }]

  return(
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem="billing-accounts"/>
      <ProjectPageLayout>
        <Content>
          <h3 style={{ display: "flex", justifyContent: "space-between" }}>Billing accounts<Button onClick={() => history.push('/billing-accounts/add-account')} type="primary">Add billing account</Button></h3>
          <Table columns={billingAccountColumn} dataSource={data} bordered />
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default BillingAccounts;