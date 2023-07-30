import {
  BinanceGetAccountInfo,
  BinanceGetOpenOrders,
  BinanceGetPriceOnly,
  BinanceOrderFunction,
  BinanceGetHistoricOrders,
  BinanceGetHistoricCandlestickData,
  BinancePlotCandlestickData,
} from "./binanceModules";
import { BraveSearchModule } from "./braveSearchModule";

export const gptFunctions = [
  BraveSearchModule,
  BinanceOrderFunction,
  //BinanceGetPriceOnly,
  BinanceGetAccountInfo,
  BinanceGetOpenOrders,
  BinanceGetHistoricOrders,
  BinanceGetHistoricCandlestickData,
  BinancePlotCandlestickData,
];
