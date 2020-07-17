import React, { useState } from 'react';
import { Table, Card, Alert, Row, Col } from 'antd';
import LicenseKeyModal from '../license-key-modal/LicenseKeyModal';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLicenseKeys, getLicenseKeySecret } from '../../../../operations/licenses';

const ApplyLicenseKey = ({ licenseId }) => {
  const history = useHistory();
  const { billingId } = useParams()

  // Component state
  const [applyKeyModalVisible, setApplyKeyModalVisible] = useState(false)
  const [licenseKey, setLicenseKey] = useState('');

  // Global state
  const licenseKeys = useSelector(state => getLicenseKeys(state, licenseId))
  const selectedLicenseKeySecret = useSelector(state => getLicenseKeySecret(state, licenseId, licenseKey))

  const handleApplykey = (key) => {
    setApplyKeyModalVisible(true);
    setLicenseKey(key);
  }

  const handleCancel = () => {
    setApplyKeyModalVisible(false);
    setLicenseKey("")
  }

  const column = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key'
    }, {
      title: 'Action',
      key: 'action',
      render: (_, { key }) => (
        <a onClick={() => handleApplykey(key)}>Apply license key</a>
      )
    }
  ]


  const alertMsg = <React.Fragment>
    <p>Next step</p>
  </React.Fragment>

  const alertDes = <React.Fragment>
    <p>Each license key can be applied to a single Space Cloud cluster only. Click the <b>Apply license key</b> button besides a license key for further instructions on applying it to a Space Cloud cluster. Feel free to skip this step for applying the license keys later.</p>
  </React.Fragment>

  return (
    <React.Fragment>
      <Row>
        <Col lg={{ span: 20, offset: 2 }}>
          <Alert
            message={alertMsg}
            description={alertDes}
            type="info" showIcon
          />

          <Card style={{ margin: "24px 0 24px 0" }}>
            <h3>License Keys</h3>
            <Table columns={column} dataSource={licenseKeys} pagination={false} bordered style={{ marginTop: 16 }} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 4, offset: 10 }}>
          <Link onClick={() => history.push(`/billing/${billingId}/licenses`)} >Skip this step</Link>
        </Col>
      </Row>
      {applyKeyModalVisible && <LicenseKeyModal
        handleCancel={handleCancel}
        licenseKey={licenseKey}
        licenseSecret={selectedLicenseKeySecret} />}
    </React.Fragment>
  );
}

export default ApplyLicenseKey;