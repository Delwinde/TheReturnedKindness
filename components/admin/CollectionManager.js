"use client";

import { useEffect, useState } from "react";

const emptyValues = (fields) =>
  Object.fromEntries(fields.map((f) => [f.name, f.default ?? ""]));

export default function CollectionManager({
  endpoint,
  fields,
  titleField,
  subtitleField,
  emptyMessage,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null = not open, "new" = creating
  const [values, setValues] = useState(emptyValues(fields));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingField, setUploadingField] = useState(null);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/${endpoint}`, { cache: "no-store" });
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  function startCreate() {
    setValues(emptyValues(fields));
    setEditingId("new");
    setError("");
  }

  function startEdit(item) {
    setValues(Object.fromEntries(fields.map((f) => [f.name, item[f.name] ?? ""])));
    setEditingId(item.id);
    setError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setError("");
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const isNew = editingId === "new";
    const url = isNew ? `/api/${endpoint}` : `/api/${endpoint}/${editingId}`;
    const method = isNew ? "POST" : "PUT";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setSaving(false);
        return;
      }
      await load();
      setEditingId(null);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setSaving(false);
  }

  async function handleFileChange(fieldName, file) {
    if (!file) return;
    setUploadingField(fieldName);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed");
        setUploadingField(null);
        return;
      }
      setValues((v) => ({ ...v, [fieldName]: data.url }));
    } catch {
      setError("Upload failed. Please try again.");
    }
    setUploadingField(null);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this entry? This can't be undone.")) return;
    await fetch(`/api/${endpoint}/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-navy-400">
          {loading ? "Loading…" : `${items.length} ${items.length === 1 ? "entry" : "entries"}`}
        </p>
        {editingId === null && (
          <button
            onClick={startCreate}
            className="rounded-sm bg-rose-500 text-white px-4 py-2 text-sm font-medium hover:bg-rose-600 transition-colors"
          >
            Add new
          </button>
        )}
      </div>

      {editingId !== null && (
        <form onSubmit={handleSave} className="rounded-sm border border-sand-200 bg-white p-6 mb-8 grid gap-4">
          <h3 className="font-display text-lg text-navy-800">
            {editingId === "new" ? "Add new entry" : "Edit entry"}
          </h3>
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-navy-700 mb-1">
                {field.label}
                {field.required && <span className="text-rose-500"> *</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  required={field.required}
                  rows={field.name === "body" ? 8 : 3}
                  value={values[field.name]}
                  onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                  className="w-full rounded-sm border border-sand-200 px-3 py-2 focus:border-rose-400 text-sm"
                />
              ) : field.type === "image" ? (
                <div className="flex items-center gap-4">
                  {values[field.name] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={values[field.name]}
                      alt=""
                      className="w-16 h-16 rounded-sm object-cover border border-sand-200 shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-sm bg-sand-100 border border-sand-200 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingField === field.name}
                      onChange={(e) => handleFileChange(field.name, e.target.files?.[0])}
                      className="block w-full text-sm text-navy-600 file:mr-3 file:rounded-sm file:border-0 file:bg-navy-700 file:text-white file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-navy-800 file:cursor-pointer"
                    />
                    {uploadingField === field.name && (
                      <p className="text-xs text-navy-400 mt-1">Uploading…</p>
                    )}
                    {values[field.name] && uploadingField !== field.name && (
                      <button
                        type="button"
                        onClick={() => setValues({ ...values, [field.name]: "" })}
                        className="text-xs text-rose-500 hover:text-rose-600 mt-1"
                      >
                        Remove photo
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <input
                  type={field.type || "text"}
                  required={field.required}
                  value={values[field.name]}
                  onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                  className="w-full rounded-sm border border-sand-200 px-3 py-2 focus:border-rose-400 text-sm"
                />
              )}
              {field.hint && <p className="text-xs text-navy-400 mt-1">{field.hint}</p>}
            </div>
          ))}
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving || Boolean(uploadingField)}
              className="rounded-sm bg-navy-700 text-white px-5 py-2 text-sm font-medium hover:bg-navy-800 transition-colors disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-sm border border-sand-200 px-5 py-2 text-sm font-medium text-navy-600 hover:bg-sand-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 rounded-sm border border-sand-200 bg-white px-5 py-4"
          >
            <div className="min-w-0">
              <p className="font-medium text-navy-800 truncate">{item[titleField]}</p>
              {subtitleField && (
                <p className="text-sm text-navy-400 truncate">{item[subtitleField]}</p>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => startEdit(item)}
                className="text-sm font-medium text-navy-600 hover:text-rose-500 px-2 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-sm font-medium text-navy-600 hover:text-rose-500 px-2 py-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {!loading && items.length === 0 && (
          <p className="text-navy-400 text-sm py-6 text-center">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}
