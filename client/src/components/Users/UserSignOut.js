import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//signs the user out
const UserSignOut = ({context}) => {
  useEffect(() =>  context.actions.signOut());
//directs the user to the courses page
  return (
    <Redirect to="/" />
  );
}

export default UserSignOut;
