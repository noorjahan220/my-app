'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav>
      <header className="bg-[var(--background-light)] dark:bg-[var(--background-dark)] shadow-md">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="block text-[var(--accent-color-light)] dark:text-[var(--accent-color-dark)] font-bold text-xl" href="/">
                The Grid Post
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="rounded-md bg-[var(--primary-button-bg-light)] text-[var(--primary-button-text-light)] px-5 py-2.5 text-sm font-medium shadow-sm hover:opacity-90 dark:bg-[var(--primary-button-bg-dark)] dark:text-[var(--primary-button-text-dark)]"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/blogs"
                      className="text-[var(--foreground-light)] transition hover:text-[var(--accent-color-light)]/75 dark:text-[var(--foreground-dark)] dark:hover:text-[var(--accent-color-dark)]/75"
                    >
                      Blogs
                    </Link>
                  </li>

                  {session?.user && (
                    <li>
                      <Link
                        href="/blogs/add"
                        className="rounded-md bg-[var(--primary-button-bg-light)] text-[var(--primary-button-text-light)] px-5 py-2.5 text-sm font-medium shadow-sm hover:opacity-90 dark:bg-[var(--primary-button-bg-dark)] dark:text-[var(--primary-button-text-dark)]"
                      >
                        Add Blog
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {status === 'loading' ? (
                  <span className="text-[var(--foreground-light)] dark:text-[var(--foreground-dark)]">Loading...</span>
                ) : session?.user ? (
                  <>
                    <span className="text-[var(--foreground-light)] dark:text-[var(--foreground-dark)] mt-2 font-medium">
                      {session.user.name || session.user.email}
                    </span>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="rounded-md bg-[var(--primary-button-bg-light)] text-[var(--primary-button-text-light)] px-5 py-2.5 text-sm font-medium shadow-sm hover:opacity-90 dark:bg-[var(--primary-button-bg-dark)] dark:text-[var(--primary-button-text-dark)]"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="rounded-md bg-[var(--primary-button-bg-light)] text-[var(--primary-button-text-light)] px-5 py-2.5 text-sm font-medium shadow-sm hover:opacity-90 dark:bg-[var(--primary-button-bg-dark)] dark:text-[var(--primary-button-text-dark)]"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="rounded-md bg-[var(--primary-button-bg-light)] text-[var(--primary-button-text-light)] px-5 py-2.5 text-sm font-medium shadow-sm hover:opacity-90 dark:bg-[var(--primary-button-bg-dark)] dark:text-[var(--primary-button-text-dark)]"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              <div className="block md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                  className="rounded-sm bg-[var(--background-light)] dark:bg-[var(--background-dark)] p-2 text-[var(--foreground-light)] transition hover:opacity-90 dark:text-[var(--foreground-dark)]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <nav
              id="mobile-menu"
              className="md:hidden mt-2 bg-[var(--background-light)] dark:bg-[var(--background-dark)] rounded-md shadow-md p-4"
            >
              <ul className="flex flex-col gap-4 text-sm">
                <li>
                  <Link
                    href="/"
                    className="block rounded-md bg-[var(--primary-button-bg-light)] text-[var(--primary-button-text-light)] px-5 py-2.5 text-white font-medium shadow-sm hover:opacity-90 dark:bg-[var(--primary-button-bg-dark)] dark:text-[var(--primary-button-text-dark)]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="block text-[var(--foreground-light)] hover:text-[var(--accent-color-light)] dark:text-[var(--foreground-dark)] dark:hover:text-[var(--accent-color-dark)]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Blogs
                  </Link>
                </li>
                {session?.user && (
                  <li>
                    <Link
                      href="/blogs/add"
                      className="block rounded-md bg-[var(--primary-button-bg-light)] text-[var(--primary-button-text-light)] px-5 py-2.5 text-white font-medium shadow-sm hover:opacity-90 dark:bg-[var(--primary-button-bg-dark)] dark:text-[var(--primary-button-text-dark)]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Add Blog
                    </Link>
                  </li>
                )}
                {session?.user ? (
                  <li>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full rounded-md bg-[var(--primary-button-bg-light)] text-[var(--primary-button-text-light)] px-5 py-2.5 text-white font-medium shadow-sm hover:opacity-90 dark:bg-[var(--primary-button-bg-dark)] dark:text-[var(--primary-button-text-dark)]"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        href="/login"
                        className="block rounded-md bg-[var(--primary-button-bg-light)] text-[var(--primary-button-text-light)] px-5 py-2.5 text-white font-medium shadow-sm hover:opacity-90 dark:bg-[var(--primary-button-bg-dark)] dark:text-[var(--primary-button-text-dark)]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/register"
                        className="block rounded-md bg-[var(--primary-button-bg-light)] text-[var(--primary-button-text-light)] px-5 py-2.5 text-white font-medium shadow-sm hover:opacity-90 dark:bg-[var(--primary-button-bg-dark)] dark:text-[var(--primary-button-text-dark)]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          )}
        </div>
      </header>
    </nav>
  );
}
