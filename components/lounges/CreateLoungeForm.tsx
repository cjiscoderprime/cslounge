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
        className = "mt-6 rounded-lg border p-4"
        >
        <h2 className = "text-lg font-semibold">Create Lounge</h2>

        <div className = "mt-4">
            <label htmlFor = "lounge-name" className  = "block text-sm font-medium">
             Name   
            </label>
            <input
                id = "lounge-name"
                type = "next"
                value = {name}
                onChange={(event) => setName(event.target.value)}
                className = "mt-1 w-full rounded border p-2"
                placeholder = "Distributed Systems"
                required
            />
        </div>

        <div className = "mt-4">
            <label htmlFor = "lounge-slug" className = "block text-sm font-medium">
                Slug
            </label>

            <input
                id = "lounge-slug"
                type = "text"
                value = {slug}
                onChange = {(event) => setSlug(event.target.value)}
                className = "mt-1 w-full rounded border p-2"
                placeholder  ="distributed-systems"
                required
            />
        </div>
        {error && (
            <p className = "mt-3 text-sm text-red-600">
                {error}
            </p>
        )}
    <button
        type = "submit"
        disabled = {isSubmitting}
        className = "mt-4 rounded border px-4 py-2 disabled:opacity-50"
    >
        {isSubmitting ? "Creating... " : "Create Lounge"}
    </button>
    </form>
    )
}

