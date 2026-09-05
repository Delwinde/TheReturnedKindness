import { getCollection } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = { title: "Events — The Returned Kindness" };

function formatDate(dateStr) {
  try {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function EventsPage() {
  const events = await getCollection("events");
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= today).sort((a, b) => (a.date > b.date ? 1 : -1));
  const past = events.filter((e) => e.date < today).sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div>
      <section className="bg-navy-700 text-sand-50">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 py-16">
          <h1 className="font-display text-4xl sm:text-5xl">Events</h1>
          <p className="mt-4 text-navy-100 max-w-xl">
            Outreach days, fundraisers, and gatherings — come meet us in
            person.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 sm:px-8 py-16">
        <h2 className="font-display text-2xl text-navy-800 mb-6">Upcoming</h2>
        <div className="grid gap-6 mb-16">
          {upcoming.map((event) => (
            <div key={event.id} className="rounded-sm border border-sand-200 bg-white p-6 flex gap-6">
              <div className="shrink-0 w-16 text-center">
                <p className="font-display text-2xl text-rose-500 leading-none">
                  {new Date(event.date + "T00:00:00").getDate()}
                </p>
                <p className="text-xs uppercase tracking-wide text-navy-400 mt-1">
                  {new Date(event.date + "T00:00:00").toLocaleDateString("en-GB", { month: "short" })}
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl text-navy-800 mb-1">{event.title}</h3>
                <p className="text-sm text-navy-400 mb-2">
                  {formatDate(event.date)}
                  {event.location ? ` · ${event.location}` : ""}
                </p>
                <p className="text-navy-600">{event.summary}</p>
              </div>
            </div>
          ))}
          {upcoming.length === 0 && (
            <p className="text-navy-400">No upcoming events scheduled right now.</p>
          )}
        </div>

        {past.length > 0 && (
          <>
            <h2 className="font-display text-2xl text-navy-800 mb-6">Past events</h2>
            <div className="grid gap-4">
              {past.map((event) => (
                <div key={event.id} className="rounded-sm border border-sand-200 bg-sand-50 p-5">
                  <p className="text-sm text-navy-400 mb-1">{formatDate(event.date)}</p>
                  <h3 className="font-display text-lg text-navy-700">{event.title}</h3>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
