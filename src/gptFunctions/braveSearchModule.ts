import type { ChatCompletionFunctions } from "openai";

export const BraveSearchModule: ChatCompletionFunctions = {
  name: "Brave-search",
  description:
    "a search engine useful for when you need to answer all kinds of questions",
  parameters: {
    type: "object",
    properties: {
      q: {
        type: "string",
        description: "this argument contains the query to search for",
      },
    },
  },
};
