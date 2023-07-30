import type { UTCTimestamp } from "lightweight-charts";
import type { BinanceCustomKline } from "../types/binanceCustomKline";

export class Util {
  static hasErrorMessage(error: unknown): error is Error {
    return error instanceof Error;
  }
  static parseKlineStringToJson(data: string): BinanceCustomKline[] {
    const parsedJsonData = JSON.parse(data);
    const dataArray = JSON.parse(parsedJsonData);

    return dataArray.map((item: any) => ({
      ...item,
      high: parseFloat(item.high),
      open: parseFloat(item.open),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      closeTime: item.closeTime,
      volume: parseFloat(item.volume),
    }));
  }
}
