import {createRequestTypes, action} from 'helpers/actions';

// TODO: must be actionTypes = {fetch: createRequestTypes('GET_USER')}
export const actionTypes = {
  create: createRequestTypes('EVENT/CREATE'),
  update: createRequestTypes('EVENT/UPDATE'),
  fetchAll: createRequestTypes('EVENT/FETCH_ALL'),
};
export const CREATE_EVENT = '@EVENT/CREATE';
export const FETCH_ALL_EVENTS = '@EVENTS/FETCH_ALL';

export const actionCreators = {
  create: {
    request: () => action(actionTypes.create.REQUEST, {}),
    success: (id, response) => action(actionTypes.create.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.create.FAILURE, {error}),
  },
  fetchAll: {
    request: () => action(actionTypes.fetchAll.REQUEST, {}),
    success: (id, response) => action(actionTypes.fetchAll.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.fetchAll.FAILURE, {error}),
  },
};

export const createEvent = (data, redirectToCalendar = true) => {
  return action(CREATE_EVENT, {data, redirectToCalendar});
};

export const fetchAllEvents = () => {
  return action(FETCH_ALL_EVENTS);
};
