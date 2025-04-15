"use server";
import type { z } from "zod";
import { PostDetailsSchema } from "../../schema/post";
import { auth } from "@/server/auth";
import { postServiceDB } from "@/features/posts/server/db/post";

const {
  createPost: createPostDb,
  updatePost: updatePostDb,
  deletePost: deletePostDb,
} = postServiceDB;
export async function createPost(
  unsafeData: z.infer<typeof PostDetailsSchema>,
): Promise<
  | {
      error: boolean;
      message: string;
    }
  | undefined
> {
  const session = await auth();
  const { success, data } = PostDetailsSchema.safeParse(unsafeData);
  if (!success || !session) {
    {
      return {
        error: true,
        message: "There was an error creating the post",
      };
    }
  }
  const { id } = await createPostDb({ ...data, createdById: session.user.id });
  if (id) {
    return { error: false, message: "Post created successfully" };
  }
}
export async function updatePost(
  id: string,
  unsafeData: z.infer<typeof PostDetailsSchema>,
): Promise<
  | {
      error: boolean;
      message: string;
    }
  | undefined
> {
  const session = await auth();
  const { success, data } = PostDetailsSchema.safeParse(unsafeData);
  if (!success || !session) {
    {
      return {
        error: true,
        message: "There was an error updating the post",
      };
    }
  }
  const isSuccess = await updatePostDb(data, {
    id,
    userId: session.user.id,
  });
  return {
    error: !isSuccess,
    message: isSuccess
      ? "Post updated successfully"
      : "There was an error updating the post",
  };
}

export async function deletePost(
  id: string,
  userId: string,
): Promise<
  | {
      error: boolean;
      message: string;
    }
  | undefined
> {
  const session = await auth();
  if (!session) {
    {
      return {
        error: true,
        message: "There was an error deleting the post",
      };
    }
  }
  const isSuccess = await deletePostDb(id, session.user.id);

  return {
    error: !isSuccess,
    message: isSuccess
      ? "Post deleted successfully"
      : "There was an error deleting the post",
  };
}
