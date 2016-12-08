import {actionTypes as loginActionTypes} from 'actions/login';

const initialState = {
  isLoginPending: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case loginActionTypes.login.post.REQUEST:
      return {
        isLoginPending: true,
      };

    case loginActionTypes.login.post.SUCCESS:
    case loginActionTypes.login.post.FAILURE:
      return {
        isLoginPending: false,
      };
    default:
      return state;
  }
}
