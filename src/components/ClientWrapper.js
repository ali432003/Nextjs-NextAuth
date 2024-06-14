// components/ClientWrapper.js
"use client"; // This directive makes the component a client component

import { SessionProvider } from "next-auth/react";

export function ClientWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
