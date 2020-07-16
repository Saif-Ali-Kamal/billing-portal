import React, {useState, useEffect} from 'react';
import ReactGA from 'react-ga';
import { Row, Col, Button, Table } from 'antd';
import { useHistory } from 'react-router';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
import ApplyCouponModal from '../../components/promo-codes/ApplyCouponModal';
import emptyStateSvg from '../../assets/rabit.svg';

const PromoCodes = () => {
  useEffect(() => {
    ReactGA.pageview("/billing/promo-codes");
  }, [])

  const history = useHistory();
  const [applyCouponModal, setApplyCouponModal] = useState(false) 
  const emptyState = 
    <Row >
      <Col lg={{ span: 12, offset: 5 }} style={{ textAlign:"center", marginTop:"72px" }}>
        <img src={emptyStateSvg}/>   
        <p style={{ margin:"16px 0 24px 0" }}>No promo codes applied to this billing account yet. Apply a promo code to get free credits!</p>
        <Button style={{ width:"45%", borderRadius:"10px" }} type="primary" onClick={() => setApplyCouponModal(true)}>Apply a promo code</Button>   
      </Col>
    </Row>

  const promoCodeColumn = [{
    title: 'Codes',
    dataIndex: 'code',
    key: 'code',
  },{
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_, { amount, currency = "usd" }) => {
      const currencyNotation = currency.toLowerCase() === "inr" ? "₹" : "$"
      return `${currencyNotation}${amount / 100}`
    }
  },{
    title: 'Applied on',
    dataIndex: 'date',
    key: 'date',
  }]

  const data=[{
    code: 'i_love_spacecloud',
    amount: 2500,
    date: '21 march, 2020'
  },{
    code: 'awesome_heroku_alternative',
    amount: 2500,
    date: '21 march, 2020'
  }]

  return(
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem='promo-codes' />
      <ProjectPageLayout>
       <Content>
        <h3 style={{ display: "flex", justifyContent: "space-between" }}>Applied promo codes<Button onClick={() => setApplyCouponModal(true)} type="primary">Apply a promo codes</Button></h3>
        <Table columns={promoCodeColumn} dataSource={data} bordered/>
       </Content>
      </ProjectPageLayout>
      {applyCouponModal && <ApplyCouponModal handleCancel={() => setApplyCouponModal(false)} />}
    </React.Fragment>
  );
}

export default PromoCodes;