import {actionTypes as loginActionTypes} from 'actions/login';
import {actionTypes as userActionTypes} from 'actions/user';

const initialState = {
  requested: false,
  userId: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case loginActionTypes.login.post.FAILURE:
    case userActionTypes.loggedUser.fetch.FAILURE:
      return {
        ...state,
        requested: true,
      };
    case loginActionTypes.login.post.SUCCESS:
    case loginActionTypes.register.post.SUCCESS:
      return {
        ...state,
        requested: true,
      };
    case userActionTypes.loggedUser.fetch.SUCCESS:
      return {
        ...state,
        userId: action.response.result,
      };

    default:
      return state;
  }
}
