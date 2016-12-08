import jsdom from 'jsdom';
import sinon from 'sinon';

function initTestEnv() {
  initTestEnv.initialized = true;

  const doc = jsdom.jsdom('<body></body>');

  global.document = doc;
  global.window = document.defaultView;
  global.navigator = window.navigator;
}
initTestEnv.initialized = false;

if (!initTestEnv.initialized) {
  initTestEnv();
}


export const reactWarnings = {
  watchConsole() {
    this.stub = sinon.stub(console, 'error');
  },
  propWarnings() {
    const propWarnings = [];
    for (let i = 0; i < this.stub.callCount; i++) {
      const stubCall = this.stub.getCall(i);
      if (/(Invalid prop|Failed prop)/.test(stubCall.args[0])) {
        propWarnings.push(stubCall.args[0]);
      }
    }
    // console.error.restore();
    this.stub.restore();

    return propWarnings;
  },
};
