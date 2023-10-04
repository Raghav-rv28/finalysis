import React from "react";
import MarketOverview from "./MarketOverview";
import { Session } from "next-auth";
import { getItem } from "../../../lib/functions/database";
type Props = { session: Session };

export default async function MOServerWrapper({ session }: Props) {
  const globalSectorData = await getItem("GLOBAL", "GLOBAL-SECTOR-LATEST");
  return (
    <div>
      <MarketOverview globalSectorData={globalSectorData} />
    </div>
  );
}
