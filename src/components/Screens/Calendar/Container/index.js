// libs
import React, {PropTypes} from 'react';
import cn from 'classnames';
// components
import LinkButton from 'components/Base/LinkButton';
// other
import styles from './index.css';

export default function CalendarContainer({children}) {
  return (
    <div className="row">
      <div className="col-lg-1">
        <LinkButton
          href="/calendar/event/create"
          className={cn('visible-xs-block visible-sm-block visible-md-block visible-lg-inline-block', styles.newEventButton)}
        >
          New Event
        </LinkButton>
      </div>
      <div className={cn('col-lg-11', styles.content)}>
        {children}
      </div>
    </div>
  );
}
CalendarContainer.propTypes = {
  children: PropTypes.any.isRequired,
};
