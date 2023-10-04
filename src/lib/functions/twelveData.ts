/**
 * https://twelvedata.com/docs#quote
 * @param watchlist : List of Stock symbols in the watchlist to be pulled.
 * @returns quote details for the list of stocks.
 */
export async function getWatchListDetails(watchlist: Array<string>) {
  const promises = watchlist.map(async (value) => {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${value}&token=${process.env.FINNHUB_ACCESS_KEY}`,
      { method: "GET" }
    );
    if (response.ok) {
      const data = await response.json();
      setTimeout(() => {
        console.log({ symbol: value, ...data });
      }, 2000);
      return { symbol: value, ...data };
    }
  });
  const data = await Promise.all(promises);
  return data;
}
