import React from 'react';

import {
  Badge,
  Card,
  Headline
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import DashboardHeader from './DashboardHeader';
import NoWidgets from './NoWidgets';

import css from './Dashboard.css';

const propTypes = {
};

export default function Dashboard() {
  const widgetOptions = [
    {
      name: 'agreementList',
      label: 'Agreement list'
    },
    {
      name: 'licenseList',
      label: 'License list'
    },
    {
      name: 'rss',
      label: 'RSS'
    },
  ];

  const widgetList = [
    {
      appName: 'agreements',
      title: 'Agreement widget test',
      weight: 0,
      widgetName: 'agreementList'
    },
    {
      appName: 'licenses',
      title: 'License widget test',
      weight: 1,
      widgetName: 'licenseList',
    },
    {
      appName: 'licenses',
      title: 'Test #3',
      weight: 2,
      widgetName: 'licenseList',
    },
    {
      appName: 'licenses',
      title: 'Test #5',
      weight: 4,
      widgetName: 'licenseList',
    },
    {
      appName: 'agreements',
      title: 'Test # 4',
      weight: 3,
      widgetName: 'licenseList',
    }
  ];

  const renderWidget = (widget) => {
    return (
      <div className={css.widget}>
        <Card
          cardStyle="positive"
          headerStart={(
            <AppIcon
              app={widget.appName}
              size="medium"
            >
              <Headline
                className={css.widgetTitle}
                margin="none"
                size="large"
              >
                {widget.title}
              </Headline>
            </AppIcon>
          )
          }
          headerEnd={
            <Badge>
              23
            </Badge>
          }
          roundedBorder
        >
          Hello, I&apos;m a widget
        </Card>
      </div>
    );
  };

  const dashboardContents = () => {
    if (widgetList.length === 0) {
      return <NoWidgets />;
    }
    return (
      <div className={css.widgetContainer}>
        {
        widgetList.sort(
          (a, b) => {
            if (a.weight > b.weight) return 1;
            else if (b.weight > a.weight) return -1;
            return 0;
          }
        ).map(w => renderWidget(w))
        }
      </div>
    );
  };

  return (
    <div className={css.dashboard}>
      <DashboardHeader
        widgetOptions={widgetOptions}
      />
      <div className={css.dashboardContent}>
        {dashboardContents()}
      </div>
    </div>
  );
}

Dashboard.propTypes = propTypes;
