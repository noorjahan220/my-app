import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Blog'],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => 'blog',
      providesTags: ['Blog'],
    }),
    getBlogById: builder.query({
      query: (id) => `blog/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    createBlog: builder.mutation({
      query: (blog) => ({
        url: 'blog',
        method: 'POST',
        body: blog,
      }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...blog }) => ({
        url: `blog/${id}`,
        method: 'PUT',
        body: blog,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `blog/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
    searchBlogs: builder.query({
      query: (searchTerm) => `blog/search?q=${searchTerm}`,
      providesTags: ['Blog'],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useSearchBlogsQuery,
} = blogApi; 