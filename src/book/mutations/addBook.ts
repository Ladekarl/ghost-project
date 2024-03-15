import gql from 'graphql-tag';

import { AddBookMutationResponse } from '../../__generated__/graphql.js';

export const addBookTypes = gql`
  type Mutation {
    addBook(input: AddBookInput): AddBookMutationResponse
  }

  input AddBookInput {
    title: String
    author: String
  }

  type AddBookMutationResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
  }
`;

const addBook = async (): Promise<AddBookMutationResponse> => {
  return {
    code: '200',
    success: true,
    message: 'Added book'
  };
};

export default addBook;
