"use client";

import { useSyncExternalStore } from "react";

const server = () => false;
const client = () => true;
const subscribe = () => () => {};

/** SSR/hydration-safe mounted flag (false on server, true on client). */
export function useMounted() {
  return useSyncExternalStore(subscribe, client, server);
}
