"use client";

import { useRef } from "react";

import { useStore } from "../lib/store";

function StoreInitializer({ mode }: { mode: string }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({ mode });
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
