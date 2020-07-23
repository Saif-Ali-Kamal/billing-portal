import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { Row, Col, Button, Table } from 'antd';
import { useParams } from 'react-router';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
import ApplyCouponModal from '../../components/promo-codes/ApplyCouponModal';
import emptyStateSvg from '../../assets/rabit.svg';
import { incrementPendingRequests, decrementPendingRequests, notify } from '../../utils';
import { loadPromoCodes, applyPromoCode, getPromoCodes } from '../../operations/promoCodes';
import { useSelector } from 'react-redux';
import { getBillingAccountCountry } from '../../operations/billingAccount';

const PromoCodes = () => {
  const { billingId } = useParams();

  useEffect(() => {
    ReactGA.pageview("/billing/promo-codes");
  }, [])

  useEffect(() => {
    incrementPendingRequests()
    loadPromoCodes(billingId)
      .catch(ex => notify("error", "Error fetching promo codes", ex))
      .finally(() => decrementPendingRequests())
  }, [billingId])

  // Global state
  const promoCodes = useSelector(state => getPromoCodes(state))
  const billingCountry = useSelector(state => getBillingAccountCountry(state, billingId))

  // Component state
  const [applyCouponModal, setApplyCouponModal] = useState(false)

  // Handlers 
  const handleApplyPromoCode = (promoCode) => {
    return new Promise((resolve, reject) => {
      incrementPendingRequests()
      applyPromoCode(billingId, promoCode)
        .then((amount) => {
          const currencyNotation = billingCountry === "IN" ? "₹" : "$"
          notify("success", "Success", `Applied promo code successfully. ${currencyNotation}${amount / 100} credited to your billing account`)
          resolve()
        })
        .catch((ex) => {
          notify("error", "Error applying promo codes", ex)
          reject(ex)
        })
        .finally(() => decrementPendingRequests())
    })
  }

  const emptyState =
    <Row >
      <Col lg={{ span: 12, offset: 5 }} style={{ textAlign: "center", marginTop: "72px" }}>
        <img src={emptyStateSvg} />
        <p style={{ margin: "16px 0 24px 0" }}>No promo codes applied to this billing account yet. Apply a promo code to get free credits!</p>
        <Button style={{ width: "45%", borderRadius: "100px" }} size="large" type="primary" onClick={() => setApplyCouponModal(true)}>Apply a promo code</Button>
      </Col>
    </Row>

  const promoCodeColumn = [
    {
      title: 'Promotion Code',
      dataIndex: 'promotion_id',
      key: 'promotionId',
    },
    {
      title: "Amount",
      dataIndex: "promotions",
      key: "amount",
      render: (_, { promotions }) => {
        const currencyNotation = billingCountry === "IN" ? "₹" : "$"
        return `${currencyNotation} ${promotions[0].amount / 100}`
      }
    },
    {
      title: 'Applied on',
      render: (_, { time_stamp }) => time_stamp
    }
  ]

  return (
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem='promo-codes' />
      <ProjectPageLayout>
        <Content>
          {promoCodes.length === 0 && emptyState}
          {promoCodes.length > 0 && <React.Fragment>
            <h3 style={{ display: "flex", justifyContent: "space-between" }}>Applied promo codes<Button onClick={() => setApplyCouponModal(true)} type="primary">Apply a promo codes</Button></h3>
            <Table columns={promoCodeColumn} dataSource={promoCodes} bordered style={{ marginTop: 16 }} />
          </React.Fragment>}
        </Content>
      </ProjectPageLayout>
      {applyCouponModal && <ApplyCouponModal handleSubmit={handleApplyPromoCode} handleCancel={() => setApplyCouponModal(false)} />}
    </React.Fragment>
  );
}

export default PromoCodes;