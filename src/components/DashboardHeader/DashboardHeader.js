import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Dropdown,
  DropdownMenu,
  Icon
} from '@folio/stripes/components';

import css from './DashboardHeader.css';

export default function DashboardHeader ({ widgetOptions }) {
  const renderWidgetMenu = ({ onToggle }) => {
    return (
      <DropdownMenu
        data-role="menu"
        onToggle={onToggle}
      >
        {widgetOptions.map(w => renderWidgetOption(w))}
      </DropdownMenu>
    );
  };

  const renderWidgetOption = (widget) => {
    console.log("widget: %o", widget)
    return (
      <Button
        buttonStyle="dropdownItem"
        id={`widget-${widget.name}`}
        marginBottom0
        onClick={() => alert(`Create new ${widget.label} widget`)}
      >
        <Icon
          icon="plus-sign"
          size="small"
        >
          <FormattedMessage id="ui-dashboard.dashboard.newWidget" values={{label: widget.label}}/>
        </Icon>
      </Button>
    );
  }

  return (
    <div className={css.dashboardHeader} >
      <Dropdown
        buttonProps={{
          'buttonStyle': 'primary',
          'marginBottom0': true,
        }}
        label={<FormattedMessage id="ui-dashboard.dashboardHeader.new" />}
        renderMenu={renderWidgetMenu}
      />
    </div>
  );
}
