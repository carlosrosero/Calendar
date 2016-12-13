import {useBasename} from 'history';

// This helper is for setting basename on history object.
export function withBasename(history) {
  /* eslint-disable no-undef */
  const basename = (typeof __BASENAME__ !== 'undefined') ? __BASENAME__ : '';
  /* eslint-enable no-undef */
  return useBasename(() => history)({basename: `/${basename}`});
}
