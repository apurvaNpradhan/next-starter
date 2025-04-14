import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import PostDetailsForm from "@/features/posts/components/form/post-details";
import { postServiceDB } from "@/features/posts/server/db/post";
import { auth } from "@/server/auth";
import { Ellipsis } from "lucide-react";
import { redirect } from "next/navigation";

export default async function PostsPage() {
  const postData = postServiceDB.getPosts
  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }
  const posts = await postData(session?.user.id)
  return (
    <div className="flex flex-col  ">
      <h1 className="text-2xl font-semibold text-primary">Posts</h1>
      <div className="flex flex-col gap-4 mt-4">
        <PostDetailsForm />
        <div className="flex flex-col gap-4">
          {
            posts.map((post) => (
              <div key={post.id} className="flex flex-row justify-between gap-2">
                <h2 className="">{post.name}</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild >
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Dialog>
                        <DialogTrigger>
                          Edit
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle>
                            Edit Post
                          </DialogTitle>
                          <PostDetailsForm post={post} />
                        </DialogContent>
                      </Dialog>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}
