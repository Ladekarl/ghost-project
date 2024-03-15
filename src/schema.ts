import { makeExecutableSchema } from '@graphql-tools/schema';
import merge from 'lodash.merge';

import book from './book/index.js';

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [...book.typeDefs],
  resolvers: merge(resolvers, book.resolvers)
});
