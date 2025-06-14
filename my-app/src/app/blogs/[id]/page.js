"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) throw new Error("Blog not found");

        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
        <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-block mb-8 text-teal-600 hover:text-teal-700">
        ← Back to Home
      </Link>

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>By {blog.author || "Unknown author"}</span>
          <span>•</span>
          <span>
            {blog.publishedDate
              ? new Date(blog.publishedDate).toLocaleDateString()
              : "Unknown date"}
          </span>
          <span>•</span>
          <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
            {blog.category || "Uncategorized"}
          </span>
        </div>

        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{blog.content}</p>
        </div>
      </article>
    </div>
  );
}
