import React from 'react';
import { StackNavigator } from 'react-navigation';

import UserCheck from './UserCheck';

const RelayApp = StackNavigator(
  {

    UserCheck: { screen: UserCheck },
  },
  {
    initialRouteName: 'UserCheck',
  },
);

export default () => <RelayApp />;
