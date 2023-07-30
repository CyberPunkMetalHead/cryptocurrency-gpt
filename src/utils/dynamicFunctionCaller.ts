import BinanceApi from "../services/binanceService";
import Brave from "../services/braveSearchService";

export class Caller {
  Brave: Brave;
  BinanceApi: BinanceApi;

  // Initialize Classes
  constructor() {
    this.Brave = new Brave();
    this.BinanceApi = new BinanceApi();
  }

  async runMethod(
    className: string,
    methodName: string,
    args: { [key: string]: any }
  ): Promise<string> {
    const classInstances: { [key: string]: any } = {
      Brave: this.Brave,
      BinanceApi: this.BinanceApi,
      // Add more classes as needed
    };

    if (className in classInstances) {
      const classInstance = classInstances[className];

      if (typeof classInstance[methodName] === "function") {
        const fn = classInstance[methodName] as (
          ...args: any[]
        ) => Promise<string>;

        // Check if args is an empty object
        if (Object.keys(args).length === 0 && args.constructor === Object) {
          return fn.call(classInstance);
        } else {
          return fn.call(classInstance, args);
        }
      } else {
        return `Function not found in class: ${methodName}`;
      }
    } else {
      console.log(`Class not found: ${className}`);
      return `Class not found: ${className}`;
    }
  }
}
