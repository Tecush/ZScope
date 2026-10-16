import { useEffect, useState } from "react";

const API = "https://api.github.com/repos/Tecush/ZScope/releases?per_page=100";

let cache = null;
let inflight = null;

function fetchTotal() {
  if (cache !== null) return Promise.resolve(cache);
  if (inflight) return inflight;
  inflight = fetch(API)
    .then((r) => (r.ok ? r.json() : null))
    .then((releases) => {
      inflight = null;
      if (!Array.isArray(releases)) return null;
      cache = releases.reduce(
        (sum, rel) =>
          sum + (rel.assets || []).reduce((s, a) => s + (a.download_count || 0), 0),
        0
      );
      return cache;
    })
    .catch(() => {
      inflight = null;
      return null;
    });
  return inflight;
}

// Total GitHub Release asset downloads across all versions; null while loading or on error.
export function useDownloadCount() {
  const [total, setTotal] = useState(cache);
  useEffect(() => {
    let active = true;
    fetchTotal().then((t) => {
      if (active && t !== null) setTotal(t);
    });
    return () => {
      active = false;
    };
  }, []);
  return total;
}
