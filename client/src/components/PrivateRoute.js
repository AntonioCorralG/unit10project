import React from 'react';
import { Consumer } from './Context/Context';
import { Route, Redirect, useParams } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={ props => context.loggedInuser ? (
            <Component {...props} />)
            : (<Redirect to ={{
              pathname: '/signin',
              state: { from: props.location },
            }} />)
          }        />
      )}
    </Consumer>
  );
};

export default PrivateRoute;
 
