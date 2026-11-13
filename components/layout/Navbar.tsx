"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    async function loadUser() {
      const response = await fetch("/api/users/me")

      if (!response.ok) {
        return
      }

      const result = await response.json()
      setUsername(result.data.username)
    }

    const savedTheme = localStorage.getItem("cslounge-theme")

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme)
      document.documentElement.dataset.theme = savedTheme
    } else {
      document.documentElement.dataset.theme = "light"
    }

    loadUser()
  }, [])

  function toggleTheme() {
    const nextTheme =
      theme === "light"
        ? "dark"
        : "light"

    setTheme(nextTheme)

    document.documentElement.dataset.theme = nextTheme

    localStorage.setItem(
      "cslounge-theme",
      nextTheme
    )
  }

  async function handleLogout() {
    await fetch("/api/users/logout", {
      method: "POST",
    })

    router.push("/login")
    router.refresh()
  }

  return (
    <nav
      className="
        sticky top-0 z-50
        border-b
        border-[var(--border)]
        bg-[var(--nav)]/95
        backdrop-blur-xl
      "
    >
      <div className="mx-auto flex h-[74px] max-w-7xl items-center px-6">

        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-[var(--foreground)]"
        >
          CSLounge
        </Link>

        <div className="ml-12 flex items-center gap-2">

          <Link
            href="/"
            className="
              rounded-lg
              bg-[var(--surface)]
              px-4 py-2
              text-sm font-semibold
              text-[var(--accent)]
              shadow-sm
            "
          >
            Home
          </Link>

          <Link
            href="/lounges"
            className="
              rounded-lg
              px-4 py-2
              text-sm
              text-[var(--secondary)]
              hover:bg-[var(--surface)]
              hover:text-[var(--foreground)]
            "
          >
            Lounges
          </Link>

        </div>

        <div className="ml-auto flex items-center gap-3">

          <button
            type="button"
            onClick={toggleTheme}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              border border-[var(--border)]
              bg-[var(--surface)]
              text-lg
              text-[var(--foreground)]
            "
            aria-label="Toggle theme"
          >
            {theme === "light" ? "☾" : "☀"}
          </button>

          {username && (
            <Link
              href="/account"
              className="
                px-2
                text-sm font-medium
                text-[var(--accent)]
              "
            >
              @{username}
            </Link>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="
              rounded-lg
              border border-[var(--border)]
              bg-[var(--surface)]
              px-4 py-2
              text-sm font-medium
              text-[var(--foreground)]
              hover:border-[var(--border-strong)]
            "
          >
            Log out
          </button>

        </div>

      </div>
    </nav>
  )
}