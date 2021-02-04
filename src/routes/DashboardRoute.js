import React from 'react';
import { stripesConnect } from '@folio/stripes/core';

import Dashboard from '../components/Dashboard';


const DashboardRoute = () => {
  return (
    <Dashboard />
  );
};

export default stripesConnect(DashboardRoute);

DashboardRoute.manifest = Object.freeze({
  dashboards: {
    type: 'okapi',
    path: (_q, _p, _r, _l, props) => {
      const userId = props.okapi?.currentUser?.id
      return `servint/dashboard/my-dashboards`;
    },
    shouldRefresh: () => false,
  },
});