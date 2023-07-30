import fs from "fs/promises";
import type { ChatCompletionRequestMessage } from "openai";

class MessageHistory {
  chatHistoryFilePath = "src/data/chat_history.json"; // Path to the chat history JSON file

  async save(chatHistory: ChatCompletionRequestMessage[]) {
    try {
      // Read the existing chat history from the file
      const existingHistory = await fs.readFile(
        this.chatHistoryFilePath,
        "utf-8"
      );
      const parsedHistory: ChatCompletionRequestMessage[] =
        JSON.parse(existingHistory);

      // Append the new chat messages to the chat history
      let updatedHistory;
      if (Array.isArray(parsedHistory)) {
        updatedHistory = [...parsedHistory, ...chatHistory];
      } else {
        updatedHistory = chatHistory;
      }

      // Write the updated chat history back to the file
      await fs.writeFile(
        this.chatHistoryFilePath,
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error(`Error saving chat history: ${error}`);
    }
  }

  async load(): Promise<ChatCompletionRequestMessage[]> {
    try {
      // Read the existing chat history from the file
      const chatHistoryJson = await fs.readFile(
        this.chatHistoryFilePath,
        "utf-8"
      );
      const chatHistory = JSON.parse(chatHistoryJson);
      return chatHistory;
    } catch (error) {
      console.error(`Error loading chat history: ${error}`);
      return [];
    }
  }

  async clear(): Promise<void> {
    try {
      await fs.writeFile(
        this.chatHistoryFilePath,
        `[{"role":"system","content":"You are a helpful assistant with access to many functions that extent your capabilities. Remember to use them."}]`
      );
    } catch (error) {
      console.error(`Error clearing the chat history: ${error}`);
    }
  }
}

export default MessageHistory;
