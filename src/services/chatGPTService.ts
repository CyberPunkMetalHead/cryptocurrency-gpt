import {
  Configuration,
  OpenAIApi,
  CreateChatCompletionRequest,
  ChatCompletionRequestMessageRoleEnum,
  ChatCompletionRequestMessage,
  ChatCompletionFunctions,
  CreateChatCompletionResponseChoicesInner,
  CreateChatCompletionResponse,
} from "openai";

import { Caller } from "../utils/dynamicFunctionCaller";
import type { FunctionInformation } from "../types/functionInformation";
import type { AxiosResponse } from "axios";

class ChatGpt {
  configuration;
  openai;
  caller;

  constructor() {
    this.configuration = new Configuration({
      organization: import.meta.env.OPENAI_ORG_ID,
      apiKey: import.meta.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
    this.caller = new Caller();
  }

  async createFunctionMessage(
    functionName: string | undefined,
    content: string
  ): Promise<ChatCompletionRequestMessage> {
    return {
      role: "function",
      name: functionName,
      content: content,
    };
  }

  async createErrorMessage(
    content: string
  ): Promise<ChatCompletionRequestMessage> {
    return {
      role: "assistant",
      content: content,
    };
  }

  async createChatRequest(
    messages: ChatCompletionRequestMessage[],
    functions?: ChatCompletionFunctions[],
    function_call?: string | undefined
  ): Promise<CreateChatCompletionRequest> {
    return function_call
      ? {
          model: "gpt-3.5-turbo-0613", //gpt-3.5-turbo-16k
          temperature: 0.5,
          n: 1,
          messages: messages,
          function_call: function_call,
          functions: functions,
        }
      : {
          model: "gpt-3.5-turbo-0613",
          temperature: 0.5,
          n: 1,
          messages: messages,
        };
  }

  async createChatHistory(
    input: string,
    chatHistory: ChatCompletionRequestMessage[]
  ): Promise<ChatCompletionRequestMessage[]> {
    return chatHistory.length > 0
      ? [
          ...chatHistory,
          {
            content: input,
            role: ChatCompletionRequestMessageRoleEnum.User,
          },
        ]
      : [
          {
            content: input,
            role: ChatCompletionRequestMessageRoleEnum.User,
          },
        ];
  }

  async getFunctionInformation(
    openaiResponse: CreateChatCompletionResponse
  ): Promise<FunctionInformation | undefined> {
    if (openaiResponse.choices[0].message?.function_call) {
      return {
        parentClassName:
          openaiResponse.choices[0].message?.function_call.name?.split("-")[0],
        functionName:
          openaiResponse.choices[0].message?.function_call.name?.split("-")[1],
        args: openaiResponse.choices[0].message?.function_call.arguments ?? "",
      };
    }
    return undefined;
  }

  async generateSingleInputText(
    input: string,
    chatHistory: ChatCompletionRequestMessage[],
    functions: ChatCompletionFunctions[]
  ): Promise<CreateChatCompletionResponseChoicesInner[]> {
    const messages = await this.createChatHistory(input, chatHistory);
    // try {
    const chatRequest = await this.createChatRequest(
      messages,
      functions,
      "auto"
    );
    const baseResponse = await this.openai.createChatCompletion(chatRequest);
    const functionInfo = await this.getFunctionInformation(baseResponse.data);
    //console.log("Chat history:", chatHistory);

    if (!functionInfo) return baseResponse.data.choices;

    const parsedArgs = JSON.parse(functionInfo.args ?? "");
    console.log(
      `Class Name: ${functionInfo.parentClassName} Function Name: ${functionInfo.functionName} Args ${functionInfo.args}`
    );
    const functionResponse = await this.caller.runMethod(
      functionInfo.parentClassName!,
      functionInfo.functionName!,
      parsedArgs
    );

    const functionMessage = await this.createFunctionMessage(
      functionInfo.functionName,
      functionResponse
    );
    console.log(functionResponse);
    messages.push(functionMessage);

    if (functionInfo.functionName !== "plotCandlestickData") {
      const functionRequest = await this.createChatRequest(messages, functions);
      const customFunctionResponse = await this.openai.createChatCompletion(
        functionRequest
      );
      return customFunctionResponse.data.choices;
    } else {
      const candleStickResponse = [
        {
          index: 0,
          message: {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: JSON.stringify(functionResponse),
          },
          finish_reason: "stop",
        },
      ];
      return candleStickResponse;
    }
    // } catch (error) {
    //   console.error(`Error saving chat history: ${error}`);
    // }
  }
}
export default ChatGpt;
