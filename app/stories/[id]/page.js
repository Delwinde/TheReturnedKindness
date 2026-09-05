import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCollection } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatDate(dateStr) {
  try {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function StoryPage({ params }) {
  const stories = await getCollection("stories");
  const story = stories.find((s) => s.id === params.id);
  if (!story) notFound();

  return (
    <article className="mx-auto max-w-2xl px-5 sm:px-8 py-16">
      <Link href="/stories" className="text-sm text-rose-500 hover:text-rose-600">
        &larr; All stories
      </Link>
      <p className="text-xs text-navy-400 mt-6 mb-3">{formatDate(story.date)}</p>
      <h1 className="font-display text-3xl sm:text-4xl text-navy-800 mb-8">{story.title}</h1>
      {story.image && (
        <Image
          src={story.image}
          alt=""
          width={700}
          height={420}
          className="w-full h-auto rounded-sm object-cover mb-8"
        />
      )}
      <div className="prose-p:leading-relaxed text-navy-700 whitespace-pre-line leading-relaxed">
        {story.body}
      </div>
    </article>
  );
}
