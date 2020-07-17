import React, { useState } from 'react';
import { Table, Card, Alert, Row, Col } from 'antd';
import LicenseKeyModal from '../license-key-modal/LicenseKeyModal';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const ApplyLicenseKey = () => {

  const [applyKeyModalVisible, setApplyKeyModalVisible] = useState(false)
  const [applyKeyId, setApplyKeyId] = useState('');
  const history = useHistory();

  const handleApplykey = (name) => {
    setApplyKeyModalVisible(true);
    setApplyKeyId(name);
  }

  const column = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: 'Action',
    key: 'action',
    render: (_, { name }) => (
      <a onClick={() => handleApplykey(name)}>Apply license key</a>
    )
  }]

  const data = [{
    id: "lic_vghjkgf45678gbn"
  }, {
    id: "lic_vghjkgf45678gbn"
  }]

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
            <Table columns={column} dataSource={data} pagination={false} bordered style={{ marginTop: 16 }} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 4, offset: 10 }}>
          <Link onClick={() => history.push('/licenses')} >Skip this step</Link>
        </Col>
      </Row>
      {applyKeyModalVisible && <LicenseKeyModal handleCancel={() => setApplyKeyModalVisible(false)} />}
    </React.Fragment>
  );
}

export default ApplyLicenseKey;