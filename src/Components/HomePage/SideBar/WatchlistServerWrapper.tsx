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
  const { Items } = await queryItems("USER", "USER-WATCHLIST-");
  watchListData = Items[0]?.data;
  // console.log(watchListData);
  return (
    <div>
      <Watchlist
        watchlist={
          watchListData !== null && watchListData !== undefined
            ? Object.values(watchListData)
            : []
        }
      />
    </div>
  );
}
