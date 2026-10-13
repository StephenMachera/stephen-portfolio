"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/lib/site";

const format = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: site.timeZone,
});

// re-check the time every 30 seconds
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}

export default function LocalTime() {
  const time = useSyncExternalStore(
    subscribe,
    () => format.format(new Date()), // in the browser
    () => null                        // on the server (time unknown yet)
  );

  return (
    <span>
      {time ?? "--:--"} in {site.city}
    </span>
  );
}