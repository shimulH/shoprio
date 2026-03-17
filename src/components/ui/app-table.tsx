"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { useGlobalStore } from "@buildd/services";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@buildd/utils";

// Base table components (unchanged, already optimized)
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-slate-50 border-b border-slate-200", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("divide-y divide-slate-100", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-slate-200 bg-slate-50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("hover:bg-slate-50 transition-colors", className)}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-bold text-slate-400 capitalize tracking-wider text-[10px]",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

// --------------------------------------------

export interface ColumnDef<T> {
  key: string;
  header: string;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  width?: string;
  className?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface AppTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  actions?: (row: T, index: number) => React.JSX.Element;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  enableBulkSelection?: boolean;
  selectedRows?: Set<string>;
  onRowSelect?: (rowId: string, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  getRowId?: (row: T) => string;
  isPopoverShown?: boolean;
  minWidth?: string;
}

// Fixed + Optimized AppTable
function AppTable<T extends Record<string, any>>({
  data,
  columns,
  actions,
  loading = false,
  emptyMessage = "No data available",
  className,
  enableBulkSelection = false,
  selectedRows = new Set(),
  onRowSelect,
  onSelectAll,
  getRowId = (row: T) => row.id || String(row),
  isPopoverShown = true,
  minWidth = "min-w-[1000px]",
}: AppTableProps<T>) {
  const { tableActionState, setTableActionState } = useGlobalStore();

  // Always call hooks before conditional returns
  React.useEffect(() => {
    return () => {
      setTableActionState(null);
    };
  }, [setTableActionState]);

  const getCellValue = React.useCallback(
    (row: T, column: ColumnDef<T>, index: number) => {
      if (column.key === "sl") return index + 1;

      const value =
        column.accessor && typeof column.accessor === "function"
          ? column.accessor(row)
          : column.accessor
            ? row[column.accessor]
            : row[column.key];

      return column.render ? column.render(value, row, index) : value;
    },
    [],
  );

  // Derived selections
  const isAllSelected =
    data.length > 0 && data.every((row) => selectedRows.has(getRowId(row)));
  const isIndeterminate =
    data.some((row) => selectedRows.has(getRowId(row))) && !isAllSelected;

  // Memoized handlers
  const handleSelectAll = React.useCallback(() => {
    onSelectAll?.(!isAllSelected);
  }, [isAllSelected, onSelectAll]);

  const handleRowSelect = React.useCallback(
    (row: T) => {
      const rowId = getRowId(row);
      const isSelected = selectedRows.has(rowId);
      onRowSelect?.(rowId, !isSelected);
    },
    [onRowSelect, selectedRows, getRowId],
  );

  // Rendering
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-muted animate-pulse rounded" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-muted/50 animate-pulse rounded" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  const hasActions = actions && typeof actions === "function";

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden",
        className,
      )}
    >
      <Table className={minWidth}>
        <TableHeader>
          <tr>
            {enableBulkSelection && (
              <TableHead className="w-[50px]">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                />
              </TableHead>
            )}
            {columns.map((column, i) => (
              <TableHead
                key={column.key + i}
                className={cn(
                  column.className,
                  column.width && `w-[${column.width}]`,
                )}
              >
                {column.header}
              </TableHead>
            ))}
            {hasActions && (
              <TableHead className="w-[50px] text-end">
                <span>Actions</span>
              </TableHead>
            )}
          </tr>
        </TableHeader>

        <TableBody>
          {data.map((row, index) => {
            const rowId = getRowId(row);
            const isSelected = selectedRows.has(rowId);

            return (
              <TableRow key={index}>
                {enableBulkSelection && (
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleRowSelect(row)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={column.key + column.header}
                    className={column.className}
                  >
                    {getCellValue(row, column, index)}
                  </TableCell>
                ))}

                {hasActions &&
                  (isPopoverShown ? (
                    <TableCell>
                      <Popover
                        open={tableActionState === index}
                        onOpenChange={(open) =>
                          setTableActionState(open ? index : null)
                        }
                      >
                        <PopoverTrigger asChild>
                          <Button variant="transparent" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="!w-auto !max-w-max bg-white border border-slate-200 rounded-sm p-1 shadow-lg"
                          align="end"
                        >
                          {actions?.(row, index)}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  ) : (
                    <TableCell>{actions?.(row, index)}</TableCell>
                  ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  AppTable,
};
