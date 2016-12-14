import _injectTapEventPlugin from 'react-tap-event-plugin';

// prevents from multiple call of _injectTapEventPlugin
export default function injectTapEventPlugin() {
  if (!injectTapEventPlugin.injected) {
    _injectTapEventPlugin();
    injectTapEventPlugin.injected = true;
  }
}
