"use client";
import React, { useCallback, useEffect, useState } from "react";
import Home from "../Components/HomePage/Home";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Homepage() {
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <main>
      <Home />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Website Under Construction
        </Alert>
      </Snackbar>
    </main>
  );
}
