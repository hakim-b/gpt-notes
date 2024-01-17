import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <>
        <div
          style={{
            fontSize: 70,
            color: "black",
            background: "white",
            width: "100%",
            height: "100vh",
            padding: "50px 200px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          🧠 GPT-Notes
        </div>
      </>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
