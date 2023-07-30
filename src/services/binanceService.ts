import Binance, {
  OrderSide_LT,
  OrderType,
  ExchangeInfo,
  CandleChartInterval_LT,
} from "binance-api-node";
import { Util } from "../utils/utils";

/**
 * BinanceApi class for interacting with the Binance API.
 * This class provides methods to perform various API calls to Binance for trading and account operations.
 * Some of the Methods are Internal while others are available for ChatGPT to use.
 */
class BinanceApi {
  apikey: string;
  apiSecret: string;
  binance;

  constructor() {
    this.apikey = import.meta.env.BINANCE_API_KEY;
    this.apiSecret = import.meta.env.BINANCE_SECRET;
    this.binance = Binance({
      apiKey: this.apikey,
      apiSecret: this.apiSecret,
    });
  }
  /**
   * INTERNAL USE ONLY. Converts the given quantity of an asset to the equivalent quantity in USD based on the current price.
   * This function is not available for ChatGPT and is used internally for quantity conversions.
   *
   * @param {string} quantity - The quantity of the asset to convert.
   * @param {string} symbol - The symbol (trading pair) for which to fetch the current price.
   * @returns {Promise<string>} The equivalent quantity in USD.
   */
  async convertQuantity(quantity: string, symbol: string): Promise<string> {
    const price = JSON.parse(await this.getPriceOnly({ symbol: symbol }));
    const priceAsFloat = parseFloat(price[symbol]);
    const quantityInUSD = parseFloat(quantity);
    const lotSize = await this.getLotSize(symbol);
    const precision = await this.calculateOrderPrecision(lotSize);

    const finalQuantity =
      precision === 0
        ? Math.trunc(quantityInUSD / priceAsFloat)
        : (quantityInUSD / priceAsFloat).toFixed(precision);

    return finalQuantity.toString();
  }

  /**
   * INTERNAL USE ONLY. Fetches the exchange information for the specified symbol (trading pair) from Binance.
   * This function is not available for ChatGPT and is used internally for retrieving exchange information.
   *
   * @param {string} symbol - The symbol (trading pair) for which to fetch the exchange information.
   * @returns {Promise<ExchangeInfo>} The exchange information for the specified symbol.
   */
  async getExchangeInfo(symbol: string): Promise<ExchangeInfo> {
    return await this.binance.exchangeInfo({ symbol: symbol });
  }

  /**
   * INTERNAL USE ONLY. Fetches the lot size (step size) for the specified symbol (trading pair) from Binance.
   * This function is not available for ChatGPT and is used internally for retrieving lot size information.
   *
   * @param {string} symbol - The symbol (trading pair) for which to fetch the lot size.
   * @returns {Promise<string>} The lot size (step size) for the specified symbol.
   */
  async getLotSize(symbol: string): Promise<string> {
    const exchangeInfo = await this.getExchangeInfo(symbol);
    const symbolInfo = exchangeInfo.symbols[0];

    // Find the object with filterType equal to 'LOT_SIZE'
    const lotSizeFilter = symbolInfo.filters.find(
      (filter: any) => filter.filterType === "LOT_SIZE"
    );

    // Check if the 'LOT_SIZE' filter exists and has the 'stepSize' property
    if (lotSizeFilter && "stepSize" in lotSizeFilter) {
      return lotSizeFilter.stepSize;
    }
    return "minQty not found or invalid.";
  }

  /**
   * INTERNAL USE ONLY. Calculates the precision for an order size based on the step size.
   * This function is not available for ChatGPT and is used internally for precision calculations.
   *
   * @param {string} stepSize - The step size value for the trading pair (symbol).
   * @returns {Promise<number>} The precision for the order size based on the step size.
   */
  async calculateOrderPrecision(stepSize: string): Promise<number> {
    const stepSizeDigits = stepSize.split(".")[1];

    if (stepSizeDigits) {
      const nonZeroIndex = stepSizeDigits.indexOf("1");
      return nonZeroIndex + 1;
    }

    return 0; // If stepSizeDigits is not available (stepSize is an integer), precision is 0
  }

  /**
   * Places a market order for the specified trading pair on Binance.
   * This function is specifically used by the ChatGPT API to place market orders.
   *
   * @param {object} order - An object representing the order to be placed.
   * @param {string} order.symbol - The symbol (trading pair) for which to place the order.
   * @param {string} order.quantity - The quantity of the asset to buy or sell in the order.
   * @param {string} order.side - The side of the order, i.e., 'BUY' or 'SELL'.
   *
   * @returns {Promise<string>} A JSON string representation of the order response,
   * or an error message if placing the order fails due to insufficient balance or other issues.
   */
  async placeOrder(order: {
    symbol: string;
    quantity: string;
    side: string;
  }): Promise<string> {
    try {
      const quantityInAsset = await this.convertQuantity(
        order.quantity,
        order.symbol
      );
      console.log(`QUANTITY IS: ${quantityInAsset}`);
      const response = await this.binance.order({
        symbol: order.symbol,
        side: order.side as OrderSide_LT,
        type: "MARKET" as OrderType.MARKET,
        quantity: quantityInAsset,
      });
      return JSON.stringify(response);
    } catch (error) {
      if (Util.hasErrorMessage(error)) {
        return error.message;
      }
      return "Could not Place Order due to insufficient balance or other issues. Check your Binance account and the error logs.";
    }
  }

