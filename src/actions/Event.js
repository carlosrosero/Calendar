import {createRequestTypes, action} from 'helpers/actions';

// TODO: must be actionTypes = {fetch: createRequestTypes('GET_USER')}
export const actionTypes = {
  create: createRequestTypes('EVENT/CREATE'),
  update: createRequestTypes('EVENT/UPDATE'),
};
export const CREATE_EVENT = 'CREATE_EVENT';

export const actionCreators = {
  create: {
    request: () => action(actionTypes.create.REQUEST, {}),
    success: (id, response) => action(actionTypes.create.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.create.FAILURE, {error}),
  },
};

export const createEvent = (data) => {
  return action(CREATE_EVENT, {data});
};
