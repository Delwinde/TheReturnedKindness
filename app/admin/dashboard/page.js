"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CollectionManager from "@/components/admin/CollectionManager";
import MessagesPanel from "@/components/admin/MessagesPanel";

const tabs = [
  { id: "stories", label: "Stories" },
  { id: "events", label: "Events" },
  { id: "founders", label: "Founders" },
  { id: "messages", label: "Messages" },
];

const storyFields = [
  { name: "title", label: "Title", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "excerpt", label: "Short excerpt (shown on the Stories list)", hint: "If left blank, we'll use the start of the story." },
  { name: "body", label: "Full story", type: "textarea", required: true },
  { name: "image", label: "Photo (optional)", type: "image" },
];

const eventFields = [
  { name: "title", label: "Title", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "location", label: "Location" },
  { name: "summary", label: "Summary", type: "textarea" },
  { name: "image", label: "Photo (optional)", type: "image" },
];

const founderFields = [
  { name: "name", label: "Name", required: true },
  { name: "role", label: "Role" },
  { name: "bio", label: "Bio", type: "textarea" },
  { name: "photo", label: "Photo (optional)", type: "image" },
];

export default function AdminDashboardPage() {
  const [tab, setTab] = useState("stories");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl text-navy-800">Admin dashboard</h1>
          <p className="text-sm text-navy-400 mt-1">Update your site&apos;s stories, events, and founders.</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-navy-600 hover:text-rose-500 shrink-0"
        >
          Sign out
        </button>
      </div>

      <div className="flex gap-2 border-b border-sand-200 mb-8 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors ${
              tab === t.id
                ? "border-rose-500 text-rose-500"
                : "border-transparent text-navy-500 hover:text-navy-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "stories" && (
        <CollectionManager
          endpoint="stories"
          fields={storyFields}
          titleField="title"
          subtitleField="date"
          emptyMessage="No stories yet. Click 'Add new' to write your first one."
        />
      )}
      {tab === "events" && (
        <CollectionManager
          endpoint="events"
          fields={eventFields}
          titleField="title"
          subtitleField="date"
          emptyMessage="No events yet. Click 'Add new' to add one."
        />
      )}
      {tab === "founders" && (
        <CollectionManager
          endpoint="founders"
          fields={founderFields}
          titleField="name"
          subtitleField="role"
          emptyMessage="No founders yet. Click 'Add new' to add a profile."
        />
      )}
      {tab === "messages" && <MessagesPanel />}
    </div>
  );
}
