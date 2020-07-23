import React from 'react';
import { Modal } from 'antd';
import { Card } from 'antd';

const QuotasModal = ({ handleCancel, quotas }) => {
  const maxClusters = quotas && quotas.maxClusters ? quotas.maxClusters : 1
  const maxProjects = quotas && quotas.maxProjects ? quotas.maxProjects : 1
  const maxDatabases = quotas && quotas.maxDatabases ? quotas.maxDatabases : 1
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