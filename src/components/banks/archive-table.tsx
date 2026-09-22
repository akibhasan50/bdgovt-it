"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { WrittenQA } from "@/lib/types";
import { cn } from "@/lib/utils";

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
});

const helper = createColumnHelper<typeof features, WrittenQA>();

function SortHeader({
  label,
  sorted,
  onToggle,
  className,
}: {
  label: string;
  sorted: false | "asc" | "desc";
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex items-center gap-1.5 text-left transition-colors hover:text-foreground",
        className
      )}
    >
      {label}
      <ArrowUpDown
        className={cn(
          "size-3.5 text-muted-foreground",
          sorted && "text-primary"
        )}
      />
      {sorted === "asc" && <ArrowUp className="size-3 text-primary" />}
      {sorted === "desc" && <ArrowDown className="size-3 text-primary" />}
    </button>
  );
}

export function ArchiveTable({ rows }: { rows: WrittenQA[] }) {
  const t = useTranslations("banks");
  const tc = useTranslations("common");
  const locale = useLocale() as "bn" | "en";

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [lastFilterKey, setLastFilterKey] = useState(
    () => `${globalFilter}|${JSON.stringify(columnFilters)}`
  );
  const filterKey = `${globalFilter}|${JSON.stringify(columnFilters)}`;
  if (lastFilterKey !== filterKey) {
    setLastFilterKey(filterKey);
    setPagination((p) => (p.pageIndex === 0 ? p : { ...p, pageIndex: 0 }));
  }

  const years = useMemo(
    () =>
      Array.from(new Set(rows.map((r) => r.year))).sort((a, b) => b - a),
    [rows]
  );

  const selectedYear = useMemo(() => {
    const active = columnFilters.find((f) => f.id === "year");
    return active ? String(active.value) : "all";
  }, [columnFilters]);

  const columns = useMemo(
    () =>
      helper.columns([
        helper.accessor("question", {
          header: ({ header }) => (
            <SortHeader
              label={t("questionCol")}
              sorted={header.column.getIsSorted()}
              onToggle={() => header.column.toggleSorting()}
            />
          ),
          cell: ({ row }) => (
            <div className="flex max-w-[440px] flex-col gap-1 py-1 whitespace-normal">
              <span className="leading-snug">
                {row.original.question[locale]}
              </span>
              <Badge
                variant="outline"
                className="w-fit font-mono text-[10px] tracking-tight"
              >
                {row.original.exam}
              </Badge>
            </div>
          ),
        }),
        helper.accessor("year", {
          header: ({ header }) => (
            <SortHeader
              label={t("yearCol")}
              sorted={header.column.getIsSorted()}
              onToggle={() => header.column.toggleSorting()}
            />
          ),
          cell: (info) => (
            <Badge variant="secondary" className="font-mono">
              {info.getValue()}
            </Badge>
          ),
          filterFn: (row, columnId, filterValue) =>
            String(row.getValue(columnId)) === String(filterValue),
          enableGlobalFilter: false,
        }),
        helper.accessor("exam", {
          header: ({ header }) => (
            <SortHeader
              label={t("examCol")}
              sorted={header.column.getIsSorted()}
              onToggle={() => header.column.toggleSorting()}
            />
          ),
          cell: (info) => (
            <span className="font-mono text-xs text-muted-foreground">
              {info.getValue()}
            </span>
          ),
        }),
        helper.accessor("group", {
          header: t("group"),
          cell: (info) => (
            <Badge
              variant="outline"
              className="border-cyan/40 bg-cyan/10 font-mono text-cyan"
            >
              {info.getValue()}
            </Badge>
          ),
          enableGlobalFilter: false,
        }),
      ]),
    [locale, t]
  );

  const table = useTable({
    features,
    columns,
    data: rows,
    state: { globalFilter, columnFilters, sorting, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });

  const filteredCount = table.getFilteredRowModel().rows.length;
  const { pageIndex, pageSize } = table.state.pagination;
  const start = filteredCount === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min(filteredCount, (pageIndex + 1) * pageSize);

  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={globalFilter ?? ""}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="h-9 pl-9"
            aria-label={t("searchPlaceholder")}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={selectedYear}
            onValueChange={(value) =>
              table.setColumnFilters(
                value === "all" ? [] : [{ id: "year", value }]
              )
            }
          >
            <SelectTrigger size="sm" className="h-9 min-w-28" aria-label={t("year")}>
              <SelectValue placeholder={t("year")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{tc("all")}</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(pageSize)}
            onValueChange={(v) => {
              table.setPageSize(Number(v));
            }}
          >
            <SelectTrigger size="sm" className="h-9" aria-label={tc("filter")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} / page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "h-11 px-3",
                    header.column.id === "question" && "min-w-[280px]"
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : table.FlexRender({ header })}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getAllCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "px-3 py-3 align-top",
                      cell.column.id === "question" && "whitespace-normal"
                    )}
                  >
                    {table.FlexRender({ cell })}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center text-muted-foreground"
              >
                {tc("noResults")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          {t("showing")} {start}–{end} {tc("of")} {filteredCount}{" "}
          {t("ofEntries")}
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft className="size-3.5" />
            {tc("prev")}
          </Button>
          <span className="text-xs text-muted-foreground tabular-nums">
            {pageIndex + 1} / {Math.max(table.getPageCount(), 1)}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {tc("next")}
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
