import "server-only";
export async function getItem(itemId: string, itemType: string) {
  try {
    console.log("Getting Item:", itemId, itemType);
    const response = await fetch(
      `https://i3bz0ybp1h.execute-api.us-east-2.amazonaws.com/Prod/${itemId}/${itemType}`,
      { method: "GET" }
    );
    if (response.ok) {
      const data = await response.json();

      return data;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}

export async function queryItems(itemId: string, itemType: string) {
  try {
    console.log("Querying Items:", itemId, itemType);
    const response = await fetch(
      `https://i3bz0ybp1h.execute-api.us-east-2.amazonaws.com/Prod/`,
      {
        method: "POST",
        body: JSON.stringify({
          keyConditionExpression: `itemId = :pk AND begins_with(itemType,:sk)`,
          expressionAttributeValues: {
            ":sk": itemType,
            ":pk": itemId,
          },
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}

export async function updateWatchList(
  userEmail: string,
  watchlist: Array<string>
) {
  try {
    await fetch(
      `https://i3bz0ybp1h.execute-api.us-east-2.amazonaws.com/Prod/watchlist`,
      {
        method: "POST",
        body: JSON.stringify({
          userEmail,
          watchlist,
        }),
      }
    );
  } catch (Err) {
    console.log(Err);
  }
}
