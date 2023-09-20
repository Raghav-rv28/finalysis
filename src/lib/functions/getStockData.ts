export async function getStockData(symbol: string) {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_ACESS_KEY}`,
    { method: "GET", headers: { "User-Agent": "request" } }
  );
  console.log(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_ACESS_KEY}`
  );
  if (response.ok) {
    const data = await response.json();

    return data;
  }
  return null;
}
