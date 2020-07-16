import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Topbar from '../../components/topbar/Topbar';
import Sidenav from '../../components/sidenav/Sidenav';
import ProjectPageLayout, { Content } from '../../components/project-page-layout/ProjectPageLayout';
import ContactForm from '../../components/contact-us/ContactForm';
import MessageCard from '../../components/contact-us/MessageCard';

const ContactUs = () => {
  useEffect(() => {
    ReactGA.pageview('/billing/contact-us');
  }, [])

  return(
    <React.Fragment>
      <Topbar showBillingSelector />
      <Sidenav selectedItem="contact-us" />
      <ProjectPageLayout>
        <Content>
          <MessageCard />
          <ContactForm />
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
}

export default ContactUs;