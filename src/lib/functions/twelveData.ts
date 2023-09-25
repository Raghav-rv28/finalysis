/**
 * https://twelvedata.com/docs#quote
 * @param watchlist : List of Stock symbols in the watchlist to be pulled.
 * @returns quote details for the list of stocks.
 */
export async function getWatchListDetails(watchlist: Array<string>) {
  const response = await fetch(
    `https://api.twelvedata.com/quote?symbol=${watchlist.join(",")}&apikey=${
      process.env.TWELVE_DATA_ACCESS_KEY
    }`,
    { method: "GET" }
  );

  if (response.ok) {
    const data = await response.json();

    return data;
  }
  return null;
}
