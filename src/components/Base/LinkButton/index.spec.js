import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import {Link} from 'react-router';
import LinkButton from './index.js';

test('LinkButton', (t) => {
  const props = {
    href: '/some/link',
  };

  let el = shallow(<LinkButton {...props}>Go</LinkButton>);
  t.is(el.type(), Link, 'Must render `Link` component as root.');
  t.is(el.children().text(), 'Go', 'Must render `Go` as children.');
  t.is(el.props().to, props.href, 'Must have `to` prop set to `/some/link`.');

  // change props and check them again
  props.href = '/another/link';
  el = shallow(<LinkButton {...props}>Stop</LinkButton>);
  t.is(el.children().text(), 'Stop', 'Must render `Stop` as children.');
  t.is(el.props().to, props.href, 'Must have `to` prop set to `/another/link`.');
});
