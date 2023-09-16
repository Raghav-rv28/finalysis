import Grid from "@mui/material/Grid";
import News from "../../api/data/latestnews.json";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Marquee from "react-fast-marquee";
import { IconButton, Typography } from "@mui/material";
import { Info } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  maxWidth: "350px",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function MovingNews() {
  return (
    <Marquee>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={{ lg: 0.4, md: 1, sm: 2 }}
        rowSpacing={5}
      >
        <Stack direction="row" spacing={2}>
          {News.test.map((value) => {
            return (
              <Grid item sm={5} md={4} lg={2.4} key={value.article_id}>
                <Item key={value.article_id}>
                  <img src={value.image_url} width={250} height={200} />
                  <Typography noWrap textOverflow="ellipsis" variant="body1">
                    {value.title}
                  </Typography>
                  <Typography overflow="hidden" variant="body2">
                    {value.creator}
                  </Typography>
                  <Typography
                    textOverflow="ellipsis"
                    noWrap
                    variant="subtitle1"
                  >
                    {value.description}
                  </Typography>
                  <IconButton
                    sx={{ color: "white" }}
                    aria-label={`Info ${value.title}`}
                    onClick={() => {
                      window.location.href = value.link;
                    }}
                  >
                    <Info />
                  </IconButton>
                </Item>
              </Grid>
            );
          })}
        </Stack>
      </Grid>
    </Marquee>
  );
}
