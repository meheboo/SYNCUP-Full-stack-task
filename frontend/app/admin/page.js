"use client";

import { useState } from "react";

import AppShell from "../../components/AppShell";
import { createFeed } from "../../lib/api";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await createFeed({ title, message });
      setTitle("");
      setMessage("");
      setSuccess("Feed published.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell>
      <section className="page">
        <div className="header-row">
          <div>
            <h1>Admin</h1>
            <p className="lead">Add a coaching update to the feed.</p>
          </div>
        </div>

        <form className="panel form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              maxLength={120}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Daily check-in"
              required
              value={title}
            />
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Share the coaching note..."
              required
              value={message}
            />
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="notice">{success}</p>}

          <button className="button" disabled={saving} type="submit">
            {saving ? "Publishing..." : "Publish feed"}
          </button>
        </form>
      </section>
    </AppShell>
  );
}
