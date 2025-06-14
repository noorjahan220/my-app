'use client';

import { useGetBlogsQuery } from './store/services/blogApi';
import Link from 'next/link';

export default function Home() {
  const { data: blogs, isLoading, error } = useGetBlogsQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">Error loading blogs</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Latest Blogs</h1>
        <Link
          href="/blogs/add"
          className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-teal-700"
        >
          Add New Blog
        </Link>
      </div>

      {blogs?.length === 0 ? (
        <div className="text-center text-gray-500">No blogs found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog) => {
            const date = new Date(blog.publishedAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });

            const preview =
              blog.content.length > 150
                ? blog.content.substring(0, 150) + '...'
                : blog.content;

            return (
              <div key={blog.id} className="bg-white p-6 rounded-lg shadow">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{preview}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    By {blog.author} • {date}
                  </span>
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-teal-600 hover:text-teal-700"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
