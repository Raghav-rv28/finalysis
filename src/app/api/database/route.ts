import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import setDate from "date-fns/setDate";
import subYears from "date-fns/subYears";
const client = new DynamoDBClient({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.ACCESS_KEY_SECRET as string,
  },
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const date = new Date();
date.setHours(0, 0, 0, 0);
const tableName = "finalysis-sam";

const updateDatabase = async (symbols, email, fetchedData) => {
  try {
    const res = await ddbDocClient.send(
      new UpdateCommand({
        TableName: tableName,
        Key: {
          itemId: "USER",
          itemType: `USER-WATCHLIST-${email}`,
        },
        UpdateExpression: "set data = :data AND Symbols = :symbols",
        ExpressionAttributeValues: {
          ":data": fetchedData,
          ":symbols": symbols,
        },
        ReturnValues: "ALL_NEW",
      })
    );
    console.log("Success - item Added code:", res.$metadata.httpStatusCode);
    return JSON.stringify(res.Attributes);
  } catch (err) {
    console.log("Error", err.stack);
  }
};

/**
 * recursive async function which grabs data for the given watchlist with 10 seconds interval between each tickers call.
 * @param watchlist: WatchList item, with list of Ticker Symbols to be used in data retrieval
 * @param symbol: Symbols to be used in data retrieval
 * @param times: No of times the recursive function will run before updating the dynamoDBitem. === (Symbols.length)
 */
//
const waitAndDo = async (email, fetchedData, newSymbols, symbol, times) => {
  if (times < 1) {
    return updateDatabase(newSymbols, email, fetchedData);
  }

  setTimeout(async function () {
    console.log(symbol, times, "updating right now");
    const stockData: any = {};
    const response = await fetch(
      `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.TWELVE_DATA_ACCESS_KEY}`,
      { method: "GET" }
    );
    const Quotes = await response.json();
    // request fail check.
    stockData.quote = Quotes;
    const res = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=M&from=${
        subYears(setDate(date, 1), 1).getTime() / 1000
      }&to=${setDate(date, 1).getTime() / 1000}&token=${
        process.env.FINNHUB_ACCESS_KEY
      }`,
      { method: "GET" }
    );
    const timeSeries = await res.json();
    stockData.series = timeSeries;
    if (Quotes.code === undefined) {
      fetchedData[symbol] = stockData;
    }
    console.log(fetchedData);
    return waitAndDo(
      email,
      fetchedData,
      newSymbols,
      newSymbols[newSymbols.indexOf(symbol) + 1],
      times - 1
    );
  }, 10000);
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const Symbols = searchParams.get("Symbols");

  try {
    const watchlistData = await waitAndDo(
      email,
      {},
      Symbols,
      Symbols[0],
      Symbols.length
    );
    return Response.json({ watchlistData });
  } catch (err) {
    console.log(err);
  }
}
