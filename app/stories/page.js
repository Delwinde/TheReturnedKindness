import Link from "next/link";
import { getCollection } from "@/lib/data";

export const revalidate = 0;
export const metadata = { title: "Stories — The Returned Kindness" };

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

export default async function StoriesPage() {
  const stories = await getCollection("stories");
  const sorted = [...stories].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div>
      <section className="bg-navy-700 text-sand-50">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 py-16">
          <h1 className="font-display text-4xl sm:text-5xl">Stories</h1>
          <p className="mt-4 text-navy-100 max-w-xl">
            The people we&apos;ve met and the moments our members have shared
            with them.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 sm:px-8 py-16">
        <div className="grid gap-8">
          {sorted.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className="group block rounded-sm border border-sand-200 bg-white p-7 hover:border-rose-300 transition-colors"
            >
              <p className="text-xs text-navy-400 mb-3">{formatDate(story.date)}</p>
              <h2 className="font-display text-2xl text-navy-800 mb-2 group-hover:text-rose-500 transition-colors">
                {story.title}
              </h2>
              <p className="text-navy-500">{story.excerpt}</p>
            </Link>
          ))}
          {sorted.length === 0 && (
            <p className="text-navy-400">No stories yet — check back soon.</p>
          )}
        </div>
      </section>
    </div>
  );
}
