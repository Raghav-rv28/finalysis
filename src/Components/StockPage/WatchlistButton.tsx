"use client";
import React from "react";
import { Star, StarBorderOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

type Props = { watchlist: Array<string>; symbol: string };

export default function WatchlistButton({ watchlist, symbol }: Props) {
  const [watchList, setWatchList] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    setWatchList(watchlist);
  }, [watchlist]);

  const handleChange = React.useCallback(() => {
    if (watchList.includes(symbol)) {
      setWatchList((prev) => prev.filter((val) => val !== symbol));
    } else setWatchList((prev) => prev.concat([symbol]));
  }, [symbol, watchList]);

  console.log(watchList);
  return (
    <span>
      <IconButton onClick={handleChange}>
        {watchList.includes(symbol) ? (
          <Star color="warning" />
        ) : (
          <StarBorderOutlined />
        )}
      </IconButton>
    </span>
  );
}
