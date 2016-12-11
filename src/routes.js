import React from 'react';
import {Route, Redirect, IndexRedirect} from 'react-router';

import App from 'components/App';
import * as CalendarPage from 'components/Screens/Calendar';
import HelpPage from 'components/Screens/Help';
import NotFoundView from 'components/Screens/NotFound';

export default [
  <Redirect from="/" to="/calendar" />,
  <Route path="/" component={App}>
    <IndexRedirect to="calendar/week" />
    <Route path="calendar" component={CalendarPage.Container}>
      <IndexRedirect to="week" />
      <Route path="week" component={CalendarPage.Week} />
    </Route>
    <Route path="calendar/event/:id" component={CalendarPage.CreateEvent} />

    <Route path="help" component={HelpPage} />
    <Route path="404" component={NotFoundView} />
  </Route>,
];
