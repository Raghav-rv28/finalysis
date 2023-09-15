import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import data from "../../api/data/latestnews.json";
import { Info } from "@mui/icons-material";

function srcset(
  image: string,
  width: number,
  height: number,
  rows = 1,
  cols = 1
) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function NewsList() {
  return (
    <ImageList
      sx={{
        margin: "auto",
        height: "60vh",
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: "translateZ(0)",
      }}
      gap={15}
    >
      {data.test.map((item) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        if (item.image_url === null) return null;
        return (
          <ImageListItem key={item.image_url} cols={cols} rows={rows}>
            <img
              {...srcset(item.image_url, 250, 200, rows, cols)}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              title={item.title}
              subtitle={item.creator}
              position="bottom"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  aria-label={`Info ${item.title}`}
                  onClick={() => {
                    window.location.href = item.link;
                  }}
                >
                  <Info />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}
