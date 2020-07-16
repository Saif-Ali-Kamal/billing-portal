import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Row, Col, Button, Table, Popconfirm } from 'antd';
import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons';
import { useHistory } from 'react-router';
import Sidenav from '../../components/sidenav/Sidenav';
import Topbar from '../../components/topbar/Topbar';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
import emptyCartSvg from '../../assets/empty-cart.svg';
import LicenseKeyModal from '../../components/licenses/purchase-license/license-key-modal/LicenseKeyModal';

const Licenses = () => {
  useEffect(() => {
    ReactGA.pageview("/billing/licenses");
  }, [])

  const history = useHistory();
  const [applyKeyModalVisible, setApplyKeyModalVisible] = useState(false)
  const [applyKeyId, setApplyKeyId] = useState('');

  const emptyState = 
    <Row >
      <Col lg={{ span: 10, offset: 6 }} style={{ textAlign:"center", marginTop:"72px" }}>
        <img src={emptyCartSvg}/>   
        <p style={{ margin:"16px 0 24px 0" }}>No Space Cloud licenses purchased yet through this billing account</p>
        <Button style={{ width:"55%", borderRadius:"100px", height:'40px' }} type="primary" onClick={() => history.push('/licenses/purchase')}>Purchase a license</Button>   
      </Col>
    </Row>

  const handleApplykey = (name) => {
    setApplyKeyModalVisible(true);
    setApplyKeyId(name)
  }

  const expandedRowRender = () => {
   const licenseKeyColumn=[{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },{
      title: 'Applied to cluster',
      dataIndex: 'appliedToCluster',
      key: 'appliedToCluster',
    },{
      title: 'Action',
      key: 'action',
      render: (_, {name}) => (
        <a onClick={() => handleApplykey(name)}>Apply license key</a>
      )
    }]

    const licenseKeyData = []
    for(let i=0; i<3; i++){
      licenseKeyData.push({
        key: i,
        id: 'lic_vghjkgf45678gbn',
        appliedToCluster: 'cluster 1'
      })
    }

    return (<Row>
      <Col lg={{ span: 23, offset: 0 }} style={{ margin: "" }}>
        <h3>License keys</h3>
        <Table columns={licenseKeyColumn} dataSource={licenseKeyData}  pagination={false} bordered/>
      </Col>
    </Row>
    );
  }
  
  const licenseColumn = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },{
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },{
    title: 'Purchase date',
    dataIndex: 'purchaseDate',
    key: 'purchaseDate'
  },{
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => {
      if(record.status === 'active'){
        return <span style={{ color:'#52C41A' }}>Active</span>
      } else if (record.status === 'expiry') {
        return <span style={{ color:'#FF4D4F' }}>Expiry</span>
      } else {
        return <span>Deactivated</span>
      }
    }
  },{
    title: 'Action',
    key: 'action',
    render: (_, record, { name }) => {
      if(record.status === 'active'){
        return (<Popconfirm title={`This will deactivate subscription ${name}. Are you sure?`} onConfirm={() => console.log('deactivate')}>
          <a style={{ color: "red" }}>Deactivated</a>
        </Popconfirm>)
      } else {
        return (<Popconfirm title={`This will renew subscription ${name}. Are you sure?`} onConfirm={() => console.log('renew')}>
          <a style={{ color:'blue' }}>Renew</a>
        </Popconfirm>)
      }
    }
  }]

  const licenseData = [];
  for(let i=0; i<3; i++){
    licenseData.push({
      key: i,
      id: '1b6b8a79-d4c6-45c8-a4a9-84ff6ec6036d',
      type: 'PRO',
      purchaseDate: 'March 4, 2020',
      status: 'deactivated'
    })
  }


  return(
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem='licenses' />
      <ProjectPageLayout>
        <Content>
          {emptyState}
          <h3 style={{ display: "flex", justifyContent: "space-between" }}>Licenses <Button onClick={() => history.push('/licenses/purchase')} type="primary">Purchase a license</Button></h3>
          <Table 
            columns={licenseColumn} 
            expandable={{ expandedRowRender,
              expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <CaretDownFilled onClick={e => onExpand(record, e)} />
              ) : (
                <CaretRightFilled onClick={e => onExpand(record, e)} />
              )
              }}
            dataSource={licenseData} 
            bordered/>
        {applyKeyModalVisible && <LicenseKeyModal handleCancel={() => setApplyKeyModalVisible(false)} />}
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default Licenses;