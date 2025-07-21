"use client";

import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import type { LucideIcon } from "lucide-react";
import { Terminal } from "lucide-react";

interface ComponentShellProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: LucideIcon;
  isLoading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  children: React.ReactNode;
}

export function ComponentShell({
  title,
  description,
  icon: Icon,
  isLoading = false,
  error = null,
  isEmpty = false,
  emptyTitle = "No data available",
  emptyDescription = "There is no data to display here yet.",
  className,
  children,
  ...props
}: ComponentShellProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-4 text-card-foreground shadow-sm", className)} {...props}>
      <div className="mb-4 flex items-center gap-3">
        {Icon && <Icon className="h-6 w-6 text-muted-foreground" />}
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
      <div className="min-h-[10rem] rounded-md border-2 border-dashed border-border p-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h3 className="text-xl font-semibold">{emptyTitle}</h3>
            <p className="mt-2 text-muted-foreground">{emptyDescription}</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
