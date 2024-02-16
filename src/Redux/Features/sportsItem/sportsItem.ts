/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPi } from "@/Redux/baseAPi";

const productApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    sprotsItem: builder.mutation({
      query: (payload) => {
        return {
          url: "/create-product",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["SportsItem"],
    }),
    getSportsItem: builder.query({
      query: (payload) => {
        // console.log(payload.searchQuery);
        return {
          url: payload.searchQuery ? "/search" : "/getProduct",
          method: "GET",
          params: payload,
        };
      },
      providesTags: ["SportsItem"],
    }),
    selectForDelete: builder.mutation({
      query: (payload) => {
        console.log(payload);
        return {
          url: "/status",
          method: "PATCH",
          params: payload,
        };
      },
      invalidatesTags: ["SportsItem"],
    }),
    BulkDelete: builder.mutation({
      query: () => {
        console.log();
        return {
          url: "/delete",
          method: "DELETE",
        };
      },
      invalidatesTags: ["SportsItem"],
    }),
    editProduct: builder.mutation({
      query: (payload) => {
        // console.log(payload);
        return {
          url: "/update-product",
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["SportsItem"],
    }),
    sellProduct: builder.mutation({
      query: (payload) => {
        console.log(payload);
        return {
          url: "/selled-item",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["SportsItem", "saleshistory"],
    }),
    getSaleshistory: builder.query({
      query: (payload) => {
        // console.log(payload);
        return {
          url: "/sales-history",
          method: "GET",
          params: payload,
        };
      },
      providesTags: ["saleshistory"],
    }),
  }),
  // tagTypes: ['SportsItem']
});
export const {
  useSprotsItemMutation,
  useSellProductMutation,
  useGetSaleshistoryQuery,

  useGetSportsItemQuery,
  useSelectForDeleteMutation,
  useBulkDeleteMutation,
  useEditProductMutation,
} = productApi;
