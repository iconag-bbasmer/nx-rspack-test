/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';
import {
  loadRemote,
  registerRemotes,
} from '@module-federation/enhanced/runtime';

export type RemoteComponentProps = {
  fallback?: string | React.ReactNode;
  remoteUrl: string;
  remote: string;
  component: string;
  scope?: string;
  [key: string]: any;
};

const useRemote = (scope: string, module: string, url: string) => {
  return lazy(async () => {
    registerRemotes([
      {
        name: scope,
        alias: scope,
        entry: url,
      },
    ]);

    return loadRemote<{ default: any }>(`${scope}/${module}`, {
      from: 'runtime',
    }) as Promise<{ default: any }>;
  });
};

const RemoteComponent: FC<RemoteComponentProps> = ({
  remoteUrl,
  remote,
  component,
  scope,
  fallback = null,
  ...props
}): ReturnType<React.FC> => {
  if (!remoteUrl) return <div>Unable to Fetch: {`${remote}/${component}`}</div>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Component = useRemote(remote, component, remoteUrl);

  return (
    <ErrorBoundary>
      <React.Suspense fallback={fallback}>
        <Component {...props} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default RemoteComponent;
