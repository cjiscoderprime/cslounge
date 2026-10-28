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
    className="app-surface mt-6 rounded-2xl p-5"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Start a discussion
        </p>

        <h2 className="mt-1 text-lg font-semibold text-white">
          Create Post
        </h2>
      </div>
    </div>

    <div className="mt-5">
      <label
        htmlFor="lounge"
        className="block text-sm font-medium text-neutral-300"
      >
        Lounge
      </label>

      <select
        id="lounge"
        value={loungeId}
        onChange={(event) => setLoungeId(event.target.value)}
        className="mt-2 w-full rounded-xl border border-white/10 px-3 py-2.5 text-sm"
      >
        {lounges.map((lounge) => (
          <option
            key={lounge.id}
            value={lounge.id}
          >
            {lounge.name}
          </option>
        ))}
      </select>
    </div>

    <div className="mt-4">
      <label
        htmlFor="title"
        className="block text-sm font-medium text-neutral-300"
      >
        Title
      </label>

      <input
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="mt-2 w-full rounded-xl border border-white/10 px-3 py-2.5 text-sm"
        placeholder="What do you want to discuss?"
        required
      />
    </div>

    <div className="mt-4">
      <label
        htmlFor="content"
        className="block text-sm font-medium text-neutral-300"
      >
        Content
      </label>

      <textarea
        id="content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className="mt-2 min-h-32 w-full resize-y rounded-xl border border-white/10 px-3 py-3 text-sm"
        placeholder="Add some context..."
        required
      />
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
        className="rounded-xl bg-[#c8102e] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#c8102e]/10 hover:bg-[#e61d3f] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Posting..." : "Create Post"}
      </button>
    </div>
  </form>
  );
}