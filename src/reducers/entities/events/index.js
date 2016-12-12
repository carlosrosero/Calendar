import _ from 'lodash';
import {actionTypes} from 'actions/Event';

const initialState = {};

export default function events(state = initialState, action) {
  switch (action.type) {
    case actionTypes.create.SUCCESS:
    case actionTypes.update.SUCCESS:
    case actionTypes.fetchAll.SUCCESS:
      return {
        ...state,
        ...action.response.entities.events,
      };

    case actionTypes.remove.SUCCESS:
      console.log();
      return {
        ..._.omit(state, action.response.id),
      };
    default:
      return state;
  }
}
