// @flow

import { GraphQLObjectType } from 'graphql';

import LoginEmail from '../mutation/LoginEmailMutation';
import UserCheck from '../mutation/UserCheckMutation';
import ChangePassword from '../mutation/ChangePasswordMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
		// auth
    LoginEmail,
    UserCheck,
    ChangePassword,
  }),
});
