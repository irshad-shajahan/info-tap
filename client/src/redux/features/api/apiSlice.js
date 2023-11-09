import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
    headers.set("credentials", "include");
    return headers;
  },
});
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["user","admin","members"],
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getUserDetails: builder.query({
      query: () => "/getUserData",
      providesTags: ["user"],
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),
    addMember:builder.mutation({
      query:(data)=>({
        url:"/admin/add-member",
          method:'post',
          body:data
      }),
      invalidatesTags:["members"]
    }),
    fetchMembers:builder.query({
      query:() => '/admin/get-members',
      providesTags:["members"]
    }),
    checkIn:builder.mutation({
      query:(data)=>({
        url:'/check-in',
        method:'post',
        body:data
      }),
      invalidatesTags:["user"]
    })
  }),
});

export const {
  useGetUserDetailsQuery,
  useUserLoginMutation,
  useAddMemberMutation,
  useFetchMembersQuery,
  useCheckInMutation
} = apiSlice;
