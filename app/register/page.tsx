"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

 async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")

    if (password !== confirmPassword) {
        setError("Passwords do not match.")
        return
    }

    setIsSubmitting(true)

    try {
        const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
        })

        const result = await response.json()

        if (response.status === 409) {
        setError(result.error?.message ?? "That username is already taken.")
        return
        }

        if (!response.ok) {
        setError(result.error?.message ?? "Registration failed.")
        return
        }

        window.location.href = "/login"
    } catch (error) {
        console.error(error)

        setError("Something went wrong while creating your account.")
    } finally {
        setIsSubmitting(false)
    }
    }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link
            href="/"
            className="animated-brand-title text-4xl font-bold tracking-tight"
          >
            CSLounge
          </Link>

          <p className="mt-3 text-sm text-neutral-400">
            Create your account and join the discussion.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="app-surface mt-8 rounded-2xl p-6"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-neutral-300"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-xl border px-3 py-3"
              placeholder="Choose a username"
              autoComplete="username"
              required
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border px-3 py-3"
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-neutral-300"
            >
              Confirm Password
            </label>

            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border px-3 py-3"
              placeholder="Enter your password again"
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-white px-4 py-3 font-semibold text-black hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>

          <p className="mt-5 text-center text-sm text-neutral-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-white hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}