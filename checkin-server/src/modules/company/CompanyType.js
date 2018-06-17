// @flow

import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLLitst } from 'graphql';
import { globalIdField } from 'graphql-relay';
import idx from 'idx';

import { NodeInterface } from '../../interface/NodeInterface';

const CoordinatesType = new GraphQLObjectType({
  name: 'CoordinatesType',
  description: 'Coordinates',
  fields: () => ({
    lat: {
      type: GraphQLFloat,
      description: 'Returns Latitude',
      resolve: obj => obj.lat,
    },
    lng: {
      type: GraphQLFloat,
      description: 'Returns Longitude',
      resolve: obj => obj.lng,
    },
  }),
});

export default new GraphQLObjectType({
  name: 'Company',
  description: 'Company data',
  fields: () => ({
    id: globalIdField('Company'),
    _id: {
      type: GraphQLString,
      resolve: obj => obj._id,
    },
    hashes: {
      type: GraphQLLitst(GraphQLString),
      resolve: obj => obj.name,
    },
    },
    location: {
      type: CoordinatesType,
      description: 'Location',
      resolve: obj => ({
        lat: idx(obj.address, _ => _.location.coordinates[0]),
        lng: idx(obj.address, _ => _.location.coordinates[1]),
      }),
    },
  }),
  interfaces: () => [NodeInterface],
});
