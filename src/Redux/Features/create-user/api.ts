import { baseAPi } from "@/Redux/baseAPi";

const createUserAPi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (payload) => {
        return {
          url: "/create-user",
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});
export const { useCreateUserMutation } = createUserAPi;
