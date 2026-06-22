"use client";

/**
 * Client boundary for the embedded Sanity Studio.
 *
 * Keeping `NextStudio` + the Sanity config behind "use client" ensures the
 * Sanity/React-context code is only ever evaluated in the browser bundle and
 * never during server-side page-data collection (which otherwise fails under
 * Next's Turbopack build).
 */
import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export default function Studio() {
  return <NextStudio config={config} />;
}
