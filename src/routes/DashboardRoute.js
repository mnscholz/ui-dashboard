import React from 'react';
import { stripesConnect } from '@folio/stripes/core';

import Dashboard from '../components/Dashboard';


const DashboardRoute = () => {
  return (
    <Dashboard />
  );
};

export default stripesConnect(DashboardRoute);
