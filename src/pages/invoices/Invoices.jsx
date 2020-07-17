import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Row, Col, Table } from 'antd';
import emptyStateSvg from '../../assets/rabit.svg';
import { useParams } from 'react-router';
import Sidnav from '../../components/sidenav/Sidenav';
import Topbar from '../../components/topbar/Topbar';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import loadInvoices, { getInvoices, getHasMoreInvoices } from "../../operations/invoices"
import { incrementPendingRequests, decrementPendingRequests, notify } from '../../utils';

const Invoices = () => {
  const { billingId } = useParams()

  // Global state
  const invoices = useSelector(state => getInvoices(state))
  const hasMoreInvoices = useSelector(state => getHasMoreInvoices(state))

  const loadFunc = () => {
    incrementPendingRequests()
    loadInvoices(billingId)
      .catch((ex) => notify("error", "Error fetching invoices", ex))
      .finally(() => decrementPendingRequests())
  }

  useEffect(() => {
    ReactGA.pageview("/billing/invoices");
  }, [])

  useEffect(() => {
    loadFunc()
  }, [billingId])

  const emptyState =
    <Row >
      <Col lg={{ span: 10, offset: 6 }} style={{ textAlign: "center", marginTop: "72px" }}>
        <img src={emptyStateSvg} />
        <p style={{ margin: "16px 0 24px 0" }}>No invoices for this billing account yet. You will see invoices as soon as you purchase a license!</p>
      </Col>
    </Row>

  const columns = [
    {
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
    }
  ]

  return (
    <React.Fragment>
      <Sidnav selectedItem='invoices' />
      <Topbar showBillingSelector />
      <ProjectPageLayout>
        <Content>
          {invoices.length === 0 && emptyState}
          {invoices.length > 0 &&
            <React.Fragment>
              <h3>Invoices</h3>
              <InfiniteScroll
                dataLength={invoices.length} //This is important field to render the next data
                next={loadFunc}
                hasMore={hasMoreInvoices}
                loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
              >
                <Table columns={columns} dataSource={invoices} bordered style={{ marginTop: 16 }} />
              </InfiniteScroll>
            </React.Fragment>
          }
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default Invoices;