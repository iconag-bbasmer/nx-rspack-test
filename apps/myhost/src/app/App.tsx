import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound';
import RemoteComponent from '../components/RemoteComponent';
import styles from './App.module.scss';

type RemoteEntry = {
  scope: string;
  module: string;
  url: string;
  name: string;
};

export function App() {
  const remotes: RemoteEntry[] = [
    {
      scope: 'myremote1',
      module: 'ModuleR1',
      url: `http://localhost:4201/remoteEntry.js?v=${+Date.now()}`,
      name: 'Remote 1',
    },
    {
      scope: 'myremote2',
      module: 'ModuleR2',
      url: `http://localhost:4202/remoteEntry.js?v=${+Date.now() + 1}`,
      name: 'Remote 2',
    },
  ];

  return (
    <React.Suspense fallback={<NotFound />}>
      <div className={styles.ICN_background}>SCSS Check</div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {remotes.map((remote, idx) => (
          <li key={`l_${idx}`}>
            <Link key={`li_${idx}`} to={`/${remote.module}`}>
              {remote.name}
            </Link>
          </li>
        ))}
      </ul>
      <Routes>
        <Route key="home" path="/" />
        {remotes.map((remote, key) => (
          <Route
            key={key}
            path={remote.module}
            element={
              <RemoteComponent
                component={remote.module}
                key={key}
                remoteUrl={remote.url}
                remote={remote.scope}
              />
            }
          />
        ))}
      </Routes>
    </React.Suspense>
  );
}

export default App;
