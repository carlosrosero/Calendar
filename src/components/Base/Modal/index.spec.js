import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {Modal as OverlayModal} from 'react-overlays';
import Modal from './index.js';

test('Modal', (t) => {
  const props = {
    title: 'My modal',
    show: false,
    onHide: sinon.spy(),
  };

  let el = shallow(<Modal {...props}>
    <div className="some-modal-content-class" />
  </Modal>);
  t.is(el.type(), OverlayModal, 'Must render `OverlayModal` component as root.');
  t.is(el.find('h4').text(), props.title, 'Must render `My modal` as title.');
  t.is(el.find('div.some-modal-content-class').length, 1, 'Must render div with the `some-modal-content-class` class as children.');
  t.is(el.props().show, false, 'Must have `show` prop set to `false`.');

  t.is(props.onHide.calledOnce, false, 'Must not call `onHide` if it is hiding');
  el.simulate('hide');
  t.is(props.onHide.calledOnce, true, 'Must call `onHide` when it is hiding');


  // change props and check them again
  props.show = true;
  props.title = 'New title';
  el = shallow(<Modal {...props}>
    <div className="cool-custom-class-123" />
  </Modal>);
  t.is(el.find('h4').text(), props.title, 'Must render `New title` as title.');
  t.is(el.find('div.cool-custom-class-123').length, 1, 'Must render div with the `cool-custom-class-123` class as children.');
  t.is(el.props().show, true, 'Must have `show` prop set to `true`.');
});
