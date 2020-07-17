import React, { useEffect } from 'react';
import { Button, Table, Radio, Popconfirm } from 'antd';
import { useHistory, useParams } from 'react-router';
import ReactGA from 'react-ga';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
import TableExpandIcon from "../../components/table-expand-icon/TableExpandIcon"
import { useSelector } from 'react-redux';
import { getBillingAccounts } from '../../operations/billingAccount';
import { capitalizeFirstCharacter } from '../../utils';

const BillingAccounts = () => {
  useEffect(() => {
    ReactGA.pageview("/billing/billing-accounts");
  }, [])

  const history = useHistory();
  const { billingId } = useParams()

  // Global state
  const billingAccounts = useSelector(state => getBillingAccounts(state))

  const billingAccountColumn = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id'
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Balance Credit',
      key: 'balance',
      dataIndex: 'balance'
    }
  ]


  const expandedRowRender = ({ cards = [] }) => {
    const cardsColumn = [
      {
        title: 'Card type',
        render: (_, { brand }) => capitalizeFirstCharacter(brand)
      },
      {
        title: 'Card number',
        render: (_, { last4 }) => `xxxx xxxx xxxx ${last4}`
      },
      {
        title: 'Card number',
        render: (_, { isDefault }) => <Radio checked={isDefault} />
      },
      {
        title: 'Card expiry',
        dataIndex: 'expiry',
        key: 'expiry',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, { id }) => (<Popconfirm title={`This will delete the card. Are you sure?`} onConfirm={() => console.log('deactivate')}>
          <a style={{ color: "red" }}>Delete</a>
        </Popconfirm>)
      }
    ]

    const handleAddCardClick = () => history.push(`/billing/${billingId}/billing-accounts/add-card`)

    return (
      <div>
        <h3 style={{ display: "flex", justifyContent: "space-between" }}>Cards <Button type="primary" ghost onClick={handleAddCardClick}>Add a card</Button></h3>
        <Table columns={cardsColumn} dataSource={cards} pagination={false} bordered style={{ marginTop: 16 }} rowKey="id" />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem="billing-accounts" />
      <ProjectPageLayout>
        <Content>
          <h3 style={{ display: "flex", justifyContent: "space-between" }}>Billing accounts<Button onClick={() => history.push('/billing-accounts/add-account')} type="primary">Add billing account</Button></h3>
          <Table
            rowKey="id"
            columns={billingAccountColumn}
            dataSource={billingAccounts}
            expandable={{ expandedRowRender, expandIcon: TableExpandIcon }}
            bordered
            style={{ marginTop: 16 }} />
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default BillingAccounts;