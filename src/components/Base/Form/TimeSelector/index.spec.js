import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import TimeSelector from './index.js';

test('TimeSelector', (t) => {
  const props = {
    value: '',
    onChange: sinon.spy(),
    onBlur: sinon.spy(),
  };

  let el = shallow(<TimeSelector {...props} />);
  t.is(el.type(), 'select', 'Must render `select` component as root.');
  t.is(el.props().value, '', 'Must have `value` prop set to empty string.');
  t.is(el.find('option').length, 49, 'Must render `49` options.');

  t.is(props.onChange.calledOnce, false, 'Must not call `onChange` if it is not changed');
  el.simulate('change', {target: {value: 111}});
  t.is(props.onChange.calledOnce, true, 'Must call `onChange` when it is changed');
  t.is(props.onChange.getCall(0).args[0], 111, 'Must call `onChange` with 111');

  t.is(props.onBlur.calledOnce, false, 'Must not call `onBlur` if it is not blured');
  el.simulate('blur', 666);
  t.is(props.onBlur.calledOnce, true, 'Must call `onBlur` when it is blured');
  t.is(props.onBlur.getCall(0).args[0], 666, 'Must call `onChange` with 666');


  // change props and check them again
  props.value = '00:30';
  el = shallow(<TimeSelector {...props} />);
  t.is(el.props().value, '00:30', 'Must have `value` prop set to `00:30`.');
});
