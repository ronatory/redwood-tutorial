import { db } from 'src/lib/db'

export const posts = ({ take }) => {
  return db.post.findMany({ take })
}

export const post = ({ id }) => {
  return db.post.findUnique({
    where: { id },
  })
}

export const paginatedPosts = async ({ cursorId, take, skip = 0 }) => {
  const query = { take, skip, orderBy: { id: 'asc' } }

  if (cursorId) {
    query.cursor = { id: cursorId }
  }

  return db.post.findMany(query)
}

export const createPost = ({ input }) => {
  return db.post.create({
    data: input,
  })
}

export const updatePost = ({ id, input }) => {
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost = ({ id }) => {
  return db.post.delete({
    where: { id },
  })
}
