'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function AddBlogs({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = {
      title: form.title.value,
      content: form.content.value,
      author: form.author.value,
      
    };

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog');
      }

      await response.json();

      Swal.fire({
        icon: 'success',
        title: 'Blog created successfully!',
        showConfirmButton: false,
        timer: 1500,
      });

      form.reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create blog. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows="4"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
      </div>

     

      

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md  px-4 py-2 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Blog'}
      </button>
    </form>
  );
}
