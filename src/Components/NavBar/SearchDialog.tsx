"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { IconButton, TextField } from "@mui/material";
import defaultSearch from "../../app/api/data/global/samplesearch.json";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
export interface SearchDialogProps {
  open: boolean;
  getSearchResults: any;
  watchListData: Array<any> | undefined;
  handleAdd: any | undefined;
  search: Array<any>;
  onClose: (value: string) => void;
}

export function SearchDialog(props: SearchDialogProps) {
  const { onClose, getSearchResults, search, open, watchListData, handleAdd } =
    props;

  const router = useRouter();
  const theme = useTheme();
  const handleListItemClick = (value: string) => {
    router.push(`/stocks/${value}`);
    onClose(value);
  };

  const setSearch = (event) => {
    getSearchResults(event.target.value);
  };

  return (
    <Dialog
      maxWidth="md"
      sx={{ minHeight: "50vh" }}
      fullWidth
      onClose={onClose}
      open={open}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.primary.main,
        },
      }}
    >
      <DialogTitle sx={{ color: theme.palette.secondary.main }}>
        Search Stonks
      </DialogTitle>
      <Box>
        <Box sx={{ paddingRight: "1rem", paddingLeft: "1rem" }}>
          <TextField
            sx={{ width: "100%" }}
            onChange={(event) => setSearch(event)}
          />
        </Box>
        <List dense>
          {search.map((value) => {
            return (
              <ListItem
                key={crypto.randomUUID()}
                secondaryAction={
                  watchListData === undefined ? null : (
                    <IconButton
                      onClick={() => handleAdd(value.symbol)}
                      edge="end"
                      aria-label="delete"
                    >
                      <AddIcon />
                    </IconButton>
                  )
                }
              >
                <ListItemButton
                  onClick={() => handleListItemClick(value.symbol)}
                >
                  <ListItemText
                    primary={`${value.symbol} - ${value.name}`}
                    secondary={value.exchange}
                  />
                </ListItemButton>
                {/* <Typography color="secondary" variant="subtitle1">
                  {value.symbol} -{" "}
                </Typography>
                <Typography
                  color="secondary"
                  variant="subtitle1"
                  sx={{ paddingLeft: "0.5rem" }}
                >
                  {value.name}
                </Typography> */}
                {/* <Typography
                  color="secondary"
                  variant="subtitle1"
                  sx={{ marginLeft: "2rem" }}
                >
                  ({value.exchange})
                </Typography> */}
              </ListItem>
            );
          })}
          {search.length === 0 &&
            defaultSearch.data.map((value) => {
              return (
                <ListItem
                  key={crypto.randomUUID()}
                  secondaryAction={
                    watchListData === undefined ? null : (
                      <IconButton
                        onClick={() => handleAdd(value.symbol)}
                        edge="end"
                        aria-label="delete"
                      >
                        <AddIcon />
                      </IconButton>
                    )
                  }
                >
                  <ListItemButton
                    onClick={() => handleListItemClick(value.symbol)}
                  >
                    <ListItemText
                      primary={`${value.symbol} - ${value.name}`}
                      secondary={value.exchange}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          {/* {emails.map((email) => (
            <ListItem disableGutters key={email}>
              <ListItemButton onClick={() => handleListItemClick(email)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disableGutters>
            <ListItemButton
              autoFocus
              onClick={() => handleListItemClick("addAccount")}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add account" />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Box>
    </Dialog>
  );
}
