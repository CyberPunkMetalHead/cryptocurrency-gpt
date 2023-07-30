import axios, { AxiosRequestConfig } from "axios";
import type { SearchResponse } from "../types/braveSearchResponse";

class Brave {
  apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.BRAVE_API_KEY;
  }

  async search(query: { q: string }): Promise<string> {
    try {
      const headers: AxiosRequestConfig["headers"] = {
        "X-Subscription-Token": this.apiKey,
        Accept: "application/json",
        "Accept-Encoding": "gzip",
      };

      const response: SearchResponse = await axios.get(
        "https://api.search.brave.com/res/v1/web/search",
        {
          params: {
            q: query.q,
          },
          headers,
        }
      );

      const descriptions = response.data.web.results
        .slice(0, 5)
        .map((result) => result.description)
        .join(" ");
      const descriptionsString = JSON.stringify(descriptions).replace(
        /<[^>]+>/g,
        ""
      );
      return descriptionsString;
    } catch (error) {
      console.error("Error searching with Brave Search:", error);
      throw error;
    }
  }
}

export default Brave;
