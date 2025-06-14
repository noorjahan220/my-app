'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-500 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest Blogs</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{blog.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{blog.author}</span>
                <Link
                  href={`/blogs/${blog._id}`}
                  aria-label={`Read more about ${blog.title}`}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {blogs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No blogs found. Be the first to post!</p>
          <Link
            href="/blogs"
            className="inline-block mt-4 px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Create Blog
          </Link>
        </div>
      )}
    </div>
  );
}
