import Article from 'src/components/Article'

import { useState } from 'react'

import { useApolloClient } from '@apollo/client'

const NEW_POSTS_QUERY = gql`
  query ($cursorId: Int, $take: Int, $skip: Int) {
    newPosts: paginatedPosts(cursorId: $cursorId, take: $take, skip: $skip) {
      id
      title
      body
      createdAt
    }
  }
`

const PostList = ({ articles }) => {
  const [posts, setPosts] = useState(articles)

  const client = useApolloClient()

  const handleLoadMoreThings = async () => {
    const oldPosts = [...posts]

    const response = await client.query({
      query: NEW_POSTS_QUERY,
      variables: {
        skip: 1,
        take: 3,
        cursorId: oldPosts[oldPosts.length - 1].id,
      },
    })

    setPosts([...oldPosts, ...response.data.newPosts])
  }

  return (
    <div className="space-y-10">
      {posts.map((article) => (
        <Article article={article} key={article.id} summary={true} />
      ))}
      <div className="flex items-center justify-center">
        <button onClick={handleLoadMoreThings}>Load More Things</button>
      </div>
    </div>
  )
}

export default PostList
