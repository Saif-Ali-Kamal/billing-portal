import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
import ContactForm from '../../components/contact-us/ContactForm';
import MessageCard from '../../components/contact-us/MessageCard';
import { incrementPendingRequests, decrementPendingRequests, notify } from '../../utils';
import { contactUs } from '../../operations/userManagement';
import { useLocation } from 'react-router';

const ContactUs = () => {
  const { state = {} } = useLocation()

  useEffect(() => {
    ReactGA.pageview('/billing/contact-us');
  }, [])

  // Handlers
  const handleContactUs = (subject, msg) => {
    incrementPendingRequests()
    contactUs(subject, msg)
      .then(() => notify("success", "Success", "Sent message successfully. Our team will get back to you shortly!"))
      .catch(ex => notify("error", "Error sending message", ex))
      .finally(() => decrementPendingRequests())
  }

  return (
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem="contact-us" />
      <ProjectPageLayout>
        <Content>
          <MessageCard />
          <ContactForm handleSubmit={handleContactUs} subject={state.subject} />
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default ContactUs;