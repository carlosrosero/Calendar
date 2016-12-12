import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import Checkbox from './index.js';

test('Checkbox', (t) => {
  const props = {
    label: 'click me',
    value: false,
    onChange: sinon.spy(),
  };

  let el = shallow(<Checkbox {...props} />);
  t.is(el.type(), 'div', 'Must render `div` component as root.');
  t.is(el.children().text(), ' click me', 'Must render ` click me` as children.');
  t.is(el.find('input').length, 1, 'Must render an input.');
  t.is(el.find('input').props().value, false, 'Must have `value` prop  prop set to `false`.');

  t.is(props.onChange.calledOnce, false, 'Must not call `onChange` if it is not changed');
  el.find('input').simulate('change');
  t.is(props.onChange.calledOnce, true, 'Must call `onChange` when it is changed');


  // change props and check them again
  props.label = 'yo man';
  props.value = true;
  el = shallow(<Checkbox {...props} />);
  t.is(el.children().text(), ' yo man', 'Must render ` yo man` as children.');
  t.is(el.find('input').props().value, true, 'Must have `value` prop  prop set to `true`.');
});
