export async function sendChat(messages: { role: string; content: string }[]) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error("Falha ao chamar /api/chat");
  }

  return response.json();
}