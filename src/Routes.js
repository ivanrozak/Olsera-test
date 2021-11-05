import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

function Routes() {
  return (
    <Switch>
      <Route path='auth/login' />
    </Switch>
  );
}

export default Routes;
