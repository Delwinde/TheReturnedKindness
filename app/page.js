import Link from "next/link";
import Image from "next/image";
import Crescent from "@/components/Crescent";
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

export default async function HomePage() {
  const [stories, events] = await Promise.all([
    getCollection("stories"),
    getCollection("events"),
  ]);
  const latestStories = [...stories]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);
  const upcomingEvents = [...events]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-[420px] h-[420px] opacity-[0.06]">
          <Crescent fill="#1E3A6E" className="w-full h-full" />
        </div>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 grid md:grid-cols-[1.1fr,0.9fr] gap-12 items-center relative">
          <div>
            <p className="text-rose-500 font-medium mb-4">Accra, Greater Accra</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-navy-800">
              Your pain is our pain.
              <span className="block italic text-rose-500">Your joy is our joy.</span>
            </h1>
            <p className="mt-6 text-lg text-navy-500 max-w-lg">
              The Returned Kindness is a civic club that puts a smile on the
              faces of the less privileged — one visit, one gift, one
              afternoon at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm bg-rose-500 text-white px-6 py-3 font-medium hover:bg-rose-600 transition-colors"
              >
                Get involved
              </Link>
              <Link
                href="/stories"
                className="inline-flex items-center justify-center rounded-sm border border-navy-600 text-navy-700 px-6 py-3 font-medium hover:bg-navy-50 transition-colors"
              >
                Read our stories
              </Link>
            </div>
          </div>

          <div className="relative mx-auto">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-full bg-rose-100" />
            <Image
              src="/logo.png"
              alt="The Returned Kindness — a hand receiving a gift beneath a crescent of care"
              width={340}
              height={340}
              className="relative rounded-full border-8 border-sand-50 shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-navy-700 text-sand-50">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid sm:grid-cols-3 gap-8">
          <div>
            <p className="font-display text-3xl text-rose-300 mb-2">Overview</p>
            <p className="text-navy-100">
              A charity club that seeks to put a smile on the faces of the
              less privileged.
            </p>
          </div>
          <div>
            <p className="font-display text-3xl text-rose-300 mb-2">Who we are</p>
            <p className="text-navy-100">
              A small, dedicated team of civic-minded volunteers based in
              Accra, working as a registered non-profit.
            </p>
          </div>
          <div>
            <p className="font-display text-3xl text-rose-300 mb-2">Why we do it</p>
            <p className="text-navy-100">
              We believe kindness shown is kindness returned — to the
              giver as much as the one who receives it.
            </p>
          </div>
        </div>
      </section>

      {/* Latest stories */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-20">
        <div className="flex items-end justify-between mb-10 gap-4">
          <h2 className="font-display text-3xl text-navy-800">Stories from the field</h2>
          <Link href="/stories" className="text-rose-500 font-medium hover:text-rose-600 whitespace-nowrap">
            All stories
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {latestStories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className="group block rounded-sm border border-sand-200 bg-white p-6 hover:border-rose-300 transition-colors"
            >
              <p className="text-xs text-navy-400 mb-3">{formatDate(story.date)}</p>
              <h3 className="font-display text-xl text-navy-800 mb-2 group-hover:text-rose-500 transition-colors">
                {story.title}
              </h3>
              <p className="text-sm text-navy-500 line-clamp-3">{story.excerpt}</p>
            </Link>
          ))}
          {latestStories.length === 0 && (
            <p className="text-navy-400">Stories added from the admin dashboard will appear here.</p>
          )}
        </div>
      </section>

      {/* Upcoming events */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20">
          <div className="flex items-end justify-between mb-10 gap-4">
            <h2 className="font-display text-3xl text-navy-800">Upcoming events</h2>
            <Link href="/events" className="text-rose-500 font-medium hover:text-rose-600 whitespace-nowrap">
              All events
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="rounded-sm bg-white border border-sand-200 p-6 flex gap-5">
                <div className="shrink-0 w-16 text-center">
                  <p className="font-display text-2xl text-rose-500 leading-none">
                    {new Date(event.date + "T00:00:00").getDate()}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-navy-400 mt-1">
                    {new Date(event.date + "T00:00:00").toLocaleDateString("en-GB", { month: "short" })}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-lg text-navy-800 mb-1">{event.title}</h3>
                  {event.location && (
                    <p className="text-sm text-navy-400 mb-2">{event.location}</p>
                  )}
                  <p className="text-sm text-navy-500 line-clamp-2">{event.summary}</p>
                </div>
              </div>
            ))}
            {upcomingEvents.length === 0 && (
              <p className="text-navy-400">Events added from the admin dashboard will appear here.</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-24 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-navy-800 mb-4">
          Kindness works better together.
        </h2>
        <p className="text-navy-500 max-w-xl mx-auto mb-8">
          Whether you can give an afternoon, a donation, or simply share our
          stories — there is a place for you at The Returned Kindness.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-sm bg-rose-500 text-white px-8 py-3 font-medium hover:bg-rose-600 transition-colors"
        >
          Reach out to us
        </Link>
      </section>
    </div>
  );
}
