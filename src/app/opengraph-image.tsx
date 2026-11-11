import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name}: ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/og can't read CSS variables, so the OG image mirrors the dark tokens.
const c = { bg: "#0a0a0a", border: "#262626", muted: "#a3a3a3", fg: "#ededed", accent: "#f5a524" };

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: c.bg,
          color: c.fg,
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${c.border}`,
              borderRadius: 16,
              fontSize: 40,
              fontWeight: 600,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ fontSize: 28, color: c.muted, display: "flex" }}>
            <span style={{ color: c.accent }}>~/</span>rifqisyandi.dev
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 36, color: c.muted, lineHeight: 1.3 }}>
            {`${profile.headline}. CS @ Universitas Indonesia.`}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: c.muted }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: c.accent }} />
          {`Currently: ${profile.currently}`}
        </div>
      </div>
    ),
    size,
  );
}
