"use client";
import type { SelectPost } from "@/server/db/schema";
import PostDetailsForm from "./form/post-details";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { DeletePostAlertDialogContent } from "./delete-post-alert-dialog-content";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deletePost } from "../server/actions/posts";

export function PostsPageContent({
  posts,
  userId,
}: {
  posts: SelectPost[];
  userId: string;
}) {
  const [dialog, setDialog] = useState(false);
  const [isDeletePending, startDeleteTransition] = useTransition();
  return (
    <div>
      <PostDetailsForm />
      <div className="space-y-1">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="hover:bg-accent/50 flex items-center justify-between rounded-md px-2 py-1 transition-colors"
            >
              <h2 className="text-foreground text-lg font-medium">
                {post.name}
              </h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <Ellipsis className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Dialog open={dialog} onOpenChange={setDialog}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        asChild
                      >
                        <Button variant="ghost" className="w-full">
                          Edit
                        </Button>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Post</DialogTitle>
                        <DialogDescription>
                          Make changes to your post here. Click save when
                          you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <PostDetailsForm
                        post={post}
                        onSuccess={() => setDialog(false)}
                      />
                    </DialogContent>
                  </Dialog>
                  <DropdownMenuSeparator />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        asChild
                      >
                        <Button
                          variant={"ghost"}
                          className="text-destructive w-full"
                        >
                          Delete
                        </Button>
                      </DropdownMenuItem>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete{" "}
                          <span className="font-semibold">{post.name}</span>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            startDeleteTransition(async () => {
                              const data = await deletePost(post.id, userId);
                              if (data) {
                                toast.success("Post deleted");
                              }
                            });
                          }}
                          disabled={isDeletePending}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
