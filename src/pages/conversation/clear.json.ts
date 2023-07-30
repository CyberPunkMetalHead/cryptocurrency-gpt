import type { APIRoute } from "astro";
import MessageHistory from "../../services/messageHistoryService";

const messageHistory = new MessageHistory();

export const get: APIRoute = async () => {
  messageHistory.clear();

  return new Response(JSON.stringify(undefined), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
