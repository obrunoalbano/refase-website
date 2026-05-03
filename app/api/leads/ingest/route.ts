import { NextResponse } from "next/server";

const DEFAULT_UPSTREAM = "http://localhost:3002/api/leads/ingest";
const DEFAULT_TOKEN =
  "955c65130f39117e42d2728c1bab690e15efa5763af24545697fb81774e91d73";

type Body = {
  name?: string;
  email?: string;
  whatsapp?: string;
  eventDate?: string;
  city?: string;
  eventType?: string;
  eventDescription?: string;
  source?: string;
};

function getServerConfig() {
  const url = process.env.LEADS_INGEST_URL ?? DEFAULT_UPSTREAM;
  const token = process.env.LEADS_INGEST_TOKEN ?? DEFAULT_TOKEN;
  return { url, token };
}

export async function POST(request: Request) {
  const { url, token } = getServerConfig();

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";
  const eventDate = typeof body.eventDate === "string" ? body.eventDate.trim() : "";
  const city = typeof body.city === "string" ? body.city.trim() : "";
  const eventType = typeof body.eventType === "string" ? body.eventType.trim() : "";
  const eventDescription = typeof body.eventDescription === "string" ? body.eventDescription.trim() : "";
  const source = typeof body.source === "string" ? body.source.trim() : "landing";

  if (!name || !email || !whatsapp || !eventDate || !city || !eventType || !eventDescription) {
    return NextResponse.json(
      { error: "Campos obrigatórios: name, email, whatsapp, eventDate, city, eventType, eventDescription." },
      { status: 400 },
    );
  }

  const upstream = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email, whatsapp, eventDate, city, eventType, eventDescription, source }),
  });

  const text = await upstream.text();
  if (!upstream.ok) {
    return NextResponse.json(
      { error: text || `Upstream ${upstream.status}` },
      { status: upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502 },
    );
  }

  return new NextResponse(text, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
    },
  });
}
