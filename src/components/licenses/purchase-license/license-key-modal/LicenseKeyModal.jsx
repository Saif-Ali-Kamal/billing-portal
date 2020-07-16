import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Card, Typography } from 'antd';

const LicenseKeyModal = (props) => {
  return (
    <Modal 
      title='Steps to apply license key'
      visible={true}
      onCancel={props.handleCancel}
      footer={null} >
        <ol>
          <li>Open Mission Control (Admin UI) of the Space Cloud cluster.</li>
          <li>Navigate to Settings &gt; Cluster Settings</li>
          <li>Click on the Apply license key button.</li>
          <li>Provide the Space Cloud cluster a name</li>
          <li>Copy paste the below ID and Secret.</li>
          <li>Hit the Apply button. That’s it:)</li>
        </ol>
        <Card>
          <h3><b>License Key Details</b></h3>
          <p><b>ID</b>: <Typography.Paragraph style={{ display: "inline" }} copyable ellipsis>lic_fg982uy3hekajs87y</Typography.Paragraph></p>
          <p><b>Secret</b>: <Typography.Paragraph style={{ display: "inline" }} copyable={{ text: 'lic_fg982uy3hekajs87y' }} ellipsis>*********************</Typography.Paragraph></p>
        </Card>
    </Modal>
  );
}

export default LicenseKeyModal;