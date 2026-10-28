"use client"

import type {FormEvent} from "react"
import {useState} from "react"
import {useRouter} from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setIsSubmitting(true)
        setError("")

        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username, 
                    password,
                }),
            })
            
            if (response.status === 401) {
                setError("Invalid username or password.")
                return
            }

            if (!response.ok) {
                throw new Error("Login Failed")
            }

            router.push("/")
        } catch (error) {
            console.error(error)
            setError("Something went wrong while logging in.")
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
            className="text-4xl font-bold tracking-tight text-white"
          >
            CSLounge
          </Link>

          <p className="mt-3 text-sm text-neutral-400">
            Sign in to continue your discussions.
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
              placeholder="Enter your username"
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
              placeholder="Enter your password"
              autoComplete="current-password"
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
            className="mt-6 w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Log In"}
          </button>

          <p className="mt-5 text-center text-sm text-neutral-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-white hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
    )
 }

