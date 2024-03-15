import { createApolloServer } from './server.js';

if (process.env.NODE_ENV !== 'test') {
  const { url } = await createApolloServer();
  console.log(`🚀 Query endpoint ready at ${url}`);
}
