export async function getPeers(symbol: string) {
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${process.env.FINNHUB_ACCESS_KEY}`,
    { method: "GET" }
  );

  if (response.ok) {
    const data = await response.json();

    return data;
  }
  return null;
}
