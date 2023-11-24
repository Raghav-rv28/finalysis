import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
import {} from "next";
import setDate from "date-fns/setDate";
import subYears from "date-fns/subYears";
import { getQuote } from "../../../../lib/functions/finnhub";
import { getItem } from "../../../../lib/functions/database";
const client = new DynamoDBClient({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.ACCESS_KEY_SECRET as string,
  },
});
const ddbDocClient = DynamoDBDocumentClient.from(client);
// let fetchedData = {};
const date = new Date();
date.setHours(0, 0, 0, 0);
const tableName = "finalysis-sam";

// const updateDatabase = async (symbols, email) => {
//   try {
//     const data = await ddbDocClient.send(
//       new GetCommand({
//         TableName: tableName,
//         Key: {
//           itemId: "USER",
//           itemType: `USER-WATCHLIST-${email}`,
//         },
//       })
//     );
//     if (data.$metadata.httpStatusCode === 200) {
//       console.log(JSON.stringify(Object.keys(fetchedData)));
//       const res = await ddbDocClient.send(
//         new PutCommand({
//           TableName: tableName,
//           Item: {
//             ...data.Item,
//             data: fetchedData,
//             symbols,
//           },
//           ReturnValues: "ALL_OLD",
//         })
//       );
//       console.log("Success - item Added code:", JSON.stringify(res));
//       fetchedData = {};
//       return;
//     }
//   } catch (err) {
//     console.log("Error", err.stack);
//   }
// };

// /**
//  * recursive async function which grabs data for the given watchlist with 10 seconds interval between each tickers call.
//  * @param watchlist: WatchList item, with list of Ticker Symbols to be used in data retrieval
//  * @param symbol: Symbols to be used in data retrieval
//  * @param times: No of times the recursive function will run before updating the dynamoDBitem. === (Symbols.length)
//  */
// //
// const waitAndDo = async (email, newSymbols, symbol, times) => {
//   if (times < 1) {
//     return updateDatabase(newSymbols, email);
//   }

//   setTimeout(async function () {
//     console.log(symbol, times, "updating right now");
//     const stockData: any = {};
//     const response = await fetch(
//       `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.TWELVE_DATA_ACCESS_KEY}`,
//       { method: "GET" }
//     );
//     const Quotes = await response.json();
//     // request fail check.
//     stockData.quote = Quotes;
//     const res = await fetch(
//       `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=M&from=${
//         subYears(setDate(date, 1), 1).getTime() / 1000
//       }&to=${setDate(date, 1).getTime() / 1000}&token=${
//         process.env.FINNHUB_ACCESS_KEY
//       }`,
//       { method: "GET" }
//     );
//     const timeSeries = await res.json();
//     stockData.series = timeSeries;
//     if (Quotes.code === undefined) {
//       fetchedData[symbol] = stockData;
//     }
//     waitAndDo(
//       email,
//       newSymbols,
//       newSymbols[newSymbols.indexOf(symbol) + 1],
//       times - 1
//     );
//   }, 6000);
// };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const symbol = searchParams.get("symbol");
  const action = searchParams.get("action");
  console.log(`getting trig, ${symbol} action: ${action}`);
  try {
    const { Item: tempItem } = await ddbDocClient.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          itemId: "USER",
          itemType: `USER-WATCHLIST-${email}`,
        },
      })
    );
    const WatchlistItem = tempItem.data;
    if (WatchlistItem === null || WatchlistItem === undefined) {
      const data = await getQuote(symbol);
      console.log(JSON.stringify(data));

      const dbUpdate = await ddbDocClient.send(
        new PutCommand({
          TableName: tableName,
          Item: {
            itemId: "USER",
            itemType: `USER-WATCHLIST-${email}`,
            data: { [symbol]: { symbol, ...data } },
          },
        })
      );
      if (dbUpdate.$metadata.httpStatusCode) {
        return new Response(JSON.stringify({ data }));
      }
    } else if (
      !Object.keys(WatchlistItem).includes(symbol) &&
      action === "add"
    ) {
      const data = await getQuote(symbol);
      // console.log(JSON.stringify(data));

      const dbUpdate = await ddbDocClient.send(
        new PutCommand({
          TableName: tableName,
          Item: {
            ...tempItem,
            data: {
              ...WatchlistItem.data,
              [symbol]: { symbol, ...data },
            },
          },
        })
      );
      if (dbUpdate.$metadata.httpStatusCode) {
        return new Response(JSON.stringify({ data }));
      }
    }
    if (Object.keys(WatchlistItem).includes(symbol) && action === "delete") {
      console.log("reaching here");
      const temp = {};
      Object.keys(WatchlistItem).forEach((val) => {
        if (val !== symbol) {
          temp[val] = WatchlistItem[val];
        }
      });
      // console.log(Object.keys(temp));
      const dbUpdate = await ddbDocClient.send(
        new PutCommand({
          TableName: tableName,
          Item: {
            ...tempItem,
            data: temp,
          },
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
}
