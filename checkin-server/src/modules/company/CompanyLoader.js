// @flow
import DataLoader from 'dataloader';
import { Company as CompanyModel } from '../../model/index';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';

import type { ConnectionArguments } from 'graphql-relay';
import type { GraphQLContext } from '../../TypeDefinition';

type CompanyType = {
  id: string,
  _id: string,
  hashes: Array<string>,
  location: Object,
};

export default class Company {
  id: string;
  _id: string;
  hashes: Array<string>;
  location: Object;

  constructor(data: CompanyType, { company }: GraphQLContext) {
    this.id = data.id;
    this._id = data._id;
    this.hashes = data.hashes;
    this.location = data.location;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(CompanyModel, ids));

const viewerCanSee = (context, data) => {
  // Anyone can see another user
  return true;
};

export const load = async (context: GraphQLContext, id: string): Promise<?Company> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.CompanyLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee(context, data) ? new Company(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: string) => {
  return dataloaders.UserLoader.clear(id.toString());
};

export const loadCompanies = async (context: GraphQLContext, args: ConnectionArguments) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
  const companies = CompanyModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: companies,
    context,
    args,
    loader: load,
  });
};
