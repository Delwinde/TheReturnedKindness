import ContactForm from "./ContactForm";

export const metadata = { title: "Contact — The Returned Kindness" };

export default function ContactPage() {
  return (
    <div>
      <section className="bg-navy-700 text-sand-50">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 py-16">
          <h1 className="font-display text-4xl sm:text-5xl">Get involved</h1>
          <p className="mt-4 text-navy-100 max-w-xl">
            Want to volunteer, donate, or invite us to an outreach? Send us a
            note and a member of the club will reply.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-5 sm:px-8 py-16">
        <ContactForm />
      </section>
    </div>
  );
}
