import {actionTypes} from 'actions/Event';

const initialState = {
  status: '',
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case actionTypes.create.REQUEST:
      return {
        status: 'pending',
      };

    case actionTypes.create.SUCCESS:
      return {
        status: 'success',
      };

    case actionTypes.create.FAILURE:
      return {
        status: 'failed',
      };
    default:
      return state;
  }
}
