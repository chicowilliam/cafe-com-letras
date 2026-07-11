type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function resolveSiteOrigin(req: Request) {
  const forwardedProto = req.headers.get("x-forwarded-proto");
  const forwardedHost = req.headers.get("x-forwarded-host");
  const host = forwardedHost ?? req.headers.get("host");

  if (!host) {
    return undefined;
  }

  const protocol = forwardedProto ?? (host.includes("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

const DEFAULT_OPENROUTER_MODEL = "nvidia/nemotron-3-ultra-550b-a55b";

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL?.trim() || DEFAULT_OPENROUTER_MODEL;
  if (!apiKey) {
    return jsonResponse({ error: "OPENROUTER_API_KEY nao configurada." }, 500);
  }

  try {
    const payload = (await req.json()) as { messages?: ChatMessage[] };
    const { messages } = payload;

    const hasValidMessages =
      Array.isArray(messages) &&
      messages.length > 0 &&
      messages.every(
        (message) =>
          typeof message?.role === "string" &&
          typeof message?.content === "string" &&
          message.content.trim().length > 0,
      );

    if (!hasValidMessages) {
      return jsonResponse({ error: "Payload invalido: envie um array `messages`." }, 400);
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Title": "Cafe com Letras",
    };

    const siteOrigin = resolveSiteOrigin(req);
    if (siteOrigin) {
      headers["HTTP-Referer"] = siteOrigin;
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message =
        typeof data?.error?.message === "string"
          ? data.error.message
          : "Falha ao consultar a OpenRouter.";

      return jsonResponse({ error: message, details: data }, response.status);
    }

    return jsonResponse(data, response.status);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado.";
    return jsonResponse({ error: "Falha ao processar a requisicao.", details: message }, 500);
  }
}
