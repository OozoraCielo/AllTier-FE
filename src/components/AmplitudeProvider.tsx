"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

export default function AmplitudeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    amplitude.add(sessionReplayPlugin());
    amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY ?? "", { autocapture: true });
  }, []);

  return <>{children}</>;
}
