"use client";

import { useEffect, useState } from "react";

export default function MessagesPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/contact", { cache: "no-store" });
    if (res.ok) {
      setMessages(await res.json());
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div>
      <p className="text-sm text-navy-400 mb-6">
        {loading ? "Loading…" : `${messages.length} ${messages.length === 1 ? "message" : "messages"}`}
      </p>
      <div className="grid gap-3">
        {messages.map((m) => (
          <div key={m.id} className="rounded-sm border border-sand-200 bg-white px-5 py-4">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div>
                <p className="font-medium text-navy-800">{m.name}</p>
                <a href={`mailto:${m.email}`} className="text-sm text-rose-500 hover:text-rose-600">
                  {m.email}
                </a>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-navy-400 mb-1">
                  {new Date(m.createdAt).toLocaleString("en-GB")}
                </p>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="text-sm font-medium text-navy-600 hover:text-rose-500"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-sm text-navy-600 whitespace-pre-line">{m.message}</p>
          </div>
        ))}
        {!loading && messages.length === 0 && (
          <p className="text-navy-400 text-sm py-6 text-center">
            Messages sent through the contact form will show up here.
          </p>
        )}
      </div>
    </div>
  );
}
