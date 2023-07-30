# CryptocurrencyGPT, all in One AI Cryptocurrency Assistant
CryptocurrencyGPT expands on the functionality of OpenAI's LLM by using function calling in order to create a helpful cryptocurrency assitant that can perform a variety of cryptocurrency-focused tasks. It's an all in one cryptocurrency assistant that has a minimalistic user interact through which you can buy, sell or analyze cryptocurrency assets and even plot cryptocurrency charts!

## Main CryptocurrencyGPT Functions:
- It can return Live Market Data, as well as historical data using the Binance API
- It can browse the internet using the Brave Search API, if it doesn't know the answer to a question
- It can place Buy and Sell orders on behalf of the user 
- It can plot Market Charts using the Tradingview API

For a complete showcase of the features, check out my recent video on it:<br><br>
[![Cryptocurrency GPT](https://img.youtube.com/vi/tdSK1ecFfFQ/0.jpg)](https://www.youtube.com/watch?v=tdSK1ecFfFQ)


## Requirements:
In order to run CryptocurrencyGPT locally you will need the following:
- Openai API Key & Org ID
- Brave Search API Key
- Binance API Key and secret with Spot Trading Enabled

If you don't want to experiment on your main account, or are looking to create a Binance account, [use my referral code](https://accounts.binance.info/register?ref=WDHQGYKS) and get 5% off your trading fees.

## How to Run CryptocurrencyGPT

* You must first open the `.env.example` file and paste the relevant access keys in, and rename the file to be simply `.env`. 
* `npm i`
* `npm run dev`
*  Accessing it from `http://localhost:3000`


If you want to build a release: 

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |


## Interested in Algorithmic Cryptocurrency Trading?
If you like this project and are into crypto, I built and [algorithmic cryptocurrency trading platform](https://aesircrypto.com) alongside a small team of developers. We're always adding new features on there so go check it out if that's something you're into, or [join our Discord](https://discord.gg/jmqr7SvXVM) for crypto and tech discussions.