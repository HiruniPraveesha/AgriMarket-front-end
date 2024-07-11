import React, { FC, ReactNode } from 'react';
import Sidebar1 from './AdminSidebar'; // Adjust the import path accordingly
import { Box } from '@mui/material';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Box display="flex">
      <Sidebar1 />
      <Box component="main" flexGrow={1} p={3}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
