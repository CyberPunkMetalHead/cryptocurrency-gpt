import type { ChatCompletionFunctions } from "openai";

export const BinanceOrderFunction: ChatCompletionFunctions = {
  name: "BinanceApi-placeOrder",
  description:
    "Use this function to Buy and Sell Cryptocurrency. This function automatically calculates the latest price for the asset.",
  parameters: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description:
          "the symbol of the asset to buy or sell, including the paired asset. ie: BTCUSDT",
      },
      side: {
        type: "string",
        description: "BUY or SELL depending on the order requested.",
      },
      quantity: {
        type: "string",
        description: "The quantity to buy in USD.",
      },
    },
    required: ["symbol", "side", "quantity"],
  },
};

export const BinanceGetPriceOnly: ChatCompletionFunctions = {
  name: "BinanceApi-getPriceOnly",
  description:
    "Returns the latest price of one cryptocurrency. IMPORTANT: DO NOT USE THIS FUNCTION IF YOU ARE ASKED TO BUY OR SELL CRYPTOCURRENCY.",
  parameters: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description:
          "The symbol of the asset find the current price for, including the paired asset. ie: BTCUSDT. Only one symbol may be passed.",
      },
    },
    required: ["symbol"],
  },
};

export const BinanceGetOpenOrders: ChatCompletionFunctions = {
  name: "BinanceApi-getOpenOrders",
  description:
    "Binance Api access. Returns the open trades for a user's Binance account for a specific asset.",
  parameters: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description:
          "The symbol of the asset to get the open orders for, including the paired asset. ie: BTCUSDT.",
      },
    },
    required: ["symbol"],
  },
};

export const BinanceGetHistoricOrders: ChatCompletionFunctions = {
  name: "BinanceApi-getHistoricOrders",
  description:
    "Binance API access. Returns historical orders for a specific cryptocurrency symbol.",
  parameters: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description:
          "The symbol of the asset to get the historical orders for, including the paired asset. ie: BTCUSDT.",
      },
    },
    required: ["symbol"],
  },
};

export const BinanceGetHistoricCandlestickData: ChatCompletionFunctions = {
  name: "BinanceApi-getHistoricCandlestickData",
  description:
    "This function returns an array of the latest candlestick data for a symbol. The close price of the last candle may be used as the current price, if you are asked to fetch it.",
  parameters: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description:
          "the symbol of the asset to fetch historical data for, including the paired asset. ie: BTCUSDT",
      },
      interval: {
        type: "string",
        description:
          "The interval of the candlesticks. Ie: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, ",
      },
      limit: {
        type: "string",
        description: "The maximum number of candles to return",
      },
    },
    required: ["interval", "limit"],
  },
};

// DUMMY FUNCTION TO GET CHATGPT TO RETURN INFORMATION IN A SPECIFIC WAY.
export const BinancePlotCandlestickData: ChatCompletionFunctions = {
  name: "BinanceApi-plotCandlestickData",
  description:
    "Can be used to plot historical data in a tradingview chart. When used, you must always respond with the entire's function response and nothing else. No other text, no other message, just the raw function response. ",
  parameters: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description:
          "the symbol of the asset to plot, including the paired asset. ie: BTCUSDT",
      },
      interval: {
        type: "string",
        description:
          "The interval of the candlesticks. Ie: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, ",
      },
      limit: {
        type: "string",
        description: "The maximum number of candles to return",
      },
    },
    required: ["interval", "limit"],
  },
};

export const BinanceGetAccountInfo: ChatCompletionFunctions = {
  name: "BinanceApi-getAccountInfo",
  description:
    "Returns general account information fort the user's Binance account.",
  parameters: {
    type: "object",
    properties: {},
  },
};
