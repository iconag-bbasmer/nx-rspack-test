import { init } from '@module-federation/runtime';

init({
  name: 'myhost',
  remotes: [],
});

import('./bootstrap');
