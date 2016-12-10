// libs
import React, {PropTypes} from 'react';
// components
import LinkButton from 'components/Base/LinkButton';

export default function CalendarContainer({children}) {
  return (
    <div className="row">
      <div className="col-md-1">
        <LinkButton href="/calendar/create-event">New Event</LinkButton>
      </div>
      <div className="col-md-11">
        {children}
      </div>
    </div>
  );
}
CalendarContainer.propTypes = {
  children: PropTypes.any.isRequired,
};
