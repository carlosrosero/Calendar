import _injectTapEventPlugin from 'react-tap-event-plugin';

export default function injectTapEventPlugin() {
  if (!injectTapEventPlugin.injected) {
    _injectTapEventPlugin();
    injectTapEventPlugin.injected = true;
  }
}
