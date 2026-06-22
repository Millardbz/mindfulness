import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "circleofmindfulness",
  deployment: {
    appId: "m5v06j3j0f3ql8hfr1hbpg9k",
    autoUpdates: true,
  },
});
