"use client"

import {FormEvent, useState} from "react"
import {useRouter} from "next/navigation"

export default function CreateLoungeForm(){
    const router = useRouter()

    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        setIsSubmitting(true)
        setError("")

        try{
            const response = await fetch("/api/lounges",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    slug,
                }),
            })
            if(!response.ok){
                throw new Error("Failed to create lounge")
            }
            setName("")
            setSlug("")

            router.refresh()
        } catch(error){
            console.error(error)
            setError("Something went wrong while creating the Lounge")
        } finally{
            setIsSubmitting(false)
        }
    }

    return (
    <form
        onSubmit={handleSubmit}
        className="app-surface mt-6 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
        <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Community
            </p>

            <h2 className="mt-1 text-lg font-semibold text-white">
            Create Lounge
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
            Start a new space for focused discussions.
            </p>
        </div>

        <div className="rounded-full border border-[#c8102e]/20 bg-[#c8102e]/10 px-3 py-1 text-xs font-medium text-[#e61d3f]">
            New
        </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
            <label
            htmlFor="lounge-name"
            className="block text-sm font-medium text-neutral-300"
            >
            Name
            </label>

            <input
            id="lounge-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 px-3 py-2.5 text-sm"
            placeholder="Distributed Systems"
            required
            />
        </div>

        <div>
            <label
            htmlFor="lounge-slug"
            className="block text-sm font-medium text-neutral-300"
            >
            Slug
            </label>

            <input
            id="lounge-slug"
            type="text"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 px-3 py-2.5 text-sm"
            placeholder="distributed-systems"
            required
            />
        </div>
        </div>

        {error && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2">
            <p className="text-sm text-red-400">
            {error}
            </p>
        </div>
        )}

        <div className="mt-5 flex justify-end">
        <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl border border-[#c8102e]/30 bg-[#c8102e]/10 px-5 py-2.5 text-sm font-semibold text-[#f0445f] hover:bg-[#c8102e] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
            {isSubmitting ? "Creating..." : "Create Lounge"}
        </button>
        </div>
    </form>
    )
}

