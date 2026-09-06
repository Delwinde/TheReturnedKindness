import Link from "next/link";
import Image from "next/image";
import { getSettings } from "@/lib/data";
import { SOCIAL_PLATFORMS } from "@/components/SocialIcons";

export default async function Footer() {
  const settings = await getSettings();
  const activeSocials = SOCIAL_PLATFORMS.filter((p) => settings[p.key]);

  return (
    <footer className="bg-navy-800 text-sand-100 mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="/logo.png"
              alt="The Returned Kindness"
              width={48}
              height={48}
              className="rounded-md"
            />
            <span className="font-display text-lg text-white">The Returned Kindness</span>
          </div>
          <p className="text-sm text-navy-100 max-w-xs mb-4">
            Your pain is our pain, and your joy is our joy. A civic club working
            to put a smile on the faces of the less privileged.
          </p>
          {activeSocials.length > 0 && (
            <div className="flex gap-3">
              {activeSocials.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={settings[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-navy-100 hover:text-rose-300 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="font-medium text-white mb-3">Find us</p>
          <ul className="text-sm text-navy-100 space-y-2">
            <li>Accra, Greater Accra, Ghana</li>
            <li>Non-profit &middot; 2–10 members</li>
            <li>
              <a href="mailto:info.trkc@gmail.com" className="hover:text-rose-300">
                info.trkc@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-white mb-3">Explore</p>
          <ul className="text-sm text-navy-100 space-y-2">
            <li><Link href="/stories" className="hover:text-rose-300">Stories</Link></li>
            <li><Link href="/events" className="hover:text-rose-300">Events</Link></li>
            <li><Link href="/founders" className="hover:text-rose-300">Founders</Link></li>
            <li><Link href="/contact" className="hover:text-rose-300">Get involved</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-700">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-5 text-xs text-navy-200 text-center sm:text-left">
          <span>
            <Link href="/admin" aria-label="Site administration" className="hover:text-rose-300">
              &copy;
            </Link>{" "}
            {new Date().getFullYear()} The Returned Kindness Lbg. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
