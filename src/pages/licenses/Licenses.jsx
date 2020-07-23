import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Row, Col, Button, Table, Popconfirm } from 'antd';
import { useHistory, useParams } from 'react-router';
import Sidenav from '../../components/sidenav/Sidenav';
import Topbar from '../../components/topbar/Topbar';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
import emptyCartSvg from '../../assets/empty-cart.svg';
import LicenseKeyModal from '../../components/licenses/license-key-modal/LicenseKeyModal';
import QuotasModal from '../../components/licenses/quotas-modal/QuotasModal';
import { capitalizeFirstCharacter, incrementPendingRequests, decrementPendingRequests, notify, formatDate } from "../../utils"
import { useSelector } from 'react-redux';
import { getLicenses, renewLicense, deactivateLicense, getLicenseKeySecret, getLicenseQuotas, loadLicenses, revokeLicenseKey } from "../../operations/licenses"
import TableExpandIcon from "../../components/table-expand-icon/TableExpandIcon"

const Licenses = () => {
  const history = useHistory();
  const { billingId } = useParams();

  useEffect(() => {
    ReactGA.pageview("/billing/licenses");
  }, [])

  useEffect(() => {
    incrementPendingRequests()
    loadLicenses(billingId)
      .catch(ex => notify("error", "Error fetching licenses", ex))
      .finally(() => decrementPendingRequests())
  }, [billingId])

  // Component state
  const [applyKeyModalVisible, setApplyKeyModalVisible] = useState(false)
  const [quotasModalVisible, setQuotasModalVisible] = useState(false)
  const [licenseId, setLicenseId] = useState('');
  const [licenseKey, setLicenseKey] = useState('');

  // Global state
  const licenses = useSelector(state => getLicenses(state))
  const selectedLicenseKeySecret = useSelector(state => getLicenseKeySecret(state, licenseId, licenseKey))
  const selectedLicenseQuotas = useSelector(state => getLicenseQuotas(state, licenseId))

  // Derived state
  const noOfLicenses = licenses.length

  const handleApplykey = (licenseId, key) => {
    setLicenseId(licenseId)
    setLicenseKey(key)
    setApplyKeyModalVisible(true);
  }

  const handleApplyKeyModalCancel = () => {
    setApplyKeyModalVisible(false);
    setLicenseId("")
    setLicenseKey("")
  }

  const handleClickQuotas = (licenseId) => {
    setLicenseId(licenseId)
    setQuotasModalVisible(true);
  }

  const handleQuotasModalCancel = () => {
    setQuotasModalVisible(false);
    setLicenseId("")
  }

  const handlePurchaseClick = () => {
    history.push(`/billing/${billingId}/licenses/purchase`)
  }

  const handleClickRenew = (licenseId) => {
    incrementPendingRequests()
    renewLicense(billingId, licenseId)
      .then(() => notify("success", "Success", "Renewed license successfully"))
      .catch(ex => notify("error", "Error renewing license", ex))
      .finally(() => decrementPendingRequests())
  }

  const handleClickDeactivate = (licenseId) => {
    incrementPendingRequests()
    deactivateLicense(billingId, licenseId)
      .then(() => notify("success", "Success", "Deactivated license successfully"))
      .catch(ex => notify("error", "Error deactivating license", ex))
      .finally(() => decrementPendingRequests())
  }

  const handleClickRevokeLicenseKey = (licenseId, key) => {
    incrementPendingRequests()
    revokeLicenseKey(billingId, licenseId, key)
      .then(() => notify("success", "Success", "Revoked license from the cluster successfully"))
      .catch(ex => notify("error", "Error revoking license key", ex))
      .finally(() => decrementPendingRequests())
  }

  const expandedRowRender = ({ id, license_key_mapping = [] }) => {
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
        render: (_, { key, meta }) => (
          <React.Fragment>
            <a onClick={() => handleApplykey(id, key)}>Apply license key</a>
            {meta && meta.clusterName && (
              <Popconfirm title={`This will downgrade the associated cluster to Opensource plan. Are you sure?`} onConfirm={() => handleClickRevokeLicenseKey(id, key)}>
                <a style={{ color: "red" }}>Revoke</a>
              </Popconfirm>
            )}
          </React.Fragment>
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
      render: (_, record) => formatDate(record.purchase_date)
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
      title: 'Next renewal',
      render: (_, record) => formatDate(record.validity)
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const actionButtons = [
          <a style={{ color: "#40A9FF" }} onClick={() => handleClickQuotas(licenseId)}>Show quotas</a>
        ]
        switch (record.status) {
          case "active":
            actionButtons.push(
              <Popconfirm title={`This will deactivate subscription. Are you sure?`} onConfirm={() => handleClickDeactivate(record.id)}>
                <a style={{ color: "red" }}>Deactivate</a>
              </Popconfirm>
            )
            break
          case "expired":
            actionButtons.push(
              <Popconfirm title={`This will renew subscription. Are you sure?`} onConfirm={() => handleClickRenew(record.id)}>
                <a style={{ color: "#40A9FF" }}>Renew</a>
              </Popconfirm>
            )
            break
        }
        return actionButtons
      }
    }
  ]

  const emptyState =
    <Row >
      <Col lg={{ span: 10, offset: 6 }} style={{ textAlign: "center", marginTop: "72px" }}>
        <img src={emptyCartSvg} />
        <p style={{ margin: "16px 0 24px 0" }}>No Space Cloud licenses purchased yet through this billing account</p>
        <Button style={{ width: "55%", borderRadius: "100px" }} size="large" type="primary" onClick={handlePurchaseClick}>Purchase a license</Button>
      </Col>
    </Row>

  return (
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem='licenses' />
      <ProjectPageLayout>
        <Content>
          {noOfLicenses === 0 && emptyState}
          {noOfLicenses > 0 && <React.Fragment>
            <h3 style={{ display: "flex", justifyContent: "space-between" }}>Licenses <Button onClick={handlePurchaseClick} type="primary">Purchase a license</Button></h3>
            <Table
              rowKey="id"
              style={{ marginTop: 16 }}
              columns={licenseColumn}
              expandable={{ expandedRowRender, expandIcon: TableExpandIcon }}
              dataSource={licenses}
              bordered />
          </React.Fragment>}
          {applyKeyModalVisible && <LicenseKeyModal
            handleCancel={handleApplyKeyModalCancel}
            licenseKey={licenseKey}
            licenseSecret={selectedLicenseKeySecret} />}
          {quotasModalVisible && <QuotasModal
            handleCancel={handleQuotasModalCancel}
            quotas={selectedLicenseQuotas} />}
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default Licenses;