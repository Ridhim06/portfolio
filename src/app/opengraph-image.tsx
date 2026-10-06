import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#09090b",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 30% 20%, rgba(110,123,242,0.35), transparent)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8891f5",
            fontFamily: "monospace",
          }}
        >
          Ridhim Garg
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 72,
            fontWeight: 600,
            color: "#f4f4f5",
            maxWidth: 980,
            lineHeight: 1.1,
          }}
        >
          I build systems, not just features.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 30,
            color: "#9b9ba3",
            maxWidth: 900,
          }}
        >
          Backend Engineer — Python, Django, Celery, Fintech & GenAI
        </div>
      </div>
    ),
    { ...size }
  );
}
