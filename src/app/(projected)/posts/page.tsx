import { postServiceDB } from "@/features/posts/server/db/post";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { PostsPageContent } from '@/features/posts/components/post-page-content';

export default async function PostsPage() {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/auth/login");
  }

  const posts = await postServiceDB.getPosts(session?.user.id)
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsPageContent posts={posts} userId={session?.user.id} />
      </Suspense>

    </div>

  )
}
