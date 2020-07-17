import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
import { Row, Col, Card, Button } from 'antd';
import avatarSvg from '../../assets/avatar.svg';
import { getProfile } from '../../operations/userManagement';
import { useSelector } from 'react-redux';

const Profile = () => {
  useEffect(() => {
    ReactGA.pageview('/billing/profile');
  }, [])

  // Global state
  const { name, email, createdOn } = useSelector(state => getProfile(state))

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
                  <Button> Change password</Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default Profile;