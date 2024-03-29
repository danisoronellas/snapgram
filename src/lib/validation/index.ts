import { z } from 'zod';

export const SignUpValidation = z.object({
  username: z.string().min(2).max(50),
});
