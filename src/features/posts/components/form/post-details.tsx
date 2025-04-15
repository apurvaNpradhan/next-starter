'use client'
import type { posts, SelectPost } from '@/server/db/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createPost, updatePost } from '@/features/posts/server/actions/posts'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTransition } from 'react'

interface PostDetailsFormProps {
  post?: SelectPost
  onSuccess?: () => void
}
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export default function PostDetailsForm({
  post,
  onSuccess,
}: PostDetailsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: post?.name ?? '',
    },
  })

  const [submitPending, startSubmitTransaction] = useTransition()
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const action = post
      ? updatePost.bind(null, post.id, values)
      : createPost.bind(null, values)

    startSubmitTransaction(async () => {
      try {
        const data = await action()
        if (data?.error) {
          toast.error(data.error || 'There was an error processing the post')
        } else {
          toast.success(data?.message)
          onSuccess?.()
        }
      } catch (e) {
        toast.error('There was an error processing the post')
      }
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Web Development"
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          {post && (
            <Button
              variant="outline"
              type="button"
              onClick={() => form.reset()}
              disabled={submitPending}
            >
              Reset
            </Button>
          )}
          <Button
            type="submit"
            disabled={submitPending}
            className="min-w-[100px]"
          >
            {submitPending ? 'Saving...' : post ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
