import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  getUsers: baseProcedure
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;