"use client";

import { useEffect, useState } from "react";
import { SOCIAL_PLATFORMS } from "@/components/SocialIcons";

const emptySettings = {
  facebook: "",
  instagram: "",
  linkedin: "",
  x: "",
  tiktok: "",
  youtube: "",
  keywords: "",
  metaDescription: "",
};

export default function SettingsPanel() {
  const [values, setValues] = useState(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setValues({ ...emptySettings, ...data });
      }
      setLoading(false);
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setSaving(false);
        return;
      }
      setValues({ ...emptySettings, ...data });
      setSaved(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setSaving(false);
  }

  if (loading) {
    return <p className="text-sm text-navy-400">Loading…</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-10 max-w-xl">
      <section>
        <h3 className="font-display text-lg text-navy-800 mb-1">Social media</h3>
        <p className="text-sm text-navy-400 mb-4">
          Paste the full link to each profile. Leave blank to hide it from
          the footer.
        </p>
        <div className="grid gap-4">
          {SOCIAL_PLATFORMS.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-navy-700 mb-1">{label}</label>
              <input
                type="url"
                placeholder={`https://...`}
                value={values[key]}
                onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                className="w-full rounded-sm border border-sand-200 px-3 py-2 focus:border-rose-400 text-sm"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-display text-lg text-navy-800 mb-1">Search visibility (SEO)</h3>
        <p className="text-sm text-navy-400 mb-4">
          These help search engines like Google understand and show your
          site. They don&apos;t appear anywhere on the page itself.
        </p>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="A charity club that puts a smile on the faces of the less privileged in Accra, Ghana."
              value={values.metaDescription}
              onChange={(e) => setValues({ ...values, metaDescription: e.target.value })}
              className="w-full rounded-sm border border-sand-200 px-3 py-2 focus:border-rose-400 text-sm"
            />
            <p className="text-xs text-navy-400 mt-1">
              The sentence or two that often shows up under your site&apos;s name
              in Google search results.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">Keywords</label>
            <textarea
              rows={2}
              placeholder="charity Accra Ghana, non-profit Ghana, community outreach, giving back Accra"
              value={values.keywords}
              onChange={(e) => setValues({ ...values, keywords: e.target.value })}
              className="w-full rounded-sm border border-sand-200 px-3 py-2 focus:border-rose-400 text-sm"
            />
            <p className="text-xs text-navy-400 mt-1">
              Separate each word or phrase with a comma. Think about what
              someone might type into Google to find a club like yours.
            </p>
          </div>
        </div>
      </section>

      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-sm bg-navy-700 text-white px-6 py-2.5 text-sm font-medium hover:bg-navy-800 transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save settings"}
        </button>
        {saved && <span className="text-sm text-rose-500">Saved.</span>}
      </div>
    </form>
  );
}
