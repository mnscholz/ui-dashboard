import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';

import Dashboard from '../components/Dashboard';


const propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
};

const DashboardRoute = ({ location, history }) => {
  return (
    <Dashboard />
  );
};

DashboardRoute.propTypes = propTypes;

export default stripesConnect(DashboardRoute);
