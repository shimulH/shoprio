// src/lib/services.ts
// Minimal stub for @buildd/services — provides useGlobalStore for app-table.tsx
import { useState } from "react";

type TableActionState = { rowId: string; actionId: string } | null;

export function useGlobalStore() {
  const [tableActionState, setTableActionState] =
    useState<TableActionState>(null);
  return { tableActionState, setTableActionState };
}
