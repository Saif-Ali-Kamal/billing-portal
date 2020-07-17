import React, { useState } from 'react'
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Menu, Popover, Row, Col, Dropdown } from 'antd';
import './topbar.css'
import store from "../../store"
import { set } from "automate-redux"
import logo from '../../assets/logo-black.svg';
import upLogo from '../../logo.png';
import avatarSvg from '../../assets/avatar.svg';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getProfileBillingAccounts } from '../../operations/userManagement';
import { openBillingAccount } from '../../utils';

const Topbar = (props) => {
  const { billingId } = useParams()

  // Global state
  const billingAccounts = useSelector(state => getProfileBillingAccounts(state))

  // Component state
  const [popoverVisible, setPopoverVisible] = useState(false)

  // Derived state
  const selectedBillingAccount = billingAccounts.find(obj => obj.id === billingId)
  const selectedBillingAccountName = selectedBillingAccount ? selectedBillingAccount.name : ""

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload()
  }

  const avatarContent = (
    <Row style={{ padding: '0 32px 0 0' }}>
      <Col lg={{ span: 5 }}>
        <img src={avatarSvg} />
      </Col>
      <Col lg={{ span: 17, offset: 2 }}>
        <h4>Jayesh Choudhary</h4>
        <p>jayesh@spaceuptech.com</p>
        <Button type="primary" style={{ borderRadius: '4px' }} onClick={handleLogout}>Logout</Button>
      </Col>
    </Row>
  );

  const menu = (
    <Menu onClick={({ key }) => openBillingAccount(key)}>
      {billingAccounts.map(obj => <Menu.Item key={obj.id}>{obj.name}</Menu.Item>)}
    </Menu>
  );

  return (
    <div>
      <div className="topbar">
        <MenuOutlined
          className="hamburger"
          onClick={() => store.dispatch(set("uiState.showSidenav", true))} />
        <img className="logo" src={logo} alt="logo" />
        <img className="upLogo" src={upLogo} alt="logo" />
        {props.showBillingSelector && <div className="btn-position" >
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link btn-rounded" style={{ cursor: "pointer" }} onClick={e => e.preventDefault()} >
              {selectedBillingAccountName} <DownOutlined style={{ marginLeft: '16px' }} />
            </a>
          </Dropdown>
        </div>}

        <div className="right-list" >
          <Popover className="" content={avatarContent} trigger="click" placement="bottomLeft" overlayStyle={{ textAlign: 'left' }} visible={popoverVisible} >
            <img src={avatarSvg} style={{ cursor: 'pointer' }} onClick={() => setPopoverVisible(true)} />
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Topbar;