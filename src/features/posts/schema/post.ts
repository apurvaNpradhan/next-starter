import { z } from 'zod'

export const PostDetailsSchema = z.object({
  name: z.string(),
})
