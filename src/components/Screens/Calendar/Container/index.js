// libs
import React, {PropTypes} from 'react';

export default function CalendarContainer({children}) {
  return (
    <div className="row">
      <div className="col-md-2">
        Create
      </div>
      <div  className="col-md-10">
        {children}
      </div>
    </div>
  );
}
CalendarContainer.propTypes = {};
