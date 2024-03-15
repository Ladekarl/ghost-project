import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ListenOptions } from 'net';

import { schema } from './schema.js';

export const createApolloServer = async (
  listenOptions: ListenOptions = { port: 4000 }
): Promise<{ server: ApolloServer; url: string }> => {
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: listenOptions
  });

  return { server, url };
};
