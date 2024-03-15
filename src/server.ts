import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { ListenOptions } from 'net';
import path from 'path';
import { fileURLToPath } from 'url';

import { BooksDataSource } from './datasources.js';
import resolvers from './resolvers/index.js';

export interface MyContext {
  dataSources: {
    booksAPI: BooksDataSource;
  };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schema = await loadSchema(path.join(__dirname, '../schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

export const createApolloServer = async (
  listenOptions: ListenOptions = { port: 4000 }
): Promise<{ server: ApolloServer<MyContext>; url: string }> => {
  const server = new ApolloServer<MyContext>({ schema: schemaWithResolvers });

  const { url } = await startStandaloneServer(server, {
    listen: listenOptions,
    context: async () => {
      return {
        // We are using a static data set for this example, but normally
        // this would be where you'd add your data source connections
        // or your REST API classes.
        dataSources: {
          booksAPI: new BooksDataSource()
        }
      };
    }
  });
  return { server, url };
};
