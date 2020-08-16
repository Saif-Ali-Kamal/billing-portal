import React from 'react';
import { Modal } from 'antd';
import { Card } from 'antd';

const QuotasModal = ({ handleCancel, meta, licensesCount = 0 }) => {
  const integrationLevel = meta && meta.integrationLevel ? meta.integrationLevel : 0
  const maxProjects = meta && meta.maxProjects ? meta.maxProjects : 1
  const maxDatabases = meta && meta.maxDatabases ? meta.maxDatabases : 1
  return (
    <Modal
      title='License quotas'
      visible={true}
      onCancel={handleCancel}
      footer={null} >
      <Card>
        <p style={{ marginBottom: 8 }}>Total licenses: {licensesCount}</p>
        <p style={{ marginBottom: 8 }}>Max projects: {maxProjects}</p>
        <p style={{ marginBottom: 8 }}>Max databases: {maxDatabases}</p>
        <p style={{ marginBottom: 8 }}>Integraton level: {integrationLevel}</p>
      </Card>
    </Modal>
  );
}

export default QuotasModal;