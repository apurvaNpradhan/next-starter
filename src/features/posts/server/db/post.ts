import { CACHE_TAGS, dbCache, getIdTag, getUserTag, revalidateDbCache } from "@/lib/cache";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";


async function createPost(data: typeof posts.$inferInsert) {
  const [newPost] = await db.insert(posts).values(data).returning({
    id: posts.id,
    createdById: posts.createdById,
  });
  revalidateDbCache({
    tag: CACHE_TAGS.posts,
    id: newPost?.id,
    userId: newPost?.createdById,
  })
  return { id: newPost?.id }

}
async function updatePost(data: Partial<typeof posts.$inferInsert>, { id, userId }: { id: string, userId: string }) {
  const updatedPost = await db.update(posts).set(data).where(and(eq(posts.id, id), eq(posts.createdById, userId)))
  revalidateDbCache({
    tag: CACHE_TAGS.posts,
    id,
    userId,
  })
  console.log("updatedPost", updatedPost)
  return updatedPost
}
async function deletePost(id: string, userId: string) {
  const deletedPost = await db.delete(posts).where(and(eq(posts.id, id), eq(posts.createdById, userId)))
  if (deletedPost.length > 0) {
    revalidateDbCache({
      tag: CACHE_TAGS.posts,
      id,
      userId,
    })
  }
  return deletedPost.length > 0
}
async function getPosts(userId: string, limit?: number) {
  const cacheFn = dbCache(getPostsInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.posts)],
  })
  return cacheFn(userId, { limit })
}
async function getPost(id: string, userId: string) {
  const cacheFn = dbCache(getPostInternal, {
    tags: [getIdTag(id, CACHE_TAGS.posts)],
  })
  return cacheFn({ id, userId })
}
async function getPostInternal({ id, userId }: { id: string, userId: string }) {
  return await db.query.posts.findFirst({
    where: ({ id: postId, createdById }, { eq }) => eq(postId, id) && eq(createdById, userId),
  })
}
async function getPostsInternal(userId: string, { limit }: { limit?: number }) {
  return await db.query.posts.findMany({
    where: ({ createdById }, { eq }) => eq(createdById, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    limit,
  })
}

export const postServiceDB = {
  createPost,
  updatePost,
  getPosts,
  deletePost,
  getPost,
}
