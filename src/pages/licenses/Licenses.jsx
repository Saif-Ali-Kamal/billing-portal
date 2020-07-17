import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Row, Col, Button, Table, Popconfirm } from 'antd';
import { useHistory, useParams } from 'react-router';
import Sidenav from '../../components/sidenav/Sidenav';
import Topbar from '../../components/topbar/Topbar';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
import emptyCartSvg from '../../assets/empty-cart.svg';
import LicenseKeyModal from '../../components/licenses/purchase-license/license-key-modal/LicenseKeyModal';
import { capitalizeFirstCharacter } from "../../utils"
import { useSelector } from 'react-redux';
import { getLicenses } from "../../operations/licenses"
import TableExpandIcon from "../../components/table-expand-icon/TableExpandIcon"

const Licenses = () => {
  useEffect(() => {
    ReactGA.pageview("/billing/licenses");
  }, [])

  const history = useHistory();
  const { billingId } = useParams();
  const [applyKeyModalVisible, setApplyKeyModalVisible] = useState(false)
  const [applyKeyId, setApplyKeyId] = useState('');

  // Global state
  const licenses = useSelector(state => getLicenses(state))

  // Derived state
  const noOfLiicenses = licenses.length

  const handleApplykey = (name) => {
    setApplyKeyModalVisible(true);
    setApplyKeyId(name)
  }

  const handlePurchaseClick = () => {
    history.push(`/billing/${billingId}/licenses/purchase`)
  }

  const expandedRowRender = ({ license_key_mapping = [] }) => {
    const licenseKeyColumn = [
      {
        title: 'Key',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'Applied to cluster',
        dataIndex: ["meta", "clusterName"],
        key: 'clusterName',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, { key }) => (
          <a onClick={() => handleApplykey(key)}>Apply license key</a>
        )
      }
    ]

    return (
      <div>
        <h3>License keys</h3>
        <Table columns={licenseKeyColumn} dataSource={license_key_mapping} pagination={false} bordered style={{ marginTop: 16 }} />
      </div>
    );
  }

  const licenseColumn = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Purchase date',
      render: (_, record) => capitalizeFirstCharacter(record.purchase_date.toISOString())
    },
    {
      title: 'Status',
      render: (_, record) => capitalizeFirstCharacter(record.status)
    },
    {
      title: 'Subscription cycle',
      render: (_, record) => capitalizeFirstCharacter(record.periodicity)
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record, { id }) => {
        if (record.status === 'active') {
          return (<Popconfirm title={`This will deactivate subscription. Are you sure?`} onConfirm={() => console.log('deactivate')}>
            <a style={{ color: "red" }}>Deactivate</a>
          </Popconfirm>)
        } else {
          return (<Popconfirm title={`This will renew subscription. Are you sure?`} onConfirm={() => console.log('renew')}>
            <a style={{ color: "#40A9FF" }}>Renew</a>
          </Popconfirm>)
        }
      }
    }
  ]

  const emptyState =
    <Row >
      <Col lg={{ span: 10, offset: 6 }} style={{ textAlign: "center", marginTop: "72px" }}>
        <img src={emptyCartSvg} />
        <p style={{ margin: "16px 0 24px 0" }}>No Space Cloud licenses purchased yet through this billing account</p>
        <Button style={{ width: "55%", borderRadius: "100px", height: '40px' }} type="primary" onClick={handlePurchaseClick}>Purchase a license</Button>
      </Col>
    </Row>

  return (
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem='licenses' />
      <ProjectPageLayout>
        <Content>
          {noOfLiicenses === 0 && emptyState}
          {noOfLiicenses > 0 && <React.Fragment>
            <h3 style={{ display: "flex", justifyContent: "space-between" }}>Licenses <Button onClick={handlePurchaseClick} type="primary">Purchase a license</Button></h3>
            <Table
              style={{ marginTop: 16 }}
              columns={licenseColumn}
              expandable={{ expandedRowRender, expandIcon: TableExpandIcon }}
              dataSource={licenses}
              bordered />
          </React.Fragment>}
          {applyKeyModalVisible && <LicenseKeyModal handleCancel={() => setApplyKeyModalVisible(false)} />}
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default Licenses;