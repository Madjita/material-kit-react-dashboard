import React from 'react';
import { Layout as DashboardLayout } from '../../layouts/dashboard/layout';

interface PageProps {
  children: React.ReactNode;
}

const LayoutWithLogs: React.FC<PageProps> = ({ children }) => {
  console.log("Layout[",children,"] component is rendering.");
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};

export default LayoutWithLogs;