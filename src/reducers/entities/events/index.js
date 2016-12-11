import {actionTypes} from 'actions/Event';
// import {actionTypes as authActionTypes} from 'actions/login';

const initialState = {};

export default function events(state = initialState, action) {
  switch (action.type) {
    case actionTypes.create.SUCCESS:
    case actionTypes.fetchAll.SUCCESS:
    case actionTypes.fetch.SUCCESS:
      return {
        ...state,
        ...action.response.entities.events,
      };
    default:
      return state;
  }
}
