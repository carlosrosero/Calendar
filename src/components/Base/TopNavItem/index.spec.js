import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import {Link} from 'react-router';
import TopNavItem from './index.js';

test('TopNavItem', (t) => {
  const props = {
    label: 'item1',
    href: '/a/link',
  };

  let el = shallow(<TopNavItem {...props} />);
  t.is(el.type(), 'li', 'Must render `li` component as root.');
  t.is(el.find(Link).children().text(), props.label, 'Must render `item1`.');
  t.is(el.find(Link).length, 1, 'Must render `Link` inside li.');
  t.is(el.find(Link).props().to, props.href, 'Must have `to` prop set to `/a/link`.');

  // change props and check them again
  props.label = 'itemN';
  props.href = '/some/link';
  el = shallow(<TopNavItem {...props} />);
  t.is(el.find(Link).children().text(), props.label, 'Must render `itemN`.');
  t.is(el.find(Link).props().to, props.href, 'Must have `to` prop set to `/some/link`.');
});
