import React, { useState } from 'react'
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Menu, Popover, Row, Col, Divider, Dropdown, message } from 'antd';
import './topbar.css'
import store from "../../store"
import { set } from "automate-redux"
import logo from '../../assets/logo-black.svg';
import upLogo from '../../logo.png';
import avatarSvg from '../../assets/avatar.svg';
import ChangePassword from '../change-password/ChangePassword';

const Topbar = (props) => {
  const [account, setAccount] = useState('billing-account-1')
  const [changePasswordVisible, setChangePasswordVisible] = useState(false)
  const [popoverVisible, setPopoverVisible] = useState(false)

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

  const selectAccount = ({ key }) => {
    setAccount(key);
  };

  const menu = (
    <Menu onClick={selectAccount}>
      <Menu.Item key="billing-account-1">Billing account 1</Menu.Item>
      <Menu.Item key="billing-account-2">Billing account 2</Menu.Item>
      <Menu.Item key="billing-account-3">Billing account 3</Menu.Item>
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
            <a className="ant-dropdown-link btn-rounded" onClick={e => e.preventDefault()} >
              {account} <DownOutlined style={{ marginLeft: '16px' }} />
            </a>
          </Dropdown>
        </div>}

        <div className="right-list" >
          <Popover className="" content={avatarContent} trigger="click" placement="bottomLeft" overlayStyle={{ textAlign: 'left' }} visible={popoverVisible} >
            <img src={avatarSvg} style={{ cursor: 'pointer' }} onClick={() => setPopoverVisible(true)} />
          </Popover>
        </div>
        {changePasswordVisible && <ChangePassword handleCancel={() => setChangePasswordVisible(false)} />}
      </div>
    </div>
  );
}

export default Topbar;