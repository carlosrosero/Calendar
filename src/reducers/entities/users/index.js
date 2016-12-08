import {actionTypes} from 'actions/user';
// import {actionTypes as authActionTypes} from 'actions/login';

const initialState = {};

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case actionTypes.loggedUser.fetch.SUCCESS:
    case actionTypes.loggedUser.update.SUCCESS:
    // case authActionTypes.register.post.SUCCESS:
    // case authActionTypes.login.post.SUCCESS:
      return {
        ...action.response.entities.users,
      };
    default:
      return state;
  }
}
