import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import Navbar from "@/components/layout/Navbar"

import type { Lounge } from "@/types/lounge"

import CreateLoungeForm from "@/components/lounges/CreateLoungeForm"

export default async function LoungesPage() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("JSESSIONID")

  if (!sessionId) {
    redirect("/login")
  }

  const authResponse = await fetch(
    "http://localhost:8080/users/me",
    {
      headers: {
        Cookie: `JSESSIONID=${sessionId.value}`,
      },
      cache: "no-store",
    }
  )

  if (!authResponse.ok) {
    redirect("/login")
  }

  const loungesResponse = await fetch(
    "http://localhost:3000/api/lounges",
    {
      cache: "no-store",
    }
  )

  if (!loungesResponse.ok) {
    throw new Error("Failed to load lounges")
  }

  const loungesJson: { data: Lounge[] } =
    await loungesResponse.json()

  const lounges = loungesJson.data

  return (
  <>
    <Navbar />

      <main className="mx-auto w-full max-w-7xl px-6 py-16">
        <section className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
            Community spaces
          </p>

          <h1 className="mt-5 text-5xl font-bold tracking-[-0.04em] text-[var(--foreground)]">
            Lounges
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--secondary)]">
            Browse focused communities for different areas of computer science and software engineering.
          </p>
        </section>

        <div className="mt-10 max-w-2xl">
          <CreateLoungeForm />
        </div>

        <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lounges.map((lounge) => (
            <Link
              key={lounge.id}
              href={`/lounges/${lounge.slug}`}
              className="
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--surface)]
                p-6
                hover:border-[var(--border-strong)]
              "
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                Lounge
              </p>

              <h2 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                {lounge.name}
              </h2>

              <p className="mt-4 text-sm text-[var(--secondary)]">
                View discussions →
              </p>
            </Link>
          ))}
        </section>
      </main>
    </>
  )
}