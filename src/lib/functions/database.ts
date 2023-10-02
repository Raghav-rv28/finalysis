export async function getItem(itemId: string, itemType: string) {
  try {
    console.log(itemId, itemType);
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
