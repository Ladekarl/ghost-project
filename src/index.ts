import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { BooksDataSource } from './datasources.js';
import resolvers from './resolvers/index.js';
import { readFileSync } from 'fs';
import { ListenOptions } from 'net';

// Note: this only works locally because it relies on `npm` routing
// from the root directory of the project.
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

export interface MyContext {
  dataSources: {
    booksAPI: BooksDataSource;
  };
}

// This function will create a new server Apollo Server instance
export const createApolloServer = async (
  listenOptions: ListenOptions = { port: 4000 }
): Promise<{ server: ApolloServer<MyContext>; url: string }> => {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers
  });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        // We are using a static data set for this example, but normally
        // this would be where you'd add your data source connections
        // or your REST API classes.
        dataSources: {
          booksAPI: new BooksDataSource()
        },
        listenOptions
      };
    }
  });
  return { server, url };
};

// For simplicity we create our server in this file,
// but in a real app you'd export `createApolloServer` into
// another file and call it elsewhere.
if (process.env.NODE_ENV !== 'test') {
  const { url } = await createApolloServer();
  console.log(`🚀 Query endpoint ready at ${url}`);
}
