import type { APIRoute } from "astro";
import ChatGpt from "../../services/chatGPTService";
import MessageHistory from "../../services/messageHistoryService";
import { gptFunctions } from "../../gptFunctions/allGptFunctions";

const chatGpt = new ChatGpt();
const messageHistory = new MessageHistory();
let chatHistory = await messageHistory.load();

export const get: APIRoute = async ({ params }) => {
  const message = params.message;

  if (!message) return new Response(null, { status: 400 });

  const response = await chatGpt.generateSingleInputText(
    message,
    chatHistory,
    gptFunctions
  );

  if (!response || response.length === 0)
    return new Response(null, { status: 500 });

  const lastMessage = response[response.length - 1]?.message?.content ?? "";
  const lastRole = response[response.length - 1].message!.role;
  const function_call = response[response.length - 1].message!.function_call;

  await messageHistory.save([
    { role: "user", content: message },
    { role: lastRole, content: lastMessage, function_call: function_call },
  ]);
  chatHistory = await messageHistory.load();

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
