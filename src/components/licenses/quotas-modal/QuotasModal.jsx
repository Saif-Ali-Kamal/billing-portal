import React from 'react';
import { Modal } from 'antd';
import { Card } from 'antd';

const QuotasModal = ({ handleCancel, meta }) => {
  const maxClusters = meta && meta.maxClusters ? meta.maxClusters : 1
  const maxProjects = meta && meta.maxProjects ? meta.maxProjects : 1
  const maxDatabases = meta && meta.maxDatabases ? meta.maxDatabases : 1
  return (
    <Modal
      title='License quotas'
      visible={true}
      onCancel={handleCancel}
      footer={null} >
      <Card>
        <p style={{ marginBottom: 8 }}>Max clusters: {maxClusters}</p>
        <p style={{ marginBottom: 8 }}>Max projects/cluster: {maxProjects}</p>
        <p style={{ marginBottom: 8 }}>Max databases/project: {maxDatabases}</p>
      </Card>
    </Modal>
  );
}

export default QuotasModal;