"use client";

import { useEffect, useState } from "react";

import AppShell from "../components/AppShell";
import FeedList from "../components/FeedList";
import { fetchFeeds } from "../lib/api";
import { getSocket } from "../lib/socket";

export default function HomePage() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let ignore = false;

    fetchFeeds()
      .then((data) => {
        if (!ignore) {
          setFeeds(data.feeds || []);
          setError("");
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const socket = getSocket();

    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);
    const handleCreated = (feed) => {
      setFeeds((currentFeeds) => {
        if (currentFeeds.some((item) => item.id === feed.id)) {
          return currentFeeds;
        }

        return [feed, ...currentFeeds];
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("feed:created", handleCreated);

    if (!socket.connected) {
      socket.connect();
    } else {
      setConnected(true);
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("feed:created", handleCreated);
    };
  }, []);

  return (
    <AppShell>
      <section className="page">
        <div className="header-row">
          <div>
            <h1>Realtime Coaching Feed</h1>
            <p className="lead">
              Updates posted by an admin appear here instantly through Socket.IO.
            </p>
          </div>
          <div className="status">
            <span className={connected ? "dot connected" : "dot"} />
            {connected ? "Live" : "Reconnecting"}
          </div>
        </div>

        <div className="panel">
          {loading && <p className="notice">Loading feeds...</p>}
          {!loading && error && <p className="error">{error}</p>}
          {!loading && !error && <FeedList feeds={feeds} />}
        </div>
      </section>
    </AppShell>
  );
}
