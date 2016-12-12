import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import Button from './index.js';

test('Button', (t) => {
  const props = {
    type: 'submit',
    disabled: false,
    onClick: sinon.spy(),
  };

  let el = shallow(<Button {...props}>Go</Button>);
  t.is(el.type(), 'button', 'Must render `button` component as root.');
  t.is(el.children().text(), 'Go', 'Must render `Go` as children.');
  t.is(el.props().type, 'submit', 'Must have `type` prop set to `submit`.');
  t.is(el.props().disabled, false, 'Must have `disabled` prop  prop set to `false`.');

  t.is(props.onClick.calledOnce, false, 'Must not call `onClick` if it is not clicked');
  el.simulate('click');
  t.is(props.onClick.calledOnce, true, 'Must call `onClick` when it is clicked');


  // change props and check them again
  props.type = 'reset';
  props.disabled = true;
  el = shallow(<Button {...props}>Stop</Button>);
  t.is(el.children().text(), 'Stop', 'Must render `Stop` as children.');
  t.is(el.props().type, 'reset', 'Must have `type` prop set to `reset`.');
  t.is(el.props().disabled, true, 'Must have `disabled` prop  prop set to `true`.');
});
