"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type {Lounge} from "@/types/lounge"

type CreatePostFormProps = {
  lounges: Lounge[]
}
export default function CreatePostForm({
  lounges,
}: CreatePostFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loungeId, setLoungeId] = useState(lounges[0]?.id ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          loungeId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      setTitle("");
      setContent("");
      setLoungeId("1");

      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Something went wrong while creating the post.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-lg border p-4"
    >
      <h2 className="text-lg font-semibold">Create Post</h2>

      <div className="mt-4">
        <label
          htmlFor="lounge"
          className="block text-sm font-medium"
        >
          Lounge
        </label>

        <select
          id="lounge"
          value={loungeId}
          onChange={(event) => setLoungeId(event.target.value)}
          className="mt-1 w-full rounded border p-2"
        >
        {lounges.map((lounge) => (
        <option 
          key = {lounge.id}
          value = {lounge.id}
        > {lounge.name}
        </option>
        ))}
        </select>
      </div>

      <div className="mt-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="mt-1 w-full rounded border p-2"
          placeholder="What do you want to discuss?"
          required
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium"
        >
          Content
        </label>

        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="mt-1 min-h-28 w-full rounded border p-2"
          placeholder="Add some context..."
          required
        />
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 rounded border px-4 py-2 disabled:opacity-50"
      >
        {isSubmitting ? "Posting..." : "Create Post"}
      </button>
    </form>
  );
}