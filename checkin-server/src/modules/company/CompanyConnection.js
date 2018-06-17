// @flow

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

import CompanyType from './CompanyType';

export default connectionDefinitions({
  name: 'Company',
  nodeType: CompanyType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
