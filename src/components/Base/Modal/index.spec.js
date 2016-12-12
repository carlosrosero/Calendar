import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {Modal as OverlayModal} from 'react-overlays';
import Modal from './index.js';

test('Modal', (t) => {
  const props = {
    show: false,
    onHide: sinon.spy(),
  };

  let el = shallow(<Modal {...props}>Modal content</Modal>);
  t.is(el.type(), OverlayModal, 'Must render `OverlayModal` component as root.');
  t.is(el.children().text(), 'Modal content', 'Must render `Modal content` as children.');
  t.is(el.props().show, false, 'Must have `show` prop set to `false`.');

  t.is(props.onHide.calledOnce, false, 'Must not call `onHide` if it is hiding');
  el.simulate('hide');
  t.is(props.onHide.calledOnce, true, 'Must call `onHide` when it is hiding');


  // change props and check them again
  props.show = true;
  el = shallow(<Modal {...props}>Why am I not sleeping?</Modal>);
  t.is(el.children().text(), 'Why am I not sleeping?', 'Must render `Why am I not sleeping?` as children.');
  t.is(el.props().show, true, 'Must have `show` prop set to `true`.');
});
