export const schema = gql`
  type Post {
    id: Int!
    title: String!
    body: String!
    createdAt: DateTime!
  }

  type Query {
    posts(take: Int): [Post!]! @skipAuth
    post(id: Int!): Post @skipAuth
    paginatedPosts(cursorId: Int, take: Int, skip: Int): [Post!]! @skipAuth
  }

  input CreatePostInput {
    title: String!
    body: String!
  }

  input UpdatePostInput {
    title: String
    body: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth(roles: ["FOO"])
  }
`
