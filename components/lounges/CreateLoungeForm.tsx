"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateLoungeForm() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (!name.trim()) {
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      const response = await fetch("/api/lounges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
        }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)

        setError(
          result?.error?.message ||
            "Failed to create lounge"
        )

        return
      }

      const result = await response.json()
      const lounge = result.data

      setName("")

      router.push(`/lounges/${lounge.slug}`)
      router.refresh()

    } catch (error) {
      console.error(error)
      setError("Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-2xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-6
      "
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
          New community
        </p>

        <h2 className="mt-2 text-xl font-semibold text-[var(--foreground)]">
          Create a lounge
        </h2>

        <p className="mt-2 text-sm text-[var(--secondary)]">
          Choose a clear topic name. The URL slug is generated automatically.
        </p>
      </div>

      <div className="mt-5">
        <label
          htmlFor="lounge-name"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Lounge name
        </label>

        <input
          id="lounge-name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Distributed Systems"
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
          required
        />
      </div>

      {error && (
        <p className="mt-4 text-sm text-rose-600">
          {error}
        </p>
      )}

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            rounded-xl
            bg-[var(--accent)]
            px-5 py-2.5
            text-sm
            font-semibold
            text-white
            hover:bg-[var(--accent-hover)]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isSubmitting
            ? "Creating..."
            : "Create Lounge"}
        </button>
      </div>
    </form>
  )
}