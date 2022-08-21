import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Destroyng the user login
const UserSignOut = ({context}) => {
  useEffect(() =>  context.actions.signOut());
  return (
    <Redirect to="/" />
  );
}

export default UserSignOut;
