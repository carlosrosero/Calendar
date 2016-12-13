import moment from 'moment';
import {createRequestTypes, action} from 'helpers/Actions';

export const actionTypes = {
  create: createRequestTypes('EVENT/CREATE'),
  update: createRequestTypes('EVENT/UPDATE'),
  fetchAll: createRequestTypes('EVENT/FETCH_ALL'),
  remove: createRequestTypes('EVENT/REMOVE'),
};
export const CREATE_EVENT = '@EVENT/CREATE';
export const UPDATE_EVENT = '@EVENT/UPDATE';
export const REMOVE_EVENT = '@EVENT/REMOVE';
export const FETCH_ALL_EVENTS = '@EVENTS/FETCH_ALL';

export const actionCreators = {
  create: {
    request: (originalAction) => action(actionTypes.create.REQUEST, {originalAction}),
    success: (originalAction, response) => action(actionTypes.create.SUCCESS, {originalAction, response}),
    failure: (originalAction, error) => action(actionTypes.create.FAILURE, {originalAction, error}),
  },
  update: {
    request: (originalAction) => action(actionTypes.update.REQUEST, {originalAction}),
    success: (originalAction, response) => action(actionTypes.update.SUCCESS, {originalAction, response}),
    failure: (originalAction, error) => action(actionTypes.update.FAILURE, {originalAction, error}),
  },
  fetchAll: {
    request: (originalAction) => action(actionTypes.fetchAll.REQUEST, {originalAction}),
    success: (originalAction, response) => action(actionTypes.fetchAll.SUCCESS, {originalAction, response}),
    failure: (originalAction, error) => action(actionTypes.fetchAll.FAILURE, {originalAction, error}),
  },
  remove: {
    request: (originalAction) => action(actionTypes.remove.REQUEST, {originalAction}),
    success: (originalAction, response) => action(actionTypes.remove.SUCCESS, {originalAction, response}),
    failure: (originalAction, error) => action(actionTypes.remove.FAILURE, {originalAction, error}),
  },
};

export const createEvent = (data, redirectToCalendar = true) => {
  return action(CREATE_EVENT, {
    // according to the requirements, we don't have powerful API that will allow to search events by date using
    // the 'start' field (because it's contains both date and time), so we have to store the startDay field
    // that will allow to search events by day
    data: {...data, startDay: moment(data.start).format('YYYY-MM-DD')},
    redirectToCalendar,
  });
};

export const updateEvent = (data) => {
  return action(UPDATE_EVENT, {data});
};

export const fetchAllEvents = (query) => {
  return action(FETCH_ALL_EVENTS, {query});
};

export const removeEvent = (id) => {
  return action(REMOVE_EVENT, {id});
};
