import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#151C18",
          color: "#F5F2E9",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontFamily: "Arial, sans-serif",
          letterSpacing: "0.08em",
        }}
      >
        PK
      </div>
    ),
    size,
  );
}
