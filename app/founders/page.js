import Image from "next/image";
import { getCollection } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = { title: "Founders — The Returned Kindness" };

export default async function FoundersPage() {
  const founders = await getCollection("founders");

  return (
    <div>
      <section className="bg-navy-700 text-sand-50">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 py-16">
          <h1 className="font-display text-4xl sm:text-5xl">Founders</h1>
          <p className="mt-4 text-navy-100 max-w-xl">
            The people who started The Returned Kindness and keep it going.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-10">
          {founders.map((founder) => (
            <div key={founder.id} className="flex gap-5">
              <div className="shrink-0 w-20 h-20 rounded-full overflow-hidden bg-sand-200 flex items-center justify-center">
                {founder.photo ? (
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="font-display text-2xl text-navy-500">
                    {founder.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h2 className="font-display text-xl text-navy-800">{founder.name}</h2>
                {founder.role && <p className="text-sm text-rose-500 mb-2">{founder.role}</p>}
                <p className="text-navy-600 leading-relaxed">{founder.bio}</p>
              </div>
            </div>
          ))}
          {founders.length === 0 && (
            <p className="text-navy-400">Founder profiles added from the admin dashboard will appear here.</p>
          )}
        </div>
      </section>
    </div>
  );
}
