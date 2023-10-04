"use server";
import Watchlist from "./Watchlist";
import { Session } from "next-auth";
import { getItem, queryItems } from "../../../lib/functions/database";
type Props = { session: Session };

export default async function WatchlistServerWrapper({ session }: Props) {
  let userData: {
    itemId: string;
    itemType: string;
    watchlist: Array<string>;
  } | null = null;
  let watchListData: any;
  if (session) {
    userData = await getItem("USER", `USER-PROFILE-${session.user.email}`);
  }

  // get watchlist info
  console.log(userData);
  watchListData = await queryItems("USER", "USER-WATCHLIST-");

  return (
    <div>
      <Watchlist watchlist={Object.values(watchListData.Items[0].data)} />
    </div>
  );
}
