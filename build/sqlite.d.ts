// Deno SQLite WASM binding types

export type VoidPtr = number;
export type StringPtr = number;
export type StatementPtr = number;

export interface Wasm {
  memory: WebAssembly.Memory;

  malloc: (size: number) => VoidPtr;
  free: (ptr: VoidPtr) => void;
  str_len: (str: StringPtr) => number;
  seed_rng: (seed: number) => void;
  get_status: () => number;
  open: (filename: StringPtr, flags: number) => number;
  close: () => number;
  get_sqlite_error_str: () => StringPtr;
  prepare: (sql: StringPtr) => StatementPtr;
  finalize: (stmt: StatementPtr) => number;
  reset: (stmt: StatementPtr) => number;
  clear_bindings: (stmt: StatementPtr) => number;
  bind_int: (stmt: StatementPtr, idx: number, value: number) => number;
  bind_double: (stmt: StatementPtr, idx: number, value: number) => number;
  bind_text: (stmt: StatementPtr, idx: number, value: StringPtr) => number;
  bind_blob: (
    stmt: StatementPtr,
    idx: number,
    value: VoidPtr,
    size: number,
  ) => number;
  bind_big_int: (
    stmt: StatementPtr,
    idx: number,
    sign: number,
    high: number,
    low: number,
  ) => number;
  bind_null: (stmt: StatementPtr, idx: number) => number;
  bind_parameter_index: (stmt: StatementPtr, name: StringPtr) => number;
  step: (stmt: StatementPtr) => number;
  column_count: (stmt: StatementPtr) => number;
  column_type: (stmt: StatementPtr, col: number) => number;
  column_int: (stmt: StatementPtr, col: number) => number;
  column_double: (stmt: StatementPtr, col: number) => number;
  column_text: (stmt: StatementPtr, col: number) => StringPtr;
  column_blob: (stmt: StatementPtr, col: number) => VoidPtr;
  column_bytes: (stmt: StatementPtr, col: number) => number;
  column_name: (stmt: StatementPtr, col: number) => StringPtr;
  column_origin_name: (stmt: StatementPtr, col: number) => StringPtr;
  column_table_name: (stmt: StatementPtr, col: number) => StringPtr;
  last_insert_rowid: () => number;
  changes: () => number;
  total_changes: () => number;
}

export default function instantiate(): { exports: Wasm };
