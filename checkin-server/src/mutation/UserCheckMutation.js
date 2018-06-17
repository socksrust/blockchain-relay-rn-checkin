// @flow
import { GraphQLBoolean, GraphQLNonNull, GraphQLString, GraphQLInputObjectType, GraphQLFloat } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Company } from '../model';

const CoordinatesInputType = new GraphQLInputObjectType({
  name: 'CoordinatesInputType',
  description: 'Coordinates',
  fields: () => ({
    lat: {
      type: GraphQLNonNull(GraphQLFloat),
      description: 'Returns Latitude',
    },
    lng: {
      type: GraphQLNonNull(GraphQLFloat),
      description: 'Returns Longitude',
    },
  }),
});

export default mutationWithClientMutationId({
  name: 'UserCheck',
  inputFields: {
    location: {
      type: CoordinatesInputType,
      description: 'Lat and lng of candidate',
    },
    checkin: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    hash: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args) => {
    const { location, hash } = args;
    const { lng, lat } = location;

    const company = await Company.findOne();

    if (!company) {
      return {
        error: 'Sua empresa não está cadastrada',
      };
    }

    const conditions = {
      location:
        {
          $near:
           {
             $geometry: { type: 'Point', coordinates: [lng, lat] },
             $minDistance: 0,
             $maxDistance: 5000, // 5km
           },
        },
    };
    console.log(lng);
    console.log(lat);

    const geoCompany = await Company.findOne(conditions);

    if (geoCompany) {
      if (geoCompany.hashes.indexOf(hash.toLowerCase()) !== -1) {
        return {
          error: false,
        };
      }

      return {
        error: true,
      };
    }

    return {
      error: true,
    };
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
