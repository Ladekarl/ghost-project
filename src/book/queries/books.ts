import gql from 'graphql-tag';

import { Book } from '../../__generated__/resolvers-types.js';

export const booksType = gql`
  type Query {
    books: [Book]
  }
`;

const BooksDB: Omit<Required<Book>, '__typename'>[] = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin'
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster'
  }
];

const books = async (): Promise<Book[]> => {
  return BooksDB;
};

export default books;
