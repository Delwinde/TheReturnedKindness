import Crescent from "@/components/Crescent";

export const metadata = { title: "About — The Returned Kindness" };

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy-700 text-sand-50">
        <div className="absolute -left-16 -bottom-20 w-72 h-72 opacity-10">
          <Crescent fill="#F0A7C2" className="w-full h-full" />
        </div>
        <div className="mx-auto max-w-4xl px-5 sm:px-8 py-20 relative">
          <h1 className="font-display text-4xl sm:text-5xl">About us</h1>
          <p className="mt-6 text-lg text-navy-100 max-w-2xl">
            A charity club that seeks to put a smile on the faces of the less
            privileged. We believe that your pain is our pain and your joy is
            our joy.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 sm:px-8 py-16 grid sm:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-2xl text-navy-800 mb-3">Legal name</h2>
          <p className="text-navy-500">The Returned Kindness Lbg</p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-navy-800 mb-3">Type</h2>
          <p className="text-navy-500">Non-Profit</p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-navy-800 mb-3">Company size</h2>
          <p className="text-navy-500">2–10 members</p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-navy-800 mb-3">Headquarters</h2>
          <p className="text-navy-500">Accra, Greater Accra, Ghana</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 sm:px-8 py-16 grid sm:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl text-rose-500 mb-3">Our vision</h2>
          <p className="text-navy-600 leading-relaxed">
            To create a compassionate world where every act of kindness, no
            matter how small, is valued and reciprocated, fostering a
            self-sustaining cycle of generosity and support within our global
            community.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-rose-500 mb-3">Our mission</h2>
          <p className="text-navy-600 leading-relaxed">
            To mobilize individuals and organizations who believe in the
            power of giving, regardless of their means. The Returned
            Kindness club channels collective compassion and resources into
            meaningful acts of relief and support for humanity, transforming
            the &quot;widow&apos;s mite&quot; into a powerful force for
            change. We exist not because we have surplus, but because we
            remember the sacrifices made for us and are committed to paying
            that kindness forward.
          </p>
        </div>
      </section>

      <section className="bg-sand-100">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 py-16">
          <h2 className="font-display text-2xl text-navy-800 mb-4">How we work</h2>
          <p className="text-navy-600 leading-relaxed mb-4">
            We show up where a small act of care can go a long way —
            visiting homes, hospitals, and communities across Accra, and
            listening before we give. Every outreach is planned by our
            members and shared openly, from the story behind it to the people
            it reached.
          </p>
          <p className="text-navy-600 leading-relaxed">
            You can follow what we&apos;re doing on the Stories and Events
            pages, meet the people behind the club on Founders, or reach out
            if you&apos;d like to join us.
          </p>
        </div>
      </section>
    </div>
  );
}
