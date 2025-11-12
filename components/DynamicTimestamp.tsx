"use client";

import { useState, useEffect } from "react";

export default function DynamicTimestamp() {
  const [timestamp, setTimestamp] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimestamp(new Date().toLocaleString());
  }, []);

  if (!mounted) {
    return (
      <div className="mt-8 text-center text-gray-600">
        <p>Page shell generated at build time, loading timestamp...</p>
        <p className="text-sm mt-1">
          Dynamic content streams in after page load
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 text-center text-gray-600">
      <p>Page shell generated at build time, viewed at: {timestamp}</p>
      <p className="text-sm mt-1">Dynamic content streams in after page load</p>
    </div>
  );
}
