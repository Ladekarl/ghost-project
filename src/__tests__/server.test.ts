import { App } from 'supertest/types';
import { createApolloServer } from '../server';

import request from 'supertest';

const getBooks = {
  query: `query GetBooks {
    books {
      author
    }
  }`
};

describe('e2e demo', () => {
  let server: { stop: () => any }, url: App;

  beforeAll(async () => {
    ({ server, url } = await createApolloServer({ port: 0 }));
  });

  afterAll(async () => {
    await server?.stop();
  });

  it('can get books', async () => {
    const response = await request(url).post('/').send(getBooks);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeTruthy();
  });
});
