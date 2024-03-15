import gql from 'graphql-tag';

import { addBookTypes } from './mutations/addBook.js';
import { booksType } from './queries/books.js';

const types = gql`
  type Book {
    title: String
    author: String
  }
`;

export default [types, addBookTypes, booksType];
