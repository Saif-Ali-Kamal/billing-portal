import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Row, Col, Table, Button } from 'antd';
import emptyStateSvg from '../../assets/rabit.svg';
import { useHistory } from 'react-router';
import Sidnav from '../../components/sidenav/Sidenav';
import Topbar from '../../components/topbar/Topbar';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
const Invoices = () => {
  useEffect(() => {
    ReactGA.pageview("/billing/invoices");
  }, [])

  const history = useHistory();

  const emptyState =
    <Row >
      <Col lg={{ span: 10, offset: 6 }} style={{ textAlign: "center", marginTop: "72px" }}>
        <img src={emptyStateSvg} />
        <p style={{ margin: "16px 0 24px 0" }}>No Space Cloud licenses purchased yet through this billing account</p>
      </Col>
    </Row>

  const invoiceColumn = [{
    title: "Invoice Number",
    dataIndex: "number",
    key: "number"
  },
  {
    title: "Period",
    dataIndex: "period",
    key: "period",
    render: (_, record) => {
      var start = new Date(record.period.start * 1000)
      var end = new Date(record.period.end * 1000)
      return `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()} to 
            ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`
    }
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_, { amount, currency = "usd" }) => {
      const currencyNotation = currency.toLowerCase() === "inr" ? "₹" : "$"
      return `${currencyNotation}${amount / 100}`
    }
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, record) => {
      if (record.status === "paid") {
        return <span style={{ color: "#15CD72" }}>{record.status}</span>
      } else if (record.status === "uncollectible") {
        return <span style={{ color: "#F5222D" }}>{record.status}</span>
      } else {
        return record.status
      }

    }
  },
  {
    title: "",
    dataIndex: "invoice_pdf",
    key: "invoice_pdf",
    render: (_, record) => {
      return <a href={`${record.invoice_pdf}`} target="_blank">Download Invoice</a>
    }
  }]

  const data = [{
    number: 'inv_kjhb87623ejhbsd98',
    period: {
      start: 14 / 1 / 2020,
      end: 14 / 2 / 2020
    },
    amount: 150,
    status: 'paid'
  }, {
    number: 'inv_kjhb87623ejhbsd98',
    period: {
      start: 14 / 1 / 2020,
      end: 14 / 2 / 2020
    },
    amount: 150,
    status: 'uncollectible'
  }]

  return (
    <React.Fragment>
      <Sidnav selectedItem='invoices' />
      <Topbar showBillingSelector />
      <ProjectPageLayout>
        <Content>
          {emptyState}
          <h3>Invoices</h3>
          <Table columns={invoiceColumn} dataSource={data} bordered style={{ marginTop: 16 }} />
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default Invoices;