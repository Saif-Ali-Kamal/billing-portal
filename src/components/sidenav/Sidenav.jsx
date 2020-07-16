import React from 'react'
import { Link, useParams } from 'react-router-dom';
import SidenavItem from './SidenavItem'
import './sidenav.css'
import { useSelector } from "react-redux";
import store from "../../store"
import { set } from "automate-redux"

const Sidenav = (props) => {
  const { billingId } = useParams()
  const showSidenav = useSelector(state => state.uiState.showSidenav)
  const closeSidenav = () => {
    store.dispatch(set("uiState.showSidenav", false))
  }

  return (
    <div className="sidenav-container">
      <div className={showSidenav ? 'overlay' : 'no-overlay'} onClick={() => store.dispatch(set("uiState.showSidenav", false))}></div>
      <div className={showSidenav ? 'sidenav' : 'no-sidenav'}>
        <div style={{ overflowY: "auto" }}>
          <Link to={`/billing/${billingId}/licenses`} onClick={closeSidenav}>
            <SidenavItem name="Licenses" icon="vpn_key" active={props.selectedItem === 'licenses'} />
          </Link>
          <Link to={`/billing/${billingId}/invoices`} onClick={closeSidenav}>
            <SidenavItem name="Invoices" icon="attach_money" active={props.selectedItem === 'invoices'} />
          </Link>
          <Link to={`/billing/${billingId}/promo-codes`} onClick={closeSidenav}>
            <SidenavItem name="Promo codes" icon="redeem" active={props.selectedItem === 'promo-codes'} />
          </Link>
          <Link to={`/billing/${billingId}/billing-accounts`} onClick={closeSidenav}>
            <SidenavItem name="Billing accounts" icon="people" active={props.selectedItem === 'billing-accounts'} />
          </Link>
          <Link to={`/billing/${billingId}/contact-us`} onClick={closeSidenav}>
            <SidenavItem name="Contact us" icon="email" active={props.selectedItem === 'contact-us'} />
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Sidenav;