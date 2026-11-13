"use client"

import type { FormEvent } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("cslounge-theme") === "dark"
        ? "dark"
        : "light"

    setTheme(savedTheme)
    document.documentElement.dataset.theme = savedTheme
  }, [])

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light"

    setTheme(nextTheme)
    localStorage.setItem("cslounge-theme", nextTheme)
    document.documentElement.dataset.theme = nextTheme
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
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
        throw new Error("Login failed")
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      console.error(error)
      setError("Something went wrong while logging in.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-[var(--border)] bg-[var(--nav)]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/login"
            className="text-2xl font-bold tracking-tight text-[var(--foreground)]"
          >
            CSLounge
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className="
              rounded-xl
              border border-[var(--border)]
              bg-[var(--surface)]
              px-4 py-2
              text-sm
              text-[var(--foreground)]
              hover:border-[var(--border-strong)]
            "
            aria-label="Toggle theme"
          >
            {theme === "light" ? "☾" : "☀"}
          </button>
        </div>
      </header>

      <div className="mx-auto grid min-h-[calc(100vh-81px)] w-full max-w-7xl items-center gap-16 px-6 py-12 lg:grid-cols-[1fr_460px]">

        <section className="hidden lg:flex lg:justify-center">
          <div className="w-full max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
              Developer community
            </p>

            <h1 className="mt-5 text-6xl font-bold leading-[1.05] tracking-[-0.05em] text-[var(--foreground)]">
              Good discussions make{" "}
              <span className="text-[var(--accent)]">
                better developers.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[var(--secondary)]">
              Join focused conversations about Computer Science.
            </p>
          </div>
        </section>

        <section
          className="
            rounded-2xl
            border border-[var(--border)]
            bg-[var(--surface)]
            p-8
          "
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Welcome back
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Log in to CSLounge
            </h2>

            <p className="mt-3 text-sm leading-6 text-[var(--secondary)]">
              Continue your discussions and jump back into the community.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[var(--foreground)]"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border border-[var(--border)]
                  bg-[var(--surface-soft)]
                  px-4 py-3
                  text-[var(--foreground)]
                  outline-none
                  placeholder:text-[var(--muted)]
                  focus:border-[var(--accent)]
                "
                placeholder="Enter your username"
                autoComplete="username"
                required
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--foreground)]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border border-[var(--border)]
                  bg-[var(--surface-soft)]
                  px-4 py-3
                  text-[var(--foreground)]
                  outline-none
                  placeholder:text-[var(--muted)]
                  focus:border-[var(--accent)]
                "
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <p className="mt-4 text-sm text-rose-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                mt-6
                w-full
                rounded-xl
                bg-[var(--accent)]
                px-4 py-3
                font-semibold
                text-white
                hover:bg-[var(--accent-hover)]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isSubmitting
                ? "Signing in..."
                : "Log in"}
            </button>

            <p className="mt-6 text-center text-sm text-[var(--secondary)]">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[var(--accent)] hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  )
}