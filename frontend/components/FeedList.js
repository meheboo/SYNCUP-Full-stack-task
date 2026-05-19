"use client";

export default function FeedList({ feeds }) {
  if (!feeds.length) {
    return <p className="empty">No coaching updates yet.</p>;
  }

  return (
    <section className="feed-list" aria-live="polite">
      {feeds.map((feed) => (
        <article className="feed-item" key={feed.id}>
          <h2>{feed.title}</h2>
          <p>{feed.message}</p>
          <time dateTime={feed.createdAt}>
            {new Intl.DateTimeFormat("en", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(feed.createdAt))}
          </time>
        </article>
      ))}
    </section>
  );
}
