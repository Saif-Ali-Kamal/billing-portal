import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
import { Row, Col, Card, Button } from 'antd';
import avatarSvg from '../../assets/avatar.svg';
import { getProfile, changePassword } from '../../operations/userManagement';
import { useSelector } from 'react-redux';
import ChangePassword from "../../components/change-password/ChangePassword";
import { incrementPendingRequests, decrementPendingRequests, notify } from '../../utils';

const Profile = () => {
  useEffect(() => {
    ReactGA.pageview('/billing/profile');
  }, [])

  // Global state
  const { name, email, createdOn } = useSelector(state => getProfile(state))

  // Component state
  const [modalVisible, setModalVisible] = useState(false)

  // Handlers
  const handleChangePassword = (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      incrementPendingRequests()
      changePassword(currentPassword, newPassword)
        .then(() => {
          notify("success", "Success", "Changed password successfully")
          resolve()
        })
        .catch(ex => {
          notify("error", "Error changing password", ex)
          reject()
        })
        .finally(() => decrementPendingRequests())
    })
  }
  return (
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem='profile' />
      <ProjectPageLayout>
        <Content>
          <Row>
            <Col lg={{ span: 16 }}>
              <Card >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "inline-flex", alignItems: "start" }}>
                    <img src={avatarSvg} />
                    <div style={{ display: "inline-block", marginLeft: 16 }}>
                      <p style={{ color: "rgba(0,0,0,0.87)", marginBottom: 4 }}>{name}</p>
                      <p style={{ color: "rgba(0,0,0,0.45)", marginBottom: 4 }}>{email}</p>
                      <div style={{ color: "rgba(0,0,0,0.45)", marginBottom: 4, display: "flex", alignItems: "center" }}>
                        <i className="material-icons-outlined" style={{ fontSize: 16 }}>calendar_today</i>
                        <span style={{ marginLeft: 8 }}>{createdOn.toISOString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => setModalVisible(true)}> Change password</Button>
                </div>
              </Card>
            </Col>
          </Row>
          {modalVisible && <ChangePassword handleSubmit={handleChangePassword} handleCancel={() => setModalVisible(false)} />}
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default Profile;