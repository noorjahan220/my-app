'use client';

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      });

      if (result?.error) {
        console.error('Login error:', result.error);
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: result.error === 'CredentialsSignin' 
            ? 'Invalid email or password' 
            : 'An error occurred during login',
        });
        setLoading(false);
        return;
      }

      if (result?.ok) {
        Swal.fire({
          icon: "success",
          title: "Logged in successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-light)] dark:bg-[var(--background-dark)] px-4">
      <div className="max-w-md w-full bg-[var(--background-light)] dark:bg-[var(--background-dark)] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[var(--foreground-light)] dark:text-[var(--foreground-dark)]">
          Login Here!
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--foreground-light)] dark:text-[var(--foreground-dark)]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--accent-color-light)] focus:border-[var(--accent-color-light)] dark:focus:ring-[var(--accent-color-dark)] dark:focus:border-[var(--accent-color-dark)] text-[var(--foreground-light)] dark:text-[var(--foreground-dark)] bg-[var(--background-light)] dark:bg-[var(--background-dark)]"
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--foreground-light)] dark:text-[var(--foreground-dark)]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--accent-color-light)] focus:border-[var(--accent-color-light)] dark:focus:ring-[var(--accent-color-dark)] dark:focus:border-[var(--accent-color-dark)] text-[var(--foreground-light)] dark:text-[var(--foreground-dark)] bg-[var(--background-light)] dark:bg-[var(--background-dark)]"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[var(--primary-button-bg-light)] hover:opacity-90 dark:bg-[var(--primary-button-bg-dark)] dark:hover:opacity-90"} text-[var(--primary-button-text-light)] dark:text-[var(--primary-button-text-dark)]`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
