import React from "react";
import Container from "@mui/material/Container";
import HomePage from "./HomePage/page";
export default async function Home() {
  return (
    <main>
      <Container maxWidth="sm">
        <HomePage />
      </Container>
    </main>
  );
}
