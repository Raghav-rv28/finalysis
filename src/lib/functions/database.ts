export async function getUserData(email: string) {
  const response = await fetch(
    `https://i3bz0ybp1h.execute-api.us-east-2.amazonaws.com/Prod/${email}/User`,
    { method: "GET" }
  );

  if (response.ok) {
    const data = await response.json();

    return data;
  }
  return null;
}
