import React from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        const isAllowed = isPrivate === !!user;
        const path = isPrivate ? '/' : '/dashboard';

        return isAllowed ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: path, state: { from: location } }} />
        );
      }}
    />
  );
};

export default Route;
