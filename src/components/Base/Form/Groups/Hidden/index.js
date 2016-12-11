// libs
import React, {PropTypes} from 'react';

export default function Hidden({input}) {
  return <input {...input} type="hidden" />;
}
Hidden.propTypes = {
  input: PropTypes.object.isRequired,
};
