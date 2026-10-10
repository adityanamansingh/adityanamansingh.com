import { ImageResponse } from "next/og";

export const alt = "Aditya Naman Singh — Full Stack & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const tiles = [[0, 0, 420, 260], [440, 0, 340, 260], [800, 0, 330, 260], [0, 280, 330, 190], [350, 280, 430, 190], [800, 280, 330, 190]];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#14161b", color: "#f7f6f6", position: "relative" }}>
        <div style={{ display: "flex", position: "absolute", right: 64, top: 64, width: 1130 - 600, height: 470, opacity: 0.9 }}>
          {tiles.map(([x, y, w, h], i) => (
            <div key={i} style={{ position: "absolute", left: x * 0.46, top: y * 0.9, width: w * 0.46, height: h * 0.9, borderRadius: 24, background: i === 0 ? "#a03318" : "#232731", border: "2px solid #2f343e" }} />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="76" height="76" viewBox="0 0 40 40"><rect width="40" height="40" rx="11" fill="#a03318" /><path d="M11.5 30 20 10l8.5 20" fill="none" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /><rect x="15.4" y="23.6" width="9.2" height="3.2" rx="1" fill="#ffb324" /></svg>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#a03318" }}>PORTFOLIO</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 520 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02 }}>Aditya Naman Singh</div>
          <div style={{ fontSize: 38, marginTop: 20, color: "#a8a9b0" }}>Full Stack & AI Engineer · 6+ years</div>
        </div>
      </div>
    ),
    size,
  );
}
