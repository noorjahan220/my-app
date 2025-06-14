'use client';

import { useRouter } from 'next/navigation';
import AddBlogs from '../../components/AddBlogs';

export default function AddBlogPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/blogs');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Blog</h1>
        <AddBlogs onSuccess={handleSuccess} />
      </div>
    </div>
  );
} 