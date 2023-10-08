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

export async function getOHLCV(
  symbol: string,
  from: number,
  to: number,
  resolution: string = "M"
) {
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.FINNHUB_ACCESS_KEY}`,
    { method: "GET" }
  );

  if (response.ok) {
    const data = await response.json();

    return data;
  }
  return null;
}
export async function getQuote(symbol: string) {
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_ACCESS_KEY}`,
    { method: "GET" }
  );

  if (response.ok) {
    const data = await response.json();

    return data;
  }
  return null;
}
