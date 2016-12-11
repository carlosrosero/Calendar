import {actionTypes} from 'actions/Event';
// import {actionTypes as authActionTypes} from 'actions/login';

const initialState = {};

export default function events(state = initialState, action) {
  switch (action.type) {
    case actionTypes.fetchAll.SUCCESS:
      return {
        ...action.response.entities.events,
      };
    default:
      return state;
  }
}