  /**
   * Fetches the current price for the specified symbol (trading pair) from Binance.
   * This function is specifically used by the ChatGPT API to retrieve current prices.
   *
   * @param {object} s - An object with an optional 'symbol' property representing the trading pair.
   * @param {string} s.symbol - The symbol (trading pair) for which to fetch the current price.
   *
   * @returns {Promise<string>} A JSON string representation of the current price,
   * or an error message if fetching the price fails.
   */
  async getPriceOnly(s: { symbol?: string }): Promise<string> {
    try {
      const response = await this.binance.prices({ symbol: s.symbol });
      return JSON.stringify(response);
    } catch (error) {
      if (Util.hasErrorMessage(error)) {
        return error.message;
      }
      return "Could Not return prices.";
    }
  }

  /**
   * Fetches the open orders from Binance for the specified symbol and returns the order details.
   * This function is specifically used by the ChatGPT API to retrieve open orders.
   *
   * @param {object} s - An object with an optional 'symbol' property representing the trading pair.
   * @param {string} s.symbol - The symbol (trading pair) for which to fetch open orders.
   *
   * @returns {Promise<string>} A JSON string representation of the open orders,
   * or an error message if fetching the open orders fails.
   */
  async getOpenOrders(s: { symbol?: string }): Promise<string> {
    try {
      const response = await this.binance.openOrders({ symbol: s.symbol });
      return JSON.stringify(response);
    } catch (error) {
      if (Util.hasErrorMessage(error)) {
        return error.message;
      }
      return "Could Not return Open Orders.";
    }
  }

  /**
   * Fetches the account information from Binance and returns the account balances with free assets.
   * This function is specifically used by the ChatGPT API to retrieve account details.
   *
   * @returns {Promise<string>} A JSON string representation of the filtered account information,
   * or an error message if fetching the account info fails.
   */
  async getAccountInfo(): Promise<string> {
    try {
      const response = await this.binance.accountInfo();

      if (response && response.balances && Array.isArray(response.balances)) {
        // Filter out balances with free assets greater than 0
        response.balances = response.balances.filter(
          (balance: any) => +balance.free > 0
        );
      }

      return JSON.stringify(response);
    } catch (error) {
      if (Util.hasErrorMessage(error)) {
        return error.message;
      }
      return "Could not return Account info.";
    }
  }

  async getHistoricOrders(s: { symbol: string }): Promise<string> {
    try {
      const response = await this.binance.allOrders({
        symbol: s.symbol,
      });
      return JSON.stringify(
        response.map((x) => ({
          symbol: x.symbol,
          orderId: x.orderId,
          origQty: x.origQty,
          executedQty: x.executedQty,
          type: x.type,
          status: x.status,
          time: x.time,
        }))
      );
    } catch (error) {
      if (Util.hasErrorMessage(error)) {
        return error.message;
      }
      return "Could not return Historical Orders.";
    }
  }

  async getHistoricCandlestickData(s: {
    symbol: string;
    interval: string;
    limit: number;
  }): Promise<string> {
    try {
      const response = await this.binance.candles({
        symbol: s.symbol,
        interval: s.interval as CandleChartInterval_LT,
        limit: s.limit,
      });
      return JSON.stringify(
        response.map((x) => ({
          high: x.high,
          open: x.open,
          low: x.low,
          close: x.close,
          closeTime: x.closeTime,
        }))
      );
    } catch (error) {
      if (Util.hasErrorMessage(error)) {
        return error.message;
      }
      return "Could not return Historical Candles";
    }
  }

  // DUMMY FUNCTION TO GET CHATGPT TO RETURN INFORMATION IN A SPECIFIC WAY.
  async plotCandlestickData(s: {
    symbol: string;
    interval: string;
    limit: number;
  }): Promise<string> {
    try {
      const response = await this.binance.candles({
        symbol: s.symbol,
        interval: s.interval as CandleChartInterval_LT,
        limit: s.limit,
      });
      return JSON.stringify(
        response.map((x) => ({
          high: x.high,
          open: x.open,
          low: x.low,
          close: x.close,
          closeTime: x.closeTime,
          volume: x.volume,
        }))
      );
    } catch (error) {
      if (Util.hasErrorMessage(error)) {
        return error.message;
      }
      return "Could not return Historical Candles";
    }
  }
}
export default BinanceApi;
