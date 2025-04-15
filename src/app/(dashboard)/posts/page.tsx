import { postServiceDB } from '@/features/posts/server/db/post'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'
import { Suspense, use } from 'react'
import { PostsPageContent } from '@/features/posts/components/post-page-content'
import { ContentLayout } from '@/components/layouts/content-layout'

export default function PostsPage() {
  const session = use(auth())

  if (!session?.user.id) {
    redirect('/auth/login')
  }

  const posts = use(postServiceDB.getPosts(session?.user.id))
  return (
    <ContentLayout title="Posts">
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsPageContent posts={posts} userId={session?.user.id} />
      </Suspense>
    </ContentLayout>
  )
}
