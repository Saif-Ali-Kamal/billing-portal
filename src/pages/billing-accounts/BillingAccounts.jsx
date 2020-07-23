import React, { useEffect } from 'react';
import { Button, Table, Radio, Popconfirm } from 'antd';
import { useHistory, useParams } from 'react-router';
import ReactGA from 'react-ga';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
import TableExpandIcon from "../../components/table-expand-icon/TableExpandIcon"
import { useSelector } from 'react-redux';
import { getBillingAccounts, removeCard, setDefaultCard } from '../../operations/billingAccount';
import { capitalizeFirstCharacter, incrementPendingRequests, notify, decrementPendingRequests } from '../../utils';

const BillingAccounts = () => {
  useEffect(() => {
    ReactGA.pageview("/billing/billing-accounts");
  }, [])

  const history = useHistory();
  const { billingId } = useParams()

  // Global state
  const billingAccounts = useSelector(state => getBillingAccounts(state))

  // Handlers
  const handleClickAddCard = () => history.push(`/billing/${billingId}/billing-accounts/add-card`)

  const handleClickAddBillingAccount = () => history.push(`/billing/${billingId}/billing-accounts/add-account`)

  const handleClickDeleteCard = (cardId) => {
    incrementPendingRequests()
    removeCard(billingId, cardId)
      .then(() => notify("success", "Success", "Deleted card successfully"))
      .catch((ex) => notify("error", "Error deleting card", ex))
      .finally(() => decrementPendingRequests())
  }

  const handleClickSetDefaultCard = (cardId) => {
    incrementPendingRequests()
    setDefaultCard(billingId, cardId)
      .then(() => notify("success", "Success", "Updated default card successfully"))
      .catch((ex) => notify("error", "Error updating default card", ex))
      .finally(() => decrementPendingRequests())
  }

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
      render: (_, { balance }) => `$${balance * -1 / 100}` // Balance fetched from backend is negative
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
        title: 'Default card',
        render: (_, { isDefault, id }) => <Radio checked={isDefault} onChange={() => handleClickSetDefaultCard(id)} />
      },
      {
        title: 'Card expiry',
        dataIndex: 'expiry',
        key: 'expiry',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, { id }) => (<Popconfirm title={`This will delete the card. Are you sure?`} onConfirm={() => handleClickDeleteCard(id)}>
          <a style={{ color: "red" }}>Delete</a>
        </Popconfirm>)
      }
    ]

    return (
      <div>
        <h3 style={{ display: "flex", justifyContent: "space-between" }}>Cards <Button type="primary" ghost onClick={handleClickAddCard}>Add a card</Button></h3>
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
          <h3 style={{ display: "flex", justifyContent: "space-between" }}>Billing accounts<Button onClick={handleClickAddBillingAccount} type="primary">Add billing account</Button></h3>
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