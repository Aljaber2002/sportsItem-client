import { baseAPi } from "@/Redux/baseAPi";

const login = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => {
        return {
          url: "/login",
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});
export const { useLoginMutation } = login;
