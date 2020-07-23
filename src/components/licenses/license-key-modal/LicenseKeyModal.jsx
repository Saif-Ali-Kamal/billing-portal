import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Card, Typography } from 'antd';

const LicenseKeyModal = ({ handleCancel, licenseKey, licenseSecret }) => {
  return (
    <Modal
      title='Steps to apply license key'
      visible={true}
      onCancel={handleCancel}
      footer={null} >
      <ol style={{ padding: 16 }}>
        <li>Open Mission Control (Admin UI) of the Space Cloud cluster.</li>
        <li>Navigate to Settings &gt; License</li>
        <li>Click on the Apply license key button.</li>
        <li>Provide the Space Cloud cluster a name</li>
        <li>Copy paste the below Key and Secret.</li>
        <li>Hit the Apply button. That’s it:)</li>
      </ol>
      <Card>
        <h3><b>License Key Details</b></h3>
        <p><b>Key</b>: <Typography.Paragraph style={{ display: "inline" }} copyable ellipsis>{licenseKey}</Typography.Paragraph></p>
        <p><b>Secret</b>: <Typography.Paragraph style={{ display: "inline" }} copyable={{ text: licenseSecret }} ellipsis>*********************</Typography.Paragraph></p>
      </Card>
    </Modal>
  );
}

export default LicenseKeyModal;