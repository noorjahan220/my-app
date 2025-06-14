'use client';
import { useSession } from 'next-auth/react';

export default function UserInfo() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading user info...</p>;
  }

  if (!session) {
    return <p>No user logged in.</p>;
  }

  return (
    <div>
      <p>User info:</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
