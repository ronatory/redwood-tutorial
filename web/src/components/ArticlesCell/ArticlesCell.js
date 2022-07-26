import PostList from 'src/components/PostList'

export const QUERY = gql`
  query BlogPostsQuery($take: Int) {
    articles: posts(take: $take) {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ articles }) => {
  return <PostList articles={articles} />
}
