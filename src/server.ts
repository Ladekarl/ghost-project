import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ListenOptions } from 'net';
import { readFileSync } from 'fs';
import resolvers from './resolvers/index.js';
import { BooksDataSource } from './datasources.js';

export interface MyContext {
  dataSources: {
    booksAPI: BooksDataSource;
  };
}

// Note: this only works locally because it relies on `npm` routing
// from the root directory of the project.
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

export const createApolloServer = async (
  listenOptions: ListenOptions = { port: 4000 }
): Promise<{ server: ApolloServer<MyContext>; url: string }> => {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers
  });

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
